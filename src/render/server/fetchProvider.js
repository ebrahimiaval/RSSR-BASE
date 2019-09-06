import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";


// fetch data of component from server
export const fetchProvider = async function (req) {
    // fetch() of component of matched route item
    const fetch = als.get('fetch');

    // when component has not fetch() then fetch is undefined and fetchType is 'WITH_OUT_FETCH'
    if (!fetch)
        return true;

    // pass to fetch() as params ::1::
    const ftechParams = {
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    };

    // ::2::
    // NOTICE: catch() will be handel on the server.js with failedRes()
    await
        fetch(ftechParams)
            .then(function (response) {
                handleResponse(response);
            })
            .catch(function (error) {
                const response = convertErrorToResponse(error);
                handleResponse(response);
            })
}




/**
 * set status and inject data to updatedState
 * @param response {object} : object with status and data property
 */
const handleResponse = (response) => {
    // excute 'throw new Error' if response is not valid
    responseValidation(response);

    // set response status code
    als.set('status', response.status, true);

    const
        stateName = als.get('stateName'),
        updatedState = {[stateName]: response.data};

    // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template
    // to pass data to the client for syncing reduxes and merge with defaultState
    // of redux to creare store on the server
    als.set('updatedState', updatedState, true);
}