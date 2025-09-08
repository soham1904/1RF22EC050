const express = require('express');
const shorturlRoutes = require('./routes/shorturlRoutes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/', shorturlRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});