import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Card, Alert, Radio, Typography, List } from 'antd';
import OptionCard from '../Component/Card/OptionCard'
import ProblemModal from '../Component/Modal/ProblemModal';
import AnswerModal from '../Component/Modal/AnswerModal'

import {Actions as dataAction} from '../../store/actions/dataActions'
const { Text, Title } = Typography;


export default function Main () {
  const dispatch = useDispatch();

  // Modal
  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const onProblemModalClosed = ()=> setIsProblemModalOpen(false)

  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const onAnswerModalClosed = ()=> setIsAnswerModalOpen(false)

  const onProblemCleared = () => setIsAnswerModalOpen(true);


  // Question Infos
  const [chapterValue, setChapterValue] = useState([1]);
  const [difficultyValue, setDifficultyValue] = useState([1]);
  const [paperValue, setPaperValue] = useState([1]);
  const [timezoneValue, setTimezoneValue] = useState([1]);


  // Define items to be used on the cards
  const MAX_CHAPTER = 12;
  const chapterItems = [];
  for(let i = 1; i <= MAX_CHAPTER; i++){
      chapterItems.push({
        value: i,
        label: "Chapter " + i,
      })  
  };
  const difficultyItems = [
    {
      value: 1,
      label: "Easy",
    },
    {
      value: 2,
      label: "Normal",
    },
    {
      value: 3,
      label: "Hard",
    }
  ];

  const paperItems = [
    {
      value: 1,
      label: "Paper 1 (Short-ans)",
    },
    {
      value: 2,
      label: "Paper 2 (Long-ans)",
    },
  ];

  const timezoneItems = [
    {
      value: 1,
      label: "Timezone 1",
    },
    {
      value: 2,
      label: "Timezone 2",
    },
    {
      value: 3,
      label: "Timezone 3",
    }
  ];

  // Dispatch the actions when button is pressed
  const onSubmitClicked = () => {
    console.log("STEP 1: DISPATCH CALLED");
    console.log("diff, tz, paper, chpt");
    console.log(difficultyValue, timezoneValue, paperValue, chapterValue);
    
    dispatch(dataAction.getQuestions({
      // FIXME: Only single values inputted
      questionNumber: 5, // How many questions
      questionType: ['singleAns'],
      difficulty: Array.isArray(difficultyValue)? difficultyValue: new Array(difficultyValue),
      timezone: Array.isArray(timezoneValue)? timezoneValue: new Array(timezoneValue),
      paper: Array.isArray(paperValue)? paperValue: new Array(paperValue),
      chapter: Array.isArray(chapterValue)? chapterValue: new Array(chapterValue) 
    }));

    setIsProblemModalOpen(true);
  }
    

  const style={margin: 10}

  return (
    <div>
    <Card title={<Text>Configuration</Text>}>
      <Row span={24}>
        <Col span={12}>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={chapterItems} title={'Chapter'} update={setChapterValue}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={difficultyItems} title={'Difficulty'} update={setDifficultyValue}/>
            </Col>
          </Row>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={paperItems} title={'Paper'} update={setPaperValue}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={timezoneItems} title={'Timezone'} update={setTimezoneValue}/>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row span={24}> 
            <Col span={23} style={style}>
              <Alert message="Instrunction" type="info" showIcon />   
              <br />       
              <Text>- You can customise your search using the categories in the dropdown</Text><br />
              <Text>- If you do not want to filter on a specific category, turn off the switch.</Text><br />
              <Text>- If you are ready, click the "Submit" button</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row span={24}>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button onClick={onSubmitClicked}>Submit</Button>
        </Col>
      </Row>
    </Card>
    <ProblemModal open={isProblemModalOpen} onClosed={onProblemModalClosed} onCleared={onProblemCleared}/>
    <AnswerModal open={isAnswerModalOpen} onClosed={onAnswerModalClosed} />
    </div>    
  )
}


