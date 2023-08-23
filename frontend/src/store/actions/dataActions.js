export const Types = {
    GET_DATA: "GET_DATA",
    GET_DATA_SUCCESS: "GET_DATA_SUCCESS",
    GET_DATA_FAIL: "GET_DATA_FAIL",
    GET_QUESTIONS: "GET_QUESTIONS",
    GET_QUESTIONS_SUCCESS: "GET_QUESTIONS_SUCCESS",
    GET_QUESTIONS_FAIL: "GET_QUESTIONS_FAIL"
};

// infos = { questionType: String, difficulty: Array, chapter, paper: Array, timezone: Array, }

export const Actions = {
    getData: (id) => {
        console.log("get data action"); 
        return {type: Types.GET_DATA, payload: id}
    },
    getDataSuccess: (data) => {
        console.log("get data success: ", data); 
        return {type: Types.GET_DATA_SUCCESS, payload: data}
    },
    getDataFail: (error) => {
        console.log("get data failed: ", error); 
        return {type: Types.GET_DATA_FAIL, payload: error}
    },

    getQuestions: (info) => {
        console.log('get question action')
        return {type: Types.GET_QUESTIONS, payload: info}
    },
    getQuestionsSuccess: (data) => {
        console.log("get question success: ", data); 
        return {type: Types.GET_QUESTIONS_SUCCESS, payload: data}
    },
    getQuestionsFail: (error) => {
        console.log("get question failed: ", error); 
        return {type: Types.GET_QUESTIONS_FAIL, payload: error}
    },
};