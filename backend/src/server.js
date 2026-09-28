const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();
app.use(cors());
app.use(express.json());

// Pasang routes
app.use('/', authRoutes);
app.use('/', productRoutes);

app.listen(5000, ()=>{
    console.log('Server berhasil dijalankan');
})