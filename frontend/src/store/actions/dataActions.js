export const Types = {
    GET_DATA: "GET_DATA",
    GET_DATA_SUCCESS: "GET_DATA_SUCCESS",
    GET_DATA_FAIL: "GET_DATA_FAIL",
    
    GET_QUESTIONS: "GET_QUESTIONS",
    GET_QUESTIONS_SUCCESS: "GET_QUESTIONS_SUCCESS",
    GET_QUESTIONS_FAIL: "GET_QUESTIONS_FAIL",
    
    GET_REF_ANSWER: "GET_REF_ANSWER",
    GET_REF_ANSWER_SUCCESS: "GET_REF_ANSWER_SUCCESS",
    GET_REF_ANSWER_FAIL: "GET_REF_ANSWER_FAIL",
    
    GET_RELOAD_DB: "GET_RELOAD_DB",
    GET_RELOAD_DB_SUCCESS: "GET_RELOAD_DB_SUCCESS",
    GET_RELOAD_DB_FAIL: "GET_RELOAD_DB_FAIL",
    
    GET_SAVE_QUESTION: "GET_SAVE_QUESTION",
    GET_SAVE_QUESTION_SUCCESS: "GET_SAVE_QUESTION_SUCCESS",
    GET_SAVE_QUESTION_FAIL: "GET_SAVE_QUESTION_FAIL",
    
    // Get Answers
    GET_ANSWERS: "GET_ANSWERS",
    GET_ANSWERS_SUCCESS: "GET_ANSWERS_SUCCESS",
    GET_ANSWERS_FAIL: "GET_ANSWERS_FAIL",


    // Get user details
    GET_USER_DETAILS: "GET_USER_DETAILS",
    GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
    GET_USER_DETAILS_FAIL: "GET_USER_DETAILS_FAIL",


    // Get update question
    GET_UPDATE_QUESTION: "GET_UPDATE_QUESTION",
    GET_UPDATE_QUESTION_SUCCESS: "GET_UPDATE_QUESTION_SUCCESS",
    GET_UPDATE_QUESTION_FAIL: "gET_UPDATE_QUEISTION_FAIL",

    // Get remove question
    GET_REMOVE_QUESTION: "GET_REMOVE_QUESTION",
    GET_REMOVE_QUESTION_SUCCESS: "GET_REMOVE_QUESTION_SUCCESS",
    GET_REMOVE_QUESTION_FAIL: "gET_REMOVE_QUEISTION_FAIL",
    
};

// infos = { questionType: String, difficulty: Array, chapter, paper: Array, timezone: Array, }

export const Actions = {
    getData: (id) => {
        console.log("get data action"); 
        return { type: Types.GET_DATA, payload: id };
    },
    getDataSuccess: (data) => {
        console.log("get data success: ", data); 
        return { type: Types.GET_DATA_SUCCESS, payload: data };
    },
    getDataFail: (error) => {
        console.log("get data failed: ", error); 
        return { type: Types.GET_DATA_FAIL, payload: error };
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

    getRefAnswer: (info) => {
        console.log("get ref answer action")
        return {type: Types.GET_REF_ANSWER, payload: info}
    },
    getRefAnswerSuccess: (data) => {
        console.log("get ref answer success")
        return {type: Types.GET_REF_ANSWER_SUCCESS, payload: data}
    },
    getRefAnswerFail: (error) => {
        console.log("get ref answer failed: ", error)
        return {type: Types.GET_REF_ANSWER_FAIL, payload: error}
    },

    getReloadDB: (info) => {
        console.log("get reload db action")
        return {type: Types.GET_RELOAD_DB, payload: info}
    },
    getReloadDBSuccess: (data) => {
        console.log("get reload db success")
        return {type: Types.GET_RELOAD_DB_SUCCESS, payload: data}
    },
    getReloadDBFail: (error) => {
        console.log("get reload db failed: ", error)
        return {type: Types.GET_RELOAD_DB_FAIL, payload: error}
    },

    getSaveQuestion: (info) => {
        console.log("get save question action")
        return {type: Types.GET_SAVE_QUESTION, payload: info}
    },
    getSaveQuestionSuccess: (data) => {
        console.log("get save question success")
        return {type: Types.GET_SAVE_QUESTION_SUCCESS, payload: data}
    },
    getSaveQuestionFail: (error) => {
        console.log("get save question failed: ", error)
        return {type: Types.GET_SAVE_QUESTION_FAIL, payload: error}
    },

    // Get Answers (multiple)
    getAnswers: (info) => {
        console.log("get answers action")
        return {type: Types.GET_ANSWERS, payload: info}
    },
    getAnswersSuccess: (data) => {
        console.log("get answers success", data);
        return {type: Types.GET_ANSWERS_SUCCESS, payload: data}
    },
    getAnswersFail: (error) => {
        console.log("get answers failed: ", error)
        return {type: Types.GET_ANSWERS_FAIL, payload: error}
    },

    // Get user details
    getUserDetails: (info) => {
        console.log("get user details action")
        return {type: Types.GET_USER_DETAILS, payload: info}
    },
    getUserDetailsSuccess: (data) => {
        console.log("get user details success", data);
        return {type: Types.GET_USER_DETAILS_SUCCESS, payload: data}
    },
    getUserDetailsFail: (error) => {
        console.log("get user details failed: ", error)
        return {type: Types.GET_USER_DETAILS_FAIL, payload: error}
    },

    
    // Get update question
    getUpdateQuestion: (info) => {
        console.log("get update question action")
        return {type: Types.GET_UPDATE_QUESTION, payload: info}
    },
    getUpdateQuestionSuccess: () => {
        console.log("get update question success");
        return {type: Types.GET_UPDATE_QUESTION_SUCCESS}
    },
    getUpdateQuestionFail: (error) => {
        console.log("get update question failed: ", error)
        return {type: Types.GET_UPDATE_QUESTION_FAIL, payload: error}
    },

    // Get remove question
    getRemoveQuestion: (info) => {
        console.log("get remove question action")
        return {type: Types.GET_REMOVE_QUESTION, payload: info}
    },
    getRemoveQuestionSuccess: () => {
        console.log("get remove question success");
        return {type: Types.GET_REMOVE_QUESTION_SUCCESS}
    },
    getRemoveQuestionFail: (error) => {
        console.log("get remove question failed: ", error)
        return {type: Types.GET_REMOVE_QUESTION_FAIL, payload: error}
    },

};