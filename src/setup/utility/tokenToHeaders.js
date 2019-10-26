import {IS_SERVER} from "../constant";
import {getStore} from "trim-redux";

// set {Authorization: "Bearer --token--"}
export const tokenToHeaders = function (headers = {}, token) {
    // ignore on the server
    if (IS_SERVER)
        return headers;

    if (token === undefined) {
        token = getStore('localUser').token;
        if (token === null) {
            console.warn('tokenToHeaders: you need token but user is invalid! if is required check user validation before call axios.');
            return headers;
        }
    }

    headers.Authorization = "Bearer " + token;

    return headers;
}