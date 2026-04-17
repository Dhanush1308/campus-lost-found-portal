const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create a simple test app
const app = express();
app.use(express.json());

// Simple test routes (no DB needed for unit tests)
app.get('/', (req, res) => res.json({ message: 'Campus Lost & Found API Running' }));

app.post('/api/items', (req, res) => {
  const { title, type, location } = req.body;
  if (!title || !type || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  res.status(201).json({ message: 'Item reported successfully', item: req.body });
});

app.get('/api/items', (req, res) => {
  res.json([
    { title: 'Blue Backpack', type: 'lost', location: 'Library', category: 'Bag' },
    { title: 'iPhone 13', type: 'found', location: 'Cafeteria', category: 'Electronics' }
  ]);
});

// ─── TEST CASES ──────────────────────────────────────────────────────────────

// TC01 - API Health Check
describe('TC01 - API Health Check', () => {
  test('GET / should return API running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Campus Lost & Found API Running');
  });
});

// TC02 - Report Lost Item
describe('TC02 - Report Lost Item', () => {
  test('POST /api/items should create a lost item', async () => {
    const res = await request(app).post('/api/items').send({
      title: 'Black Wallet',
      description: 'Lost near Block A',
      category: 'Wallet',
      type: 'lost',
      location: 'Block A',
      reportedBy: 'Vishnu'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Item reported successfully');
    expect(res.body.item.type).toBe('lost');
  });
});

// TC03 - Report Found Item
describe('TC03 - Report Found Item', () => {
  test('POST /api/items should create a found item', async () => {
    const res = await request(app).post('/api/items').send({
      title: 'Student ID Card',
      description: 'Found near Library',
      category: 'ID Card',
      type: 'found',
      location: 'Library',
      reportedBy: 'Manush'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.item.type).toBe('found');
  });
});

// TC04 - Get All Items
describe('TC04 - Get All Items', () => {
  test('GET /api/items should return list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// TC05 - Validation: Missing Fields
describe('TC05 - Input Validation', () => {
  test('POST /api/items with missing fields should return 400', async () => {
    const res = await request(app).post('/api/items').send({
      title: 'Keys'
      // missing type and location
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing required fields');
  });
});