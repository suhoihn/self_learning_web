import React, { useEffect } from 'react';
import { Avatar, List, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    title: 'Chapter 1: Equations',
  },
  {
    title: 'Chapter 2: Functions',
  },
  {
    title: 'Chapter 3: Trigonometry',
  },
  {
    title: 'Chapter 4: Integration',
  },
];

export default function Reference () {
  const navigate = useNavigate();
  
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate("/Reference")
  },[]);

  return (
    <>
    <div>
      <Row span={24}>
        <Col span={24}>
          <Row 
            span={24} 
            justify={'space-around'} 
            style={{
              marginTop: 200
            }}
          >
            {data.map((el, ind) => (
              <div
                style={{
                  backgroundColor: '#eeeeee',
                  width: '20%',
                  textAlign: 'center',
                  padding: '50px 0px',
                  borderRadius: 20
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold'
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{
                    fontSize: 15
                  }}
                >
                  {el.description}
                </div>
              </div>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
    </>
    );
};