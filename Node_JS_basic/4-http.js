// 4-http.js
const http = require('http');

const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

module.exports = app;
