import React, {useState} from 'react'
import { Modal, Button, Steps, Checkbox, message, Row, Col, Tabs, Divider, Image } from 'antd'
import { useSelector, shallowEqual } from 'react-redux'

export default function ProblemModal({open, onClosed, onCleared }) { 

    const { data } = useSelector((state) => {
        let data = state.data
        console.log('data:', data)
        return { data: data ? data : undefined, }
    }, shallowEqual)

    // Data fetched from the backend
    const steps_old = [
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

    let steps = useSelector((state) => {
        let data = state.data;
        data = { data: data ? data : undefined, };

        data = data.data.data; // Strange hierarchy
        console.log("STEP 2: DATA FETCHED");
        console.log("DATA: ", data);

        const returnData = [];
        for(let i = 1; i <= data.length; i++) {
            returnData.push({
                title: "Problem " + i,
                content: <Image src={`data:image/png;base64, ${data[i - 1].question.questionImage.image}`} />
                // content: {
                //     "generalQuestionImage": <Image src={`data:image/png;base64, ${data[i - 1].question.questionImage.image}`} />,
                //     "questionImage": <Image src={`data:image/png;base64, ${data[i - 1].question.subQuestion.subQuestion.image}`} />,
                // }
            })
        }
        console.log("RETURNDATA: ", returnData);
        return returnData;

      }, shallowEqual)

    console.log("STEPS: ", steps);
    if(steps == undefined || steps.length == 0){
        console.log("=== UNDEFINED STEPS ===");
        steps = [{
            title: 'Default problem that prevents crash',
            content: <img src="data:image/jpeg;base64,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" />,
        },];
    }
    
    
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const done = () => {
        message.success('All problems cleared!')
        if(!window.confirm('Check answer?')) return;
        onClosed()
        onCleared()
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
        <div style={{textAlign: 'left'}}>
            <Checkbox>Bookmark</Checkbox>
        </div>
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