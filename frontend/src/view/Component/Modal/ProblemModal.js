import React, {useState} from 'react'
import { Modal, Button, Steps, theme, message, Row, Col, Tabs, Divider } from 'antd'
import { useSelector } from 'react-redux'

export default function ProblemModal({open, onClosed}) { 

    // steps(data fetched by useSelector >>> steps
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

    // tabs
    const tabsItems = items.map((_, i) => {
        const id = String(i+1);
        // setCurrent(i)
        return {
            label: 'Problem' + id,
            key: id
        }
    })
    
    // Modal
    const onModalClosed = ()=> { onClosed() }

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
                            <Tabs size='small' defaultActiveKey="1" tabPosition={'left'} style={{ height: '100%'}}
                                items={tabsItems}
                            />
                        </Col>
                        <Col>      
                            {steps[current].content}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}