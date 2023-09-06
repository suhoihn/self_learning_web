import { Types } from "../actions/dataActions"

const initialState = {
    data: [],
    loadingData: false,
    error: {
        message: "",
    },
    refAnswer: ''
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
        case Types.GET_HISTORY_FAIL:
            console.log('reducer get history failed')
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        case Types.GET_HISTORY:
            console.log('reducer get history received')
            state = {...state, loadingData: true};
            break;
        case Types.GET_HISTORY_SUCCESS:
            console.log('reducer get reload success')
            state = {...state, data: action.payload, loadingData: false};
            break;
        default:
            state = {...state};
            break;
    }
    return state;
}
export default DataReducer;