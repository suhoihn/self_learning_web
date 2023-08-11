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
            <Row style={{backgroundColor: 'blue'}}>
                <Col>
                  <Title>Configuration</Title>
                </Col>
            </Row>

            <Row style={{backgroundColor: 'red'}}>
              <Col style={{backgroundColor: 'white'}}>
                <div>
                  <Dropdown menu={{ items, }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space> Hover me 1<DownOutlined /> </Space>
                      </a>
                  </Dropdown>
                </div>

                <div>
                  <Dropdown menu={{ items, }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space> Hover me 2<DownOutlined /> </Space>
                      </a>
                  </Dropdown>
                </div>

                <div style={{backgroundColor:'brown'}}>
                  <Dropdown menu={{ items, }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space> Hover me <DownOutlined /> </Space>
                      </a>
                  </Dropdown>
                </div>

              </Col>
            </Row>

            <Row gutter={{xs: 8, sm: 16}}>
                <Col span={24}>
                  <div style={{ width: '100%', textAlign: 'right'}}> 
                    <Button type="OK">Primary Button</Button> 
                  </div>
                </Col>
            </Row>

        </>    
    )
}


