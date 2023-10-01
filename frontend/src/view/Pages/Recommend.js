import React, {useState, useEffect} from "react"
import RecommendList from '../Component/List/RecommendList'
import BookmarkModal from "../Component/Modal/BookmarkModal"
import OptionCard from "../Component/Card/OptionCard"
import { Card, Row, Col, Button, Alert, Typography } from "antd"
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Actions as dataAction } from '../../store/actions/dataActions'

const { Text, Title } = Typography;

export default function Recommend () {
  const [isBookmarkModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);
  const [wrongCount, setWrongCount] = useState(0);
  const closeBookmarkModal = () => {setIsRecommendationModalOpen(false)};
  const [listContent, setListContent] = useState([]);
  const [problemNumber, setProblemNumber] = useState(1); 

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
      <Card title={<Text>Configuration</Text>}>
        <Row span={24}>
          <Col span={12}>
            <Row span={24}>
              <Col span={10} style={style}>
                <OptionCard useSwitch={false} items={problemNum} title={'Problem Number'} update={setProblemNumber} isSingleSelect={true}/>
              </Col>
              <Col span={10} style={style}>
                <OptionCard useSwitch={false} items={wrongNum} title={'Wrongs'} update={setWrongCount} isSingleSelect={true}/>
              </Col>
            </Row>  
          </Col>
          <Col span={12}>
            <Alert message="Instruction" type="info" showIcon />   
            <br />       
            <Text>- Questions with wrong count higher than the input will be shown...for now</Text><br />
          </Col>            
        </Row>
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button onClick={onSubmitClicked}>Submit</Button>
          </Col>
        </Row>
      </Card>
      <Row span={24}>
        <Col span={24}>
          <RecommendList onItemClicked={()=>setIsRecommendationModalOpen(true)} setModalContent={setModalContent} listContent = {listContent}/>
          <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </Col>
      </Row>
    
      </>
    )
}