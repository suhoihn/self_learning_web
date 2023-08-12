import React, {useState} from 'react'
import {Menu} from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { HomeOutlined, FormOutlined, UnorderedListOutlined, LikeOutlined, BookOutlined, HistoryOutlined } from '@ant-design/icons'

const getItem = (url, label, icon, children) => {
    return {
        key: url,
        icon,
        children,
        label
    }
}

const items = [
    getItem('/Main', 'Main', <HomeOutlined/>),
    getItem('/Review', 'Review', <FormOutlined/>, [
        getItem("/Review/Bookmark","Bookmark", <BookOutlined />),
        getItem("/Review/History","History", <HistoryOutlined />),
    ]),
    getItem('/Reference', 'Reference', <UnorderedListOutlined />),
    getItem('/Recommended', 'Recommended', <LikeOutlined />)
]

export default function SiderMenu () {
    const navigate = useNavigate()
    const Location = useLocation();
    console.log(Location)
    let pathSnippets = Location.pathname.split('/')
    // pathSnippets = pathSnippets.filter((i) => i)
    console.log(pathSnippets)
    const handleMenuClick = (e) => {
        console.log('key :', e.key)
        switch(e.key) {
            case '/Main':
                navigate('/')
                break
            // case '/Review':
            //     navigate('/Review')
            //     break
            case '/Reference':
                navigate('/Reference')
                break
            case '/Recommended':
                navigate('/Recommended')
                break
            case "/Review/Bookmark":
                navigate('/Review/Bookmark');
                break;
            case "/Review/History":
                navigate("/Review/History");
                break;
            default:
                navigate(e.key);
                break;
    
        }
    }

    return (
        <Menu
            defaultSelectedKeys={'/Main'}
            selectedKeys = {Location.pathname}
            mode={'inline'}
            items={items}
            onClick={handleMenuClick}
        />
    )
}