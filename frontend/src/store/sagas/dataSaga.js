import { takeLatest, put, call } from "redux-saga/effects"
import { Types, Actions as dataActions } from "../actions/dataActions"

import { getData, getQuestions, getRefAnswer} from "./fetchHelper/dataHelper"

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

function* dataSaga() {
    yield takeLatest(Types.GET_DATA, onGetData)
    yield takeLatest(Types.GET_QUESTIONS, onGetQuestions)
    yield takeLatest(Types.GET_REF_ANSWER, onGetRefAnswer)
}

export default dataSaga;