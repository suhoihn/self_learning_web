import React, {useState} from "react"
import RecommendList from '../Component/List/RecommendList'
import BookmarkModal from "../Component/Modal/BookmarkModal"
import OptionCard from "../Component/Card/OptionCard"
import { Row, Col, Button, Alert, Typography } from "antd"
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Actions as dataAction } from '../../store/actions/dataActions'

const { Text, Title } = Typography;

export default function Recommend () {
    const [isBookmarkModalOpen, setIsRecommendationModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);
    const [wrongCount, setWrongCount] = useState(0);
    const closeBookmarkModal = () => {setIsRecommendationModalOpen(false)};
    const [listContent, setListContent] = useState([]);

    const infos = [];
    for(let i = 1; i <= 10; i++) {
        infos.push({ value: i, label: i, })
    }

    const dispatch = useDispatch();

    const { data } = useSelector((state) => {
        console.log("STATE", state)
        let data = state.data;
        return { data: data ? data : undefined, }
    }, shallowEqual)

    const onSubmitClicked = () => {    
        console.log('getQuestion called in ProblemList')
        dispatch(dataAction.getQuestions({
            questionNumber: 5,
            questionType: ['unscorable'],
            difficulty: [1, 2, 3],
            timezone: [1, 2, 3],
            paper: [1, 2, 3],
            chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
            //wrong: "false", // need to be true
            bookmarked: "false",
            wrong: "false",
        }))
        console.log("Data! which is ", data);
        setListContent(data.data);

    }

    return (
        <>
            <Row>
                <Col>
                    <OptionCard items={infos} title={'Wrongs'} update={setWrongCount} isSingleSelect={true}/>
                </Col>
                <Col>
                    <Alert message="Instruction" type="info" showIcon />   
                    <br />       
                    <Text>- Questions with wrong count higher than the input will be shown...for now</Text><br />

                </Col>
                
            </Row>

            <Row>
                <Col>
                    <Button onClick={onSubmitClicked}>Submit</Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <RecommendList onItemClicked={()=>setIsRecommendationModalOpen(true)} setModalContent={setModalContent} listContent = {listContent}/>
                    <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
                </Col>
            </Row>
     
        </>
    )
}