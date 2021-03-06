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
  console.log(`Listening on: http://localhost:${PORT}`);
});
