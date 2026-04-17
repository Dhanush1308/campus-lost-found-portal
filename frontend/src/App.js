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
    try {
      const res = await axios.get(`${API}/items`);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/items`, form);
      alert('Item reported successfully!');
      setForm({
        title: '', description: '', category: 'Electronics',
        type: 'lost', location: '', reportedBy: ''
      });
      fetchItems();
      setActiveTab('home');
    } catch (err) {
      console.error("Failed to report item:", err);
      alert('Failed to report item. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🔍 Campus Lost & Found</h1>
        <p>Report and find lost items on campus seamlessly</p>
      </header>

      <nav className="nav-bar">
        <button 
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          🏠 All Items
        </button>
        <button 
          className={`nav-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          ➕ Report Item
        </button>
      </nav>

      {activeTab === 'home' && (
        <main className="content-area">
          <h2 className="section-title">All Reported Items ({items.length})</h2>
          {items.length === 0 ? (
            <div className="empty-state glass-panel">
              <p>No items reported yet. It's a good day!</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map(item => (
                <article key={item._id} className="item-card glass-panel">
                  <div className="item-header">
                    <h3 className="item-title">{item.title}</h3>
                    <span className={`badge ${item.type}`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="item-desc">{item.description}</p>
                  <div className="item-meta">
                    <span className="meta-item" title="Location">
                      📍 {item.location}
                    </span>
                    <span className="meta-item" title="Category">
                      🏷️ {item.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      {activeTab === 'report' && (
        <main className="content-area">
          <div className="report-form glass-panel">
            <h2 className="section-title">Report a Lost or Found Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {[
                  { label: 'Your Name', key: 'reportedBy', type: 'text', placeholder: 'John Doe' },
                  { label: 'Item Title', key: 'title', type: 'text', placeholder: 'e.g., Blue Yeti Mug' },
                  { label: 'Location', key: 'location', type: 'text', placeholder: 'e.g., Library 2nd Floor' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="form-group">
                    <label>{label}</label>
                    <input 
                      type={type} 
                      className="form-control"
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      required
                    />
                  </div>
                ))}
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    className="form-control"
                    placeholder="Provide detailed description..."
                    rows="3"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-grid two-cols">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={form.category} 
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {['Electronics', 'Books', 'Keys', 'Bag', 'ID Card', 'Wallet', 'Other'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select 
                    className="form-control"
                    value={form.type} 
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="submit-btn">
                Submit Report
              </button>
            </form>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;