import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import IndividualQModal from "../../Component/Modal/IndividualQModal";
import IndividualAModal from "../../Component/Modal/IndividualAModal";
import { Actions as dataAction } from '../../../store/actions/dataActions';
import GeneralDisplayList from "../../Component/List/GeneralDisplayList";
import { useNavigate } from 'react-router-dom';


export default function Bookmark () {
    const navigate = useNavigate();
  
    useEffect(() => {
      !localStorage.getItem("authToken")? navigate("/login") : navigate("/Review/Bookmark")
    },[]);
  
    const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

    // In a form of {data, item}, it stores the information about the question
    const [questionData, setQuestionData] = useState({});
    const openAnswerModal = () => {setIsAnswerModalOpen(true);}
    const closeAnswerModal = () => {setIsAnswerModalOpen(false);}
    

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('getQuestion called in Bookmarked Page and this is supposed to happen once!');
        dispatch(dataAction.getQuestions({
            difficulty: [1, 2, 3],
            timezone: [1, 2, 3],
            paper: [1, 2, 3],
            chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
            wrong: -1,
            bookmarked: 'true',
            questionNumber: 100,
        }))
    },[]);
    
    return (
        <div style = {{
            overflow: "scroll",
            height: "calc(100vh - 64px)"
        }}>
            <GeneralDisplayList onItemClicked={() => {setIsProblemModalOpen(true)}} setQuestionData={setQuestionData}/>
            {isProblemModalOpen && <IndividualQModal open={isProblemModalOpen} onClosed={() => {setIsProblemModalOpen(false)}} onCleared={openAnswerModal} definedContent={questionData}/>}
            {isAnswerModalOpen && <IndividualAModal open={isAnswerModalOpen} onClosede={() => {closeAnswerModal()}} question={questionData} />}
        </div>
    )
}