/**
 * convert error object to valid data object for SSR ::3::
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param error {object}
 * @returns {{data: {code: *, error: boolean}, status: null}}
 */
export const convertErrorToResponse = function (error) {
    let response = {
        status: null,
        data: {
            error: true,
            code: error.code
        }
    };

    if (error.response) {
        response.status = error.response.status;
        response.data.data = error.response.data;
    }
    // handel request time out error
    else if (error.code === 'ECONNABORTED') {
        response.status = 504;
        response.data.data = error.message;
    }
    // handel internet not found error
    else if (error.code === 'ENOTFOUND') {
        response.status = 502;
        response.data.data = error.message;
    }

    if (response.status !== null) {
        // none-200 status (3**, 4**, 5**), request timeout and internet not found
        response.data.status = response.status;
        return response;
    } else {
        // internal errors (like semantic errors) and other request errors (with out timeout)
        throw error;
    }
}