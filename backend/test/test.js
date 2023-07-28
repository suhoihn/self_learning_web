const { getQuestions, uploadFiles } = require("../db/dbHandler");

// uploadFiles()

const infos = {
	questionType: ['multiAns'],
	difficulty: ['1','3'],
	paper: ['1'],
	timezone: [1, 2],
	chapter: [2, 7],
	questionNumber: 5
}

getQuestions(infos)
