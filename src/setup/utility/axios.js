import axiosBase from "axios";
import {getStore} from "trim-redux";
import {API_DOMAIN, IS_SERVER} from "../constant";


/**
 * customize axios
 *
 * NOTICE: token local custom configs and by default is 'false'. see tokenProvider() for more information.
 *
 * @param userConfig {object}: custom user config
 * @returns {Promise<AxiosResponse<any> | never>}
 */
/************************* template *************************

     axios({
            url: api.test,
            method: 'POST',
            token: true, // for need auth actions
            data: {
                test: 'test' // your data params
            }
        })
         .then((response) => {
                //  transpile actions
                return response; // required for fetch()
            })
         .catch(function (e) {
                // if (e.status === 400)
                //    toast.error('your custom error');
                // else
                //    toast.error('خطا.اتصال اینترنت خود را بررسی نماید و مجددا تلاش نمایید و در صورت تکرار با پشتیبانی تماس بگیرید.', {autoClose: 8000});
            })

 ***************************************************************/
export const axios = function (config) {
    let finalConfig = {
        // rewire axios default configs
        timeout: 58000,// fix uncontroled server 502 Error
        baseURL: API_DOMAIN,
        headers: {},

        // default value of local custom configs
        token: false,

        // custom user config
        ...config
    }

    // insert Authorization token
    finalConfig = tokenProvider(finalConfig);

    return axiosBase(finalConfig);
}




/**
 * token (authentication)
 *    true: get token from redux and set to Authorization header
 *    string: set the string to Authorization header (token string)
 *
 * NOTICE: does not authentication on server so token is valid only on client, if yout want you must develop it!
 */
const tokenProvider = function (config) {
    // ignore on the server
    if (IS_SERVER)
        return config;

    const
        tokenIsTrue = config.token === true,
        tokenIsString = typeof config.token === "string";

    // ignore default value and handel invalid value
    if (!tokenIsString && !tokenIsTrue) {
        if (config.token !== false)
            console.error('⛔ axios error: invalid token property.type of token value must be string or boolean!');

        return config;
    }

    let token = null;
    if (tokenIsTrue) {
        token = getStore('localUser').token;
        if (token === null)
            console.warn('⛔ axios error: user is invalid. axios token property is "true" but user is invalid. you should check user Authentication before call axios!');
    } else if (tokenIsString) {
        if (config.token.length > 0)
            token = config.token;
        else
            console.error('⛔ axios error: invalid axios token property. token is empty!');
    }

    // define Authorization header when valid token exist
    if (token !== null)
        config.headers.Authorization = "Bearer " + token;

    return config;
}
