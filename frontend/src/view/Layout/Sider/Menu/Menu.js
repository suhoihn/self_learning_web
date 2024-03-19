import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { HomeOutlined, FormOutlined, UnorderedListOutlined, LikeOutlined, BookOutlined, HistoryOutlined, MessageOutlined, ToolOutlined } from '@ant-design/icons';

const getItem = (url, label, icon, children) => {
    return {
        key: url,
        icon,
        children,
        label
    };
};



export default function SiderMenu () {
    const navigate = useNavigate();
    const Location = useLocation();
    const [items, setItems] = useState([]);


    useEffect(() => { 
        const data = [
            getItem('/Main', 'Main', <HomeOutlined/>),
            getItem('/Review', 'Review', <FormOutlined/>, [
                getItem("/Review/Bookmark","Bookmark", <BookOutlined />),
                getItem("/Review/History","History", <HistoryOutlined />),
            ]),
            getItem('/Reference', 'Resources', <UnorderedListOutlined />),
            //getItem('/Recommended', 'Recommended', <LikeOutlined />),
            getItem('/Feedback', 'Feedback', <MessageOutlined />)
        ];

        if(localStorage.getItem("username") === "admin"){ data.push(getItem('/Admin', 'Admin', <ToolOutlined />)); }
        setItems(data);
        
    }, [localStorage.getItem("username")]);

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