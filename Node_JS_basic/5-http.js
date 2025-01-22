const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // Redirige temporairement console.log pour capturer les messages
    const logs = [];
    const originalConsoleLog = console.log;
    console.log = (message) => logs.push(message);

    countStudents(process.argv[2])
      .then(() => {
        // Restaure console.log à son état initial
        console.log = originalConsoleLog;

        // Combine les messages capturés et les ajoute à la réponse
        res.end(`This is the list of our students\n${logs.join('\n')}`);
      })
      .catch((error) => {
        console.log = originalConsoleLog; // Restaure console.log même en cas d'erreur
        res.statusCode = 500;
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;