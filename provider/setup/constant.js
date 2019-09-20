const path = require('path');

exports.CLIENT_NAME = 'client.js';
exports.CLIENT_PATH = './src/render/client.js';

exports.SERVER_NAME = 'server.js';
exports.SERVER_PATH = './src/render/server/server.js';

exports.DIST_ROUTE = '/dist';
exports.DIST_PATH = path.resolve(process.cwd(), './dist');

exports.SCSS_PATH = path.resolve(process.cwd(), './src/setup/style')
