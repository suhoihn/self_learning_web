import React, {useState} from 'react'
import { Modal, Button, Steps, Row, Col, Tabs, Divider } from 'antd'
import { useSelector } from 'react-redux'

export default function AnswerModal({open, onClosed, onCleared }) { 

    // steps(data fetched by useSelector >>> steps
    const steps = [
        {
            title: 'Problem1',
            content: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR11dbvjijhPrRPlnz-gmIREmQi67ShE2lD7_KcjB-IrQ&s" />,
        },
        {
            title: 'Problem2',
            content: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkAhUWjX_UAilxfjJYwG0w1oLbpwmGkRFXthwaxLv_Q&s" />,
        },
        {
            title: 'Problem3',
            content: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXErzBS7diUM2lu4rTnNbst2v_eFbbgAyiYTx7k3MFA&s" />,
        },
    ];
    
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const done = () => {
        onClosed()
    }
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    // tabs
    const tabsItems = steps.map((_, i) => {
        const id = String(i + 1);
        return {
            label: 'Problem' + id,
            key: i,
        }
    })
    
    const onTabsChanged = (key) => setCurrent(key)

    // Modal
    const onModalClosed = ()=> { onClosed() }

    const footer = 
    <div style={{ marginTop: 24, display: 'flex'}}>
        <div style={{width: '100%', textAlign:'right'}}>
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
            <Button type="primary" onClick={done}>
                Done
            </Button>
        )}
        </div>
    </div>

    return (
        <Modal title="Answers" open={open} onCancel={onModalClosed}
                footer={footer}>
            <Row span={24}>
                <Col span={24}>
                    <Row span={24}>
                        <Col span={24}>
                            <Steps size="small" current={current} items={items}/>     
                        </Col>
                    </Row>
                    <Divider/>
                    <Row span={24}>
                        <Col>
                            <Tabs size='small' tabPosition={'left'} style={{ height: '100%'}}
                                items={tabsItems} activeKey={current} onChange={onTabsChanged}
                            />
                        </Col>
                        <Col>      
                            {steps[current].content}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider/>
        </Modal>
    )
}