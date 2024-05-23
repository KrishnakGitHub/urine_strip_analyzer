import React from 'react';
import UploadForm from './UploadForm';
import ResultsList from './ResultsList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Urine Strip Test</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Upload</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/results">Past Results</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/results" element={<ResultsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
