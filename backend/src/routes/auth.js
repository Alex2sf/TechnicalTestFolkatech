const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { formatResource, formatError } = require('../utils/response');

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    const name = `${first_name || ''} ${last_name || ''}`.trim() || 'User';

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json(formatError(409, 'Conflict', 'Email sudah terdaftar'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, name, email, hashedPassword, phone]
    );

    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json(
      formatResource(
        'users',
        { id: result.insertId, name, email, phone },
        { token, message: 'Registrasi berhasil' }
      )
    );
  } catch (err) {
    return res.status(500).json(formatError(500, 'Server Error', err.message));
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json(formatError(400, 'Bad Request', 'Email atau password salah'));
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(formatError(401, 'Unauthorized', 'Email atau password salah'));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.json(
      formatResource(
        'users',
        { id: user.id, name: user.name, email: user.email },
        { token, message: 'Login berhasil' }
      )
    );
  } catch (err) {
    return res.status(500).json(formatError(500, 'Server Error', err.message));
  }
});

module.exports = router;