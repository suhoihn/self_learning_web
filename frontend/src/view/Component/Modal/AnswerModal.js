import React, { useState, useEffect } from 'react';
import { Typography, Spin, Modal, Button, Switch, Row, Col, Tabs, Divider, Image } from 'antd'
import { useSelector, shallowEqual,  } from 'react-redux'
const { Text } = Typography;

export default function AnswerModal({ open, onClosed, definedContent=undefined }) { 

  // Answer steps (data fetched by useSelector)
  const { steps, isLoading } = useSelector((state) => {
    let data = state.data.answers;
    let isLoading = state.data.isLoading;
    if(data === undefined) { data = []; }

    return { steps: data, isLoading: isLoading };
  }, shallowEqual);

  // Question steps
  const dataFromStore = useSelector((state) => {
    let data = state.data.data;
    if(data === undefined) { data = []; }
    if(definedContent !== undefined) { data = [definedContent]; }

    console.log("Answermodal questions: ",definedContent, data)
    return data;
  }, shallowEqual);

  const [questionSteps, setQuestionSteps] = useState(dataFromStore);

  useEffect(() => { setQuestionSteps(dataFromStore) }, [dataFromStore]);

  useEffect(() => {
    if(definedContent !== undefined){
      console.log("Using Problem Modal for individual questions! Defined Content: ", definedContent);

      setQuestionSteps([definedContent]);  
    }

  }, [open, definedContent])



  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  const done = () => { onClosed(); }

  // Tabs
  const tabsItems = steps.map((_, i) => {
    const id = String(i + 1);
    return {
      label: 'Answer' + id,
      key: i,
    }
  })
    
  const onTabsChanged = (key) => setCurrent(key);

  // Switch
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnswer, setIsAnswer] = useState(true);
  const onQuestionSwitchChanged = () => setIsQuestion(!isQuestion);
  const onAnswerSwitchChanged = () => setIsAnswer(!isAnswer);

  const footer = 
    <div style={{ marginTop: 24, display: 'flex'}}>
      <div style={{width: '100%', textAlign:'right'}}>
        {current > 0 && (
            <Button
                style={{margin: '0 8px',}}
                onClick={() => prev()}
            >
                Previous
            </Button>
        )}
        {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
                Next
            </Button>
        )}
        {current === steps.length - 1 && (
            <Button type="primary" onClick={done}>
                Done
            </Button>
        )}
      </div>
    </div>

  return (
    <Modal title="Answers" open={open} onCancel={onClosed}
            width={1000} footer={footer}>
      { isLoading ? <Spin /> : <>
        <Row span={24}>
          <Col span={24}>
            <Row span={24}>
              <Col span={24}>
                <Tabs size='small' style={{ height: '100%' }}
                    items={tabsItems} activeKey={current} onChange={onTabsChanged}/>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={20} style={{textAlign: 'right'}}>
                Question : <Switch Checked={false} onChange={onQuestionSwitchChanged} /> 
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
                Answer : <Switch defaultChecked onChange={onAnswerSwitchChanged} /> 
              </Col>
            </Row>
            <Divider/>
            <Row span={24}>
              { isAnswer &&  steps.length > 0 && 
              <Col span={24}>   
                <Text>Answer: </Text><br />
                <Image src={`data:image/png;base64, ${steps[current].answer.answerImage.image}`} />
              </Col>
              }
              { isQuestion && questionSteps.length > 0 && 
              <Col span={24}>
                <Divider />
                <Text>Question: </Text> <br />
                { questionSteps[current].question.questionImage.image
                  && <Image src={`data:image/png;base64, ${questionSteps[current].question.questionImage.image}`} />
                }
                {  questionSteps[current].question.subQuestion[0].subQuestionImage.image
                  && <Image src={`data:image/png;base64, ${questionSteps[current].question.subQuestion[0].subQuestionImage.image}`} />
                }
              </Col>
              }
            </Row>
          </Col>
        </Row>
        <Divider/>
      </>}
    </Modal>
  )
}