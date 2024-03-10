import React, { useState } from 'react';
import { Typography, Spin, Modal, Button, Switch, Row, Col, Divider, Image } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
const { Text } = Typography;

export default function AnswerModal({ open, onClosede, question }) { 

  // steps(data fetched by useSelector)
  const { steps, isLoading } = useSelector((state) => {
    let data = state.data.answers;
    let isLoading = state.data.isLoading;
    console.log("Individual AnswerModal answers:", data);
    if(data === undefined) { data = []; }

    return { steps: data, isLoading: isLoading };
  }, shallowEqual);

  const questionSteps = [question.item];

  // Switch
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnswer, setIsAnswer] = useState(true);
  const onQuestionSwitchChanged = () => setIsQuestion(!isQuestion);
  const onAnswerSwitchChanged = () => setIsAnswer(!isAnswer);

  // Modal
  const onModalClosed = ()=> { onClosede(); }

  const footer = 
    <div style={{ marginTop: 24, display: 'flex'}}>
      <div style={{width: '100%', textAlign:'right'}}>
        {(
            <Button type="primary" onClick={onModalClosed}>
                Done
            </Button>
        )}
      </div>
    </div>

  return (
    <Modal title="Answers" open={open} onCancel={onModalClosed}
            width={1000} footer={footer}>
      { isLoading ? <Spin /> : <>
        <Row span={24}>
          <Col span={24}>
            <Row span={24}>
              <Col span={20} style={{textAlign: 'right'}}>
                Question : <Switch Checked={false} onChange={onQuestionSwitchChanged} /> 
              </Col>
              <Col span= {4} style={{textAlign: 'right'}}>
                Answer : <Switch defaultChecked onChange={onAnswerSwitchChanged} /> 
              </Col>
            </Row>
            <Divider/>
            <Row span={24}>
              { isAnswer &&  steps.length > 0 && 
              <Col span={24}>   
                <Text>Answer: </Text><br />
                <Image src={`data:image/png;base64, ${steps[0].answer.answerImage.image}`} />
              </Col>
              }
              { isQuestion && questionSteps.length > 0 && 
              <Col span={24}>
                <Divider />
                <Text>Question: </Text> <br />
                { questionSteps[0].question.questionImage.image
                  && <Image src={`data:image/png;base64, ${questionSteps[0].question.questionImage.image}`} />
                }
                {  questionSteps[0].question.subQuestion[0].subQuestionImage.image
                  && <Image src={`data:image/png;base64, ${questionSteps[0].question.subQuestion[0].subQuestionImage.image}`} />
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