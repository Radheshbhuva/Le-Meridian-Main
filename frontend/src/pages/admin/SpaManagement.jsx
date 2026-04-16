import React, { useEffect, useState, useCallback } from "react";
import { getSpaServices, createSpaService, updateSpaService, deleteSpaService } from "../../services/adminApiService";
import "../../styles/SpaManagement.css";
import "../../styles/global.css";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaSpa } from "react-icons/fa";

const mockSpaServices = [
  { _id: 's1', name: 'Swedish Massage', duration: '60min', price: 4500, therapist: 'Anita Sharma' },
  { _id: 's2', name: 'Hot Stone Therapy', duration: '90min', price: 6000, therapist: 'Rajesh Kumar' },
  { _id: 's3', name: 'Aromatherapy', duration: '60min', price: 4000, therapist: 'Priya Menon' }
];

function SpaManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: '60min',
    price: '',
    therapist: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const DURATIONS = ['All', '60min', '90min', '120min', '150min'];
  
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSpaServices();
      const data = response.data.data || response.data || [];
      setServices(data.length > 0 ? data : mockSpaServices);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch spa services');
      setServices(mockSpaServices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateSpaService(editingService._id, formData);
        setSuccess('Spa service updated!');
      } else {
        await createSpaService(formData);
        setSuccess('Spa service added!');
      }
      fetchServices();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setDeletingId(serviceId);
      await deleteSpaService(serviceId);
      setSuccess('Spa service deleted!');
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ name: '', duration: '60min', price: '', therapist: '' });
    setError(null);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = (service.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = selectedDuration === 'All' || service.duration === selectedDuration;
    return matchesSearch && matchesDuration;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Loading spa services...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Spa Management</h1>
          <span>Manage wellness and therapy services</span>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
            />
          </div>
          <select 
            value={selectedDuration} 
            onChange={(e) => setSelectedDuration(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', minWidth: '150px' }}
          >
            {DURATIONS.map(dur => <option key={dur} value={dur}>{dur}</option>)}
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
                <th>Service Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Therapist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service._id}>
                  <td><FaSpa size={12} style={{ marginRight: '8px', color: '#C6AA76' }}/> {service.name}</td>
                  <td>
                    <span className="duration-badge">
                      {service.duration}
                    </span>
                  </td>
                  <td>₹{parseFloat(service.price).toLocaleString()}</td>
                  <td>{service.therapist}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(service)}><FaEdit /></button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(service._id)}
                      disabled={deletingId === service._id}
                    >
                      {deletingId === service._id ? <FaSpinner className="spin" /> : <FaTrash />}
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
              <h2>{editingService ? 'Edit Service' : 'New Service'}</h2>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Service Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <select name="duration" value={formData.duration} onChange={handleInputChange}>
                  {DURATIONS.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input name="price" type="number" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Primary Therapist</label>
                <input name="therapist" type="text" value={formData.therapist} onChange={handleInputChange} required />
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>{editingService ? 'Save' : 'Add'}</button>
                <button type="button" className="cancel-btn" onClick={closeModal} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpaManagement;

