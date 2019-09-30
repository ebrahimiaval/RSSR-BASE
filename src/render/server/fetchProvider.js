import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";


// fetch data of component from server
export const fetchProvider = async function (req) {
    const fetch = als.get('fetch')

    // when component has not fetch() then fetch is undefined and fetchType is 'WITH_OUT_FETCH'
    if (!fetch)
        return true

    // pass to fetch() as params ::1::
    const ftechParams = {
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    // ::2::
    // NOTICE: catch() will be handel on the server.js with failedRes()
    await
        fetch(ftechParams)
            .then(function (response) {
                fetchResponsePreparing(response)
            })
            .catch(function (error) {
                const response = convertErrorToResponse(error)
                fetchResponsePreparing(response)
            })
}




/**
 *  1) response vaidation
 *  2) set response status code
 *  3) push data to updatedState (redux)
 */
function fetchResponsePreparing(response) {
    // excute 'throw new Error' if response is not valid
    responseValidation(response)

    // set response status code
    als.set('status', response.status, true)

    const stateName = als.get('stateName')
    const updatedState = als.get('updatedState')
    updatedState[stateName] = response.data
    als.set('updatedState', updatedState, true)
}

