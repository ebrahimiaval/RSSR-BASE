// load .env files and define environment varibale before all actions
require('./setup/evnLoader');

const
    path = require('path'),
    seoOptimization = require('./setup/seoOptimization'),
    rateLimit = require('./setup/rateLimit'),
    express = require('express'),
    serverRendererPath = path.resolve(process.cwd(), './dist/server.js'),
    serverRenderer = require(serverRendererPath).default,
    clientStatsPath = path.resolve(process.cwd(), './dist/stats.json'),
    stats = require(clientStatsPath),
    c = require('./setup/constant');


// express app
const app = express();



// make bundled final project source files accessable
app.use(c.route.dist, express.static(c.path.dist));

// load static files
app.use(express.static(path.resolve(process.cwd(), 'public'), {maxage: '7d'}));

// Redirect from www to non-www and remove slash at the end of URL
seoOptimization(app);

// limit the request number of each user in 'windowMs' milliseconds
rateLimit(app);

// load server script and render app (do react SSR)
app.use(serverRenderer(stats));





// run server
const
    PORT = process.env.PORT || 3000,
    HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, error => {
    if (error)
        return console.error('Error in server.production.js: ', error);
    else
        console.log(`production server running at http://localhost:${process.env.PORT}`);
});
