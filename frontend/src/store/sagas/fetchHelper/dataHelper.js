import { get, post } from "./http/api";
const { Urls } = require("./http/url");

export const getData = (id) => get(Urls.GET_EXAMPLEDATA, {params: {id: id}});
export const getQuestions = (info) => get(Urls.GET_QUESTIONS, {params: {infos: info}});
export const getRefAnswer = (info) => get(Urls.GET_REF_ANSWER, {params: {infos: info}});
export const getReloadDBQuestion = () => get(Urls.GET_RELOAD_DB_QUESTION);
export const getReloadDBAnswer = () => get(Urls.GET_RELOAD_DB_ANSWER);
export const getSaveQuestion = (info) => get(Urls.GET_SAVE_QUESTION, {params: {infos: info}});
export const getAnswers = (info) => get(Urls.GET_ANSWERS, {params: {infos: info}});
export const getUserDetails = (info) => get(Urls.GET_USER_DETAILS, {params: {infos: info}});
export const getUpdateQuestion = (info) => post(Urls.GET_UPDATE_QUESTION, info);
export const getRemoveQuestion = (info) => get(Urls.GET_REMOVE_QUESTION, {params: {infos: info}});
