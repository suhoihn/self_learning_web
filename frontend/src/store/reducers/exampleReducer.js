import { Types } from "../actions/exampleActions"

const initialState = {
    data: "",
    loadingData: false,
    error: {
        message: "",
    }
};

const ExampleReducer = (state = initialState, action) => {
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
        default:
            state = {...state};
            break;
    }
    return state;
}
export default ExampleReducer;