import { get } from "./http/api"
const { Urls } = require("./http/url");

export const getData = (id) => get(Urls.GET_EXAMPLEDATA, {params: {id: id}});