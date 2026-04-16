import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getGalleryAdmin, uploadGalleryImages, deleteGalleryImage } from '../../services/adminApiService';
import '../../styles/GalleryManagement.css';
import '../../styles/global.css';
import { FaPlus, FaTrash, FaSpinner, FaImage, FaSearch, FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

const mockGalleryImages = [
  { _id: 'g1', filename: 'deluxe-room.jpg', url: 'https://images.unsplash.com/photo-1571896349840-3b1b0f4e6c1f?w=400', uploadedAt: '2024-01-15' },
  { _id: 'g2', filename: 'presidential-suite.jpg', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', uploadedAt: '2024-01-14' },
  { _id: 'g3', filename: 'pool-view.jpg', url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400', uploadedAt: '2024-01-13' }
];

function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGalleryAdmin();
      const data = response.data.data || response.data || [];
      setImages(data.length > 0 ? data : mockGalleryImages);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch gallery');
      setImages(mockGalleryImages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  useEffect(() => {
    return () => {
      filePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [filePreviews]);



  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    try {
      setUploading(true);
      await uploadGalleryImages(selectedFiles);
      setSuccess(`Successfully uploaded ${selectedFiles.length} images!`);
      fetchGallery();
      clearUpload();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete this image?")) return;
    try {
      await deleteGalleryImage(id);
      setSuccess('Image removed from gallery');
      fetchGallery();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Delete failed');
    }
  };

  const clearUpload = () => {
    setSelectedFiles([]);
    setFilePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredImages = images.filter(img => 
    (img.filename || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="spinner" />
        <p>Opening gallery vault...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Gallery Management</h1>
          <span>Upload and manage property photographs</span>
        </div>
      </div>

      <div className="table-card" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div className="search-box" style={{ position: 'relative', marginBottom: '15px' }}>
              <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input 
                type="text" 
                placeholder="Search collection by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 45px', borderRadius: '10px', border: '1px solid #ddd' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <button className="add-btn" onClick={() => fileInputRef.current?.click()} style={{ background: '#333' }}>
              <FaPlus /> Select Files
            </button>
            <button 
              className="add-btn" 
              onClick={handleUpload} 
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? <FaSpinner className="spin" /> : <FaCloudUploadAlt />}
              {uploading ? ' Uploading...' : ` Upload (${selectedFiles.length})`}
            </button>
          </div>
        </div>

        {filePreviews.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '15px', background: '#f9f9f9', borderRadius: '10px' }}>
            {filePreviews.map((preview, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={preview} alt="preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #C6AA76' }} />
              </div>
            ))}
            <button onClick={clearUpload} className="delete-btn" style={{ height: '40px', alignSelf: 'center' }}><FaTimes /> Clear</button>
          </div>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}
      {success && <div className="success-banner">{success}</div>}

      <div className="table-card">
        <div className="images-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
          {filteredImages.map((image) => (
            <div key={image._id} style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', aspectRatio: '1/1', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img src={image.url} alt={image.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="image-overlay" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontSize: '12px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{image.filename}</p>
                  <small style={{ opacity: 0.7 }}>{new Date(image.uploadedAt).toLocaleDateString()}</small>
                </div>
                <button 
                   onClick={() => handleDelete(image._id)}
                   style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
          {filteredImages.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#666' }}>
               <FaImage size={40} style={{ opacity: 0.3, marginBottom: '10px' }} /><br/>
               No images found in collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryManagement;
