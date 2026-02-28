import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AlertsCenter.css";

export default function AlertsCenter() {
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  const regions = [
    "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      setUser(u);
      setSelectedRegion(u.location || "");
    }
  }, []);

  useEffect(() => {
    const mockAlerts = [
      { id: 1, region: "Mumbai", type: "flood", severity: "critical", title: "Flash Flood Warning", message: "Severe flooding expected in downtown area. Evacuate immediately.", source: "NOAA", verified: true, time: "5 min ago" },
      { id: 2, region: "Mumbai", type: "fire", severity: "severe", title: "Wildfire Alert", message: "Fire spreading rapidly near Forest Hills. Prepare for evacuation.", source: "Fire Department", verified: true, time: "15 min ago" },
      { id: 3, region: "Delhi", type: "earthquake", severity: "warning", title: "Earthquake Detected", message: "Magnitude 4.2 earthquake detected 50km away. Aftershocks possible.", source: "USGS", verified: true, time: "1 hour ago" },
      { id: 4, region: "Bangalore", type: "cyclone", severity: "info", title: "Cyclone Watch", message: "Tropical storm forming in Bay of Bengal. Monitor updates.", source: "Weather Service", verified: true, time: "3 hours ago" },
      { id: 5, region: "Delhi", type: "heatwave", severity: "severe", title: "Extreme Heat Warning", message: "Temperatures expected to reach 45°C. Stay indoors and hydrated.", source: "IMD", verified: true, time: "30 min ago" },
      { id: 6, region: "Chennai", type: "flood", severity: "critical", title: "Heavy Rainfall Alert", message: "Continuous heavy rain expected for next 48 hours. Risk of flooding.", source: "Weather Department", verified: true, time: "2 hours ago" }
    ];
    setAlerts(mockAlerts);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = alerts.filter(alert => alert.region === selectedRegion);
      setFilteredAlerts(filtered);
    } else {
      setFilteredAlerts(alerts);
    }
  }, [selectedRegion, alerts]);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: "#dc2626",
      severe: "#ea580c",
      warning: "#f59e0b",
      info: "#3b82f6"
    };
    return colors[severity] || "#6b7280";
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: "🚨",
      severe: "⚠️",
      warning: "⚡",
      info: "ℹ️"
    };
    return icons[severity] || "📢";
  };

  const criticalCount = filteredAlerts.filter(a => a.severity === "critical").length;
  const severeCount = filteredAlerts.filter(a => a.severity === "severe").length;

  return (
    <div className="alerts-center-page">
      <header className="page-header">
        <h1>🚨 Alert Center</h1>
      </header>

      <div className="region-selector">
        <label htmlFor="region-select">Select Region:</label>
        <select 
          id="region-select"
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="region-dropdown"
        >
          <option value="">All Regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="alert-stats">
        <div className="stat-box critical">
          <h3>{criticalCount}</h3>
          <p>Critical Alerts</p>
        </div>
        <div className="stat-box active">
          <h3>{filteredAlerts.length}</h3>
          <p>Active Alerts</p>
        </div>
        <div className="stat-box today">
          <h3>{criticalCount + severeCount}</h3>
          <p>High Priority</p>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="no-alerts">
          <p>✅ No active alerts for {selectedRegion || "any region"}</p>
        </div>
      ) : (
        <div className="alerts-feed">
          {filteredAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              className="alert-card"
              style={{ borderLeftColor: getSeverityColor(alert.severity) }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="alert-header">
                <span className="alert-icon">{getSeverityIcon(alert.severity)}</span>
                <div className="alert-title-section">
                  <h3>{alert.title}</h3>
                  <span className="alert-region">📍 {alert.region}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                {alert.verified && <span className="verified-badge">✓ Verified</span>}
              </div>
              <div className="alert-type-badge">{alert.type.toUpperCase()}</div>
              <p className="alert-message">{alert.message}</p>
              <div className="alert-footer">
                <span className="alert-source">Source: {alert.source}</span>
                <div className="alert-actions">
                  <button className="btn-details">View Details</button>
                  <button className="btn-share">Share</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
