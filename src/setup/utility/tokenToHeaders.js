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
            console.warn('⛔ axios error: user is invalid. you must check user Authentication before call axios or direct pass token!');
            return headers;
        }
    }

    headers.Authorization = "Bearer " + token;

    return headers;
}