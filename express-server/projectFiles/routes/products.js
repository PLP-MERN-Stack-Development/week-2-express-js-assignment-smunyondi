const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../errors/customErrors');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// GET /api/products - List with filtering, search, pagination
router.get('/', (req, res) => {
  let result = [...products];

  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  if (req.query.inStock) {
    const inStock = req.query.inStock === 'true';
    result = result.filter(p => p.inStock === inStock);
  }
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginated
  });
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    next(new NotFoundError('Product not found'));
  }
});

// POST /api/products
router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    res.status(201).json({ message: 'Product successfully created', product: newProduct });
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      products[index] = { id: req.params.id, ...req.body, updatedAt: new Date().toISOString() };
      res.json({ message: 'Product updated', product: products[index] });
    } else {
      throw new NotFoundError('Product not found');
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
      products.splice(index, 1);
      res.status(204).send();
    } else {
      throw new NotFoundError('Product not found');
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ countByCategory: stats, total: products.length });
});

module.exports = router;