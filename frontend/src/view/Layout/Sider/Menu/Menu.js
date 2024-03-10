import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { HomeOutlined, FormOutlined, UnorderedListOutlined, LikeOutlined, BookOutlined, HistoryOutlined } from '@ant-design/icons';

const getItem = (url, label, icon, children) => {
    return {
        key: url,
        icon,
        children,
        label
    };
};

const items = [
    getItem('/Main', 'Main', <HomeOutlined/>),
    getItem('/Review', 'Review', <FormOutlined/>, [
        getItem("/Review/Bookmark","Bookmark", <BookOutlined />),
        getItem("/Review/History","History", <HistoryOutlined />),
    ]),
    getItem('/Reference', 'Reference', <UnorderedListOutlined />),
    getItem('/Recommended', 'Recommended', <LikeOutlined />)
];

export default function SiderMenu () {
    const navigate = useNavigate();
    const Location = useLocation();
    let pathSnippets = Location.pathname.split('/');
    const handleMenuClick = (e) => {
        switch(e.key) {
            case '/Main':
                navigate('/')
                break;
            case '/Reference':
                navigate('/Reference')
                break;
            case '/Recommended':
                navigate('/Recommended')
                break;
            case "/Review/Bookmark":
                navigate('/Review/Bookmark');
                break;
            case "/Review/History":
                navigate("/Review/History");
                break;
            default:
                navigate(e.key);
                break;
    
        };
    };

    return (
        <Menu
            defaultSelectedKeys={'/Main'}
            selectedKeys = {Location.pathname}
            mode={'inline'}
            items={items}
            onClick={handleMenuClick}
        />
    );
};