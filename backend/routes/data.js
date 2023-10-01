var express = require('express');
var router = express.Router();

const { uploadFilesQuestion, uploadFilesAnswer, getAnswers, getQuestions, saveQuestion, getMultipleAnswers } = require('../db/dbHandler');

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
    uploadFilesAnswer()
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
  req.query.infos.timezone = req.query.infos.timezone.map((e) => +e)
  req.query.infos.questionNumber = parseInt(req.query.infos.questionNumber)

  try {
    const questions = await getQuestions(req.query.infos);
    //console.log("questions in data.js: ", questions);
    res.status(200).json(questions)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})
// AnswerInfos = { answerID: [0], specificAnswerID: ["1b"], };
router.get('/getRefAnswer', async (req, res) => {
  console.log('get Ref Answers called in routes!', req.query)
  try {
    const answers = await getAnswers(req.query.infos)
    res.status(200).json(answers)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})


router.get('/saveQuestion', async (req, res) => {
  console.log('get save question called in backend. DATA: ', req.query);
  try {
    saveQuestion(req.query.infos);
    res.status(200).json("save question complete")
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

const handleUnexpectedObj = (data) => {
  let returnData = []
  for (const [key, value] of Object.entries(data)) returnData.push(value)

  return returnData
}

router.get('/getAnswers', async (req, res) => {
  console.log('get answers called in backend. query: ', req.query);
  const data = Array.isArray(req.query.infos) ? req.query.infos : handleUnexpectedObj(req.query.infos)
  try {
    const answerList = await getMultipleAnswers(data);
    console.log("answerList in backend:", answerList);
    res.status(200).json(answerList);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

module.exports = router;
