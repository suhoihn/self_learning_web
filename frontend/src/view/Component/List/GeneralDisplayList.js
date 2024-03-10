import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin, Button, List, Typography, Image, Checkbox } from 'antd';
import { Actions as dataAction } from '../../../store/actions/dataActions';

const { Text } = Typography;


export default function GeneralDisplayList ({onItemClicked, setQuestionData, mode}) {
  /*
    This list component fetches the data from the store and displays them with "Start" button and a bookmark checkbox
    (used instead of BookmarkList, HistoryList, RecommendedList)
  */


  const dispatch = useDispatch();

  // Get the question data from the store (after the action is dispatched)
  const { data, isLoading } = useSelector((state) => {
    let data = state.data.userData;
    let isLoading = state.data.loadingData;

    // console.log( state );

    let returnData;
    if(mode == "Bookmark"){ returnData = data ? data.bookmarkInfo : []; }
    else if(mode == "History"){ returnData = data ? data.wrongCountInfo : []; }

    // console.log("userdata", data);
    const qidSet = returnData.length == 0 ? new Set() : new Set(data.bookmarkInfo.map(item => item.questionId));
       
    // Suggestion: qid and sqid combined to one (e.g. 2-1a, 3-3)
    for(let i = 0; i < returnData.length; i++){
      returnData[i].bookmarked = qidSet.has(returnData[i].questionId);      
    }

    console.log("Final outcome: ", mode, data, returnData);
    return { 
      data: returnData, 
      isLoading: isLoading
    }
  }, shallowEqual);


  const toggleBookmark = (checkState, item) => {

    // This action should not change loadingData because the page gets re-rendered
    dispatch(dataAction.getSaveQuestion({
      username: localStorage.getItem('username'),
      questionId: item.questionId,
      specificQuestionId: item.question ?
                          item.question.subQuestion[0].specificQuestionId : 
                          undefined,

      bookmarked: String(checkState), // For some reason, it should be string
    }));
  }; 

  const openQuestion = (item) => {
    console.log("openQuestion called for ", item);

    // This is used for definning the state used in the Individual Question Modal
    setQuestionData({
      data: [item],
      item: item,
    });

    // RefAnswer is needed so that the question modal displays relevant information (e.g. answerSubscripts)
    dispatch(dataAction.getRefAnswer({
      answerId: item.questionId,
      specificAnswerId: item.question.subQuestion[0].specificQuestionId,
    }));

    // Open the question modal
    onItemClicked();
  };

  const onRenderListItem = (item) => (
    <List.Item
      key={"fuck my mom"}
      actions={
        [// This is added to prevent simultaneous click of button & list item
        <Button onClick={() => openQuestion(item)}>Start this question</Button>,
        <Checkbox defaultChecked={item.bookmarked} onChange={(e) => {toggleBookmark(e.target.checked, item)}}>Bookmarked</Checkbox>,
        ]
      }
      extra={<Image src={`data:image/png;base64, ${item.question.questionImage.image}`} />}
    >
      <List.Item.Meta
          title={<b>Question!</b>}
          description={
            <div>
              <Text>Question Type: {item.question.questionType}</Text><br/>
              <Text>Chapters: {item.chapter.join(", ")}</Text><br/>
              <Text>Difficulty: {item.difficulty}</Text><br/>
              <Text>Paper: {item.paper}</Text><br/>
              <Text>Timezone: {item.timezone}</Text><br/>
              {mode == "History" ? <Text>Wrong count: {item.wrongCount}</Text> : <></>}
            </div>
          }
      />          
    </List.Item>
  );
  
  return (
    data && <>
    {
      isLoading ? <Spin /> : <>
        <List itemLayout="vertical" size="large" dataSource={data}
            renderItem={onRenderListItem}
        />
      </>
    }
    </>
  );
};