const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Item Schema
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: { type: String, enum: ['lost', 'found'] },
  location: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  reportedBy: String
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/', (req, res) => res.json({ message: 'Campus Lost & Found API Running' }));

// Get all items
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Report lost/found item
app.post('/api/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json({ message: 'Item reported successfully', item });
});

// Search items
app.get('/api/items/search', async (req, res) => {
  const { category, type } = req.query;
  const items = await Item.find({ category, type });
  res.json(items);
});

// Update item status
app.put('/api/items/:id', async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));