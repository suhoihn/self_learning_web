import React from 'react';
import { Card, Space, Select, Typography } from 'antd';

const {Text, Title} = Typography

const items = [
    {
        value: '1',
        label: 'Chapter1'
    },
    {
        value: '2',
        label: 'Chapter2'
    },
];

const { Meta } = Card;

export default function ChapterCard() {


    return(
        <>
            <Card title={<div></div>} size='small'>
            
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