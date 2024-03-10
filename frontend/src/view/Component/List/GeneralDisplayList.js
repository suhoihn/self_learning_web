import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin, Button, List, Typography, Image, Checkbox } from 'antd';
import { Actions as dataAction } from '../../../store/actions/dataActions';

const { Text } = Typography;


export default function GeneralDisplayList ({onItemClicked, setQuestionData}) {
  /*
    This list component fetches the data from the store and displays them with "Start" button and a bookmark checkbox
    (used instead of BookmarkList, HistoryList, RecommendedList)
  */

  const dispatch = useDispatch();

  // Get the question data from the store (after the action is dispatched)
  const { data, isLoading } = useSelector((state) => {
    let data = state.data;
    let isLoading = state.data.loadingData;

    return { 
      data: data ? data : undefined, 
      isLoading: isLoading
    }
  }, shallowEqual);

  const toggleBookmark = (checkState, item) => {

    // This action should not change loadingData because the page gets re-rendered
    dispatch(dataAction.getSaveQuestion({
      userEmail: localStorage.getItem('userEmail'),
      questionId: item.questionId,
      bookmarked: checkState,
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

    // REDUNDANT CODE
    // dispatch(dataAction.getRefAnswer({
    //   answerId: item.questionId ? item.questionId: undefined,
    //   specificAnswerId: item.question.subQuestion[0].specificQuestionId ?
    //   item.question.subQuestion[0].specificQuestionId : undefined
    // }));

    // Open the question modal
    onItemClicked();
  };

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
  );

  return (
    data && <>
    {
      isLoading ? <Spin /> : <>
        <List itemLayout="vertical" size="large" dataSource={data.data}
            renderItem={onRenderListItem}
        />
      </>
    }
    </>
  );
};