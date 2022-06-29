const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
