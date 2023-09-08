import React, {useState} from "react"
import RecommendList from '../Component/List/RecommendList'
import BookmarkModal from "../Component/Modal/BookmarkModal"

export default function Recommend () {
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const closeBookmarkModal = () => {setIsBookmarkModalOpen(false)};
    
    return (
        <>
            <b>This is recommendation page</b>
            <RecommendList onItemClicked={()=>setIsBookmarkModalOpen(true)} setModalContent={setModalContent}/>
            <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </>
    )
}