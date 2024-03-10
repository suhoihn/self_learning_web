const question = require("./model/Question");
const answer = require("./model/Answer");
const fs = require("fs");
const fileConvert = require("./data/utils/fileConvert");
const CSV = require("./data/utils/handleCSV");
const bookmark = require("./model/Bookmark");
const UserCol = require("./model/User");
const Collections = { questions: question, answers: answer, bookmarks: bookmark, users: UserCol};

// Checks whether a question includes any of the chapters in the array
function filterByChapter(docs, array){
  let returnArray = [];
   array.forEach((cpt) => {
      docs.forEach((element) => {
          if(element.chapter.includes(cpt)){ returnArray.push(element); }
      });
  });

  return returnArray;
}


// Gets questions that are bookmarked or not
function filterByBookmark(docs, bookmarked) {
  let returnArray = [];
  docs.forEach((element) => {
    if(element.bookmarked === bookmarked) returnArray.push(element);
  })

  return returnArray;
}


// Get "num" random elements from array "arr"
function getMultipleRandom(arr, num) {
  const shuffeld = [...arr].sort(() => 0.5 - Math.random());
  return shuffeld.slice(0, num);
}


module.exports.saveBookmark = async(infos) => {
  console.log('getBookmark, infos: ', infos)
  /*
    infos: { username: "email", questionId: id }
  */
  try {
    let doc = await Collections.bookmarks.findOne(infos)
    if(doc){ console.log(doc); }
    else{ await Collections.bookmarks.create(infos); }
    return true;
  }
  catch (error) { return false; }
}

module.exports.deleteBookmark = async(infos) => {
  console.log('getBookmark, infos: ', infos)
  try {
    await Collections.bookmarks.deleteOne(infos)
    return true
  }
  catch (error) {
    console.log(error)
    return false
  }
}

module.exports.getBookmarks = async(infos) => {
  console.log('getBookmark, infos: ', infos)
  /*
    infos: {username: "email"}
  */
  try {
    let doc = await Collections.bookmarks.find(infos)
    var questionArray = []
    for(var i = 0; i < doc.length; i++)
    {
      let question = await Collections.questions.find({questionId: doc[i].questionId});
      questionArray.push(question)
    }
    return questionArray
  }
  catch (error) {
    console.log(error)
    return false
  }
}

module.exports.getUserDetails = async(infos) => {
  console.log('getUserDetails, infos: ', infos)
  /*
    infos: {username: "email"}
  */
  try {
    let doc = await Collections.users.find(infos);

    const bookmarkQueryList = doc.bookmarkInfo.map(obj => obj.questionId);
    const returnedBookmarkQuestions = await Collections.questions.find({
      'questionId': { $in: bookmarkQueryList },
    });

    const wrongCountQueryList = doc.wrongCountInfo.map(obj => obj.questionId);
    const returnedWrongCountQuestions = await Collections.questions.find({
      'questionId': { $in: wrongCountQueryList },
    });

    returnedWrongCountQuestions.map(item1 => {
      let item2 = doc.wrongCountInfo.find(i => i.questionId === item1.questionId);
      return {...item1, ...item2};
    });

    // Up to here
    console.log("bookmarkQueryList: ", bookmarkQueryList);
    console.log("wrongCountQueryList: ", wrongCountQueryList);

    

    
  }
  catch (error) {
    console.log(error)
    return false
  }
}

module.exports.getQuestions = async (infos) => {
  console.log('getQuestions in backend: ', infos);
  const returned = await Collections.questions.find({
      'difficulty': { $in: infos.difficulty },
      'timezone' : { $in: infos.timezone },
      'paper' : { $in: infos.paper },
      'wrong' : { $gte: infos.wrong },
  }).then((docs) => {
    let result = filterByChapter(docs, infos.chapter);
    if (infos.bookmarked !== undefined) result = filterByBookmark(result, infos.bookmarked);
    return result;
  });

  let result = getMultipleRandom(returned, infos.questionNumber);
  console.log(result);
  return result;
};


