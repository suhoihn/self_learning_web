import React, { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Dropdown, Space, Radio, Typography, List } from 'antd';

const { Title } = Typography;

const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

export default function Main () {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
  
    return (
        <>
            <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'blue'}}>
                <Title>Configuration</Title>
            </Row>

            <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'red'}}>
                <Col gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'yellow', width: "100%"}}>
                    <Dropdown
                        menu={{
                        items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Col>
                
                <Col gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'green', width: "100%"}}>
                    <Dropdown
                        menu={{
                        items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Col>

                <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'brown'}}>
                    <Dropdown
                        menu={{
                        items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Row>

            </Row>

            <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'purple'}}>
                <Space wrap>
                <Button type="OK">Primary Button</Button>
                </Space>
            </Row>

            {/* <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'blue'}}>
                <Col xs={12} sm={12} md={12} style={{backgroundColor: 'red', height: 200}}>
                    <Dropdown
                        menu={{
                        items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Col>

                <Col xs={12} sm={12} md={12}>
                    <Space wrap>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={{xs: 8, sm: 16}} style={{backgroundColor: 'blue'}}>
                <Col xs={12} sm={12} md={12} style={{backgroundColor: 'red', height: 200}}>
                    <Dropdown
                        menu={{
                        items,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Hover me
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                </Col>

                <Col xs={12} sm={12} md={12}>
                    <Space wrap>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={{xs: 8, sm: 16}}>
                <Space wrap>
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="dashed">Dashed Button</Button>
                    <Button type="text">Text Button</Button>
                    <Button type="link">Link Button</Button>
                    </Space>

            </Row>
            
            <Col xs={12} sm={12} md={12}>
                <Row gutter={{xs: 8, sm: 16}}>
                    <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                    </Radio.Group>
                </Row>
            </Col> */}
        </>    
    )
}
{/* <Row gutter={{xs: 8, sm: 16}}>
    <Col xs={12} sm={12} md={12}>
    <BreadCrumb />
    </Col>
    <Col xs={12} sm={12} md={12} style={{textAlign:"right"}}>
    <Button />
    </Col>
</Row> */}


