import { takeLatest, put, call } from "redux-saga/effects";
import { Types, Actions as dataActions } from "../actions/dataActions";

import { getData, getQuestions, getRefAnswer, getReloadDBAnswer, getReloadDBQuestion, getSaveQuestion, getAnswers, getUserDetails, getUpdateQuestion, getRemoveQuestion } from "./fetchHelper/dataHelper";

function* onGetData({payload: id}) {
    try {
        console.log("example saga get data");
        const response = yield call(getData, id);
        console.log(response);
        yield put(dataActions.getDataSuccess(response));
    } catch (error) {
        yield put(dataActions.getDataFail(error.response));
    }
}

function* onGetQuestions({payload: info}) {
    try {
        console.log("data saga get questions");
        const response = yield call(getQuestions, info);
        console.log('response :',response);
        yield put(dataActions.getQuestionsSuccess(response));
    } catch (error) {
        yield put(dataActions.getQuestionsFail(error));
    }
}

function* onGetRefAnswer({payload: info}) {
    try {
        console.log("data saga get ref answer");
        const response = yield call(getRefAnswer, info);
        console.log('response :',response);
        yield put(dataActions.getRefAnswerSuccess(response));
    } catch (error) {
        yield put(dataActions.getRefAnswerFail(error.response));
    }
}

function* onGetReloadDB({payload: info}) {
    try {
        console.log("data saga get reload db question");
        const res_question = yield call(getReloadDBQuestion, info);
        console.log('reload question response :',res_question);
        const res_answer = yield call(getReloadDBAnswer, info);
        console.log('reload answer response :',res_answer);
        const response = res_answer && res_question
        yield put(dataActions.getReloadDBSuccess(response));
    } catch (error) {
        yield put(dataActions.getReloadDBFail(error));
    }
}

function* onGetSaveQuestion({payload: info}) {
    try {
        console.log("data saga get save question called");
        const response = yield call(getSaveQuestion, info);
        yield put(dataActions.getSaveQuestionSuccess(response));
    } catch (error) {
        yield put(dataActions.getSaveQuestionFail(error.response));
    }
}

function* onGetAnswers({payload: info}) {
    try {
        console.log("data saga get answers called");
        const response = yield call(getAnswers, info);
        console.log("response: ", response);
        yield put(dataActions.getAnswersSuccess(response));
    } catch (error) {
        yield put(dataActions.getAnswersFail(error.response));
    }
}

function* onGetUserDetails({payload: info}) {
    try {
        console.log("data saga get user details called");
        const response = yield call(getUserDetails, info);
        console.log("response: ", response);
        yield put(dataActions.getUserDetailsSuccess(response));
    } catch (error) {
        yield put(dataActions.getUserDetailsFail(error.response));
    }
}

function* onGetUpdateQuestion({payload: info}) {
    try {
        console.log("data saga get update question called");
        yield call(getUpdateQuestion, info);
        yield put(dataActions.getUpdateQuestionSuccess());
    } catch (error) {
        yield put(dataActions.getUpdateQuestionFail(error.response));
    }
}

function* onGetRemoveQuestion({payload: info}) {
    try {
        console.log("data saga get remove question called");
        yield call(getRemoveQuestion, info);
        yield put(dataActions.getRemoveQuestionSuccess());
    } catch (error) {
        yield put(dataActions.getRemoveQuestionFail(error.response));
    }
}



function* dataSaga() {
    yield takeLatest(Types.GET_DATA, onGetData);
    yield takeLatest(Types.GET_QUESTIONS, onGetQuestions);
    yield takeLatest(Types.GET_REF_ANSWER, onGetRefAnswer);
    yield takeLatest(Types.GET_RELOAD_DB, onGetReloadDB);
    yield takeLatest(Types.GET_SAVE_QUESTION, onGetSaveQuestion);
    yield takeLatest(Types.GET_ANSWERS, onGetAnswers);
    yield takeLatest(Types.GET_USER_DETAILS, onGetUserDetails);
    yield takeLatest(Types.GET_UPDATE_QUESTION, onGetUpdateQuestion);
    yield takeLatest(Types.GET_REMOVE_QUESTION, onGetRemoveQuestion);

}

export default dataSaga;