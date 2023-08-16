import React, { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Card, Alert, Radio, Typography, List } from 'antd';
import OptionCard from '../Component/Card/OptionCard'

const { Text, Title } = Typography;


export default function Main () {
  
  // TODO::useSelector, actions, saga, etc 
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
    
  const style={margin: 20}
  return (
    <>
    <Card title={<Text>Configuration</Text>}>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6} style={style}>
              <OptionCard items={items} title={'Chapter'}/>
            </Col>
            <Col span={6} style={style}>
              <OptionCard items={items} title={'Difficulty'}/>
            </Col>
          </Row>
          <Row>
            <Col span={6} style={style}>
              <OptionCard items={items} title={'Paper'}/>
            </Col>
            <Col span={6} style={style}>
              <OptionCard items={items} title={'Timezone'}/>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col span={24} style={style}>
              <Alert message="Instrunction" type="info" showIcon />            
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
    </>    
  )
}


