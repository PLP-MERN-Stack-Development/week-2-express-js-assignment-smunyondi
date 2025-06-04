const { ValidationError } = require('../errors/customErrors');

function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name === 'string' &&
    typeof description === 'string' &&
    typeof price === 'number' &&
    typeof category === 'string' &&
    typeof inStock === 'boolean'
  ) {
    next();
  } else {
    next(new ValidationError('Invalid product data'));
  }
}

module.exports = { validateProduct };