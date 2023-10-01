import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spin, Button, Input, List, Space, Typography, Image, Divider, Row, Col } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

const { Text } = Typography

export default function BookmarkedList ({onItemClicked, setModalContent}) {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('getQuestion called in BookmarkedList')
    dispatch(dataAction.getQuestions({
      difficulty: [1, 2, 3],
      timezone: [1, 2, 3],
      paper: [1, 2, 3],
      chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
      wrong: -1,
      bookmarked: 'true',
      questionNumber: 100
    }))
  }, [])

  const { data, isLoading } = useSelector((state) => {
    let data = state.data;
    let isLoading = state.data.isLoading

    return { 
      data: data ? data : undefined, 
      isLoading: isLoading
    }
  }, shallowEqual)

  const { answerData } = useSelector((state) => {
    console.log("answerData in declaration", state);
    let data = state.data.refAnswer;

    return data;
  }, shallowEqual)


  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );        

  let text = ''
  const onInputChange = (e) => {
    // setInputText(e.target.value)
    text = e.target.value
  }
  const answerSubmit = (item) => {
    console.log(item.questionId, item.question.subQuestion)
    dispatch(dataAction.getRefAnswer({
      answerID: item.questionId,
      specificAnswerID: item.question.subQuestion[0].specificQuestionId
    }))

    console.log("The Input is ", text);
    // const { data } = useSelector((state) => {
    //   let answerData = state.data.refAnswer;  
      
    //   console.log('DATA IN USESELECTOR:', answerData);
    //   return { data: data ? data : undefined, }
    // }, shallowEqual)

  }

  const callAnswer = (item) => {
    console.log("Get Ref Answer called");
    dispatch(dataAction.getRefAnswer({
      answerId: item.questionId ? item.questionId: undefined,
      specificAnswerId: item.question.subQuestion[0].specificQuestionId ?
      item.question.subQuestion[0].specificQuestionId : undefined
    }))
  }

  const onRenderListItem = (item) => (
    <List.Item
      key={item.title}
      onClick={() => {
        callAnswer(item);
        setModalContent(
          <>
            <p>Question {item.questionId}</p>
            <>   
              {item.question.questionImage.image && <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />}
              {item.question.subQuestion[0].subQuestionImage.image && <Image src={`data:image/png;base64, ${item.question.subQuestion[0].subQuestionImage.image}`} />}
            </>
            <Divider/>
            {answerData && answerData[0].answer.answerSubscripts.map((i, idx) => (
            answerData[0].answer.answerValues[0] != "None" && <Row>
                <Col span={4}>
                  <Text>{(i == "None") ? "Answer: " : i}</Text>
                </Col>
                <Col span={20}>
                  <Input key={idx} value={text} placeholder="Write your answer here." onChange={(e) => {onInputChange(e,idx)}}/>
                </Col>
              </Row>
            ))}
          {answerData && answerData[0].answer.answerValues[0] != "None" && <>
            <Row style={{marginTop: 10}}>
              <Col span={24} style={{textAlign: 'right'}}>
                  {<Button type="primary" onClick={answerSubmit}>Submit</Button>}
                </Col>
            </Row>
            <Divider/>
          </>}

          </>
        );
        onItemClicked();
      }}
      actions={[<IconText icon={StarOutlined} text="Bookmarked" key="list-vertical-star-o" />,]}
      extra={<Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />}
    >
      <List.Item.Meta
          title={<a href={item.href}>{item.title}</a>}
          description={
            <div>
              <Text>Question Type: {item.question.questionType}</Text><br/>
              <Text>Chapters: {item.chapter}</Text><br/>
              <Text>Difficulty: {item.difficulty}</Text><br/>
              <Text>Paper: {item.paper}</Text><br/>
              <Text>timezone: {item.timezone}</Text>
            </div>
          }
      />          
    </List.Item>
  )

  return (
    data && <>
    {
      isLoading ? <Spin /> : <>
      <List itemLayout="vertical" size="large" dataSource={data.data}
              pagination={{
              onChange: (page) => { console.log(page); },
              pageSize: 3,
              }}
              
              footer={
              <div>
                  <b>ant design</b> footer part
              </div>
              }
              renderItem={onRenderListItem}
      />
      </>
    }
    </>
  )
}