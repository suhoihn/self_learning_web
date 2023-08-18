import { all, fork } from "redux-saga/effects"

import DataSaga from "./sagas/dataSaga"

export default function* rootSaga() {
    yield all([fork(DataSaga)]);
}