/**
 * API path of your application.
 * exp:
 *  if you get home page data from 'https://api.site.com/home, you must
 *  define 'https://api.site.com' as API_HOST_IN_CLIENT and API_HOST_IN_SERVER
 *  in .env file in root of project, then in below api object define 'home' property with '/home' value
 *  and in fetchData method use 'api.home' to access to api url.
 */
let api = {
    // authentication
    signin: 'http://www.mocky.io/v2/5d70abc13300004d0077933f',
    signup: 'http://www.mocky.io/v2/5d70abc13300004d0077933f',
    forgetPassword : '/',
    resetPassword: {
        trust: '/',
        submit: '/',
    },

    posts: '/posts',
    userDetails: 'http://www.mocky.io/v2/5d70aee23300005a00779357',
    post: (id) => '/posts/' + id,
}





/**
 * NOTICE: if you have an API with different Host, must DEFINE HERE (after apiRouteBuilder) with full path.
 * exp:
 *  api.statistics = 'https://otherSite.com/api/statistics/2'
 */
// different Hosts
api.s404 = 'http://www.mocky.io/v2/5d285f852c000058003ed9c6';
api.s200_empty = 'http://www.mocky.io/v2/5d288a902c0000e3393edae5'; // empty data
api.s200_posts = 'http://www.mocky.io/v2/5d2881ef2c00008b633edab0'; // posts
api.s200_post = 'http://www.mocky.io/v2/5d28ae9e2c00005d693edbc8'; // empty data
api.s201 = 'http://www.mocky.io/v2/5d2862592c0000cd2f3ed9d9';
api.s500 = 'http://www.mocky.io/v2/5d287ce82c0000e3393eda93';
api.s502 = 'http://www.mocky.io/v2/5d287c622c00005c693eda90';
api.s504 = 'http://www.mocky.io/v2/5d2869b92c0000cd2f3eda17';


export {api};
