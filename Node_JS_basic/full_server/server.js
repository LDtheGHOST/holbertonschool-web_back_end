const express = require('express');
const router = require('./routes/index');

const port = 1245;
const app = express();

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export default app;