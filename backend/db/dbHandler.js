const question = require("./model/Question");
const answer = require("./model/Answer");
const ImageSchema = require("./model/ImageSchema");
const fs = require("fs");
const fileConvert = require("./data/utils/fileConvert")
const CSV = require("./data/utils/handleCSV")
const DataFolder = "./data/";

const Collections = { questions: question, answer: answer, };
``
module.exports.GetQuestion = async (inros, collection) => {
// infos.chapter etc.
};

module.exports.GetAnswers = async (infos, collection) => {

}

module.exports.uploadFiles = () => {
  CSV.readCSV(__dirname + '/data/dataInfo/Questions.csv').then((csv_data) => {
    let questionFilePath = __dirname + '/data/images/Questions/';
    let questionFileList = fs.readdirSync(questionFilePath, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);
      else return files
    })

    csv_data.forEach(async (data) => {
      let qfFound = questionFileList.find(element => element.name === data.questionImage)
      if (qfFound === undefined) {
        console.error('image name :', data.questionImage, 'is not available.')  
        return;
      } 
      let questionImageFile = fileConvert.base64_encode(questionFilePath + qfFound.name);


      let sqfFound = questionFileList.find(element => element.name === data.subQuestionImage);
      let subQuestionImageFile;
      if (sqfFound === undefined) {
        if (data.subQuestionImage === "None") subQuestionImageFile = ""
        else { 
          console.error('image name :', data.subQuestionImage, 'is not available.')  
          return;
        }
      } 
      subQuestionImageFile = fileConvert.base64_encode(questionFilePath + sqfFound.name)
      
      await Collections[question].countDocuments({ 
        questionId: data.questionId, 
        specificQuestionID: data.specificQuestionID
      }).then( async (count) => {
        if (count == 1) { // exact document exist > update
          await Collections[question].findOneAndUpdate({ 
            questionId: data.questionId, 
            specificQuestionID: data.specificQuestionID
          }, {
            questionId: data.questionId, 
            question: new questionInfoSchema({
              questionType: data.questionType,
              questionImage: new ImageSchema({image: questionImageFile,}),
              subQuestion: [{
                subQuestionImage: new ImageSchema({image: subQuestionImageFile}),
                specificQuestionId: data.specificQuestionID,
                numAns: data.numAns,
                unit: data.unit,
                marks: data.marks,
                instruction: data.instruction,
                answerSubscripts: [{type: String}], // TODO::
              }],
            }),
            chapter: [{type: Number}],              // TODO::
            difficulty: data.difficulty, // easy, medium, hard
            paper: data.paper,
            timezone: data.timezone,
            season: data.season ,// W or S,
            year: data.year,
          }, { 
            new: true, 
            overwrite: true
          });
        } else { // no document or many exist > delete and create new doc
          await Collections[question].deleteMany({ 
            questionId: data.questionId, 
            specificQuestionID: data.specificQuestionID
          }).then ( async () => {
            const newDoc = new Collections[question]({
              questionId: data.questionId, 
              question: new questionInfoSchema({
                questionType: data.questionType,
                questionImage: new ImageSchema({image: questionImageFile,}),
                subQuestion: [{
                  subQuestionImage: new ImageSchema({image: subQuestionImageFile}),
                  specificQuestionId: data.specificQuestionID,
                  numAns: data.numAns,
                  unit: data.unit,
                  marks: data.marks,
                  instruction: data.instruction,
                  answerSubscripts: [{type: String}],
                }],
              }),
              chapter: [{type: Number}],
              difficulty: data.difficulty, // easy, medium, hard
              paper: data.paper,
              timezone: data.timezone,
              season: data.season ,// W or S,
              year: data.year,
            })
            await newDoc.save().then(() => console.log("new doc created in question collection"))
          })
        }
      })    
    })      
  })
};

module.exports.uploadUnscorableFiles = async () => {
s.readdir(DataFolder + 'unscorable/Questions', (err, files) => {
files.forEach(file => {
console.log(file);
});
});

fs.readdir(DataFolder + 'unscorable/Answers', (err, files) => {
files.forEach(file => {
console.log(file);
});
});
};