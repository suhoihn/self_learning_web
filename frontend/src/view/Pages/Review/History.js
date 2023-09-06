import React, {useState} from "react"
import HistoryList from '../../Component/List/HistoryList'
import BookmarkModal from "../../Component/Modal/BookmarkModal"

export default function Bookmark () {
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const closeBookmarkModal = () => {setIsBookmarkModalOpen(false)};
    
    return (
        <>
        <b>This is history page</b>
        <HistoryList onItemClicked={()=>setIsBookmarkModalOpen(true)} setModalContent={setModalContent}/>
        <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </>
    )
}