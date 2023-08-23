import React, { useState } from 'react';
import { Modal } from 'antd';

export default function BookmarkModal (open) {
    return (
    <Modal title="Basic Modal" open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    )
}