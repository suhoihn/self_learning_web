import { useSelector, shallowEqual } from 'react-redux';
import { Spin, Button, List, Typography, Image, Checkbox } from 'antd';
import { useDispatch } from 'react-redux'
import { Actions as dataAction } from '../../../store/actions/dataActions'

const { Text } = Typography


export default function GeneralDisplayList ({onItemClicked, setModalContent}) {
  /*
    This list component fetches the data from the store and displays them with "Start" button and a bookmark checkbox
    (used instead of BookmarkList, HistoryList, RecommendedList)
  */

  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => {
    let data = state.data;
    let isLoading = state.data.loadingData;

    return { 
      data: data ? data : undefined, 
      isLoading: isLoading
    }
  }, shallowEqual);

  const toggleBookmark = (checkState, item) => {
    console.log("Bookmark state changing to", checkState);
    
    // this action should not change loadingData because the page gets re-rendered
    dispatch(dataAction.getSaveQuestion({
      questionId: item.questionId,
      bookmarked: checkState,
    }));
  }       

  const openQuestion = (item) => {
    console.log("openQuestion!!!",item);

    // This is used for definning the state used in the Individual Question Modal
    setModalContent({
      data: [item],
      item: item,
    });

    callAnswer(item);

    // Close the modal and open the answer modal
    onItemClicked();

    // setModalContent(
    //   <>
    //     <p>Question {item.questionId}</p>
    //     <>   
    //       {item.question.questionImage.image && <Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />}
    //       {item.question.subQuestion[0].subQuestionImage.image && <Image src={`data:image/png;base64, ${item.question.subQuestion[0].subQuestionImage.image}`} />}
    //     </>
    //     <Divider/>
    //     {answerData && answerData[0].answer.answerSubscripts.map((i, idx) => (
    //     answerData[0].answer.answerValues[0] != "None" && <Row>
    //         <Col span={4}>
    //           <Text>{(i == "None") ? "Answer: " : i}</Text>
    //         </Col>
    //         <Col span={20}>
    //           <Input key={idx} value={text} placeholder="Write your answer here." onChange={(e) => {onInputChange(e,idx)}}/>
    //         </Col>
    //       </Row>
    //     ))}
    //   {answerData && answerData[0].answer.answerValues[0] != "None" && <>
    //     <Row style={{marginTop: 10}}>
    //       <Col span={24} style={{textAlign: 'right'}}>
    //           {<Button type="primary" onClick={answerSubmit}>Submit</Button>}
    //         </Col>
    //     </Row>
    //     <Divider/>
    //   </>}

    //   </>
    // );
    
  }

  // Ref Answer is needed so that the question modal displays relevant information (e.g. answerSubscripts)
  
  const callAnswer = (item) => {
    console.log("Get Ref Answer called");
    dispatch(dataAction.getRefAnswer({
      answerId: item.questionId ? item.questionId: undefined,
      specificAnswerId: item.question.subQuestion[0].specificQuestionId ?
      item.question.subQuestion[0].specificQuestionId : undefined
    }))
  }

  const onRenderListItem = (item) => (
    <List.Item
      key={item.title}
      actions={
        [// This is added to prevent simultaneous click of button & list item
        <Button onClick={() => openQuestion(item)}>Start this question</Button>,
        <Checkbox defaultChecked={true} onChange={(e) => {toggleBookmark(e.target.checked, item)}}>Bookmarked</Checkbox>,
        ]
      }
      extra={<Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />}
    >
      <List.Item.Meta
          title={<a href={item.href}>{item.title}</a>}
          description={
            <div>
              <Text>Question Type: {item.question.questionType}</Text><br/>
              <Text>Chapters: {item.chapter.join(", ")}</Text><br/>
              <Text>Difficulty: {item.difficulty}</Text><br/>
              <Text>Paper: {item.paper}</Text><br/>
              <Text>timezone: {item.timezone}</Text>
            </div>
          }
      />          
    </List.Item>
  )

  return (
    data && <>
    {
      isLoading ? <Spin /> : <>
        <List itemLayout="vertical" size="large" dataSource={data.data}
            // Pagination temporarily disabled due to critical bug

            // pagination={{
            //   onChange: (page) => { console.log(page); },
            //   pageSize: 3,
            // }}
            renderItem={onRenderListItem}
        />
      </>
    }
    </>
  )
}