import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', category: 'Electronics',
    type: 'lost', location: '', reportedBy: ''
  });
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${API}/items`);
    setItems(res.data);
  };

  const handleSubmit = async () => {
    await axios.post(`${API}/items`, form);
    alert('Item reported successfully!');
    fetchItems();
    setActiveTab('home');
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: '#1a237e', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>🔍 Campus Lost & Found Portal</h1>
        <p style={{ margin: '5px 0 0' }}>Report and find lost items on campus</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['home', 'report'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '10px 20px', background: activeTab === tab ? '#1a237e' : '#e0e0e0',
              color: activeTab === tab ? 'white' : 'black', border: 'none',
              borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {tab === 'home' ? '🏠 All Items' : '➕ Report Item'}
          </button>
        ))}
      </div>

      {activeTab === 'home' && (
        <div>
          <h2>All Reported Items ({items.length})</h2>
          {items.length === 0 && <p style={{ color: '#999' }}>No items reported yet.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {items.map(item => (
              <div key={item._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                <span style={{ background: item.type === 'lost' ? '#ffebee' : '#e8f5e9',
                  color: item.type === 'lost' ? '#c62828' : '#2e7d32',
                  padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {item.type.toUpperCase()}
                </span>
                <h3 style={{ margin: '10px 0 5px' }}>{item.title}</h3>
                <p style={{ margin: '0 0 5px', color: '#555' }}>{item.description}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>
                  📍 {item.location} | 🏷️ {item.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2>Report a Lost / Found Item</h2>
          {[
            { label: 'Your Name', key: 'reportedBy', type: 'text' },
            { label: 'Item Title', key: 'title', type: 'text' },
            { label: 'Description', key: 'description', type: 'text' },
            { label: 'Location', key: 'location', type: 'text' },
          ].map(({ label, key, type }) => (
            <div key={key} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{label}</label>
              <input type={type} value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd',
                  borderRadius: '5px', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                {['Electronics', 'Books', 'Keys', 'Bag', 'ID Card', 'Wallet', 'Other'].map(c =>
                  <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#1a237e', color: 'white', border: 'none',
              padding: '12px 30px', borderRadius: '5px', cursor: 'pointer',
              fontSize: '16px', fontWeight: 'bold' }}>
            Submit Report
          </button>
        </div>
      )}
    </div>
  );
}

export default App;