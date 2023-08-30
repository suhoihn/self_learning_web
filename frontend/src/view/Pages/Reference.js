import React from 'react';
import { Avatar, List } from 'antd';
const data = [
  {
    title: 'Chapter 1: Equations',
  },
  {
    title: 'Chapter 2: Functions',
  },
  {
    title: 'Chapter 3: Trigonometry',
  },
  {
    title: 'Chapter 4: Integration',
  },
];

export default function Reference () {
  return (
    <>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="temp desc."
                    />
                </List.Item>
            )}
        />
    </>
    );
};