const question = require("./model/Question");
const answer = require("./model/Answer");
const questionInfoSchema = question.questionInfoSchema;
const ImageSchema = question.imageSchema;
const fs = require("fs");
const fileConvert = require("./data/utils/fileConvert")
const CSV = require("./data/utils/handleCSV")
const db = require('./db.js'); // db 불러오기
const { disconnect } = require("process");

const DataFolder = "./data/";

const Collections = { questions: question, answers: answer, };


function filterByChapter(docs, array){
  let returnArray = [];
   array.forEach((cpt) => {
    console.log('cpt', cpt)
      docs.forEach((element) => {
        console.log('element',element)
          if(element.chapter.includes(cpt)){returnArray.push(element);}
      });
  });

  return returnArray;
}

function filterByBookmark(docs, bookmarked) {
  let returnArray = [];
  docs.forEach((element) => {
    if(element.bookmarked === bookmarked) returnArray.push(element)
  })

  return returnArray
}

function getMultipleRandom(arr, num) {
  const shuffeld = [...arr].sort(() => 0.5- Math.random())
  return shuffeld.slice(0,num)
}


module.exports.getQuestionInfo = async () => {
// TODO:: questionType
}

module.exports.getQuestions = async (infos) => {
  console.log("getQuestion is called in the backend!")
  console.log('getQuestions:',infos)
  // infos = { questionType: String, difficulty: Array, chapter, paper: Array, timezone: Array, }
  const returned = await Collections.questions.find({
      'difficulty': { $in: infos.difficulty },
      'timezone' : {$in: infos.timezone },
      'paper' : {$in: infos.paper},
      'wrong' : {$gte: infos.wrong},
  }).then((docs) => {
    let result = filterByChapter(docs, infos.chapter)
    if (infos.bookmarked !== undefined) result = filterByBookmark(result, infos.bookmarked)
    return result
  });

  console.log('getQuestion',returned)
  let result = getMultipleRandom(returned, infos.questionNumber)
  console.log(result)
  return result
};


module.exports.getMultipleAnswers = async (infos) => {
  /*
    infos: {answerId, specificAnswerId}
  */

  const returnList = [];
  for(let i = 0; i < infos.length; i++){
    let result = "";
    infos[i].specificAnswerId == undefined? 
      result = await Collections.answers.findOne({
        'answerID' : { $in: infos[i].answerId },
      }) :

      result = await Collections.answers.findOne({
        'answerID' : { $in: infos[i].answerId },
        'answer.specificAnswerID': { $in: infos[i].specificAnswerId },
      })

      returnList.push(result);
  }
  //?
  console.log("getMultipleAnswers found", returnList);
  return returnList;
};

module.exports.getAnswers = async (infos) => {

  // Divide the case with and without specificAnswerId
  let result = [];
  if(infos.specificAnswerId == undefined){
    result = await Collections.answers.find({
      'answerID' : { $in: infos.answerId },
    })
  }
  else{
    result = await Collections.answers.find({
      'answerID' : { $in: infos.answerId },
      'answer.specificAnswerID': { $in: infos.specificAnswerId },
    })
  }

  console.log("A INFO:", infos)
  console.log("This is what getAnswers in background found: ", result);
  
  return result;
};

module.exports.saveQuestion = async (infos) => {
  console.log("save question called in background");
  var myquery = { 
    "questionId": infos.questionId,
  };
  var newvalues = { $set: {bookmarked: infos.bookmarked, wrong: infos.wrong} };

  Collections.questions.updateOne(myquery, newvalues).then(() => {console.log("SAVE QUESTION WORKING")});
};

