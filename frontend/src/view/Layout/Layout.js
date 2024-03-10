import React from "react"

import { Layout, Affix } from "antd"
// import Header from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";

import Sider from './Sider/Sider'
import Header from './Header/Header'

const { Content } = Layout

const color = "#ffffff";

export default function PageLayout ({ children }) {
    return (
        <Layout style = {{ height: "100vh"}}>
            <Sider color={color}/>
            <Layout style = {{ height: "100vh", backgroundColor: "white"}}>
                <Affix> 
                    <Header color={color}/> 
                </Affix>
                <Content> { children } </Content>
            </Layout>
        </Layout>
    )
}