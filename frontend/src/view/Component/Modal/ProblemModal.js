import React, {useState} from 'react'
import { Modal, Button, Steps, theme, message } from 'antd'
import { useSelector } from 'react-redux'

export default function ProblemModal({open, onClosed}) { 

    const onModalClosed = ()=> { onClosed() }
    
    // (data fetched by useSelector >>> steps
    const steps = [
        {
            title: 'Problem1',
            content: <Button >1</Button>,
        },
        {
            title: 'Problem2',
            content: <Button >2</Button>,
        },
        {
            title: 'Problem3',
            content:<Button >3</Button>,
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const footer = 
        <div style={{ marginTop: 24, }}>
            {current > 0 && (
                <Button
                    style={{margin: '0 8px',}}
                    onClick={() => prev()}
                >
                    Previous
                </Button>
            )}
            {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            )}
            {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
            )}
        </div>

    return (
        <Modal title="Basic Modal" open={open} onCancel={onModalClosed}
                footer={footer}>
            <Steps size="small" current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
        </Modal>
    )
}