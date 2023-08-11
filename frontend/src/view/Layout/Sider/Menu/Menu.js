import React, {useState} from 'react'
import {Menu} from 'antd'
import { useNavigate } from 'react-router-dom'

import { HomeOutlined, FormOutlined } from '@ant-design/icons'

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
    getItem('/Review', 'Review', <FormOutlined/>),
    getItem('/Reference', 'Reference', <FormOutlined/>),
    getItem('/Recommended', 'Recommended', <FormOutlined/>)
]

export default function SiderMenu () {
    const navigate = useNavigate()


    const handleMenuClick = (e) => {
        console.log('key :', e.key)
        switch(e.key) {
            case '/Main':
                navigate('/')
                break
            case '/Review':
                navigate('/Review')
                break
            case '/Reference':
                navigate('/Reference')
                break
            case '/Recommended':
                navigate('/Recommended')
                break
        }
    }

    return (
        <Menu
            defaultSelectedKeys={'/Main'}
            mode={'inline'}
            items={items}
            onClick={handleMenuClick}
        />
    )
}