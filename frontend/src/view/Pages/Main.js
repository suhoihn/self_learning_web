import React, { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Row, Col, Button, Card, Alert, Radio, Typography, List } from 'antd';
import OptionCard from '../Component/Card/OptionCard'
import ProblemModal from '../Component/Modal/ProblemModal';

const { Text, Title } = Typography;


export default function Main () {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClosed= ()=> {setIsModalOpen(false)}

  // TODO::useSelector, actions, saga, etc 
  const items = [
      {
          value: '1',
          label: 'Chapter1'
      },
      {
          value: '2',
          label: 'Chapter2'
      },
  ];

  // Button
  const onSubmitClicked = () => {
    // TODO:: add action for data fetching
    setIsModalOpen(true)
  }
    
  const style={margin: 10}

  return (
    <div>
    <Card title={<Text>Configuration</Text>}>
      <Row span={24}>
        <Col span={12}>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={items} title={'Chapter'}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={items} title={'Difficulty'}/>
            </Col>
          </Row>
          <Row span={24}>
            <Col span={10} style={style}>
              <OptionCard items={items} title={'Paper'}/>
            </Col>
            <Col span={10} style={style}>
              <OptionCard items={items} title={'Timezone'}/>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <Row span={24}> 
            <Col span={23} style={style}>
              <Alert message="Instrunction" type="info" showIcon />   
              <br />       
              <Text>- You can customise your search using the categories in the dropdown</Text><br />
              <Text>- If you do not want to filter on a specific category, turn off the switch.</Text><br />
              <Text>- If you are ready, click the "Submit" button</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row span={24}>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button onClick={onSubmitClicked}>Submit</Button>
        </Col>
      </Row>
    </Card>
    <ProblemModal open={isModalOpen} onClosed={onClosed}/>
    </div>    
  )
}


