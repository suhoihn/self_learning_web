const question = require("../model/Question");
const answer = require("../model/Answer");
const ImageSchema = require("../model/ImageSchema");
const fs = require("fs");
const fileConvert = require("./data/fileConvert")
const DataFolder = "./data/";

const Collections = {
  questions: question,
  answer: answer,
};
``
module.exports.GetQuestion = async (inros, collection) => {
  // infos.chapter etc.
};

module.exports.GetAnswers = async (infos, collection) => {
  
}

module.exports.uploadScorableFiles = () => {
    let questionFilePath = DataFolder + 'scorable/Questions/';
    fs.readdir(questionFilePath, async (err, files) => {
        files.forEach(async(file) => {
            let imageFile = fileConvert.base64_encode(questionFilePath + file);
            // w22_12_q12b etc.
            await Collections[question].findOneAndUpdate({questionId: questionId, questionImage: new ImageSchema({
                image: imageFile,
            })});
            console.log(file);
        });
    });

    fs.readdir(DataFolder + 'scorable/Answers', (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
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