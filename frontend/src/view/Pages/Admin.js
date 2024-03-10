import React, { useState, useEffect } from "react";
import { Avatar, Typography, Row, Col, List, Button, Select, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { Actions as dataAction } from '../../store/actions/dataActions';
import AdminModal from "../Component/Modal/AdminModal";
import ImageUploading from 'react-images-uploading';

const { Text } = Typography;

export default function Admin () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [existingContent, setExistingContent] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "modify"

  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Admin");
    localStorage.getItem("userEmail") !== "Ihnsuho0819@gmail.com" ? navigate("/Main") : navigate("/Admin");
  },[]);


  // Dispatch the actions when button is pressed
  useEffect(() => {
    console.log("get all questions");
  
    dispatch(dataAction.getQuestions({
      questionNumber: 99999,
      difficulty: [1,2,3],
      timezone: [1,2,3],
      paper: [1,2],
      chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
      wrong: 0
    }));
    

  },[]);

  let { data } = useSelector((state) => {
    let data = state.data.data;
    let newData = [];
    for(let item of data){
      var newItem = item;
      newItem.display = true;
      newData.push(newItem);
    }

    console.log("huh?", newData);
    return { data: newData };
  }, shallowEqual);

  const modifyQuestion = (item) => {
    console.log("Welcome!", item);
    setModalMode("modify");

    dispatch(dataAction.getRefAnswer({
      answerId: item.questionId,
      specificAnswerId: item.question.subQuestion[0].specificQuestionId
    }));

    setExistingContent(item);
    setIsOpen(true);
  }

  const removeQuestion = (item) => {
    dispatch(dataAction.getRemoveQuestion({
      questionId: item.questionId,
      specificQuestionId: item.question.subQuestion[0].specificQuestionId,
    }))
    item.display = false;    
  };


    /*<div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // Building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>*/
            
  return (
    <>
      <AdminModal open={isOpen} onClosed={() => {setIsOpen(false);}} existingContent={existingContent} mode={modalMode}/>
      <Row span={24}>
        <Col span={24}>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            <div
              style={{
                backgroundColor: '#d0e2f3',
                padding: '5px 50px',
                fontWeight: 'bold',
                fontSize: 20,
                borderRadius: 5,
                marginBottom: 50
              }}
            >
              Instruction
            </div>
          </div>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20,
              marginBottom: 20
            }}
          >
            To add a question, click this button.
          </div>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20,
              marginBottom: 80
            }}
          >
            <Button onClick={() => {setExistingContent(undefined); setModalMode("add"); setIsOpen(true)}}> Add Question</Button>
          </div>
        </Col>
      </Row>


      
      <List
      dataSource={data}
      renderItem={item => (
        item.display ?
          <List.Item>
              <Image src={`data:image/png;base64, ${item.question.questionImage.image}`}/><br/>
              <Text>Question Type: {item.question.questionType}</Text><br/>
              <Text>Chapters: {item.chapter.join(", ")}</Text><br/>
              <Text>Difficulty: {item.difficulty}</Text><br/>
              <Text>Paper: {item.paper}</Text><br/>
              <Text>timezone: {item.timezone}</Text><br/>

              <Button onClick={() => {modifyQuestion(item);}}> Modify </Button>
              <Button onClick={() => {removeQuestion(item);}}> Remove </Button>
              
          </List.Item>: <></>
      )}
    />
    </>
    );
};
