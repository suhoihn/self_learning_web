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
    infos: { username: "blabla" }
  */

  try {
    let doc = await Collections.users.findOne({ "username": infos.username });

    const bookmarkQuery = doc.bookmarkInfo.map((item) => {
      let obj = { "questionId": item.questionId };
      if (item.specificQuestionId !== "undefined") {
        obj["question.subQuestion"]= {
          $elemMatch: {
            specificQuestionId: item.specificQuestionId
          }
        }
      }
      return obj;
    });

    console.log("bookmarkquery: ", bookmarkQuery);
    
    const returnedBookmarkQuestions = (bookmarkQuery.length === 0) ? [] : await Collections.questions.find({
      $or: bookmarkQuery
    });


    const wrongCountQuery = doc.wrongCountInfo.map((item) => {
      let obj = { "questionId": item.questionId };
      if (item.specificQuestionId !== "undefined") {
        obj["question.subQuestion"] = { $elemMatch: { specificQuestionId: item.specificQuestionId } }

        //obj["question.subQuestion[0].specificQuestionId"] = item.specificQuestionId;
      }
      return obj;
    });


    let returnedWrongCountQuestions = (wrongCountQuery.length === 0) ? [] : await Collections.questions.find({
      $or: wrongCountQuery
    });
    console.log("wrongCountQuery: ", wrongCountQuery);
    console.log("returnedWrongCountQuestions:", returnedWrongCountQuestions);
    returnedWrongCountQuestions = returnedWrongCountQuestions.map(item1 => {
      let item2 = doc.wrongCountInfo.find(i => {
        
        if(item1["question.subQuestion[0].specificQuestionId"] === undefined){ return i.questionId === item1["questionId"]; }
        else{ return i.questionId === item1["questionId"] && i.specificQuestionId === item1["question.subQuestion[0].specificQuestionId"]; }
      });
      console.log("item1 matches with item2: ", item1, item2);
      let returnObject = item1.toObject();

      returnObject.wrongCount = item2.wrongCount;
      console.log("item1 is ", item1);
      return returnObject;
    });

    console.log(doc.wrongCountInfo);
    console.log("bookmark q returnList: ", returnedBookmarkQuestions);
    console.log("wrongCount q returnList: ", returnedWrongCountQuestions);

    
    return {
      "bookmarkInfo": returnedBookmarkQuestions,
      "wrongCountInfo": returnedWrongCountQuestions,
    };
    
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
      //'wrong' : { $gte: infos.wrong },
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

  // Enforce the field types!
  if(infos.specificQuestionId === undefined){ infos.specificQuestionId = "undefined"; }

  console.log("save question called in background", infos);  


  const userDoc = await Collections.users.findOne({username: infos.username});
  console.log("user detail", userDoc);

  if(infos.wrong !== undefined && infos.wrong > 0){
    const exists = userDoc.wrongCountInfo.find((item) => item.questionId === +infos.questionId && item.specificQuestionId === infos.specificQuestionId);

    if (exists) {
      console.log("YES");
      // If it exists, update the num field
      await Collections.users.updateOne(
        { _id: userDoc._id, "wrongCountInfo.questionId": +infos.questionId, "wrongCountInfo.specificQuestionId": infos.specificQuestionId },
        {
          $set: {
            "wrongCountInfo.$.wrongCount": +infos.wrong
          }
        },
      ).then(r => console.log(r)).catch(err => console.error(err));

    } else {
      console.log("NO");
      // If it doesn't exist, add the new object
      await Collections.users.updateOne(
        { _id: userDoc._id },
        {
          $push: {
            wrongCountInfo: {
              questionId: +infos.questionId,
              specificQuestionId: infos.specificQuestionId,
              wrongCount: +infos.wrong
            }
          }
        },
      ).then(r => console.log(r)).catch(err => console.error(err));
    }
  }

  if(infos.bookmarked === "true"){
    console.log("I am called here", { questionId: +infos.questionId, specificQuestionId: infos.specificQuestionId })
    const exists = userDoc.bookmarkInfo.some((item) => item.questionId === +infos.questionId && item.specificQuestionId === infos.specificQuestionId);

    if (!exists) {
      await Collections.users.updateOne(
        { _id: userDoc._id },
        {
          $push: {
            bookmarkInfo: { questionId: +infos.questionId, specificQuestionId: infos.specificQuestionId }
          }
        },
      ).catch(err => console.error(err));
    }

  }
  else if(infos.bookmarked === "false"){
    console.log("yuhu~!")
    await Collections.users.updateOne(
      {_id: userDoc._id },
      {
        $pull: {
          bookmarkInfo: { questionId: +infos.questionId, specificQuestionId: infos.specificQuestionId }
        }
      },
    ).then((do2c) => {console.log("DOCDOC: ",do2c,userDoc)}).catch(err => console.error(err));
  }
};

