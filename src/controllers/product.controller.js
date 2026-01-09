const pool = require('../config/db');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock_qty } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price required' });
    }

    await pool.promise().query(
      'INSERT INTO products (name, price, stock_qty) VALUES (?, ?, ?)',
      [name, price, stock_qty || 0]
    );

    res.status(201).json({ message: 'Product added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  const [rows] = await pool.promise().query(
    'SELECT * FROM products ORDER BY created_at DESC'
  );
  res.json(rows);
};
