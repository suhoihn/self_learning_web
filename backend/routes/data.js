var express = require('express');
var router = express.Router();
const multer = require("multer");

// Import the functions
const { uploadFilesQuestion, uploadFilesAnswer, getAnswers, getQuestions, saveQuestion, getMultipleAnswers, saveBookmark, deleteBookmark, getBookmarks, getUserDetails, getUpdateQuestion, removeQuestion } = require('../db/dbHandler');

// xxx.xxx.xxx.xxx:PORT/api/Data/<url>
router.get('/', async (req, res) => {
  console.log('req.body : ', req.body);
  res.status(200).send('done');
});

// Upload question & answers
router.get('/UploadQuestion', async (req, res) => {
  try {
    uploadFilesQuestion();
    res.status(200).json("Upload Question complete");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});

router.get('/UploadAnswer', async (req, res) => {
  try {
    uploadFilesAnswer();
    res.status(200).json("Upload Answer complete");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});


router.get('/getBookmarks', async (req, res) => {
  console.log("save bookmark", req.query)
  try {
    var bookmarks = await getBookmarks(req.query)
    res.status(200).json(bookmarks)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

router.get('/saveBookmark', async (req, res) => {
  console.log("save bookmark", req.query)
  try {
    var success = await saveBookmark(req.query)
    if(success)
    {
      res.status(200).json("upload Answer complete")
    }
    else {
      res.status(404).json("problem")
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

router.get('/deleteBookmark', async (req, res) => {
  console.log("delete bookmark", req.query)
  try {
    var success = await deleteBookmark(req.query)
    if(success)
    {
      res.status(200).json("delete bookmark complete")
    }
    else {
      res.status(404).json("problem")
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: error.message
    })
  }
})

// QuestionInfos = { questionType: ['multiAns'], difficulty: ['1','3'], paper: ['1'], 
//                   timezone: [1, 2], chapter: [2, 7], questionNumber: 5 }
router.get('/getQuestions', async (req, res) => {
  req.query.infos.timezone = req.query.infos.timezone.map((e) => +e);
  req.query.infos.questionNumber = parseInt(req.query.infos.questionNumber);

  try {
    const questions = await getQuestions(req.query.infos);
    //console.log("questions in data.js: ", questions);
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});

// AnswerInfos = { answerID: [0], specificAnswerID: ["1b"], };
router.get('/getRefAnswer', async (req, res) => {
  console.log('get Ref Answers called in routes. Query: ', req.query);
  try {
    const answers = await getAnswers(req.query.infos);
    res.status(200).json(answers);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});


router.get('/saveQuestion', async (req, res) => {
  console.log('get save question called in backend. DATA: ', req.query);
  try {
    saveQuestion(req.query.infos);
    res.status(200).json("save question complete");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});

router.get('/getUserDetails', async (req, res) => {
  console.log('get user details called in backend. DATA: ', req.query);
  try {
    const data = await getUserDetails(req.query.infos);
    console.log("data is sent: ", data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  };
});


const handleUnexpectedObj = (data) => {
  let returnData = [];
  for (const [key, value] of Object.entries(data)) returnData.push(value);

  return returnData;
};

router.get('/getAnswers', async (req, res) => {
  console.log('get answers called in backend. Query: ', req.query);
  const data = Array.isArray(req.query.infos) ? req.query.infos : handleUnexpectedObj(req.query.infos);
  try {
    const answerList = await getMultipleAnswers(data);
    console.log("answerList in backend:", answerList);
    res.status(200).json(answerList);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  }
});


const upload = multer({ dest: "db/uploads/" });

router.post('/getUpdateQuestion', upload.array("files"), async (req, res) => {
  try{
    console.log('get update question called in backend. Query: ');// req.query);
    console.log(req.files);
    console.log(req.body.info);

    await getUpdateQuestion(req.files, JSON.parse(req.body.info));
    res.status(200).json("OK!")
  }
  catch(error){
    console.log(error);
    res.status(400).json("Bad job")
  }
});

router.get('/getRemoveQuestion', async (req, res) => {
  console.log('get remove question called in backend. Query: ', req.query);
  try {
    await removeQuestion(req.query);
    res.status(200).json("Successful elimination");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message
    });
  }
});



module.exports = router;
