const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'src/fake-api/db.json'));
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

// Handle preflight
if (req.method === 'OPTIONS') {
return res.sendStatus(200);
}
next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

// Export for Vercel serverless
module.exports = server;