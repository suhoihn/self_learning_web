import React, { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Card, Space, Radio, Typography, List } from 'antd';
import ChapterCard from '../Component/OptionCard/Chapter'
import DifficultyCard from '../Component/OptionCard/Difficulty'
import PaperCard from '../Component/OptionCard/Paper'
import TimezoneCard from '../Component/OptionCard/Timezone'

const { Title } = Typography;


export default function Main () {
    
    return (
      <>
      <Card title={<Title>Configuration</Title>}>
        <Row gutter={16}>
          <Col span={6}>
            <ChapterCard/>
          </Col>
          <Col span={6}>
            <DifficultyCard/>
          </Col>
          <Col span={6}>
            <TimezoneCard/>
          </Col>
          <Col span={6}>
            <PaperCard/>
          </Col>
        </Row>
      </Card>
      </>    
    )
}


