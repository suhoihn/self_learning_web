import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Space, Row, Layout, Col } from 'antd'

import Menu from './Menu/Menu'
// import logo from '../././'

const { Sider } = Layout
const { Title } = Typography

export default function DefaultSlider({color}) {
    
    const [sideWide, setSiderWide] = useState(false)

    const onCollapse = (collapsed, type) => setSiderWide(collapsed)

    return (
        <Sider
            breakpoint='lg'
            collapsible
            onCollapse={onCollapse}
            width={250}
            style={{backgroundColor: color}}
            >
                <Link to='/'>
                    <Row>
                        <Col>
                            <img 
                                src={"https://media.istockphoto.com/id/470212129/ko/%EB%B2%A1%ED%84%B0/%ED%94%BC%ED%83%80%EA%B3%A0%EB%9D%BC%EC%8A%A4-of-%EC%82%AC%EB%AA%A8%EC%8A%A4-570-bc-after-510-bc.jpg?s=612x612&w=0&k=20&c=n4nzASR_6UAWlIXiN-SJ-YZPoa2l05RmwrkanbOY4ms="}
                                style={{height: 50, width: 'auto', marginLeft: 25, marginRight: 20}}
                            />
                        </Col>
                        <Col style={{ alignSelf: 'center'}}>
                        { !sideWide && <Title level={3} style={{margin: 'auto'}}>IGCSE Math</Title>}
                        </Col>
                    </Row>
                </Link>
                <Menu />
        </Sider>
    )
}