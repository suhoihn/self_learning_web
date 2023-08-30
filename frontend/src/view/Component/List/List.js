import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Button, Avatar, List, Space, Typography, Image } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

const { Text } = Typography

export default function ProblemList ({onItemClicked, setModalContent}) {
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(dataAction.getQuestions({
        questionNumber: 5,
        questionType: ['singleAns'],
        difficulty: [1, 2],
        timezone: [1, 2, 3],
        paper: [1, 2, 3],
        chapter: [2, 7]
      }))
    }, [])


    const { data_ } = useSelector((state) => {
      let data = state.data
      console.log('data:', data)
      return { 
          data_: data ? data : undefined, 
        }
    }, shallowEqual)
    //console.log(data2);

    const data = Array.from({
        length: 23,
      }).map((_, i) => ({
        questionId: 0,
        question: {
          questionType: "singleAns",

          questionImage: <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KRhmiZkQ4peCGROLwxVaadDUwgUdr6NGTQ&usqp=CAU"/>,
          subQuestion: [{
              subQuestionImage: <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KRhmiZkQ4peCGROLwxVaadDUwgUdr6NGTQ&usqp=CAU"/>,
              specificQuestionId: "3a",
              numAns: 1,
              unit: 'None',
              marks: '2',
              instruction: "Hello",
              answerSubscripts: "x",
          }],
        },
        chapter: [1],
        difficulty: "0", // easy, medium, hard
        paper: "1",
        timezone: "1",
    
        // undetermined
        // season: {type: String} ,// W or S,
        // year: {type: Number},


        // id: i,
        // title: `Question ${i}`,
        // description:
        //   'S22 Paper 1 Q3', // S22 Paper 1 Q3
        // content:
        //   'What chapter? Difficulty?',
        // questionImage:
        // <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0KRhmiZkQ4peCGROLwxVaadDUwgUdr6NGTQ&usqp=CAU"/>
      }));
      const IconText = ({ icon, text }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

    // const onSubmitClicked = () => {
    //   dispatch(dataAction.getQuestions({
    //     //TODO::
    //     questionNumber: 5,
    //     questionType: ['singleAns'],
    //     difficulty: [1, 2],
    //     timezone: [1, 2, 3],
    //     paper: [1, 2, 3],
    //     chapter: [2, 7]
    //   }))
    //   setIsProblemModalOpen(true)
    // }
        
    
    return (
      data_ && <>
        <List itemLayout="vertical" size="large" dataSource={data_.data}
                pagination={{
                onChange: (page) => { console.log(page); },
                pageSize: 3,
                }}
                
                footer={
                <div>
                    <b>ant design</b> footer part
                </div>
                }
                renderItem={(item) => (
                <List.Item
                    key={item.title}
                    onClick={() => {
                      console.log("Item set");
                      console.log(item)
                      setModalContent(<>
                        <p>Question {item.questionId}</p>
                        <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />
                      </>);

                      onItemClicked()
                      //console.log("item ", item.id, "clicked")
                    }}
                    actions={[
                    // submit icon
                    <IconText icon={StarOutlined} text="for something" key="list-vertical-star-o" />,
                    
                    ]}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
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
                            <Text>timezone: {item.timezone}</Text>
                          </div>
                        }
                    />
                      
                        
                    </List.Item>
                )}
        />
        </>
    )
}