module.exports.getMultipleAnswers = async (infos) => {
  /*
    infos: [{ answerId, specificAnswerId },...]
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
  console.log("getMultipleAnswers found", returnList);
  return returnList;
};

module.exports.getAnswers = async (infos) => {
  
  // Divided the case with and without specificAnswerId
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

  console.log("getAnswers found: ", result);
  
  return result;
};

module.exports.saveQuestion = async (infos) => {
  console.log("save question called in background", infos);  

  const userDoc = await Collections.users.findOne({email: infos.userEmail});
  console.log("uzDDDDDDDDDDDDDDDDD", userDoc);

  if(infos.wrong !== undefined){
    const exists = userDoc.wrongCountInfo.find((item) => item.questionId === +infos.questionId);

    if (exists) {
      console.log("YES");
      // If it exists, update the num field
      await Collections.users.updateOne(
        { _id: userDoc._id, "wrongCountInfo.questionId": +infos.questionId },
        {
          $set: {
            "wrongCountInfo.$.wrongCount": +infos.wrong
          }
        },
      ).catch(err => console.error(err));
    } else {
      console.log("NO");
      // If it doesn't exist, add the new object
      await Collections.users.updateOne(
        { _id: userDoc._id },
        {
          $push: {
            wrongCountInfo: {
              questionId: +infos.questionId,
              wrongCount: +infos.wrong
            }
          }
        },
      ).catch(err => console.error(err));
    }
  }

  if(infos.bookmarked === "true"){
    const exists = userDoc.bookmarkInfo.some((item) => item.questionId === +infos.questionId);

    if (!exists) {
      await Collections.users.updateOne(
        { _id: userDoc._id },
        {
          $push: {
            bookmarkInfo: { questionId: +infos.questionId }
          }
        },
      ).catch(err => console.error(err));
    }

  }
  else if(infos.bookmarked === "false"){
    await Collections.users.updateOne(
      {
        $pull: {
          bookmarkInfo: { questionId: +infos.questionId, }
        }
      },
    ).catch(err => console.error(err));
  }
};

module.exports.uploadFilesQuestion = () => {
  CSV.readCSV(__dirname + '/data/dataInfo/Questions.csv').then((csv_data) => {

    let questionFilePath = __dirname + '/data/images/Questions/';
    let questionFileList = fs.readdirSync(questionFilePath, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else return files;
    })

    // For each data in csv_data, create or update the entry in the database
    csv_data.forEach(async (data) => {
      let qfFound = questionFileList.find((element) => { return element.name === data.questionImage });
      if (qfFound === undefined) {
        console.error('q) image name :', data.questionImage, 'is not available.');
        return;
      } 
      let questionImageFile = fileConvert.base64_encode(questionFilePath + qfFound.name);

      let sqfFound = questionFileList.find(element => element.name === data.subQuestionImage);
      let subQuestionImageFile;
      if (sqfFound === undefined) {
        if (data.subQuestionImage === "None") subQuestionImageFile = "";
        else { 
          console.error('sq) image name :', data.subQuestionImage, 'is not available.');
          return;
        }
      } else{
        subQuestionImageFile = fileConvert.base64_encode(questionFilePath + sqfFound.name);
      }
      
      let answerSubscripts_ = data.answerSubscripts.split(",");
      let chapter_ = data.chapter.split(",").map((e) => +e);

      // TODO: FIX HERE TO MAKE IT SHORTER
      await Collections.questions.countDocuments({ 
        questionId: data.questionID, 
        specificQuestionId: data.specificQuestionID
      }).then( async (count) => {
        if (count > 0) { // exact document exist --> update
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
            difficulty: data.difficulty,
            paper: data.paper,
            timezone: data.timezone,
            season: data.season,
            year: data.year,
            wrong: "false",
            bookmarked: "false",
            wrongCount: 0,
          }, { 
            new: true, 
            overwrite: true
          }).then(()=>console.log("updated"));
        } else { // no document exists --> delete and create new doc
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
              difficulty: data.difficulty,
              paper: data.paper,
              timezone: data.timezone,
              season: data.season,
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