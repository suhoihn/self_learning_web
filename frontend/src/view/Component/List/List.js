import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Avatar, List, Space } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

export default function ProblemList ({onItemClicked, setModalContent}) {
    const dispatch = useDispatch();
    const getContents = () => {
      dispatch(dataAction.getQuestions({
        questionNumber: 5,
        questionType: ['singleAns'],
        difficulty: [1, 2],
        timezone: [1, 2, 3],
        paper: [1, 2, 3],
        chapter: [2, 7]
      }))
    }
    //const data2 = useSelector((state) => state.data);
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
        <List itemLayout="vertical" size="large" dataSource={data}
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
                      setModalContent(<>
                        <p>Question {item.questionId}</p>
                        
                        {item.question.questionImage}
                      </>)
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
                          "Question Type: " + item.question.questionType + "\n" + 
                          "Chapters: " + item.chapter + "\n" + 
                          "Difficulty: " + item.difficulty + "\n" + 
                          "Paper " + item.paper + " timezone " + item.timezone
                        }
                    />
                      
                        
                    </List.Item>
                )}
        />
    )
}