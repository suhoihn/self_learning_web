import React, {useState} from 'react'
import { Modal, Button, Steps, Checkbox, message, Row, Col, Tabs, Divider, Image } from 'antd'
import { useSelector, shallowEqual } from 'react-redux'
import UndefinedImage from './undefinedImage'
export default function ProblemModal({ open, onClosed, onCleared }) { 

  // Data fetched from the backend
  let steps = useSelector((state) => {
    let data = state.data.data;

    const returnData = [];
    for(let i = 1; i <= data.length; i++) {
      let generalQuestionImage = data[i - 1].question.questionImage.image
      let subQuestionImage = data[i - 1].question.subQuestion[0].subQuestionImage.image
      returnData.push({
        title: "Problem " + i,
        content: <>
          {generalQuestionImage && <Image src={`data:image/png;base64, ${generalQuestionImage}`} />}
          {subQuestionImage && <Image src={`data:image/png;base64, ${subQuestionImage}`} />}
        </>
      })
    }
    return returnData;
  }, shallowEqual)

  if (steps == undefined || steps.length == 0) {
    steps = [{
      title: 'quesiton does not exist',
      content: <UndefinedImage/> 
    },];
  }

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    message.success('All problems cleared!')
    if(!window.confirm('Check answer?')) return;
      onClosed()
      onCleared()
    }
    const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
    }));

  // tabs
  const tabsItems = steps.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Problem' + id,
      key: i,
    }
  })

  const onTabsChanged = (key) => setCurrent(key)

  // Modal
  const onModalClosed = ()=> { onClosed() }

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
    <Modal title="Basic Modal" open={open} onCancel={onModalClosed} footer={footer}>
      <Row span={24}>
        <Col span={24}>
          <Row span={24}>
            <Col span={24}>
              <Steps size="small" current={current} items={items}/>     
            </Col>
          </Row>
          <Divider/>
          <Row span={24}>
            <Col span={6}>
              <Tabs size='small' tabPosition={'left'} style={{ height: '100%'}}
                items={tabsItems} activeKey={current} onChange={onTabsChanged}/>
            </Col>
            <Col span={18}> {steps[current].content} </Col>
          </Row>
        </Col>
      </Row>
      <Divider/>
    </Modal>
  )
}