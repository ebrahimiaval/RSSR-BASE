import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";


export const skeletonFetchProvider = async function (req) {
    const skeletonFetch = als.get('skeletonFetch')

    // App component does not skeleton() property
    if (!skeletonFetch) {
        debugLog('WITH OUT SKELETON. App Component has not skeleton property')
        return true;
    }

    // cache is disabled
    if (typeof skeletonFetch.cache !== "number" || skeletonFetch.cache <= 0) {
        debugLog('skeleton WITH OUT CACHE. skeleton.cache is not number and more than ziro')
        await skeletonGetDataFromApi(req);
        return true;
    }

    // delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];

    // when cache data exist
    if (data !== undefined) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            debugLog('READ skeleton data from CACHE')
            als.set('updatedState', data, true)
            return true;
        } else {
            debugLog('skeleton cache EXPIRED')
            delete global['SKELETON-CACHED-DATA']
        }
    }

    await
        skeletonGetDataFromApi(req)
        // caching data
            .then(function () {
                debugLog('CACHING skeleton data')

                const updatedState = als.get('updatedState')
                global['SKELETON-CACHED-DATA'] = updatedState

                const expDate = Date.now() + skeletonFetch.cache * 60 * 60 * 1000;
                global['SKELETON-CACHE-EXP'] = expDate;
            })
}





/**
 *  1) response vaidation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(req) {
    const skeletonFetch = als.get('skeletonFetch')
    const updatedState = als.get('updatedState')

    debugLog('fetch skeleton data from API')

    //::1:: pass to skeleton fetch as params
    const ftechParams = {
        req: req, // Express js request object
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    return new Promise(function (resolve, reject) {
        skeletonFetch(ftechParams)
            .then(function (response) {
                responseValidation(response)

                // push data to updatedState
                updatedState['skeleton'] = response.data
                als.set('updatedState', updatedState, true)

                debugLog('fetch skeleton data SUCCESSFULLY')
                resolve(updatedState);
            })
            .catch(function (err) {
                debugLog('ERROR in fetch skeleton')
                // console.error(err);

                // push data to updatedState
                updatedState['skeletonError'] = true;
                als.set('updatedState', updatedState, true)

                reject(err);
            })
    })
}




// active switch for debuging logs
const debug = JSON.parse(process.env.RSSR_SKELETON_DEBUG);
function debugLog(msg) {
    if (debug)
        console.info('SKELETON > ' + msg)
}
