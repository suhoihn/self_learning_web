import React, {useState} from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';
import Title from './Title/Title'

const { Meta } = Card;

export default function OptionCard({items, title}) {
    // Select enable/disable - Title switch
    const [isDisabled, setIsDisabled] = useState(true)
    const onTitleSwitchChanged = () => setIsDisabled(!isDisabled)

    
    return(
        <>
            <Card title={<Title text={title} onChange={onTitleSwitchChanged}/>} size='small'>
                <Space wrap>
                    <Select
                        disabled={isDisabled}
                        defaultValue="1"
                        style={{
                            width: 120,
                        }}
                        onChange={()=>{}}
                        options={items}
                    />
                </Space>        
            </Card>
        </>
    )
}