import { Types } from "../actions/dataActions"

const initialState = {
    data: "",
    loadingData: false,
    error: {
        message: "",
    }
};

const DataReducer = (state = initialState, action) => {
    switch (action.type){
        case Types.GET_DATA:
            console.log("reducer get data");
            state = {...state, loadingData: false};
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
            state = {...state, loadingData: false};
            break;
        case Types.GET_QUESTIONS_SUCCESS:
            console.log("reducer get quetions success: ", action.payload);
            state = {...state, loadingData: false, data: action.payload};
            break;    
        case Types.GET_QUESTIONS_FAIL:
            console.log("reducer get quetions failed");
            state = {...state, error: { message: "ERROR" }, loadingData: false};
            break;
        default:
            state = {...state};
            break;
    }
    return state;
}
export default DataReducer;