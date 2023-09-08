import React, {useState, useEffect} from 'react'
import { Modal, Button, Steps, Checkbox, message, Input,
          Row, Col, Tabs, Divider, Image, Space, Typography } from 'antd'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import UndefinedImage from './undefinedImage'

import {Actions as dataAction} from '../../../store/actions/dataActions'


const {Text} = Typography
export default function ProblemModal({open, onClosed, onCleared }) { 
  const dispatch = useDispatch()

  // Data fetched from the backend
  let {data, steps} = useSelector((state) => {
    let data = state.data.data;
    let returnData = [];
    for(let i = 0; i < data.length; i++) {
      let generalQuestionImage = data[i].question.questionImage.image
      let subQuestionImage = data[i].question.subQuestion[0].subQuestionImage.image
      returnData.push({
        title: "Problem " + (i+1),
        content: <>
          {generalQuestionImage && <Image src={`data:image/png;base64, ${generalQuestionImage}`} />}
          {subQuestionImage && <Image src={`data:image/png;base64, ${subQuestionImage}`} />}
        </>
      })
    }

    returnData = (returnData.length == 0) ? [{
        title: 'quesiton does not exist',
        content: <UndefinedImage/> 
      },] : returnData

    return { steps: returnData, data: data}
  }, shallowEqual)

  const { answerData } = useSelector((state) => {
    let data = state.data.refAnswer;
    console.log("Main(Problem Modal) refAnswer:", data)
    return data;
  }, shallowEqual)

  const [current, setCurrent] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState([])

  useEffect(() => {
    data.length > 0 &&
    dispatch(dataAction.getRefAnswer({
      answerId: data[current].questionId ? data[current].questionId: undefined,
      specificAnswerId: data[current].question.subQuestion[0].specificQuestionId ?
                          data[current].question.subQuestion[0].specificQuestionId : 
                          undefined
    }))
  }, [current])

  useEffect(() => { setCurrentAnswer(answerData) }, [answerData])

  // tabs
  const tabsItems = steps.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Problem' + id,
      key: i,
    }
  })
  const onTabsChanged = (key) => setCurrent(key)
  
  // Input
  const onSubmitClicked = () => {}

  // Modal
  const onModalClosed = ()=> { onClosed() }

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  const done = () => {
    message.success('All problems cleared!')
    if(!window.confirm('Check answer?')) return;
    onClosed()
    onCleared()
  }

  const footer = 
  <div style={{ marginTop: 24, display: 'flex'}}>
    <div style={{textAlign: 'left'}}> <Checkbox>Bookmark</Checkbox></div>
    <div style={{width: '100%', textAlign:'right'}}>
      {current > 0 && <Button style={{margin: '0 8px',}} onClick={() => prev()}> Previous </Button>}
      {current < steps.length - 1 && <Button type="primary" onClick={() => next()}> Next </Button>}
      {current === steps.length - 1 && <Button type="primary" onClick={done}> Done </Button>}
    </div>
  </div>

  return (
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
      <Space>    
        <Space.Compact style={{ width: '100%',}}>
          <Text> TODO:: answerSubscript</Text>
          <Input placeholder="Write your answer here."/>
          <Button type="defualt" onClick={onSubmitClicked}>Submit</Button>
        </Space.Compact>
      </Space>
    </Modal>
  )
}