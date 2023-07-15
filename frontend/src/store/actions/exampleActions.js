export const Types = {
    GET_DATA: "GET_DATA",
    GET_DATA_SUCCESS: "GET_DATA_SUCCESS",
    GET_DATA_FAIL: "GET_DATA_FAIL"
};

export const Actions = {
    getData: (id) => {console.log("get data action"); return {type: Types.GET_DATA, payload: id}},
    // getData: (id) => ({type: Types.GET_DATA, payload: id})
    getDataSuccess: (data) => {console.log("get data success: ",data); return {type: Types.GET_DATA_SUCCESS, payload: data}},
    getDataFail: (error) => {return {type: Types.GET_DATA_FAIL, payload: error}}
};