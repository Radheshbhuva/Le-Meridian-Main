import React, { useEffect, useState, useCallback } from 'react';
import { getOffersAdmin, createOffer, updateOffer, deleteOffer } from '../../services/adminApiService';
import '../../styles/OffersManagement.css';
import '../../styles/global.css';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaSearch, FaTimes, FaTag } from 'react-icons/fa';

const mockOffers = [
  { _id: 'o1', title: 'Early Bird Special', discount: '20% OFF', validFrom: '2024-03-01', validTo: '2024-05-31', status: 'Active' },
  { _id: 'o2', title: 'Honeymoon Package', discount: 'Free Spa + Wine', validFrom: '2024-02-01', validTo: '2024-06-30', status: 'Active' },
  { _id: 'o3', title: 'Corporate Stay', discount: '15% OFF for Groups', validFrom: '2024-04-01', validTo: '2024-12-31', status: 'Upcoming' }
];

function OffersManagement() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    discount: '',
    validFrom: '',
    validTo: '',
    status: 'Active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getOffersAdmin();
      const data = response.data.data || response.data || [];
      setOffers(data.length > 0 ? data : mockOffers);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch offers');
      setOffers(mockOffers);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOffer) {
        await updateOffer(editingOffer._id, formData);
        setSuccess('Offer updated successfully!');
      } else {
        await createOffer(formData);
        setSuccess('Offer created successfully!');
      }
      fetchOffers();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete this offer?")) return;
    try {
      setDeletingId(id);
      await deleteOffer(id);
      setSuccess('Offer removed');
      fetchOffers();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData(offer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingOffer(null);
    setFormData({ title: '', discount: '', validFrom: '', validTo: '', status: 'Active' });
    setError(null);
  };

  const filteredOffers = offers.filter(offer =>
    (offer.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Loading curated offers...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Offers & Packages</h1>
          <span>Manage seasonal discounts and special treats</span>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Create Offer
        </button>
      </div>

      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="search-box" style={{ flex: 1, position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search active offers..." 
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
                <th>Offer Details</th>
                <th>Benefit</th>
                <th>Validity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaTag style={{ color: '#C6AA76' }} />
                      <span style={{ fontWeight: 600 }}>{offer.title}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ color: '#C6AA76', fontWeight: 700 }}>{offer.discount}</span>
                  </td>
                  <td>
                    <small>From: {new Date(offer.validFrom).toLocaleDateString()}</small><br/>
                    <small>To: {new Date(offer.validTo).toLocaleDateString()}</small>
                  </td>
                  <td>
                    <span className={`status-badge status-${(offer.status || '').toLowerCase()}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(offer)}><FaEdit /></button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(offer._id)}
                      disabled={deletingId === offer._id}
                    >
                      {deletingId === offer._id ? <FaSpinner className="spin" /> : <FaTrash />}
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
              <h2>{editingOffer ? 'Edit Offer' : 'New Special Offer'}</h2>
              <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit} style={{ padding: '20px' }}>
              <div className="form-group">
                <label>Offer Title</label>
                <input name="title" type="text" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Discount / Benefit</label>
                <input name="discount" type="text" placeholder="e.g. 20% OFF or Free Massage" value={formData.discount} onChange={handleInputChange} required />
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Start Date</label>
                  <input name="validFrom" type="date" value={formData.validFrom?.split('T')[0]} onChange={handleInputChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>End Date</label>
                  <input name="validTo" type="date" value={formData.validTo?.split('T')[0]} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="save-btn" style={{ flex: 1 }}>{editingOffer ? 'Save' : 'Add'}</button>
                <button type="button" className="cancel-btn" onClick={closeModal} style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OffersManagement;
