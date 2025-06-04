require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const productsRouter = require('./routes/products');
const { NotFoundError, ValidationError } = require('./errors/customErrors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(bodyParser.json());
app.use(auth);

app.get('/', (req, res) => {
  res.send('Hello World! Welcome To My Product API.');
});

app.use('/api/products', productsRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Product API running at http://localhost:${PORT}`);
});

module.exports = app;