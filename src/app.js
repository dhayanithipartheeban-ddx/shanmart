const express = require('express');
const cors = require('cors');
const path = require('path');

require('./config/db');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const salesRoutes = require('./routes/sales.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;
