import React, {useState, useEffect} from 'react'
import { Modal, Button, Steps, Checkbox, message, Input,
          Row, Col, Tabs, Divider, Image, Space, Typography } from 'antd'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import UndefinedImage from './undefinedImage'

import {Actions as dataAction} from '../../../store/actions/dataActions'


const {Text} = Typography
export default function ProblemModal({open, onClosed, onCleared}) { 
  const dispatch = useDispatch()

  // Data fetched from the backend
  let {data, steps} = useSelector((state) => {
    let data = state.data.data;
    let returnData = new Array(data.length);
    console.log("datawenfiwenfo", data)
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

    return { steps: returnData, data: data}
  }, shallowEqual)

  const [current, setCurrent] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState([]);

  const [checkboxState, setCheckboxState] = useState(false);

  // Always 1 bc unique
  const answerData = useSelector((state) => {
    let data = state.data.refAnswer;
    console.log("Main(Problem Modal) refAnswer:", data);
    //updateAnswer();
    return data;
  }, shallowEqual)

  useEffect(() => {     
    console.log("Get Ref Answer called in ProblemModal through updateAnswer");
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current].questionId ? data[current].questionId: undefined,
      specificAnswerId: data[current].question.subQuestion[0].specificQuestionId ?
                          data[current].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))
  }, [data])

  // CRITICAL: doesn't work when only 1 question
  // + Answer save?
  // Why subQuestion[0] only?
  function updateAnswer(current2){
    clearInputs();
    // The bookmark status is saved before updating "current"
    dispatch(dataAction.getSaveQuestion({
      questionId: data[current].questionId,
      bookmarked: checkboxState
      //specificQuestionId: data[current].question.subQuestion[0].specificQuestionId 
    }))
    data[current].bookmarked = checkboxState;

    setCurrent(current2);

    console.log("Get Ref Answer called in ProblemModal through updateAnswer");
    console.log("Here is data query: ",current,data[current2].questionId, data[current2].question.subQuestion[0].specificQuestionId)
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current2].questionId ? data[current2].questionId: undefined,
      specificAnswerId: data[current2].question.subQuestion[0].specificQuestionId ?
                          data[current2].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))

    console.log("datacurrent checked in updateanswer:",data[current2])
    setCheckboxState(data[current2].bookmarked);
  };
  //useEffect(() => { updateAnswer() }, [answerData])
  useEffect(() => { setCurrentAnswer(answerData) }, [answerData])

  // Tabs
  const tabsItems = steps.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Problem' + id,
      key: i,
    }
  })
  // All "setCurrent" repleaced with updateAnswer bc processing difficulties
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

    correct? message.success('Good job'): message.success('Try again')

  }

  // Modal
  const onModalClosed = ()=> { onClosed() }

  const next = () => { updateAnswer(current + 1); }
  const prev = () => { updateAnswer(current - 1); }
  const done = () => {
    console.log(currentAnswer);
    message.success('All problems cleared!')
    if(!window.confirm('Check answer?')) return;
    onClosed()
    onCleared()
  }


  const footer = 
  <div style={{ marginTop: 24, display: 'flex'}}>
    <div style={{textAlign: 'left'}}> 
      {steps[current].title !== "quesiton does not exist" && <Checkbox checked={checkboxState} onChange={() => setCheckboxState(!checkboxState)}>Bookmark</Checkbox>}
    </div>
    <div style={{width: '100%', textAlign:'right'}}>
      {current > 0 && <Button style={{margin: '0 8px',}} onClick={() => prev()}> Previous </Button>}
      {current < steps.length - 1 && <Button type="primary" onClick={() => next()}> Next </Button>}
      {current === steps.length - 1 && <Button type="primary" onClick={done}> Done </Button>}
    </div>
  </div>

  return ( data &&
    <Modal title="Problems" open={open} onCancel={onModalClosed} footer={footer}>
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
      {/* <Space>     */}
        {/* <Space.Compact style={{ width: '100%',}}> */}
            { answerData && answerData[0].answer.answerSubscripts.map((i, idx) => (
                answerData[0].answer.answerValues[0] != "None" && <Row>
                  <Col span={4}>
                    <Text>{(i == "None") ? "Answer: " : i}</Text>
                  </Col>
                  <Col span={20}>
                    <Input key={idx} value={textArray[idx]} placeholder="Write your answer here." onChange={(e) => {onInputChange(e,idx)}}/>
                  </Col>
                </Row>
              ))
            }
        {/* </Space.Compact> */}
      {/* </Space> */}
      {answerData && answerData[0].answer.answerValues[0] != "None" && <>
        <Row style={{marginTop: 10}}>
          <Col span={24} style={{textAlign: 'right'}}>
              {console.log(steps[current].title)}
              {steps[current].title !== "quesiton does not exist" && <Button type="primary" onClick={answerSubmit}>Submit</Button>}
            </Col>
        </Row>
        <Divider/>
      </>}
      
      
    </Modal>
  )
}