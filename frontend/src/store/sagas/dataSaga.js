import { takeLatest, put, call } from "redux-saga/effects"
import { Types, Actions as dataActions } from "../actions/dataActions"

import { getData, getQuestions, } from "./fetchHelper/dataHelper"

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
        console.log("data saga get data");
        const response = yield call(getQuestions, info);
        console.log('response :',response);
        yield put(dataActions.getQuestionsSuccess(response));
    } catch (error) {
        yield put(dataActions.getQuestionsFail(error.response));
    }
}

function* dataSaga() {
    yield takeLatest(Types.GET_DATA, onGetData)
    yield takeLatest(Types.GET_QUESTIONS, onGetQuestions)
}

export default dataSaga;