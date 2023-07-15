import { all, fork } from "redux-saga/effects"

import ExampleSaga from "./sagas/exampleSaga"

export default function* rootSaga() {
    yield all([fork(ExampleSaga)]);
}