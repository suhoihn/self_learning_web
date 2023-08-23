import React, {useState} from "react"
import ProblemList from '../../Component/List/List'
import BookmarkModal from "../../Component/Modal/BookmarkModal"

export default function Bookmark () {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
        <ProblemList onItemClicked={()=>setIsModalOpen(true)}/>
        <BookmarkModal open={isModalOpen} onClosed={()=>{}}/>
        </>
    )
}