import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Set image URL for preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setColors(response.data);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Upload Urine Strip Image</h1>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
      <div className="row mt-5">
        <div className="col-md-3 text-end">
          {imageUrl && (
            <div className="mt-4">
              <h5>Uploaded Image</h5>
              <img src={imageUrl} alt="Uploaded Urine Strip" width={100} className="img-fluid" />
            </div>
          )}
        </div>
        <div className="col-md-6">
          {colors.length > 0 && (
            <div className="mt-4">
              <h5>Detected Colors</h5>
              <ul className="list-group">
                {colors.map((color, index) => (
                  <li key={index} className="list-group-item" style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
                    RGB: {color[0]}, {color[1]}, {color[2]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
