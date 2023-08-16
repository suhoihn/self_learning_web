import React from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';

const {Text, Title} = Typography

export default function CardTitle({text}){

    return (
        <Row>
            <Col span={12}>
                <Text>{text}</Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                <Switch />
            </Col>
        </Row>
    )
}