import React, {useState, useEffect} from 'react'
import { Modal, Button, Spin, Checkbox, message, Input,
          Row, Col, Tabs, Divider, Image, Space, Typography } from 'antd'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import UndefinedImage from './undefinedImage'

import {Actions as dataAction} from '../../../store/actions/dataActions'

const {Text} = Typography
export default function ProblemModal({open, onClosed, onCleared}) { 
  const dispatch = useDispatch();

  // Maximum questions that can be loaded
  const MAX_QUESTIONS = 100;

  // This is assuming there are maximum of 100 questions!
  const [bookmarkState, setBookmarkState] = useState(new Array(MAX_QUESTIONS).fill(false));
  const [wrongCountList, setWrongCountList] = useState(new Array(MAX_QUESTIONS).fill(0));
  
  const [bookmarkCheckbox, setBookmarkCheckbox] = useState(
    <Checkbox checked={false} onChange={() => {toggleBookmark()}}>Bookmark</Checkbox>
  );

  // Data fetched from the backend
  let {data, steps, isLoading} = useSelector((state) => {
    let data = state.data.data;
    let returnData = new Array(data.length);
    
    console.log("datawenfiwenfo", data);
    for(let i = 0; i < data.length; i++) {
      let generalQuestionImage = data[i].question.questionImage.image
      let subQuestionImage = data[i].question.subQuestion[0].subQuestionImage.image
      returnData[i] = {
        title: "Problem " + (i+1),
        content: <>
          {generalQuestionImage && <Image src={`data:image/png;base64, ${generalQuestionImage}`} />}
          {subQuestionImage && <Image src={`data:image/png;base64, ${subQuestionImage}`} />}
        </>
      }
    }

    returnData = (returnData.length == 0) ? [{
        title: 'quesiton does not exist',
        content: <UndefinedImage/> 
      },] : returnData
    
    let isLoading = state.data.loadingData;

    return { steps: returnData, data: data, isLoading: isLoading}
  }, shallowEqual)

  const [current, setCurrent] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState([]);

  // Always 1 answerData exists bc unique
  const answerData = useSelector((state) => {
    let data = state.data.refAnswer;
    console.log("Main(Problem Modal) refAnswer:", data);
    return data;
  }, shallowEqual)

  // When "data" changes, answer is requested from backend
  useEffect(() => {

    let returnBookmarkData = new Array(MAX_QUESTIONS).fill(false);
    let returnWrongCountList = new Array(MAX_QUESTIONS).fill(0);
    for(let i = 0; i < data.length; i++) {
      // NOTE: data[i].bookmarked is not a boolean true, but a string "true"....
      returnBookmarkData[i] = (data[i].bookmarked == "true");
      returnWrongCountList[i] = data[i].wrong;
    }
    setBookmarkState(returnBookmarkData);
    setWrongCountList(returnWrongCountList);

    console.log("Get Ref Answer called in ProblemModal through updateAnswer");
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current].questionId ? data[current].questionId: undefined,
      specificAnswerId: data[current].question.subQuestion[0].specificQuestionId ?
                          data[current].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))
  }, [data])

  // TODO: Why subQuestion[0] only?
  function updateAnswer(current2){
    // TODO: fix input clear when moving to next/prev Q
    clearInputs();

    // The bookmark status is saved before updating "current"
    dispatch(dataAction.getSaveQuestion({
      questionId: data[current].questionId,
      bookmarked: bookmarkState[current],
      wrong: wrongCountList[current],
    }))

    // "current" is changed to "current2"
    setCurrent(current2);
    
    // Get new answer for the loaded question
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current2].questionId ? data[current2].questionId: undefined,
      specificAnswerId: data[current2].question.subQuestion[0].specificQuestionId ?
                          data[current2].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))

    // Update the checkbox state according to the bookmark state
  }

  // Unknown functionality
  useEffect(() => { setCurrentAnswer(answerData) }, [answerData])
  useEffect(() => { 
    setBookmarkCheckbox(
      <Checkbox checked={bookmarkState[current]} onChange={() => {toggleBookmark()}}>Bookmark</Checkbox>
    );
  }, [bookmarkState, current]);

  // Tabs
  const tabsItems = steps.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Problem' + id,
      key: i,
    }
  })
  
  // All "setCurrent" repleaced with updateAnswer
  const onTabsChanged = (key) => {updateAnswer(key);}
  
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
    for(let i = 0; i < answerArray.length; i++){
      if(answerArray[i] != textArray[i]){correct = false; break;}
    }

    if(correct){message.success('Good job');}
    else{
      message.success('Try again');
      setWrongCountList(wrongCountList.map((q,idx) => (
        idx === current ? wrongCountList[current] + 1: wrongCountList[idx]
      )));
    }
  }

  // Modal management
  const onModalClosed = ()=> {
    updateAnswer(current);
    onClosed();
    setCurrent(0);
    setBookmarkState(new Array(MAX_QUESTIONS).fill(false));
    setWrongCountList(new Array(MAX_QUESTIONS).fill(0));
  }

  const next = () => { 
    updateAnswer(current + 1); 
  }
  const prev = () => { 
    updateAnswer(current - 1); 
  }
  const done = () => {
    console.log(currentAnswer);
    message.success('All problems cleared!');
    if(!window.confirm('Check answer?')) return;
    onClosed();
    onCleared();
    setCurrent(0);

    console.log("Checking the data that is about to be sent to the backend via the getAnswers action: ", data);

    const queryList = [];
    for(let i = 0; i < data.length; i++){
      queryList.push({
        answerId: data[i].questionId,
        specificAnswerId: data[i].question.subQuestion[0].specificQuestionId
      });
    }
    dispatch(dataAction.getAnswers(queryList));

  }

  const toggleBookmark = () => {
    setBookmarkState(bookmarkState.map((q,idx) =>
      idx === current ? !bookmarkState[current] : bookmarkState[idx]
    ));
  }

  const footer = 
  <div style={{ marginTop: 24, display: 'flex'}}>
    <div style={{textAlign: 'left'}}> 
      {steps[current].title !== "quesiton does not exist" && bookmarkCheckbox}
    </div>
    <div style={{width: '100%', textAlign:'right'}}>
      {current > 0 && <Button style={{margin: '0 8px',}} onClick={() => prev()}> Previous </Button>}
      {current < steps.length - 1 && <Button type="primary" onClick={() => next()}> Next </Button>}
      {current === steps.length - 1 && <Button type="primary" onClick={done}> Done </Button>}
    </div>
  </div>

  // Actual page
  return ( data &&
    <Modal title="Problems" open={open} onCancel={onModalClosed} footer={footer} width={1000}>
      {isLoading ? <Spin /> : <> 
        <Row span={24}>
          <Col span={24}>
            <Row span={24}>
              <Col span={24}>
                <Tabs size='small' style={{ height: '100%'}}
                  items={tabsItems} activeKey={current} onChange={onTabsChanged}/>
              </Col>
            </Row>
            <Divider/>
            <Row span={24}>
              <Col span={24}> {steps[current].content} </Col>
            </Row>
          </Col>
        </Row>
        <Divider/>
        {answerData[0] && console.log("Hi: ",current,answerData[0],"length:",answerData[0].answer.answerSubscripts.length)}
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