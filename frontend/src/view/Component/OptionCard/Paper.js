import React from 'react';
import { Card, Space, Select } from 'antd';

const items = [
    {
        value: '1',
        label: 'Paper1'
    },
    {
        value: '2',
        label: 'Paper2'
    },
];


export default function PaperCard() {


    return(
        <>
            <Card title="Paper" size='small'>
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