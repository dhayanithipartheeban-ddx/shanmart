const pool = require('../config/db');

exports.todaySales = async (req, res) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      COUNT(*) as total_bills,
      SUM(total_amount) as total_sales
    FROM sales
    WHERE DATE(created_at) = CURDATE()
    `
  );

  res.json(rows[0]);
};

exports.monthSales = async (req, res) => {
  const [rows] = await pool.promise().query(
    `
    SELECT 
      DATE(created_at) as date,
      SUM(total_amount) as total
    FROM sales
    WHERE MONTH(created_at) = MONTH(CURDATE())
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at)
    `
  );

  res.json(rows);
};
