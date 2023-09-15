import React, {useState, useEffect} from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';
import Title from './Title/Title'

const { Meta } = Card;

export default function OptionCard({items, title, update, isSingleSelect, useSwitch = true, valueDisabled}) {
    // Select enable/disable - Title switch
    const [isDisabled, setIsDisabled] = useState(false);
    const onTitleSwitchChanged = () => setIsDisabled(!isDisabled)
    const [currentValue, setCurrentValue] = useState([items[0].value])

    useEffect(() => {
        isDisabled ? update(valueDisabled) : update(currentValue)
    }, [isDisabled])
    
    return(
        <>
            <Card title={<Title useSwitch={useSwitch} text={title} onChange={onTitleSwitchChanged}/>} size='small'>
                <Space wrap>
                    <Select
                        mode={isSingleSelect? "default" : "multiple"}
                        disabled={isDisabled}
                        defaultValue={items[0]}
                        style={{ width: '100%', }}
                        onChange={(value) => { 
                           update(value)
                           setCurrentValue(value)
                        }} // Update the value
                        options={items}
                    />
                </Space>        
            </Card>
        </>
    )
}