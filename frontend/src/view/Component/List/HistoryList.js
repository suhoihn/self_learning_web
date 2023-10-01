import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spin, Button, Input, List, Space, Typography, Image } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

const { Text } = Typography

export default function HistoryList({onItemClicked, setModalContent}) {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('getQuestion called in HistoryList')
    dispatch(dataAction.getQuestions({
      questionNumber: 5,
      difficulty: [1, 2, 3],
      timezone: [1, 2, 3],
      paper: [1, 2, 3],
      chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
      wrong: 1,
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
    let data = state.data.refAnswer;
    
    console.log('state in answerdata: ', state);
    console.log("data in answerData: ", data);
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
  const onSubmitClicked = (item) => {
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

  const onRenderListItem = (item) => (
    <List.Item
      key={item.title}
      onClick={() => {
        setModalContent(
          <>
            <p>Question {item.questionId}</p>
            <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />
            <Image src={`data:image/png;base64, ${item.question.subQuestion[0].subQuestionImage.image}`} />
            {console.log("Answer Data: ", answerData)}

            { answerData && answerData[0].answerSubscripts.map((answerSubscript) => (
              <Space>    
                <Space.Compact style={{ width: '100%',}}>
                  <Text>{answerSubscript}</Text>
                  <Input placeholder="Write your answer here." onChange={onInputChange}/>
                  <Button type="primary" onClick={onSubmitClicked(item)}>Submit</Button>
                </Space.Compact>
              </Space>
            ))}

          </>
        );
        onItemClicked()
      }}
      actions={[<IconText icon={StarOutlined} text="for something" key="list-vertical-star-o" />,]}
      extra={
        <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />
      }
    >
      <List.Item.Meta
          title={<a href={item.href}>{item.title}</a>}
          description={
            <div>
              <Text>Question Type: {item.question.questionType}</Text><br/>
              <Text>Chapters: {item.chapter}</Text><br/>
              <Text>Difficulty: {item.difficulty}</Text><br/>
              <Text>Paper: {item.paper}</Text><br/>
              <Text>timezone: {item.timezone}</Text><br/>
              <Text>wrong: {item.wrong}</Text>
            </div>
          }
      />          
    </List.Item>
  )

  return (
    data && <>
    { isLoading ? <Spin/> : <>
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
      </> }
    </>
  )
}