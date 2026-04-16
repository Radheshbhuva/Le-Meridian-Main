import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  FaBed, FaCalendarAlt, FaHotel, FaUsers, 
  FaArrowUp, FaArrowDown, FaSpinner, FaSyncAlt
} from 'react-icons/fa';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { getRoomsAdmin, getBookingsAdmin } from '../../services/adminApiService';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState({
    stats: [
      { id: 1, title: 'Total Bookings', value: '0', icon: <FaCalendarAlt />, trend: '+0%', isUp: true },
      { id: 2, title: 'Total Rooms', value: '0', icon: <FaBed />, trend: '+0%', isUp: true },
      { id: 3, title: 'Total Revenue', value: '₹0', icon: <FaHotel />, trend: '+0%', isUp: true },
      { id: 4, title: 'Active Guests', value: '0', icon: <FaUsers />, trend: '+0%', isUp: true }
    ],
    bookings: [],
    rooms: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a race condition to timeout the request if it hangs too long
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const [bookingsRes, roomsRes] = await Promise.all([
        getBookingsAdmin({ signal: controller.signal }),
        getRoomsAdmin({ signal: controller.signal })
      ]);

      clearTimeout(timeoutId);

      const bookings = bookingsRes.data.data || bookingsRes.data || [];
      const rooms = roomsRes.data.data || roomsRes.data || [];
      
      const revenue = bookings.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
      const activeGuests = bookings.filter(b => b.status === 'confirmed').length;

      setData({
        stats: [
          { id: 1, title: 'Total Bookings', value: bookings.length.toString(), icon: <FaCalendarAlt />, trend: '+12%', isUp: true },
          { id: 2, title: 'Total Rooms', value: rooms.length.toString(), icon: <FaBed />, trend: '0%', isUp: true },
          { id: 3, title: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, icon: <FaHotel />, trend: '+8%', isUp: true },
          { id: 4, title: 'Active Guests', value: activeGuests.toString(), icon: <FaUsers />, trend: '+5%', isUp: true }
        ],
        bookings: bookings.slice(0, 5),
        rooms
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      if (err.name === 'CanceledError' || err.name === 'AbortError') {
        setError("Dashboard metrics sync timed out. Please check your network or database connection.");
      } else {
        setError("Unable to sync dashboard analytics at this moment.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const chartData = useMemo(() => [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 }
  ], []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content" style={{ marginTop: '0' }}>
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <span>Real-time hospitality performance overview</span>
        </div>
        <button className="refresh-btn" onClick={fetchDashboardData} style={{ background: '#C6AA76', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaSyncAlt /> Sync Data
        </button>
      </div>

      {error && <div className="error-banner" style={{ margin: '20px 0', padding: '15px', background: '#fee2e2', color: '#dc2626', borderRadius: '10px', border: '1px solid #fecaca' }}>{error}</div>}

      <div className="stats-grid">
        {data.stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ padding: '20px', borderRadius: '15px', background: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="stat-icon" style={{ fontSize: '24px', color: '#C6AA76', background: 'rgba(198, 170, 118, 0.1)', padding: '15px', borderRadius: '12px' }}>{stat.icon}</div>
            <div className="stat-info">
              <h3 style={{ margin: 0, fontSize: '14px', color: '#666', fontWeight: 500 }}>{stat.title}</h3>
              <p className="value" style={{ margin: '5px 0', fontSize: '24px', fontWeight: 700 }}>{stat.value}</p>
              <span className={`trend ${stat.isUp ? 'up' : 'down'}`} style={{ fontSize: '12px', color: stat.isUp ? '#10b981' : '#ef4444' }}>
                {stat.isUp ? <FaArrowUp /> : <FaArrowDown />} {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="chart-card main-chart" style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
             <h2 style={{ fontSize: '18px', margin: 0 }}>Revenue Analytics</h2>
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6AA76" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#C6AA76" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} stroke="#999" />
                <YAxis fontSize={12} stroke="#999" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#C6AA76" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="table-card" style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Recent Bookings</h2>
            <Link to="/admin/bookings" style={{ color: '#C6AA76', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #f0f0f0' }}>
                  <th style={{ padding: '12px 10px', fontSize: '13px', color: '#999', fontWeight: 500 }}>Guest</th>
                  <th style={{ padding: '12px 10px', fontSize: '13px', color: '#999', fontWeight: 500 }}>Stay</th>
                  <th style={{ padding: '12px 10px', fontSize: '13px', color: '#999', fontWeight: 500 }}>Total</th>
                  <th style={{ padding: '12px 10px', fontSize: '13px', color: '#999', fontWeight: 500 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.map((booking) => (
                  <tr key={booking._id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                    <td style={{ padding: '15px 10px', fontSize: '14px', fontWeight: 500 }}>{booking.userId?.name || booking.guestName || 'Guest'}</td>
                    <td style={{ padding: '15px 10px', fontSize: '13px', color: '#666' }}>{booking.roomId?.name || booking.roomType || 'Room'}</td>
                    <td style={{ padding: '15px 10px', fontSize: '14px', fontWeight: 600 }}>₹{(booking.totalPrice || 0).toLocaleString()}</td>
                    <td style={{ padding: '15px 10px' }}>
                       <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`} style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px' }}>
                         {booking.status}
                       </span>
                    </td>
                  </tr>
                ))}
                {data.bookings.length === 0 && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No recent reservations</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