module.exports.uploadFilesQuestion = () => {
  CSV.readCSV(__dirname + '/data/dataInfo/Questions.csv').then((csv_data) => {
    // console.log("data: ", csv_data);
    let questionFilePath = __dirname + '/data/images/Questions/';
    let questionFileList = fs.readdirSync(questionFilePath, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else return files
    })
    csv_data.forEach(async (data) => {
      let qfFound = questionFileList.find((element) => {return element.name === data.questionImage});
      if (qfFound === undefined) {
        console.error('q) image name :', data.questionImage, 'is not available.')  
        return;
      } 
      let questionImageFile = fileConvert.base64_encode(questionFilePath + qfFound.name);

      let sqfFound = questionFileList.find(element => element.name === data.subQuestionImage);
      let subQuestionImageFile;
      if (sqfFound === undefined) {
        if (data.subQuestionImage === "None") subQuestionImageFile = ""
        else { 
          console.error('sq) image name :', data.subQuestionImage, 'is not available.')  
          return;
        }
      } else{
        subQuestionImageFile = fileConvert.base64_encode(questionFilePath + sqfFound.name)
      }
      
      let answerSubscripts_ = data.answerSubscripts.split(",")
      let chapter_ = data.chapter.split(",").map((e) => +e)

      console.log(Array.isArray(answerSubscripts_), Array.isArray(chapter_))

      await Collections.questions.countDocuments({ 
        questionId: data.questionID, 
        specificQuestionId: data.specificQuestionID
      }).then( async (count) => {
        if (count > 0) { // exact document exist > update
          console.log(data.chapter.split(","));
          await Collections.questions.findOneAndUpdate({ 
            questionId: data.questionID, 
            specificQuestionID: data.specificQuestionID
          }, {
            questionId: data.questionID, 
            question: {
              questionType: data.questionType,
              questionImage: {image: questionImageFile,},
              subQuestion: [{
                subQuestionImage: {image: subQuestionImageFile},
                specificQuestionId: data.specificQuestionID,
                numAns: data.numAns,
                unit: data.unit,
                marks: data.marks,
                instruction: data.instruction,
                answerSubscripts: answerSubscripts_
              }],
            },
            chapter: chapter_,
            difficulty: data.difficulty, // easy, medium, hard
            paper: data.paper,
            timezone: data.timezone,
            season: data.season ,// W or S,
            year: data.year,
            wrong: "false",
            bookmarked: "false",
            wrongCount: 0,
          }, { 
            new: true, 
            overwrite: true
          }).then(()=>console.log("updated"));
        } else { // no document or many exist > delete and create new doc
          console.log(count)
          await Collections.questions.deleteMany({ 
            questionId: data.questionID, 
            specificQuestionId: data.specificQuestionID
          }).then ( async () => {
            const newDoc = new Collections.questions({
              questionId: data.questionID, 
              question: {
                questionType: data.questionType,
                questionImage: {image: questionImageFile,},
                subQuestion: [{
                  subQuestionImage: {image: subQuestionImageFile},
                  specificQuestionId: data.specificQuestionID,
                  numAns: data.numAns,
                  unit: data.unit,
                  marks: data.marks,
                  instruction: data.instruction,
                  answerSubscripts: answerSubscripts_,
                }],
              },
              chapter: chapter_,
              difficulty: data.difficulty, // easy, medium, hard
              paper: data.paper,
              timezone: data.timezone,
              season: data.season ,// W or S,
              year: data.year,
              wrong: 0,
              bookmarked: "false",
            })
            await newDoc.save().then(() => console.log("delete and saved"))
          })
        }
      })    
    })      
  })
};


module.exports.uploadFilesAnswer = () => {
  // TODO : db check, getans func return check 
  //db();
  CSV.readCSV(__dirname + '/data/dataInfo/Answers.csv').then((csv_data) => {
    let answerFilePath = __dirname + '/data/images/Answers/';
    let answerFileList = fs.readdirSync(answerFilePath, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else return files
    })
    csv_data.forEach(async (data) => {
      let ansFound = answerFileList.find((element) => {return element.name === data.answerImage});
      if (ansFound === undefined) {
        console.error('ans) answer name :', data.answerImage, 'is not available.')  
        return;
      } 
      let answerImageFile = fileConvert.base64_encode(answerFilePath + ansFound.name);
      
      let answerSubscripts_ = data.answerSubscripts.split(",");
      let answerValues = data.answerValues.split(",");
      console.log(answerValues, " and ", data.answerValues);

      await Collections.answers.countDocuments({ 
        answerID: data.answerID, 
        specificAnswerId: data.specificAnswerID
      }).then( async (count) => {
        if (count > 0) { // exact document exist > update
          await Collections.answers.findOneAndUpdate({ 
            answerID: data.answerID, 
            specificAnswerId: data.specificAnswerID    
          }, {
            answerID: data.answerID, 
            answer: {
              answerType: data.answerType,
              answerImage: {image: answerImageFile},
              answerSubscripts: answerSubscripts_,
              specificAnswerID: data.specificAnswerID,    
              answerValues: answerValues,
            },
          }, { 
            new: true, 
            overwrite: true
          }).then(()=>console.log("updated"));
        } else { // no document or many exist > delete and create new doc
          await Collections.answers.deleteMany({ 
            answerID: data.answerID, 
            specificAnswerId: data.specificAnswerID
          }).then ( async () => {
            const newDoc = new Collections.answers({
              answerID: data.answerID, 
              answer: {
                answerType: data.answerType,
                answerImage: {image: answerImageFile},
                answerSubscripts: answerSubscripts_,
                specificAnswerID: data.specificAnswerID,
                answerValues: answerValues,    
              },
            })
            await newDoc.save().then(() => console.log("delete and saved"))
          })
        }
      })    
    })      
  })
};