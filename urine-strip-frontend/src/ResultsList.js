import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResultsList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await axios.get('http://localhost:8000/api/tests/');
        setResults(response.data.map(result => ({
          ...result,
          colors: JSON.parse(result.colors.replace(/'/g, '"'))
        })));
      } catch (error) {
        console.error('Error fetching results', error);
      }
    }

    fetchResults();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Past Results</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {results.map((result, index) => (
          <div className="col" key={index}>
            <p className="mb-2 text-secondry">{new Date(result.uploaded_at).toLocaleString()}</p>
            <div className="card mb-3" style={{ maxWidth: '540px', maxHeight: '520px', overflow: 'hidden' }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={`http://localhost:8000${result.image}`} className="img-fluid rounded-start" alt={`Result ${index}`} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <ul className="list-group">
                      {Array.isArray(result.colors) ? (
                        result.colors.map((color, colorIndex) => (
                          <li key={colorIndex} className="list-group-item" style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
                            RGB: {color[0]}, {color[1]}, {color[2]}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No colors detected</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
