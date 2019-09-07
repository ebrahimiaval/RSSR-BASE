// load .env files and define environment varibale before all actions
require('./setup/evnLoader');
// define global.FILE_VERSION for dist file version. see render/Index.js template. ::5::
require('./setup/fileVersion');

const
    open = require('open'),
    path = require('path'),
    express = require('express'),
    // webpack
    webpack = require('webpack'),
    config = require('./webpack.development'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackHotServerMiddleware = require('webpack-hot-server-middleware'),
    //
    c = require('./setup/constant'),
    devServerIsReady = require('./setup/devServerIsReady');





// express app
const app = express();

// create webpack compiler
const compiler = webpack(config);

// make bundled project source files accessable from memory
app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: c.ROUTE_DIST
}));

// static files
app.use(express.static(path.resolve(process.cwd(), './public')));

// recompile webpack when file changes
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));

// hot update Webpack bundles on the server
app.use(webpackHotServerMiddleware(compiler));





// run server
const PORT = process.env.PORT || 4000;

app.listen(PORT, error => {
    if (error) {
        return console.error('Error in server.development.js: ', error);
    } else {
        // wait to project built and app ready
        devServerIsReady(PORT)
            .then(function () {
                // open project in browser
                open(`http://localhost:${PORT}`);

                console.log(`development server running at http://localhost:${process.env.PORT}`);
            })
    }
});
