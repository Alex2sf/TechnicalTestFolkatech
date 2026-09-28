const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { formatCollection, formatResource, formatError } = require('../utils/response');

router.get('/list-product', authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      search = '',
      origin,
      species,
      roast_level,
      tasted,
      processing,
      max_price,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const conditions = ['is_active = 1'];
    const values = [];

    if (search) {
      conditions.push('name LIKE ?');
      values.push(`%${search}%`);
    }

    if (origin) {
      conditions.push('origin = ?');
      values.push(origin);
    }

    if (species) {
      conditions.push('species = ?');
      values.push(species);
    }

    if (roast_level) {
      conditions.push('roast_level = ?');
      values.push(roast_level);
    }

    if (tasted) {
      conditions.push('tasted LIKE ?');
      values.push(`%${tasted}%`);
    }

    if (processing) {
      conditions.push('processing = ?');
      values.push(processing);
    }

    if (max_price) {
      conditions.push('price <= ?');
      values.push(Number(max_price));
    }

    const whereClause = conditions.join(' AND ');

    const countSql = `SELECT COUNT(*) as total FROM products WHERE ${whereClause}`;
    const [countResult] = await pool.query(countSql, values);
    const total = countResult[0].total;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;
    const totalPages = Math.ceil(total / limitNum);

    const allowedSorts = ['name', 'price', 'created_at', 'rating'];
    const validSort = allowedSorts.includes(sort) ? sort : 'created_at';
    const validOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const dataSql = `
      SELECT * FROM products 
      WHERE ${whereClause} 
      ORDER BY ${validSort} ${validOrder} 
      LIMIT ? OFFSET ?
    `;
    const [products] = await pool.query(dataSql, [...values, limitNum, offset]);

    return res.json(
      formatCollection(
        'products',
        products,
        {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages
        },
        {
          self: `/list-product?page=${pageNum}&limit=${limitNum}`
        }
      )
    );
  } catch (err) {
    return res.status(500).json(formatError(500, 'Server Error', err.message));
  }
});

router.get('/product/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json(formatError(404, 'Not Found', 'Produk tidak ditemukan'));
    }
    return res.json(formatResource('products', rows[0]));
  } catch (err) {
    return res.status(500).json(formatError(500, 'Server Error', err.message));
  }
});

module.exports = router;
