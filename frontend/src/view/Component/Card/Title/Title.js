import React, { useState } from 'react';
import { Row, Col, Card, Switch, Space, Select, Typography } from 'antd';

const {Text, Title} = Typography

export default function CardTitle({text, onChange, useSwitch}){

    return (
        <Row>
            <Col span={12}>
                <Text>{text}</Text>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                {useSwitch && <Switch defaultChecked = {true} onChange={onChange}/>}
            </Col>
        </Row>
    )
}