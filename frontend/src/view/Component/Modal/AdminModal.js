import React, { useEffect, useState } from 'react';
import { Typography, Spin, Modal, Button, message, Row, Col, Divider, Image, Select, Input, Slider } from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import ImageUploading from 'react-images-uploading';
import { Actions as dataAction } from '../../../store/actions/dataActions';


const { Text } = Typography;

const MAXINPUT = 10;

export default function AnswerModal({ open, onClosed, existingContent, mode }) { 
  const dispatch = useDispatch();

  const chaptersList = [
    {value: 1, label: "Chapter 1: Functions"},
    {value: 2, label: "Chapter 2: Quadratic Functions"},
    {value: 3, label: "Chapter 3: Equations, inequalities and graphs"},
    {value: 4, label: "Chapter 4: Indices and surds"},
    {value: 5, label: "Chapter 5: Factors of polynomials"},
    {value: 6, label: "Chapter 6: Simultaneous equations"},
    {value: 7, label: "Chapter 7: Logarithmic and exponential functions"},
    {value: 8, label: "Chapter 8: Straight line graphs"},
    {value: 9, label: "Chapter 9: Circular measure"},
    {value: 10, label: "Chapter 10: Trigonometry"},
    {value: 11, label: "Chapter 11: Permutations and combinations"},
    {value: 12, label: "Chapter 12: Series"},
    {value: 13, label: "Chapter 13: Vectors in two dimensions"},
    {value: 14, label: "Chapter 14: Differentiation and integration"},
  ];  
  const difficultyList = [
    {value: 0, label: "Easy"}, 
    {value: 1, label: "Normal"},
    {value: 2, label: "Hard"}];

  const paperList = [
    { value: 1, label: "Paper 1 (Short-ans)", },
    { value: 2, label: "Paper 2 (Long-ans)", },
  ];

  const timezoneList = [
    { value: 1, label: "Timezone 1", },
    { value: 2, label: "Timezone 2", },
    { value: 3, label: "Timezone 3", }
  ];

  const questionTypeList = [
    { value: "multiAns", label: "Multiple Answers", },
    { value: "singleAns", label: "Single Answer", },
    { value: "userMultiAns", label: "User Multiple Answers", },
    //{ value: "range", label: "Range"},
    { value: "unscorable", label: "Unscorable"}
  ];
  console.log(existingContent);


  const [chapter123, setChapter123] = useState([]);
  const [difficulty123, setDifficulty123] = useState(1);
  const [paper123, setPaper123] = useState(1);
  const [timezone123, setTimezone123] = useState(1);
  const [questionType123, setQuestionType123] = useState("singleAns");
  const [sQid, setSQid] = useState(""); 
  const [instruction, setInstruction] = useState("");
  const [numAns, setNumAns] = useState(1); 

  const [qImg, setQImg] = useState("");
  const [aImg, setAImg] = useState("");

  useEffect(() => {
    console.log("I am open! I am free!");
    setChapter123(existingContent === undefined ? []: existingContent.chapter);
    setDifficulty123(existingContent === undefined ? 1: existingContent.difficulty);
    setPaper123(existingContent === undefined ? 1: existingContent.paper);
    setTimezone123(existingContent === undefined ? 1: existingContent.timezone);
    setQuestionType123(existingContent === undefined ? "singleAns": existingContent.question.questionType);
    setSQid(existingContent === undefined ? "": existingContent.question.subQuestion[0].specificQuestionId);
    setInstruction(existingContent === undefined ? "": existingContent.instruction);
    setNumAns(existingContent === undefined ? 1: existingContent.question.subQuestion[0].numAns);

    setQImg(existingContent === undefined ? 1: existingContent.question.questionImage.image);

  },[open, existingContent]);

  const [textArray, setTextArray] = useState(Array(MAXINPUT).fill('')); // Creates an array of empty strings
  const [answerArray, setAnswerArray] = useState(Array(MAXINPUT).fill('')); // Creates an array of empty strings
  
  
  const answerData = useSelector((state) => {
    const data = state.data.refAnswer[0];
    console.log("yuhu!", data);


    return data; // The answer unique to the single question
  }, shallowEqual);

  useEffect(() => {
    if(answerData !== undefined){
      console.log(answerData)
      setAImg(answerData.answer.answerImage.image);
      setTextArray([...answerData.answer.answerSubscripts.slice(0,numAns),...textArray.slice(numAns)]);
      setAnswerArray([...answerData.answer.answerValues.slice(0,numAns),...answerArray.slice(numAns)]);

    }
  }, [answerData]);



  


  const onInputChange_AS = (e, index) => {
    const newValues = [...textArray];
    newValues[index] = e.target.value;
    setTextArray(newValues);
  };

  const onInputChange_A = (e, index) => {
    const newValues = [...answerArray];
    newValues[index] = e.target.value;
    setAnswerArray(newValues);
  };


  const submitQuestionInfo = () => {
    console.log(mode)
    const data = {
      uploadType: mode, // add or modify
      questionId: mode == "modify" ? existingContent.questionId : undefined,
      specificQuestionId: sQid === "" ? "None" : sQid,

      chapter: chapter123,
      difficulty: difficulty123,
      paper: paper123,
      timezone: timezone123,
      

      // Sub question
      questionType: questionType123, //"singleAns",
      subQuestionImage: "", // This does not exist! (For simplicity)
      numAns: numAns,
      unit: "cm", // This doesn't matter right now
      marks: 3, // this is actually insignficant here
      instruction: instruction,
      answerSubscripts: textArray,

      answerValue: answerArray,      
    };

    const ultimateFormData = new FormData();
    if(mode == "add"){
      ultimateFormData.append('files', questionImages);
      ultimateFormData.append('files', answerImages);
    }
    ultimateFormData.append("info",JSON.stringify(data));
    
    console.log(questionImages, answerImages)
    if(mode == "add" && (questionImages.length === 0 || answerImages.length === 0)){
      message.error('Images are missing');
      return;
    }

    if(chapter123.length === 0){
      message.error("Chapters are missing");
      return;
    }


    dispatch(dataAction.getUpdateQuestion(
      ultimateFormData
    ));

    if(mode == "add"){
      message.success('Successfully added the question')
    }
    else if(mode == "modify"){
      message.success('Successfully modified the question')

    }
  }


  const footer = 
    <div style={{ marginTop: 24, display: 'flex'}}>
      <div style={{width: '100%', textAlign:'right'}}>
        {(
          <Button type="primary" onClick={submitQuestionInfo}>
              Save
          </Button>
        )}
      </div>
    </div>

  function Selection({t, l, setFunc, dv, mode="default"}){
    
    return (<>
      <Text>{t}</Text>
      <Select
        mode={mode}
        defaultValue={dv}
        style={{ width: 400, }}
        onChange={(value) => { 
          setFunc(value);
          console.log(l);
        }}
        options={l}
      />
      <br/>
    </>)
  }

  const [questionImages, setQuestionImages] = useState([]);
  const [answerImages, setAnswerImages] = useState([]);

  return (
    <Modal title={(mode==="modify") ? "Modify this question" : "Add a new question"} open={open} onCancel={onClosed}
            width={1000} footer={footer}>
        <Row span={24}>
          <Col span={24}>
            
            {mode === "add" ? <>
              <label>Question Image: </label>
              <input type="file" onChange={(e) => setQuestionImages(e.target.files[0])}/>

              <label>Answer Image: </label>
              <input type="file" onChange={(e) => setAnswerImages(e.target.files[0])}/>
              </> : <>
              <br/>
              <b>Due to implementation limitations, you cannot modify the images of the questions in the database.</b>
              <br/>
              <b>Quesiton Image: </b>
              <Image src={`data:image/png;base64, ${qImg}`}/><br/>

              <b>Answer Image: </b>
              <Image src={`data:image/png;base64, ${aImg}`}/><br/>

              </>
            }
            <br/>
            <Selection t={"Chapter: "} l={chaptersList} setFunc={setChapter123} dv={chapter123} mode={"multiple"}/>
            <Selection t={"Difficulty: "} l={difficultyList} setFunc={setDifficulty123} dv={difficulty123}/>
            <Selection t={"Paper: "} l={paperList} setFunc={setPaper123} dv={paper123}/>
            <Selection t={"Timezone: "} l={timezoneList} setFunc={setTimezone123} dv={timezone123}/>
            <Selection t={"Question Type: "} l={questionTypeList} setFunc={setQuestionType123} dv={questionType123}/>
            
            <Text>Instruction: </Text>
            <Input value={instruction} placeholder="Instruction needed to solve this question" onChange={(e) => {setInstruction(e.target.value)}}/>

            <Text>Specific Question Id (Question number on the image like 1a, 2): </Text>
            <Input value={sQid} placeholder="Specific Question Id of the question (e.g. 1a, 2)" onChange={(e) => {setSQid(e.target.value)}}/>
            <br/>
            
            {questionType123 === "unscorable" ? <></> : <>
              {questionType123 === "singleAns" ? <></> : <>
                <Text>Number of answers: </Text>
                <Slider min = {1} max = {MAXINPUT} defaultValue={numAns} onChange = {setNumAns}/>
                <br/>
                </>}


              {[...Array(numAns)].map((_, idx) => (
                  <>
                    <Text>Answer details for answer {idx + 1}</Text>
                    <br/>
                    <Col span={20}>
                      <Input key={idx} value={textArray[idx]} placeholder="Write your answer subscript here." onChange={(e) => {onInputChange_AS(e,idx)}}/>
                      <Input key={idx} value={answerArray[idx]} placeholder="Write your answer here." onChange={(e) => {onInputChange_A(e,idx)}}/>
                    </Col>
                    <br/>
                  </>
                ))}

              </>}

            
          </Col>
        </Row>
        <Divider/>
    </Modal>
  )
}