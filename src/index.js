const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import our routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transferRoutes = require('./routes/transferRoutes');
const adminRoutes = require('./routes/adminRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Import our DB connection utility
const connectDB = require('./config/dbConfig');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

