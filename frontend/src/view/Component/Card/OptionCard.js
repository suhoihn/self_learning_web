import React from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';
import Title from './Title/Title'

const { Meta } = Card;

export default function OptionCard({items, title}) {

    return(
        <>
            <Card title={<Title text={title}/>} size='small'>
                <Space wrap>
                    <Select
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