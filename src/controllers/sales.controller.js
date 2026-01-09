const pool = require('../config/db');

exports.createSale = async (req, res) => {
  const { items, payment_mode } = req.body;

  if (!items || items.length === 0 || !payment_mode) {
    return res.status(400).json({ message: 'Items and payment mode required' });
  }

  const connection = await pool.promise().getConnection();

  try {
    await connection.beginTransaction();

    let total = 0;

    // Calculate total
    for (let item of items) {
      total += item.price * item.qty;
    }

    // Insert sale
    const [saleResult] = await connection.query(
      'INSERT INTO sales (total_amount, payment_mode) VALUES (?, ?)',
      [total, payment_mode]
    );

    const saleId = saleResult.insertId;

    // Insert sale items & update stock
    for (let item of items) {
      await connection.query(
        'INSERT INTO sale_items (sale_id, product_id, qty, price) VALUES (?, ?, ?, ?)',
        [saleId, item.product_id, item.qty, item.price]
      );

      await connection.query(
        'UPDATE products SET stock_qty = stock_qty - ? WHERE id = ?',
        [item.qty, item.product_id]
      );
    }

    await connection.commit();
    connection.release();

    res.status(201).json({
      message: 'Sale created successfully',
      saleId,
      total
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('SALE ERROR:', error);
    res.status(500).json({ message: 'Sale failed' });
  }
};

exports.getSales = async (req, res) => {
  const [rows] = await pool.promise().query(
    'SELECT * FROM sales ORDER BY created_at DESC'
  );
  res.json(rows);
};
