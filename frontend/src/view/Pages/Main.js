import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Card, Alert, Radio, Typography, List } from 'antd';
import OptionCard from '../Component/Card/OptionCard'
import ProblemModal from '../Component/Modal/ProblemModal';
import AnswerModal from '../Component/Modal/AnswerModal'

import {Actions as dataAction} from '../../store/actions/dataActions'
import { useNavigate } from 'react-router-dom';
const { Text, Title } = Typography;


export default function Main () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Main")
  },[]);

  // Modal
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const onProblemModalClosed = () => setIsProblemModalOpen(false);

  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const onAnswerModalClosed = ()=> setIsAnswerModalOpen(false)

  const onProblemCleared = () => setIsAnswerModalOpen(true);

  // Dispatch the actions when button is pressed
  const onSubmitClicked = () => {
    console.log("getQuestions called in Main");
    
    dispatch(dataAction.getQuestions({
      questionNumber: problemNumber, // How many questions
      difficulty: Array.isArray(difficultyValue)? difficultyValue: new Array(difficultyValue),
      timezone: Array.isArray(timezoneValue)? timezoneValue: new Array(timezoneValue),
      paper: Array.isArray(paperValue)? paperValue: new Array(paperValue),
      chapter: Array.isArray(chapterValue)? chapterValue: new Array(chapterValue),
    }));

    setIsProblemModalOpen(true);
  }

  // Question Infos
  const [chapterValue, setChapterValue] = useState([1]);
  const [difficultyValue, setDifficultyValue] = useState([1]);
  const [paperValue, setPaperValue] = useState([1]);
  const [timezoneValue, setTimezoneValue] = useState([1]);
  const [problemNumber, setProblemNumber] = useState(1); 


  // Define items to be used on the cards
  const MAX_CHAPTER = 14;
  const MAX_PROBLEM = 50;
  
  const chapter = [
    {value: 1, label: "1. Functions"},
    {value: 2, label: "2. Quadratic Functions"},
    {value: 3, label: "3. Equations, inequalities and graphs"},
    {value: 4, label: "4. Indices and surds"},
    {value: 5, label: "5. Factors of polynomials"},
    {value: 6, label: "6. Simultaneous equations"},
    {value: 7, label: "7. Logarithmic and exponential functions"},
    {value: 8, label: "8. Straight line graphs"},
    {value: 9, label: "9. Circular measure"},
    {value: 10, label: "10. Trigonometry"},
    {value: 11, label: "11. Permutations and combinations"},
    {value: 12, label: "12. Series"},
    {value: 13, label: "13. Vectors in two dimensions"},
    {value: 14, label: "14. Differentiation and integration"},
  ];

  const problemNum = [];
  for(let i = 1; i <= MAX_PROBLEM; i++) {
    problemNum.push({ value: i, label: i, })
  }
  
  const infos = {
    chapterItems: chapter,
    difficultyItems: [
      { value: 1, label: "Easy", },
      { value: 2, label: "Normal", },
      { value: 3, label: "Hard", }
    ],
    paperItems: [
      { value: 1, label: "Paper 1 (Short-ans)", },
      { value: 2, label: "Paper 2 (Long-ans)", },
    ],
    timezoneItems: [
      { value: 1, label: "Timezone 1", },
      { value: 2, label: "Timezone 2", },
      { value: 3, label: "Timezone 3", }
    ],
    problemNumItems: problemNum
  }

  const style={margin: 10}
  let username = localStorage.getItem("username");
  if(username == undefined){ username = "Undefined User (How did you get here anyway?)"; }

  return (
    <div style = {{ margin: 10 }}>
      <div>
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
                  padding: '5px 50px',
                  fontWeight: 'bold',
                  fontSize: 20,
                  borderRadius: 5,
                  marginBottom: 50
                }}
              >
                Welcome, {username}
              </div>
            </div>
          </Col>
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
                fontSize: 15,
                marginBottom: 80
              }}
            >
              <ol>
                <li>
                  Welcome to IGCSE Math Revision Website!
                </li>
                <li>
                  You can customise your search using the categories in the dropdown.
                </li>
                <li>
                  If you do not want to filter on a specific category, turn off the switch.
                </li>
                <li>
                  If you are ready, click the "Submit" button.
                </li>
                <li>
                  (Note: all questions are from 2020-2022 Syllabus)
                </li>
              </ol>
            </div>
          </Col>
        </Row>  
        <Row span={24} justify={'space-around'}>
          <Col span={6} style={style}>
            <OptionCard items={infos.chapterItems} title={'Chapter'} update={setChapterValue} 
                        valueDisabled={[1,2,3,4,5,6,7,8,9,10,11,12,13,14]} width={350}/>
          </Col>
          <Col span={4} style={style}>
            <OptionCard items={infos.difficultyItems} title={'Difficulty'} update={setDifficultyValue}
                        valueDisabled={[1,2,3]}/>
          </Col>
          <Col span={4} style={style}>
            <OptionCard items={infos.paperItems} title={'Paper'} update={setPaperValue}
                        valueDisabled={[1,2]}/>
          </Col>
          <Col span={4} style={style}>
            <OptionCard items={infos.timezoneItems} title={'Timezone'} update={setTimezoneValue}
                        valueDisabled={[1,2,3]}/>
          </Col>
          <Col span={4} style={style}>
            <OptionCard items={infos.problemNumItems} title={'Problem Number'} update={setProblemNumber} 
                        isSingleSelect={true} useSwitch={false}/>
          </Col>
        </Row>
        <Row span={24} style={{marginTop: 100}}>
          <Col span={24} style={{textAlign: 'center'}}>
            <Button onClick={onSubmitClicked}>Submit</Button>
          </Col>
        </Row>
      </div>
     
    <ProblemModal open={isProblemModalOpen} onClosed={onProblemModalClosed} onCleared={onProblemCleared}/>
    <AnswerModal open={isAnswerModalOpen} onClosed={onAnswerModalClosed} />
    </div>    
  )
}


