import { takeLatest, put, call } from "redux-saga/effects"
import { Types, Actions as exampleActions } from "../actions/exampleActions"

import { getData } from "./fetchHelper/exampleHelper"

function* onGetData({payload: id}) {
    try {
        console.log("example saga get data");
        const response = yield call(getData, id);
        console.log(response);
        yield put(exampleActions.getDataSuccess(response));
    } catch (error) {
        yield put(exampleActions.getDataFail(error.response));
    }
}

function* exampleSaga() {
    yield takeLatest(Types.GET_DATA, onGetData);
}

export default exampleSaga;