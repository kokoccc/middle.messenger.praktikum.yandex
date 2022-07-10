const path = require('path');
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on: http://localhost:${PORT}`);
});
