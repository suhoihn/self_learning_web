import React from 'react';
import { Card, Space, Select } from 'antd';

const items = [
    {
        value: '1',
        label: 'Difficulty1'
    },
    {
        value: '2',
        label: 'Difficulty2'
    },
];


export default function DifficultyCard() {


    return(
        <>
            <Card title="Difficulty" size='small'>
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