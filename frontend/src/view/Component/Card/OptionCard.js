import React, {useState} from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';
import Title from './Title/Title'

const { Meta } = Card;

export default function OptionCard({items, title, update, isSingleSelect}) {
    // Select enable/disable - Title switch
    const [isDisabled, setIsDisabled] = useState(false);
    const onTitleSwitchChanged = () => setIsDisabled(!isDisabled)

    
    return(
        <>
            <Card title={<Title text={title} onChange={onTitleSwitchChanged}/>} size='small'>
                <Space wrap>
                    <Select
                        mode={isSingleSelect? "default" : "multiple"}
                        disabled={isDisabled}
                        defaultValue={items[0]}
                        style={{ width: 250, }}
                        onChange={(value) => update(value)} // Update the value
                        options={items}
                    />
                </Space>        
            </Card>
        </>
    )
}