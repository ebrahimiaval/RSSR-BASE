const path = require('path');

// paths
module.exports = {
    NAME_CLIENT: 'client.js',
    NAME_SERVER: 'server.js',
    //
    ROUTE_DIST: '/dist',
    //
    PATH_CLIENT: './src/render/client.js',
    PATH_SERVER: './src/render/server/server.js',
    PATH_DIST: path.resolve(process.cwd(), './dist'),
    PATH_SCSS: path.resolve(process.cwd(), './src/setup/style')
}
