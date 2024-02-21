import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spin, Button, Input, List, Space, Typography, Image, Checkbox } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

const { Text } = Typography
/*
    DECPRECATED: WILL BE REPLACED WITH GENERALDISPLAYLIST
*/
export default function RecommendedList({onItemClicked, setModalContent, listContent}) {
  const dispatch = useDispatch();

  let { data } = useSelector((state) => {
    let data = state.data;
    let isLoading = state.data.isLoading

    return { 
      data: data ? data : undefined, 
      isLoading: isLoading
    }
  }, shallowEqual)

  const { answerData } = useSelector((state) => {
    let data = state.data.refAnswer;

    return data;
  }, shallowEqual)
      
  const onSubmitClicked = (item) => {
    console.log(item.questionId, item.question.subQuestion)
    dispatch(dataAction.getRefAnswer({
      answerID: item.questionId,
      specificAnswerID: item.question.subQuestion[0].specificQuestionId
    }))
  }

  const callAnswer = (item) => {
    console.log("Get Ref Answer called in recommended list");
    dispatch(dataAction.getRefAnswer({
      answerId: item.questionId ? item.questionId: undefined,
      specificAnswerId: item.question.subQuestion[0].specificQuestionId ?
      item.question.subQuestion[0].specificQuestionId : undefined
    }))
  }

  const openQuestion = (item) => {
    callAnswer(item);

    setModalContent({
      data: [item],
      item: item,
    }); 
  }
  
  const toggleBookmark = (checkState, item) => {
    console.log("Change?! It's changing to", checkState);
    
    // this action should not change loadingData because rerendered
    dispatch(dataAction.getSaveQuestion({
      questionId: item.questionId,
      bookmarked: checkState,
    }));
  }       



  const onRenderListItem = (item) => (
    <List.Item
      key={item.title}
      // onClick={() => {
        // setModalContent(
        //   <>
        //     <p>Question {item.questionId}</p>
        //     <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />
        //     <Image src={`data:image/png;base64, ${item.question.subQuestion[0].subQuestionImage.image}`} />
        //     {console.log("Answer Data: ", answerData)}

        //     { answerData && answerData[0].answerSubscripts.map((answerSubscript) => (
        //       <Space>    
        //         <Space.Compact style={{ width: '100%',}}>
        //           <Text>{answerSubscript}</Text>
        //           <Input placeholder="Write your answer here." onChange={onInputChange}/>
        //           <Button type="primary" onClick={onSubmitClicked(item)}>Submit</Button>
        //         </Space.Compact>
        //       </Space>
        //     ))}

        //   </>
        // );
      // }}
      actions={
        [// This is added to prevent sim. click of button & list item
        <Button onClick={() => openQuestion(item)}>Start this question</Button>,
        <Checkbox defaultChecked={true} onChange={(e) => {toggleBookmark(e.target.checked, item)}}>Bookmarked</Checkbox>,
        ]
      }
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
    // Updated when button is pressed
    data && <>
      <List itemLayout="vertical" size="large" dataSource={listContent}
              renderItem={onRenderListItem}
      />
      </>
  )
}