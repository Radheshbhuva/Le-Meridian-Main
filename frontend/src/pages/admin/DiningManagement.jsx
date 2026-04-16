import React, { useEffect, useState, useCallback } from "react";
import { getDiningItems, createDiningItem, updateDiningItem, deleteDiningItem } from "../../services/adminApiService";
import "../../styles/DiningManagement.css";
import "../../styles/global.css";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaUtensils } from "react-icons/fa";

const mockDiningItems = [
  { _id: 'd1', name: 'Grilled Lobster Thermidor', category: 'Main Course', price: 1500, availability: 'Yes' },
  { _id: 'd2', name: 'Seared Scallops', category: 'Appetizers', price: 800, availability: 'Yes' },
  { _id: 'd3', name: 'Tiramisu', category: 'Dessert', price: 500, availability: 'Yes' },
  { _id: 'd4', name: 'Champagne Moët', category: 'Drinks', price: 2000, availability: 'Yes' },
  { _id: 'd5', name: 'Wagyu Beef Steak', category: 'Main Course', price: 2500, availability: 'Yes' }
];

function DiningManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Appetizers',
    price: '',
    availability: 'Yes'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const CATEGORIES = ['All', 'Appetizers', 'Main Course', 'Dessert', 'Drinks', 'Beverages'];

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDiningItems();
      const data = response.data.data || response.data || [];
      setItems(data.length > 0 ? data : mockDiningItems);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch menu items');
      setItems(mockDiningItems);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDiningItem(editingItem._id, formData);
        setSuccess('Menu item updated!');
      } else {
        await createDiningItem(formData);
        setSuccess('Menu item added!');
      }
      fetchItems();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setDeletingId(itemId);
      await deleteDiningItem(itemId);
      setSuccess('Menu item deleted!');
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', category: 'Appetizers', price: '', availability: 'Yes' });
    setError(null);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Dining Management</h1>
          <span>Add and manage restaurant menu items</span>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Menu Item
        </button>
      </div>

      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
            />
          </div>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', minWidth: '150px' }}
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      <div className="table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td><FaUtensils size={12} style={{ marginRight: '8px', color: '#C6AA76' }}/> {item.name}</td>
                  <td>
                    <span className={`category-badge`}>
                      {item.category}
                    </span>
                  </td>
                  <td>₹{parseFloat(item.price).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${(item.availability || '').toLowerCase() === 'yes' ? 'confirmed' : 'cancelled'}`}>
                      {item.availability === 'Yes' ? 'Available' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(item)}><FaEdit /></button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? <FaSpinner className="spin" /> : <FaTrash />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Dish' : 'New Dish'}</h2>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input name="price" type="number" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Available?</label>
                <select name="availability" value={formData.availability} onChange={handleInputChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>{editingItem ? 'Save' : 'Add'}</button>
                <button type="button" className="cancel-btn" onClick={closeModal} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiningManagement;

