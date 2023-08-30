import React, {useState} from "react"
import ProblemList from '../../Component/List/ProblemList'
import BookmarkModal from "../../Component/Modal/BookmarkModal"

export default function Bookmark () {
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const closeBookmarkModal = () => {setIsBookmarkModalOpen(false)};
    
    return (
        <>
        <ProblemList onItemClicked={()=>setIsBookmarkModalOpen(true)} setModalContent={setModalContent}/>
        <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </>
    )
}