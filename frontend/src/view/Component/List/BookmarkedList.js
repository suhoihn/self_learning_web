import { LikeOutlined, MessageOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spin, Button, Input, List, Space, Typography, Image, Divider, Row, Col } from 'antd';
import { Actions as dataAction } from '../../../store/actions/dataActions';
import { get } from "../../../store/sagas/fetchHelper/http/api";
const { Urls } = require("../../../store/sagas/fetchHelper/http/url");

const { Text } = Typography

export default function BookmarkedList ({onItemClicked, setModalContent}) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBookmarkApi = async() => {
      console.log('getQuestion called in BookmarkedList')
      setIsLoading(true);
      var email = localStorage.getItem('userEmail')
      var response = await get(Urls.GET_BOOKMARKS, {params: {username: email}})
      console.log(response)
      setBookmarks(response);
      setIsLoading(false);
    }
    getBookmarkApi();
  }, [])

  const onRenderListItem = (item) => (
    <List.Item
      key={item[0].title}
      onClick={() => {
        // callAnswer(item[0]);
        setModalContent(
          <>
            <p>Question {item[0].questionId}</p>
            <>   
              {item[0].question.questionImage.image && <Image src={`data:image/png;base64, ${item[0].question.questionImage.image}`} />}
              {/* {item[0].question.subQuestion[0].subQuestionImage.image && <Image src={`data:image/png;base64, ${item[0].question.subQuestion[0].subQuestionImage.image}`} />} */}
            </>
            <Divider/>
          </>
        );
        // onItemClicked();
      }}
      actions={[    
          <Space>
            <StarOutlined />
            Bookmarked
          </Space>, 
          <Space
            onClick={async() => {
              var confirmed = window.confirm('Are you sure you want to delete this bookmark?')
              if(confirmed)
              {
                var email = localStorage.getItem('userEmail')
                var response = await get(Urls.DELETE_BOOKMARK, {params: {username: email, questionId: item[0].questionId}});
                var newBookmarks = bookmarks.filter((el) => {
                  return el[0].questionId !== item[0].questionId
                });
                setBookmarks(newBookmarks)
              }
            }}
            style={{
              cursor: 'pointer'
            }}
          >
            <DeleteOutlined 
              style={{
                color: 'red'
              }}
            />
            <div
              style={{
                color: 'red'
              }}
            >
              Remove
            </div>
          </Space>
      ]}
      extra={
      <div>
        <Image src={`data:image/png;base64, ${item[0].question.questionImage.image}`} />
      </div>
      }
    >
      <List.Item.Meta
          title={<a href={item[0].href}>{item[0].title}</a>}
          description={
            <div>
              <Text>Question Type: {item[0].question.questionType}</Text><br/>
              <Text>Chapters: {item[0].chapter.join(", ")}</Text><br/>
              <Text>Difficulty: {item[0].difficulty}</Text><br/>
              <Text>Paper: {item[0].paper}</Text><br/>
              <Text>timezone: {item[0].timezone}</Text>
            </div>
          }
          onClick={() => {
            onItemClicked();
          }}
      />          
    </List.Item>
  )

  return (
    <>
      { isLoading ? 
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Spin />
      </div>
         :
        <List itemLayout="vertical" size="large" dataSource={bookmarks}
                pagination={{
                onChange: (page) => { console.log(page); },
                pageSize: 3,
                }}
                renderItem={onRenderListItem}
        /> }
      </>
  )
}