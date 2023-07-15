const question = require("./model/Question");
const answer = require("./model/Answer");
// const ImageSchema = require("./model/ImageSchema");
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
  let questionConfig = CSV.readCSV(__dirname + '/data/dataInfo/Questions.csv');
  console.log('from CSV :', questionConfig)

  let questionFilePath = __dirname + '/data/images/Questions/';
  fs.readdir(questionFilePath, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(file => {
        console.log(file.name);
      })
    }
    // return files 
  })

  // console.log('questionList :', questionFileList)

  // questionFileList.forEach(async (file) => {
  //   console.log('filename :', file)
  //   let imageFile = fileConvert.base64_encode(questionFilePath + file);
    
  //   // w22_12_q12b etc.
  //   await Collections[question].findOneAndUpdate({
  //     questionId: questionId, 
  //     questionImage: new ImageSchema({
  //       image: imageFile,
  //     })
  //   });
  //   console.log(file);
  // });


  // fs.readdir(DataFolder + 'images/Answers', (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });
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