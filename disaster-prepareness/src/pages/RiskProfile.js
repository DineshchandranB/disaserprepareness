import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "./RiskProfile.css";

export default function RiskProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [disasterHistory, setDisasterHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) setUser(u);
  }, []);

  useEffect(() => {
    if (!user?.location) return;
    
    async function fetchDisasterHistory() {
      setLoading(true);
      setError("");
      try {
        const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiBase}/get_location_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'DisasterPreparednessApp'
          },
          body: JSON.stringify({ location: user.location })
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to fetch data');
        }
        const data = await res.json();
        setDisasterHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Unable to load disaster history");
      }
      setLoading(false);
    }

    fetchDisasterHistory();
  }, [user]);

  return (
    <div className="risk-profile-page">
      <header className="navbar">
        <div className="navbar-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 className="navbar-title">📊 Disaster History</h1>
        </div>
        <div className="navbar-right">
          <div className="user-badge">
            <span className="user-icon">👤</span>
            <span className="user-name">{user.name || "Guest"}</span>
          </div>
        </div>
      </header>

      <main className="risk-profile-content">
        <div className="profile-header">
          <h2>Historical Disaster Data</h2>
          <p>Location: {user.location || "Unknown"}</p>
        </div>

        {loading ? (
          <div className="loading-card">Loading disaster history...</div>
        ) : error ? (
          <div className="error-card">{error}</div>
        ) : disasterHistory.length === 0 ? (
          <div className="no-data-card">No disaster history found for this location</div>
        ) : (
          <div className="history-grid">
            {disasterHistory.map((disaster, idx) => (
              <div key={idx} className="disaster-card">
                <div className="disaster-header">
                  <span className="disaster-icon">🌪️</span>
                  <h3>{disaster["Disaster Type"] || disaster.disaster_type || "Unknown"}</h3>
                </div>
                <div className="disaster-details">
                  <div className="detail-row">
                    <span className="detail-label">📍 Location:</span>
                    <span className="detail-value">{disaster.State || disaster.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📅 Year:</span>
                    <span className="detail-value">{disaster["Start Year"] || disaster.year}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💀 Deaths:</span>
                    <span className="detail-value">{disaster["Total Deaths"] || disaster.deaths || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🏥 Injured:</span>
                    <span className="detail-value">{disaster["No Injured"] || disaster.injured || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🏠 Affected:</span>
                    <span className="detail-value">{disaster["No Affected"] || disaster.affected || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🏚️ Homeless:</span>
                    <span className="detail-value">{disaster["No Homeless"] || disaster.homeless || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
