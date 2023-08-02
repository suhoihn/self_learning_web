var express = require('express');
var router = express.Router();

const { uploadFilesQuestion, uploadFilesAnswer, getAnswers, getQuestions } = require('../db/dbHandler')

// xxx.xxx.xxx.xxx:PORT/api/Data/<url>
router.get('/', async (req, res) => {
  console.log('req.body : ', req.body)
  res.status(200).send('done')
});

router.get('/UploadQuestion', async (req, res) => {
  try {
    uploadFilesQuestion()
    res.status(200).json("upload Question complete")
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
});

router.get('/UploadAnswer', async (req, res) => {
  try {
    const answers = uploadFilesAnswer()
    res.status(200).json("upload Answer complete")
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
});


// QuestionInfos = { questionType: ['multiAns'], difficulty: ['1','3'], paper: ['1'], 
//                   timezone: [1, 2], chapter: [2, 7], questionNumber: 5 }
router.get('/getQuestions', async (req, res) => {
  try {
    const questions = await getQuestions(req.body.params.infos)
    res.status(200).json(questions)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})
// AnswerInfos = { answerID: [0], specificAnswerID: ["1b"], };
router.get('/getAnswers', async (req, res) => {
  try {
    const answers = await getAnswers(req.body.params.infos)
    res.status(200).json(answers)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

module.exports = router;
