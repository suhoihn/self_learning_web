import React, {useState} from "react"
import BookmarkedList from '../../Component/List/BookmarkedList'
import BookmarkModal from "../../Component/Modal/BookmarkModal"

export default function Bookmark () {
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<></>);

    const closeBookmarkModal = () => {setIsBookmarkModalOpen(false)};
    
    return (
        <>
        <BookmarkedList onItemClicked={()=>setIsBookmarkModalOpen(true)} setModalContent={setModalContent}/>
        <BookmarkModal open={isBookmarkModalOpen} onClosed={closeBookmarkModal} modalContent = {modalContent}/>
        </>
    )
}