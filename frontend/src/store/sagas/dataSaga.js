import { takeLatest, put, call } from "redux-saga/effects"
import { Types, Actions as dataActions } from "../actions/dataActions"

import { getData, getQuestions, getRefAnswer, getReloadDBAnswer, getReloadDBQuestion} from "./fetchHelper/dataHelper"

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
        yield put(dataActions.getQuestionsFail(error.response));
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
        yield put(dataActions.getReloadDBFail(error.response));
    }
}

function* dataSaga() {
    yield takeLatest(Types.GET_DATA, onGetData)
    yield takeLatest(Types.GET_QUESTIONS, onGetQuestions)
    yield takeLatest(Types.GET_REF_ANSWER, onGetRefAnswer)
    yield takeLatest(Types.GET_RELOAD_DB, onGetReloadDB)
    
}

export default dataSaga;