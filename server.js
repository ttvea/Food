const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs'); // Để debug nếu cần

const server = jsonServer.create();

// Sử dụng process.cwd() thay __dirname (khuyến nghị Vercel)
const dbPath = path.join(process.cwd(), 'src/fake-api/db.json');

console.log('DB path:', dbPath); // Debug trong Vercel logs

// Kiểm tra file tồn tại
if (!fs.existsSync(dbPath)) {
    console.error('db.json not found at:', dbPath);
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// CORS của bạn OK, giữ nguyên
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

server.use(jsonServer.bodyParser);
server.use(router);

module.exports = server;