import React from 'react';
import { Card, Space, Select } from 'antd';

const items = [
    {
        value: '1',
        label: 'Timezone1'
    },
    {
        value: '2',
        label: 'Timezone2'
    },
];


export default function TimezoneCard() {


    return(
        <>
            <Card title="Timezone" size='small'>
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