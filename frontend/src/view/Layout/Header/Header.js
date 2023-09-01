import React from "react"
import { useDispatch } from 'react-redux'
import { Row, Col, Layout, Button } from "antd"
import BreadCrumb from "./BreadCrumb"
import { Actions as dataAction } from '../../../store/actions/dataActions'
const { Header } = Layout

export default function DefaultHeader ({ color }) {
    const dispatch = useDispatch();

    const onReloadButtonClicked = () => {
        dispatch(dataAction.getReloadDB({}))
    }
    
    return (
        <Header style={{backgroundColor: color}}>
            <Row gutter={{xs: 8, sm: 16}}>
                <Col xs={12} sm={12} md={12}>
                    <BreadCrumb />
                </Col>
                <Col xs={12} sm={12} md={12} style={{textAlign:"right"}}>
                    <Button onClick={onReloadButtonClicked}>Reload Data</Button>
                </Col>
            </Row>
        </Header>
    )
}