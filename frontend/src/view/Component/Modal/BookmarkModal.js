import React, { useState } from 'react';
import { Modal } from 'antd';


export default function BookmarkModal ({open, onClosed, modalContent}) {

    const onModalClosed = () => {onClosed()};
    const onModalOk = () => {onClosed()};

    return (
    <Modal title="Problems" open={open} onCancel = {onModalClosed} onOk = {onModalOk}>
        {modalContent}
    </Modal>
    )
}