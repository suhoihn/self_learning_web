import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin, Checkbox, message, Input,
          Row, Col, Tabs, Divider, Image, Typography, Slider } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Actions as dataAction } from '../../../store/actions/dataActions';

const { Text } = Typography;
export default function ProblemModal({open, onClosed, onCleared, definedContent=undefined}) { 
  const dispatch = useDispatch();

  // Maximum questions that can be loaded in this modal
  const MAX_QUESTIONS = 100;


  // Bookmark state and wrong count for bookmark and history pages
  // This is assuming there are maximum of 100 questions!

  const [bookmarkState, setBookmarkState] = useState(new Array(MAX_QUESTIONS).fill(false));
  const [wrongCountList, setWrongCountList] = useState(new Array(MAX_QUESTIONS).fill(0));
  
  const [bookmarkCheckbox, setBookmarkCheckbox] = useState(
    <Checkbox checked={false} onChange={() => {toggleBookmark()}}>Bookmark</Checkbox>
  );

  // Stores the current number of question
  const [current, setCurrent] = useState(0);

  // For UserMultiAns questions
  const [sliderValue, setSliderValue] = useState(1);

  // Whenever the bookmarkState or current changes, the checkbox is also updated
  useEffect(() => { 
    setBookmarkCheckbox(
      <Checkbox checked={bookmarkState[current]} onChange={() => {toggleBookmark()}}>Bookmark</Checkbox>
    );
  }, [bookmarkState, current]);

  const toggleBookmark = () => {
    setBookmarkState(bookmarkState.map((q,idx) =>
      idx === current ? !bookmarkState[current] : bookmarkState[idx]
    ));
  };
  
  // Question data fetched from the backend (anything in the state, so must be dispatched before opening this modal)
  // Only when there is no defined question (only in Main, not when called from Bookmark, History, or Recommended)

  const { data: dataFromStore, isLoading: isLoadingFromStore, bookmarkInfo: bookmarkInfoFromStore, wrongCountInfo: wrongCountInfoFromStore } = useSelector((state) => {
    let data = state.data.data;
    let isLoading = state.data.loadingData;
    let bookmarkInfo = state.data.userData ? state.data.userData.bookmarkInfo : [];
    let wrongCountInfo = state.data.userData ? state.data.userData.wrongCountInfo : [];

    return { data: data, isLoading: isLoading, bookmarkInfo: bookmarkInfo, wrongCountInfo: wrongCountInfo };
  }, shallowEqual);

  const [data, setData] = useState(dataFromStore);
  const [isLoading, setIsLoading] = useState(isLoadingFromStore);
  const [bookmarkInfo, setBookmarkInfo] = useState(bookmarkInfoFromStore);
  const [wrongCountInfo, setWrongCountInfo] = useState(wrongCountInfoFromStore);

  useEffect(() => { setData(dataFromStore) }, [dataFromStore]);
  useEffect(() => { setIsLoading(isLoadingFromStore) }, [isLoadingFromStore]);
  useEffect(() => { setBookmarkInfo(bookmarkInfoFromStore) }, [bookmarkInfoFromStore]);
  useEffect(() => { setWrongCountInfo(wrongCountInfoFromStore) }, [wrongCountInfoFromStore]);

  useEffect(() => {
    console.log("useEffect initial data collections", data, bookmarkInfo, wrongCountInfo, definedContent);
    if(definedContent !== undefined){
      console.log("Using Problem Modal for individual questions! Defined Content: ", definedContent);

      setData([definedContent]);
      console.log(data);
      if(definedContent.bookmarked) { setBookmarkInfo([definedContent]); }
      if(definedContent.wrongCount > 0) { setWrongCountInfo([definedContent]); }


      setBookmarkState([definedContent.bookmarked, bookmarkState.slice(1)]);
      setWrongCountList([definedContent.wrongCount, wrongCountList.slice(1)]);

      console.log("Final data", data);
  
    }

  }, [open, definedContent])



  // Always 1 answerData exists bc unique
  // (NOTE: Can be extended later to include main Q and subQ at once)
  const answerData = useSelector((state) => {
    let data = state.data.refAnswer; // The answer unique to the single question
    console.log("Main(Problem Modal) refAnswer:", data);
    return data;
  }, shallowEqual);



  // When "data" changes, bookmark states and wrong counts are updated accordingly
  useEffect(() => {
    let returnBookmarkData = new Array(MAX_QUESTIONS).fill(false);
    let returnWrongCountList = new Array(MAX_QUESTIONS).fill(0);


    for(let i = 0; i < data.length; i++) {
      // NOTE: data[i].bookmarked is not a boolean true, but a string "true"....
      
      let matchingItem = bookmarkInfo ? 
      bookmarkInfo.find(item => item.questionId === data[i].questionId && item.question.subQuestion[0].specificQuestionId === item.question.subQuestion[0].specificQuestionId)
      : undefined;

      returnBookmarkData[i] = Boolean(matchingItem);
      
      matchingItem = wrongCountInfo ?
      wrongCountInfo.find(item => item.questionId === data[i].questionId && item.question.subQuestion[0].specificQuestionId === item.question.subQuestion[0].specificQuestionId)
      : undefined;
      
      returnWrongCountList[i] = matchingItem ? matchingItem.wrongCount : 0;
    }

    setBookmarkState(returnBookmarkData);
    setWrongCountList(returnWrongCountList);
    

    // This is called once when the data is loaded
    dispatch(dataAction.getRefAnswer({
      answerId: data[current] ? data[current].questionId: undefined,
      specificAnswerId: data[current] ?
                          data[current].question.subQuestion[0].specificQuestionId : 
                          undefined
    }));
  }, [data]);



  // Updates the question info through "getSaveQuestion" action
  function updateAnswer(newCurrent){
    if(data.length === 0){ return; }

    // Clear input from the modal
    clearInputs();

    // The bookmark status is saved before updating "current"
    dispatch(dataAction.getSaveQuestion({
      username: localStorage.getItem('username'),

      questionId: data[current].questionId,
      specificQuestionId: data[current].question ?
                          data[current].question.subQuestion[0].specificQuestionId : 
                          undefined,
      bookmarked: bookmarkState[current],
      wrong: wrongCountList[current],
    }));

    // "current" is changed to "newCurrent"
    setCurrent(newCurrent);
    
    // Get new refAnswer for the loaded question
    dispatch(dataAction.getRefAnswer({
      answerId: data[newCurrent].questionId,
      specificAnswerId: data[newCurrent].question.subQuestion[0].specificQuestionId
    }));
  };


  // Tabs for the modal
  const tabsItems = data.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Problem' + id,
      key: i,
    }
  })
  
  // When moved to a new tab, call updateAnswer
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

    // Need to check the answer in a different way in userMultiAns
    if(data[current].question.questionType == "userMultiAns"){
      // Get the same number of answers of the answerArray length (others are "")
      var sortedArr1 = answerArray.slice().sort();
      var sortedArr2 = textArray.slice(0, answerArray.length).sort();
      
      for(let i = 0; i < sortedArr1.length; i++){
        if(sortedArr1[i] != sortedArr2[i]){correct = false; break;}
      }
      if(answerArray.length !== sliderValue){correct = false;}
    }
    else{
      for(let i = 0; i < answerArray.length; i++){
        if(answerArray[i] != textArray[i]){correct = false; break;}
      }
    }

    if(correct){message.success('Good job');}
    else{
      message.error('Try again');
      setWrongCountList(wrongCountList.map((q,idx) => (
        idx === current ? wrongCountList[current] + 1: wrongCountList[idx]
      )));
    };
    console.log("Your wrong count is " + wrongCountList[current]);
  };

  // Modal management
  const onModalClosed = ()=> {
    updateAnswer(current);
    onClosed();
    setCurrent(0);
    setBookmarkState(new Array(MAX_QUESTIONS).fill(false));
    setWrongCountList(new Array(MAX_QUESTIONS).fill(0));
  };

  const next = () => { updateAnswer(current + 1); };
  const prev = () => { updateAnswer(current - 1); };
  const done = () => {
    if(!window.confirm('Check answer?')) return;
    onClosed();
    onCleared();
    updateAnswer(current);
    setCurrent(0);

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

  const footer = 
  <div style={{ marginTop: 24, display: 'flex'}}>
    <div style={{textAlign: 'left'}}> 
      {!isLoading && data.length !== 0 && bookmarkCheckbox}
    </div>
    <div style={{width: '100%', textAlign:'right'}}>
      {current > 0 && <Button style={{margin: '0 8px',}} onClick={() => prev()}> Previous </Button>}
      {current < data.length - 1 && <Button type="primary" onClick={() => next()}> Next </Button>}
      {current === data.length - 1 && <Button type="primary" onClick={done}> Done </Button>}
    </div>
  </div>

  // Actual page
  return (
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
              <Col span={24}>
                {data.length === 0 ? <>
                  <Text>Question not found</Text>
                </> : <>
                  {data.length !== 0 && data[current].question.questionImage.image && <Image src={`data:image/png;base64, ${data[current].question.questionImage.image}`} />}
                  {data.length !== 0 && data[current].question.subQuestion[0].subQuestionImage.image && <Image src={`data:image/png;base64, ${data[current].question.subQuestion[0].subQuestionImage.image}`} />}
                </>}
                
             </Col>
             <Col span={24}><Text>{data.length !== 0 && (data[current].instruction === "None" ? "" : "Instruction: " + data[current].instruction)}</Text></Col>
            </Row>
          </Col>
        </Row>
        <Divider/>        
        {data.length !== 0 && data[current] && data[current].question.questionType == "userMultiAns" ? 
          <>
            <Row>
              <Col span = {24}>
                <Slider min = {1} max = {10} defaultValue={1} onChange = {setSliderValue}/>
              </Col>
            </Row>
            <Row>
              {answerData[0] && [...Array(sliderValue)].map((_, idx) => (
                data.length !== 0 && 
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
              data.length !== 0 && answerData[0].answer.answerValues[0] != "None" && <Row>
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
              {data.length !== 0 && <Button type="primary" onClick={answerSubmit}>Submit</Button>}
            </Col>
        </Row>
        <Divider/>
      </>}
    </>}
      
    </Modal>
  )
}