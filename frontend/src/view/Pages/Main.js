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
      wrong: 0, 
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
  const MAX_CHAPTER = 12;
  const MAX_PROBLEM = 50;
  
  const chapter = [];
  for(let i = 1; i <= MAX_CHAPTER; i++) {
      chapter.push({ value: i, label: "Chapter " + i, })  
  };

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

  return (
    <div>
    <Card title={<Text>Configuration</Text>}>
      <Row span={24}>
        <Col span={12}>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={infos.chapterItems} title={'Chapter'} update={setChapterValue} 
                          valueDisabled={[1,2,3,4,5,6,7,8,9,10,11,12]}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={infos.difficultyItems} title={'Difficulty'} update={setDifficultyValue}
                          valueDisabled={[1,2,3]}/>
            </Col>
          </Row>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={infos.paperItems} title={'Paper'} update={setPaperValue}
                          valueDisabled={[1,2]}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={infos.timezoneItems} title={'Timezone'} update={setTimezoneValue}
                          valueDisabled={[1,2,3]}/>
            </Col>
          </Row>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={infos.problemNumItems} title={'Problem Number'} update={setProblemNumber} 
                          isSingleSelect={true} useSwitch={false}/>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row span={24}> 
            <Col span={23} style={style}>
              <Alert message="Instruction" type="info" showIcon />   
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


