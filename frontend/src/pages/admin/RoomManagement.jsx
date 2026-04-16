import React, { useEffect, useState, useCallback } from "react";
import { getRoomsAdmin, createRoom, updateRoom, deleteRoom } from "../../services/adminApiService";
import "../../styles/RoomManagement.css";
import "../../styles/global.css";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaBed } from "react-icons/fa";

const mockRooms = [
  { _id: '1', name: 'Deluxe Room 101', type: 'Deluxe', price: 15000, status: 'Available' },
  { _id: '2', name: 'Deluxe Room 102', type: 'Deluxe', price: 15000, status: 'Occupied' },
  { _id: '3', name: 'Executive Suite 301', type: 'Suite', price: 35000, status: 'Available' }
];

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    status: 'available',
    image: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const STATUS_OPTIONS = [
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRoomsAdmin();
      const data = response.data.data || response.data || [];
      setRooms(data.length > 0 ? data : mockRooms);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch rooms');
      setRooms(mockRooms);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, formData);
        setSuccess('Room updated successfully!');
      } else {
        await createRoom(formData);
        setSuccess('Room added successfully!');
      }
      fetchRooms();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setDeletingId(roomId);
      await deleteRoom(roomId);
      setSuccess('Room deleted successfully!');
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingRoom(null);
    setFormData({ name: '', type: '', price: '', status: 'available', image: '' });
    setError(null);
  };

const filteredRooms = rooms.filter(room =>
  (room.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (room.type || '').toLowerCase().includes(searchTerm.toLowerCase())
);

if (loading) {
  return (
    <div className="dashboard-loading">
      <FaSpinner className="spinner" />
      <p>Loading rooms...</p>
    </div>
  );
}

return (
  <div className="dashboard-content">
    <div className="dashboard-header">
      <div>
        <h1>Room Management</h1>
        <span>Manage hotel inventory and status</span>
      </div>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Room
      </button>
    </div>

    <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div className="search-box" style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="Search rooms by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
        </div>
      </div>
    </div>

    {error && <div className="error-banner">{error}</div>}
    {success && <div className="success-banner">{success}</div>}

    <div className="table-card">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Room Info</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room._id}>
                <td><FaBed size={12} style={{ marginRight: '8px', color: '#C6AA76' }} /> <strong>{room.name}</strong></td>
                <td>{room.type}</td>
                <td>₹{parseFloat(room.price).toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${(room.status || '').toLowerCase()}`}>
                    {room.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(room)}><FaEdit /></button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(room._id)}
                    disabled={deletingId === room._id}
                  >
                    {deletingId === room._id ? <FaSpinner className="spin" /> : <FaTrash />}
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
            <h2>{editingRoom ? 'Edit Room' : 'New Room'}</h2>
            <button className="close-btn" onClick={closeModal}><FaTimes /></button>
          </div>
          <form className="modal-form" onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <div className="form-group">
              <label>Room Name</label>
              <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <input name="type" type="text" value={formData.type} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input name="price" type="number" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input name="image" type="text" value={formData.image || ''} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="save-btn" style={{ flex: 1 }}>{editingRoom ? 'Save' : 'Add'}</button>
              <button type="button" className="cancel-btn" onClick={closeModal} style={{ flex: 1 }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}

export default RoomManagement;
