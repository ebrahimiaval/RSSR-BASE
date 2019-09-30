import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";


export const skeletonFetchProvider = async function (req) {
    const skeletonFetch = als.get('skeletonFetch')

    // App component does not skeleton() property
    if (!skeletonFetch)
        return true;

    // cache is off
    if (!skeletonFetch.cache) {
        await skeletonGetDataFromApi(req);
        return true;
    }

    // delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];
    const dataExist = data !== undefined;

    if (dataExist) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            als.set('updatedState', data, true)
            return true;
        } else {
            delete global['SKELETON-CACHED-DATA']
        }
    }

    await
        skeletonGetDataFromApi(req)
            .then(function () {
                // setup cache
                const updatedState = als.get('updatedState')
                global['SKELETON-CACHED-DATA'] = updatedState

                const expLong = Number(process.env['SKELETON_CACHE_EXP']);
                if (isNaN(expLong))
                    throw new Error('⛔ value of SKELETON_CACHE_EXP in .env must be Number type. this is number of hour to expire SKELETON-CACHED-DATA. exp: 12')

                // const expDate = Date.now() + expLong * 60 * 60 * 1000;
                const expDate = Date.now() + 10000;
                global['SKELETON-CACHE-EXP'] = expDate;
            })
}





/**
 *  1) response vaidation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(req) {
    const skeletonFetch = als.get('skeletonFetch')

    //::1:: pass to skeleton fetch as params
    const ftechParams = {
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    return new Promise(function (resolve, reject) {
        skeletonFetch(ftechParams)
            .then(function (response) {
                responseValidation(response)

                // push data to updatedState
                const updatedState = als.get('updatedState')
                updatedState['skeleton'] = response.data
                als.set('updatedState', updatedState, true)

                resolve(updatedState);
            })
            .catch(function (err) {
                console.error(err);
                reject(err);
            })
    })
}
