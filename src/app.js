const express = require('express');
const cors = require('cors');

require('./config/db');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend + DB + Auth running'
  });
});

app.post('/test', (req, res) => {
  res.json({ message: 'POST working', body: req.body });
});

const authMiddleware = require('./middlewares/auth.middleware');

app.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authorized',
    user: req.user
  });
});

const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

const salesRoutes = require('./routes/sales.routes');
app.use('/api/sales', salesRoutes);

const reportRoutes = require('./routes/report.routes');
app.use('/api/reports', reportRoutes);


module.exports = app;