module.exports.getUpdateQuestion = async (fileData, infos) => {
  console.log(fileData, infos);

  if(infos.uploadType == "add"){
    let questionImage = fileConvert.base64_encode(__dirname + "/uploads/" + fileData[0].filename);
    let answerImage = fileConvert.base64_encode(__dirname + "/uploads/" + fileData[1].filename);
  
    Collections.questions.find().sort({ questionId: -1 }).limit(1)
    .then(docs => {
      let maxQuestionId = 0;
      if (docs.length > 0) {
        maxQuestionId = docs[0].questionId;
      }
  
      // Increment the questionId
      const newQuestionId = maxQuestionId + 1;
  
      // Insert new question
      const newDoc = new Collections.questions({
        questionId: newQuestionId, 
        question: {
          questionType: infos.questionType,
          questionImage: { image: questionImage,},
          subQuestion: [{
            subQuestionImage: {image: ""},
            specificQuestionId: infos.specificQuestionId,
            numAns: infos.numAns,
            unit: infos.unit, // FIXME: NOT IMPLEMENTED
            marks: infos.marks, // FIXME: NOT IMPLEMENTED
            answerSubscripts: infos.answerSubscripts.slice(0,infos.numAns),
          }],
        },
        instruction: infos.instruction,
        chapter: infos.chapter,
        difficulty: infos.difficulty,
        paper: infos.paper,
        timezone: infos.timezone,
        season: "Sunny day", // FIXME: NOT IMPLEMENTED
        year: 1972, // FIXME: NOT IMPLEMENTED
  
      })
      newDoc.save().then(() => console.log("Question save was successful!"));
  
      // Insert new answer
      const newDoc2 = new Collections.answers({
        answerID: newQuestionId, 
        answer: {
          answerType: infos.questionType,
          answerImage: { image: answerImage },
          answerSubscripts: infos.answerSubscripts.slice(0,infos.numAns),
          specificAnswerID: infos.specificQuestionId,
          answerValues: infos.answerValue.slice(0,infos.numAns),    
        },
      })
      newDoc2.save().then(() => console.log("Answer save was successful!"))
  
    })
  
    .catch(err => {
      console.error(err);
    });
  
  }
  else if(infos.uploadType == "modify"){
    console.log("Modify question called")
    Collections.questions.findOneAndUpdate({
      questionId: infos.questionId,
      "question.subQuestion": { $elemMatch: { specificQuestionId: infos.specificQuestionId } }
    }, {
      $set: {
        "question.questionType": infos.questionType,
        "question.subQuestion.0.numAns": infos.numAns,
        
        "question.subQuestion.0.answerSubscripts": infos.answerSubscripts.slice(0,infos.numAns),
        chapter: infos.chapter,
        difficulty: infos.difficulty,
        paper: infos.paper,
        timezone: infos.timezone,
        instruction: infos.instruction,
      }
    }).then((doc) => {console.log("Tell me the result: ", doc)});
    
    Collections.answers.findOneAndUpdate({
      answerID: infos.questionId,
      "answer.specificAnswerID": infos.specificQuestionId
      },
      { $set: {
        "answer.answerType": infos.questionType,
        "answer.answerSubscripts": infos.answerSubscripts.slice(0,infos.numAns),
        "answer.answerValues": infos.answerValue.slice(0,infos.numAns),
        }
      }).then((doc) => {console.log("Tell me the result: ", doc)})
  
    .catch(err => {
      console.error(err);
    });

  }

  
}


module.exports.removeQuestion = async (info) => {
  console.log("info in remove question", info.infos);
  await Collections.questions.deleteOne({
    questionId: info.infos.questionId,
    "question.subQuestion": { $elemMatch: { specificQuestionId: info.infos.specificQuestionId } }
  }).then((doc) => {console.log(doc)}).catch((err) => {console.log(err)});
}

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
                answerSubscripts: answerSubscripts_
              }],
            }, 
            instruction: data.instruction,
            chapter: chapter_,
            difficulty: data.difficulty,
            paper: data.paper,
            timezone: data.timezone,
            season: data.season,
            year: data.year,
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
                  answerSubscripts: answerSubscripts_,
                }],
              }, 
              instruction: data.instruction,
              chapter: chapter_,
              difficulty: data.difficulty,
              paper: data.paper,
              timezone: data.timezone,
              season: data.season,
              year: data.year,
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
      //console.log(answerValues, " and ", data.answerValues);

      await Collections.answers.countDocuments({ 
        answerID: data.answerID, 
        specificAnswerId: data.specificAnswerID
      }).then( async (count) => {
        if (count > 0) { // exact document exist > update
          await Collections.answers.findOneAndUpdate({ 
            answerID: +data.answerID, 
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