import React, { useEffect, useState, useCallback } from "react";
import { getBookingsAdmin, updateBookingAdmin, deleteBookingAdmin } from "../../services/adminApiService";
import { 
  FaSearch, FaSpinner, 
  FaTrash, FaCheck, FaTimes, FaUser, FaEnvelope, FaBed 
} from "react-icons/fa";
import "../../styles/global.css";
import "../../styles/Dashboard.css"; // Reuse card styles

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBookingsAdmin();
      setBookings(res.data.data || res.data || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setError(err.response?.data?.message || "Failed to load bookings");
      // Fallback to mock data if needed or just empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateBookingAdmin(id, { status: newStatus });
      fetchBookings();
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBookingAdmin(id);
      fetchBookings();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const filteredBookings = bookings.filter(b => {
    const guestName = (b.userId?.name || b.guestName || "").toLowerCase();
    const guestEmail = (b.userId?.email || b.guestEmail || "").toLowerCase();
    const searchMatch = guestName.includes(searchTerm.toLowerCase()) || guestEmail.includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "All" || b.status === statusFilter;
    return searchMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Fetching guest bookings...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Booking Management</h1>
          <span>Manage all guest reservations and check-ins</span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input 
              type="text" 
              placeholder="Search by Guest Name or Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
            />
          </div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', minWidth: '150px' }}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guest Details</th>
                <th>Room / stay</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}><FaUser size={12} /> {b.userId?.name || b.guestName || "Guest"}</span>
                      <small style={{ color: '#666' }}><FaEnvelope size={10} /> {b.userId?.email || b.guestEmail || "N/A"}</small>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}><FaBed size={12} /> {b.roomId?.name || b.roomType || "Room"}</span>
                      <small style={{ color: '#666' }}>{new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}</small>
                    </div>
                  </td>
                  <td>₹{parseFloat(b.totalPrice || 0).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${(b.status || '').toLowerCase() || 'pending'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="actions">
                    {b.status === 'pending' && (
                      <button className="edit-btn" title="Confirm" onClick={() => handleStatusUpdate(b._id, 'confirmed')} style={{ background: '#4CAF50' }}>
                        <FaCheck />
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button className="delete-btn" title="Cancel" onClick={() => handleStatusUpdate(b._id, 'cancelled')}>
                        <FaTimes />
                      </button>
                    )}
                    <button className="delete-btn" title="Delete Permanent" onClick={() => handleDelete(b._id)} style={{ background: '#333' }}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingManagement;
