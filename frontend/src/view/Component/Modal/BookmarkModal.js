import React, { useState } from 'react';
import { Modal } from 'antd';


export default function BookmarkModal ({open, onClosed, modalContent}) {

    const onModalClosed = () => {onClosed()};
    const onModalOk = () => {onClosed()};

    return (
    <Modal title="Basic Modal" open={open} onCancel = {onModalClosed} onOk = {onModalOk}>
        {/* {console.log(modalContent)} */}
        {modalContent}
        {/* <Image src={`data:image/png;base64, ${modalContent.props.children[1].image}`} /> */}

        {/* {console.log(modalContent)}
        {modalContent} */}

    </Modal>
    )
}