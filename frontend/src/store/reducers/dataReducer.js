import { Types } from "../actions/dataActions";

const initialState = {
    data: [], // For questions
    loadingData: false,
    error: { message: "", },
    refAnswer: '', // For reference answers
    answers: [], // For multiple answers
    userData: undefined,
};

const DataReducer = (state = initialState, action) => {
    switch (action.type){
        case Types.GET_DATA:
            console.log("reducer get data");
            state = {...state, loadingData: true};
            break;
        case Types.GET_DATA_SUCCESS:
            console.log("reducer data: ", action.payload);
            state = {...state, loadingData: false, data: action.payload};
            break;    
        case Types.GET_DATA_FAIL:
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;

        // Get Questions
        case Types.GET_QUESTIONS:
            console.log("reducer get quetions received");
            state = {...state, loadingData: true};
            break;
        case Types.GET_QUESTIONS_SUCCESS:
            console.log("reducer get quetions success: ", action.payload);
            state = {...state, loadingData: false, data: action.payload};
            break;    
        case Types.GET_QUESTIONS_FAIL:
            console.log("reducer get quetions failed");
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        
        // Get Reference Answers
        case Types.GET_REF_ANSWER:
            console.log("reducer get answer received")
            state = {...state, loadingData: true}
            break;
        case Types.GET_REF_ANSWER_SUCCESS:
            console.log("reducer get answer success", action.payload)
            state = {...state, loadingData: false, refAnswer: action.payload}
            break;
        case Types.GET_REF_ANSWER_FAIL:
            console.log('reducer get answer failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;

        // Get Reload DB
        case Types.GET_RELOAD_DB:
            console.log("reducer get reload received")
            state = {...state, reloadDB: true}
            break;
        case Types.GET_RELOAD_DB_SUCCESS:
            console.log("reducer get reload success")
            state = {...state, reloadDB: false}
            break;
        case Types.GET_RELOAD_DB_FAIL:
            console.log('reducer get reload failed')
            state = {...state, error: { message: "ERROR" }, reloadDB: false};
            break;

        // Get Save Question
        case Types.GET_SAVE_QUESTION_FAIL:
            console.log('reducer get save question failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_SAVE_QUESTION:
            console.log('reducer get save question received')
            // Changed here due to reload issues in Bookmark list
            state = {...state, loadingData: false};
            break;
        case Types.GET_SAVE_QUESTION_SUCCESS:
            console.log('reducer get save question success')
            state = {...state, loadingData: false};
            break;

        // Get Answers
        case Types.GET_ANSWERS_FAIL:
            console.log('reducer get answer failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_ANSWERS:
            console.log('reducer get answers received')
            state = {...state, loadingData: true};
            break;
        case Types.GET_ANSWERS_SUCCESS:
            console.log('reducer get answers success', action.payload);
            state = {...state, loadingData: false, answers: action.payload};
            break;

        // Get user details
        case Types.GET_USER_DETAILS:
            console.log('reducer get details failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_USER_DETAILS_FAIL:
            console.log('reducer get details received')
            state = {...state, loadingData: true};
            break;
        case Types.GET_USER_DETAILS_SUCCESS:
            console.log('reducer get details success', action.payload);
            state = {...state, loadingData: false, userData: action.payload};
            break;

        // Get update question
        case Types.GET_UPDATE_QUESTION_FAIL:
            console.log('reducer get update question failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_UPDATE_QUESTION:
            console.log('reducer get update question received')
            state = {...state, loadingData: true};
            break;
        case Types.GET_UPDATE_QUESTION_SUCCESS:
            console.log('reducer get update question success');
            state = {...state, loadingData: false};
            break;

        // Get remove question
        case Types.GET_REMOVE_QUESTION_FAIL:
            console.log('reducer get details failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_REMOVE_QUESTION:
            console.log('reducer get details received')
            state = {...state, loadingData: true};
            break;
        case Types.GET_REMOVE_QUESTION_SUCCESS:
            console.log('reducer get details success');
            state = {...state, loadingData: false};
            break;



        default:
            state = {...state};
            break;
    }
    return state;
}
export default DataReducer;