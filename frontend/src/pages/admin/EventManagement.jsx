import React, { useEffect, useState, useCallback } from "react";
import { getEventsAdmin, createEvent, updateEvent, deleteEvent } from "../../services/adminApiService";
import "../../styles/EventManagement.css";
import "../../styles/global.css";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

const mockEvents = [
  { _id: 'e1', name: 'Grand Wedding Gala', date: '2024-03-15', venue: 'Ballroom', price: 250000, status: 'Upcoming' },
  { _id: 'e2', name: 'Corporate Conference', date: '2024-02-20', venue: 'Conference Hall', price: 150000, status: 'Completed' },
  { _id: 'e3', name: 'Anniversary Celebration', date: '2024-04-10', venue: 'Rooftop Terrace', price: 180000, status: 'Upcoming' }
];

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    price: '',
    status: 'Upcoming'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const STATUSES = ['All', 'Upcoming', 'Completed'];

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEventsAdmin();
      const data = response.data.data || response.data || [];
      setEvents(data.length > 0 ? data : mockEvents);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch events');
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, formData);
        setSuccess('Event updated successfully!');
      } else {
        await createEvent(formData);
        setSuccess('Event created successfully!');
      }
      fetchEvents();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setDeletingId(eventId);
      await deleteEvent(eventId);
      setSuccess('Event deleted!');
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({ name: '', date: '', venue: '', price: '', status: 'Upcoming' });
    setError(null);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Event Management</h1>
          <span>Manage banquet halls and private events</span>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Event
        </button>
      </div>

      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
            />
          </div>
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', minWidth: '150px' }}
          >
            {STATUSES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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
                <th>Event Info</th>
                <th>Venue</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>{event.name}</span>
                      <small style={{ color: '#666' }}>{formatDate(event.date)}</small>
                    </div>
                  </td>
                  <td><FaMapMarkerAlt size={12} style={{ marginRight: '5px' }}/> {event.venue}</td>
                  <td>₹{parseFloat(event.price).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${(event.status || '').toLowerCase()}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(event)}><FaEdit /></button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(event._id)}
                      disabled={deletingId === event._id}
                    >
                      {deletingId === event._id ? <FaSpinner className="spin" /> : <FaTrash />}
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
              <h2>{editingEvent ? 'Edit Event' : 'New Event'}</h2>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Event Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Date</label>
                  <input name="date" type="date" value={formData.date?.split('T')[0]} onChange={handleInputChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Venue</label>
                  <input name="venue" type="text" value={formData.venue} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input name="price" type="number" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>{editingEvent ? 'Save' : 'Add'}</button>
                <button type="button" className="cancel-btn" onClick={closeModal} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManagement;
