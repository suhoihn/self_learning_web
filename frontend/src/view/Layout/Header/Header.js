import React from "react"
import { Row, Col, Layout, Button } from "antd"
import BreadCrumb from "./BreadCrumb"

const { Header } = Layout

export default function defaultHeader ({ color }) {
    return (
        <Header style={{backgroundColor: color}}>
            <Row gutter={{xs: 8, sm: 16}}>
                <Col xs={12} sm={12} md={12}>
                <BreadCrumb />
                </Col>
                <Col xs={12} sm={12} md={12} style={{textAlign:"right"}}>
                <Button />
                </Col>
            </Row>
        </Header>
    )
}