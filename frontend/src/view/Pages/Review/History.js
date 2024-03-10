import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import IndividualQModal from "../../Component/Modal/IndividualQModal";
import IndividualAModal from "../../Component/Modal/IndividualAModal";
import { Actions as dataAction } from '../../../store/actions/dataActions'
import GeneralDisplayList from "../../Component/List/GeneralDisplayList";
import { useNavigate } from 'react-router-dom';


export default function History () {
    const navigate = useNavigate();
  
    useEffect(() => {
      !localStorage.getItem("authToken") ? navigate("/login") : navigate("/Review/History");
    },[]);

    const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

    // In a form of {data: [], item: {}}, it stores the information about the question
    const [modalContent, setModalContent] = useState({});
    const openAnswerModal = () => {setIsAnswerModalOpen(true)};
    const closeAnswerModal = () => {setIsAnswerModalOpen(false);}
    

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('getQuestion called in HistoryList');
        dispatch(dataAction.getUserDetails({
          username: localStorage.getItem("username")
      }));
    }, [])
    
    return (
        <>
            <GeneralDisplayList onItemClicked={() => {setIsProblemModalOpen(true)}} setModalContent={setModalContent} mode="History"/>
            {isProblemModalOpen && <IndividualQModal open={isProblemModalOpen} onClosed={() => {setIsProblemModalOpen(false)}} onCleared={openAnswerModal} definedContent={modalContent}/>}
            {isAnswerModalOpen && <IndividualAModal open={isAnswerModalOpen} onClosede={() => {closeAnswerModal()}} question={modalContent} />}
        </>
    )
}