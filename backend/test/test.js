const { getQuestions, uploadFilesAnswer, uploadFilesQuestion, getAnswers } = require("../db/dbHandler");

//uploadFilesQuestion()
uploadFilesAnswer()
const infos = {
	questionType: ['multiAns'],
	difficulty: ['1','3'],
	paper: ['1'],
	timezone: [1, 2],
	chapter: [2, 7],
	questionNumber: 5
}

const infos2 = {
	answerID: [0],
	specificAnswerID: ["1b"],
};

//getAnswers(infos2);
