import React, {useState, useEffect} from "react"
import RecommendList from '../Component/List/RecommendList'
import OptionCard from "../Component/Card/OptionCard"
import { Card, Row, Col, Button, Alert, Typography } from "antd"
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Actions as dataAction } from '../../store/actions/dataActions'
import IndividualQModal from "../Component/Modal/IndividualQModal";
import IndividualAModal from "../Component/Modal/IndividualAModal";
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Recommend () {
  const navigate = useNavigate();
  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Recommended");
  },[]);

  const [wrongCount, setWrongCount] = useState(0);
  const [listContent, setListContent] = useState([]);
  const [problemNumber, setProblemNumber] = useState(1); 

  const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  // In a form of {data, item}, it stores the information about the question
  const [modalContent, setModalContent] = useState({});
  const openAnswerModal = () => {console.log("Open me please!!!!!!!!!!!!!!!!!!!!"); setIsAnswerModalOpen(true)}
  const closeAnswerModal = () => {console.log("Close me"); setIsAnswerModalOpen(false);}
  

  const MAX_PROBLEM = 50;

  const wrongNum = [];
  for(let i = 0; i <= 10; i++) {
    wrongNum.push({ value: i, label: i, })
  }
  const problemNum = [];
  for(let i = 1; i <= MAX_PROBLEM; i++) {
    problemNum.push({ value: i, label: i, })
  }

  const dispatch = useDispatch();

  const { data } = useSelector((state) => {
    let data = state.data;
    return { data: data ? data : undefined, }
  }, shallowEqual)

  const onSubmitClicked = () => {    
    console.log('getQuestion called in ProblemList')
    dispatch(dataAction.getQuestions({
      questionNumber: problemNumber,
      difficulty: [1, 2, 3],
      timezone: [1, 2, 3],
      paper: [1, 2, 3],
      chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
      bookmarked: "false",
      wrong: parseInt(wrongCount[0]),
    }))
  }

  useEffect(() => {
    console.log("Data! which is ", data);
    setListContent(data.data);
  }, [data])

  const style={margin: 10}

    return (
      <>
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
                marginBottom: 80
              }}
            >
              Questions with wrong count higher than the input will be shown.
            </div>
          </Col>
        </Row>
        <Row span={24} justify={'space-around'} align={'center'}
          style={{
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 50
          }}
        >
          <Col span={6} style={style}>
            <OptionCard useSwitch={false} items={problemNum} title={'Problem Number'} update={setProblemNumber} isSingleSelect={true}/>
          </Col>
          <Col span={6} style={style}>
            <OptionCard useSwitch={false} items={wrongNum} title={'Wrongs'} update={setWrongCount} isSingleSelect={true}/>
          </Col>
          <Col 
            span={6} 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button 
              onClick={onSubmitClicked}
              size="large"
            >
              Submit
            </Button>
          </Col>
        </Row>
        
      <Row span={24}>
        <Col span={24}>
          <RecommendList onItemClicked={()=>setIsProblemModalOpen(true)} setModalContent={setModalContent} listContent = {listContent}/>
          <>
            {isProblemModalOpen && <IndividualQModal open={isProblemModalOpen} onClosed={() => {setIsProblemModalOpen(false)}} onCleared={openAnswerModal} definedContent={modalContent}/>}
            {isAnswerModalOpen && <IndividualAModal open={isAnswerModalOpen} onClosede={() => {closeAnswerModal()}} question={modalContent} />}
          </>
        </Col>
      </Row>
    
      </>
    )
}