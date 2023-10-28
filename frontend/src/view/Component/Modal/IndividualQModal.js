import React, {useState, useEffect} from 'react'
import { Modal, Button, Spin, Checkbox, message, Input,
          Row, Col, Tabs, Divider, Image, Typography, Slider } from 'antd'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import UndefinedImage from './undefinedImage'

import {Actions as dataAction} from '../../../store/actions/dataActions'

const {Text} = Typography
export default function IndividualQModal({open, onClosed, onCleared, definedContent}) { 
  const dispatch = useDispatch();

  // Bookmark state and wrong count for bookmark and history pages (Not an array because there is only one question)
  const [bookmarkState, setBookmarkState] = useState(true);

  // Errornous, when wrongCount exists, this resets to 0
  const [wrongCount, setWrongCount] = useState(0);
  
  const [bookmarkCheckbox, setBookmarkCheckbox] = useState(
    <Checkbox checked={true} onChange={() => {toggleBookmark()}}>Bookmark</Checkbox>
  );

  // There is only one question!
  const current = 0;

  // For UserMultiAns questions
  const [sliderValue, setSliderValue] = useState(1);

  // definedContent: { data, item }
  let {data, steps, isLoading} = {
    // This should be a single LIST!!!! [item]
    data: definedContent.data ? definedContent.data : undefined,
    steps: [{
      title: "Question",
      content: <>
          {definedContent.item && definedContent.item.question.questionImage.image && <Image src={`data:image/png;base64, ${definedContent.item.question.questionImage.image}`} />}
          {definedContent.item && definedContent.item.question.subQuestion[0].subQuestionImage.image && <Image src={`data:image/png;base64, ${definedContent.item.question.subQuestion[0].subQuestionImage.image}`} />}
      </>
    }],
    isLoading: false,
  }

  // Always 1 answerData exists bc unique
  // (NOTE: Can be extended later to include main Q and subQ at once)
  const answerData = useSelector((state) => {
    let data = state.data.refAnswer; // The answer unique to the single question
    console.log("Main(Problem Modal) refAnswer:", data);
    return data;
  }, shallowEqual)

  // // When "data" changes, refAnswer is requested from backend
  // useEffect(() => {
  //   let returnBookmarkData = new Array(MAX_QUESTIONS).fill(false);
  //   let returnWrongCountList = new Array(MAX_QUESTIONS).fill(0);
  //   for(let i = 0; i < data.length; i++) {
  //     // NOTE: data[i].bookmarked is not a boolean true, but a string "true"....
  //     returnBookmarkData[i] = (data[i].bookmarked == "true");
  //     returnWrongCountList[i] = data[i].wrong;
  //   }
  //   setBookmarkState(returnBookmarkData);
  //   setWrongCountList(returnWrongCountList);

  //   console.log("Get Ref Answer called in ProblemModal through updateAnswer");
  //   data.length > 0 &&
  //   dispatch(dataAction.getRefAnswer({
  //     answerId: data[current].questionId ? data[current].questionId: undefined,
  //     specificAnswerId: data[current].question.subQuestion[0].specificQuestionId ?
  //                         data[current].question.subQuestion[0].specificQuestionId : 
  //                         undefined
  //   }))
  // }, [data])

  // TODO: Why subQuestion[0] only?
  // Updates the question info through "getSaveQuestion" action
  function updateAnswer(current2){
    // Clear input from the modal
    clearInputs();

    // The bookmark status is saved before updating "current"
    dispatch(dataAction.getSaveQuestion({
      questionId: data[current].questionId,
      bookmarked: bookmarkState,
      wrong: wrongCount,
    }))
    
    // Get new refAnswer for the loaded question
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current2].questionId ? data[current2].questionId: undefined,
      specificAnswerId: data[current2].question.subQuestion[0].specificQuestionId ?
                          data[current2].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))
  }


  // Whenever the bookmarkState or current changes, the checkbox is also updated
  useEffect(() => { 
    setBookmarkCheckbox(
      <Checkbox checked={bookmarkState} onChange={toggleBookmark}>Bookmark</Checkbox>
    );
  }, [bookmarkState]);
    
  // Input with multiple answer subscripts
  const MAXINPUT = 10; // Maximum number of input fields possible
  const [textArray, setTextArray] = useState(Array(MAXINPUT).fill('')); // Creates an array of empty strings

  const onInputChange = (e, index) => {
    const newValues = [...textArray];
    newValues[index] = e.target.value;
    setTextArray(newValues);
  };

  const clearInputs = () => {
    setTextArray(Array(MAXINPUT).fill(''));
  };


  // Check answer
  const answerSubmit = () => {
    console.log("Your input(s):",textArray);
    console.log("Answer:",answerData[0].answer.answerValues);

    let correct = true;
    const answerArray = answerData[0].answer.answerValues;

    // Need to check the answer in a different way in userMultiAns
    if(data[current].question.questionType == "userMultiAns"){
      // Get the same number of answers of the answerArray length (others are "")
      var sortedArr1 = answerArray.slice().sort();
      var sortedArr2 = textArray.slice(0, answerArray.length).sort();
      
      for(let i = 0; i < sortedArr1.length; i++){
        if(sortedArr1[i] != sortedArr2[i]){correct = false; break;}
      }
    }
    else{
      for(let i = 0; i < answerArray.length; i++){
        if(answerArray[i] != textArray[i]){correct = false; break;}
      }
    }

    if(correct){message.success('Good job');}
    else{
      message.success('Try again');
      setWrongCount(wrongCount + 1);
    }
  }

  // Modal management
  const onModalClosed = ()=> {
    updateAnswer(current);
    onClosed();
  }

  const done = () => {
    if(!window.confirm('Check answer?')) return;
    onClosed();
    onCleared();

    console.log("Checking the data that is about to be sent to the backend via the getAnswers action: ", data);

    // If user finishes, getAnswers is called and AnswerModal is opened
    const queryList = [];
    for(let i = 0; i < data.length; i++){
      queryList.push({
        answerId: data[i].questionId,
        specificAnswerId: data[i].question.subQuestion[0].specificQuestionId
      });
    }
    dispatch(dataAction.getAnswers(queryList));
    
  }

  const toggleBookmark = () => { setBookmarkState(!bookmarkState); }

  const footer = 
  <div style={{ marginTop: 24, display: 'flex'}}>
    <div style={{textAlign: 'left'}}> 
      {!isLoading && steps[current].title !== "quesiton does not exist" && bookmarkCheckbox}
    </div>
    <div style={{width: '100%', textAlign:'right'}}>
      {current === steps.length - 1 && <Button type="primary" onClick={done}> Done </Button>}
    </div>
  </div>

  // Actual page
  return ( data &&
    <Modal title="Problems" open={open} onCancel={onModalClosed} footer={footer} width={1000}>
      {console.log(data)}
      {isLoading ? <Spin /> : <> 
        <Row span={24}>
          <Col span={24}>
            <Row span={24}>
              <Col span={24}> {steps[current].content} </Col>
            </Row>
          </Col>
        </Row>
        <Divider/>
        {answerData[0] && console.log("Hi: ",current,answerData[0],"length:",answerData[0].answer.answerSubscripts.length)}
        
        {data[current] && data[current].question.questionType == "userMultiAns" ? 
          <>
            <Row>
              <Col span = {24}>
                <Slider min = {1} max = {10} defaultValue={1} onChange = {setSliderValue}/>
              </Col>
            </Row>
            <Row>
              {answerData[0] && [...Array(sliderValue)].map((_, idx) => (
                steps[current].title !== "quesiton does not exist" && 
                <>
                  <Col span={4}>
                    <Text>
                      {(data[current].question.subQuestion[0].answerSubscripts[0] == "") ? "Answer: " : data[current].question.subQuestion[0].answerSubscripts[0]}
                    </Text>
                  </Col>

                  <Col span={20}>
                    <Input key={idx} value={textArray[idx]} placeholder="Write your answer here." onChange={(e) => {onInputChange(e,idx)}}/>
                  </Col>
                </>
              ))}
            </Row>

          </> : 
          // Normal answering system
          <>
            {answerData[0] && answerData[0].answer.answerSubscripts.map((i, idx) => (
              steps[current].title !== "quesiton does not exist" && answerData[0].answer.answerValues[0] != "None" && <Row>
                  <Col span={4}>
                    <Text>{(i == "None") ? "Answer: " : i}</Text>
                  </Col>
                  <Col span={20}>
                    <Input key={idx} value={textArray[idx]} placeholder="Write your answer here." onChange={(e) => {onInputChange(e,idx)}}/>
                  </Col>
                </Row>
            ))}
          </>
        }

      {answerData[0] && answerData[0].answer.answerValues[0] != "None" && <>
        <Row style={{marginTop: 10}}>
          <Col span={24} style={{textAlign: 'right'}}>
              {console.log(steps[current].title)}
              {steps[current].title !== "quesiton does not exist" && <Button type="primary" onClick={answerSubmit}>Submit</Button>}
            </Col>
        </Row>
        <Divider/>
      </>}
    </>}
      
    </Modal>
  )
}