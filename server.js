/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));

app.get('*', (_, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on: http://localhost:${PORT}`);
});
