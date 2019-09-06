/**
 * queryStringParams
 */
export const clientQueryString = () => {
    // ignore server render
    if (typeof window === 'undefined')
        return;

    let params = {};

    const queryString = window.location.search;

    if (queryString === '')
        return params;

    queryString.slice(1).split('&').forEach((item) => {
        const
            i = item.split('='),
            key = decodeURIComponent(i[0]),
            vlaue = (i[1] !== undefined) ? decodeURIComponent(i[1].replace(/(%20)/g, () => ' ')) : '';
        //
        params[key] = vlaue;
    });

    return params;
}

