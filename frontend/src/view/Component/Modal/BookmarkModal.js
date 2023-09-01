import React, { useState } from 'react';
import { Modal } from 'antd';


export default function BookmarkModal ({open, onClosed, modalContent}) {

    const onModalClosed = () => {onClosed()};
    const onModalOk = () => {onClosed()};

    return (
    <Modal title="Basic Modal" open={open} onCancel = {onModalClosed} onOk = {onModalOk}>
        {/* {console.log(modalContent)} */}
        {modalContent}
    </Modal>
    )
}