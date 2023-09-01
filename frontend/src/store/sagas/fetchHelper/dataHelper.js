import { get } from "./http/api"
const { Urls } = require("./http/url");

export const getData = (id) => get(Urls.GET_EXAMPLEDATA, {params: {id: id}});
export const getQuestions = (info) => get(Urls.GET_QUESTIONS, {params: {infos: info}});
export const getRefAnswer = (info) => get(Urls.GET_REF_ANSWER, {params: {infos: info}});
export const getReloadDBQuestion = () => get(Urls.GET_RELOAD_DB_QUESTION)
export const getReloadDBAnswer = () => get(Urls.GET_RELOAD_DB_ANSWER)