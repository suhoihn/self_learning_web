import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import IndividualQModal from "../../Component/Modal/IndividualQModal";
import IndividualAModal from "../../Component/Modal/IndividualAModal";
import { Actions as dataAction } from '../../../store/actions/dataActions'
import GeneralDisplayList from "../../Component/List/GeneralDisplayList";


export default function History () {
    const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

    // In a form of {data: [], item: {}}, it stores the information about the question
    const [modalContent, setModalContent] = useState({});
    const openAnswerModal = () => {console.log("Open me please!!!!!!!!!!!!!!!!!!!!"); setIsAnswerModalOpen(true)}
    const closeAnswerModal = () => {console.log("Close me"); setIsAnswerModalOpen(false);}
    

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('getQuestion called in HistoryList')
        dispatch(dataAction.getQuestions({
          questionNumber: 5,
          difficulty: [1, 2, 3],
          timezone: [1, 2, 3],
          paper: [1, 2, 3],
          chapter: [1,2,3,4,5,6,7,8,9,10,11,12],
          wrong: 1,
        }))
    }, [])
    
    return (
        <>
            <GeneralDisplayList onItemClicked={() => {setIsProblemModalOpen(true)}} setModalContent={setModalContent}/>
            {isProblemModalOpen && <IndividualQModal open={isProblemModalOpen} onClosed={() => {setIsProblemModalOpen(false)}} onCleared={openAnswerModal} definedContent={modalContent}/>}
            {isAnswerModalOpen && <IndividualAModal open={isAnswerModalOpen} onClosede={() => {closeAnswerModal()}} question={modalContent} />}
        </>
    )
}