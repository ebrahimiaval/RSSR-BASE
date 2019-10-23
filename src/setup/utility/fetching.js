import axios from "axios";

export const fetching = function (options, thenHandler, catchHandler) {
    const {token, cancel} = axios.CancelToken.source();
    options.cancelToken = token;
    const request = axios(options).then(thenHandler).catch(catchHandler)
    request.cancel = cancel;
    return request;
}