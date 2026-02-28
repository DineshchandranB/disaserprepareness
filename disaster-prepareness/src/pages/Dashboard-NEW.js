import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import "./DashboardNew.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(true);
  const [predictionError, setPredictionError] = useState("");

  const [weatherHistory, setWeatherHistory] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [dark, setDark] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) setUser(u);
  }, []);

  useEffect(() => {
    if (!user?.location) return;
    let mounted = true;

    async function fetchPrediction() {
      setPredictionLoading(true);
      setPredictionError("");
      try {
        const data = await api.getDisasterPrediction(user.location);
        if (mounted) {
          setPrediction(data);
          setCurrentWeather(data.weather_data);
        }
      } catch (err) {
        if (mounted) setPredictionError("Unable to load prediction");
      }
      if (mounted) setPredictionLoading(false);
    }

    fetchPrediction();
    return () => (mounted = false);
  }, [user]);

  useEffect(() => {
    if (!user?.location) return;
    let mounted = true;

    async function fetchWeather() {
      setWeatherLoading(true);
      setWeatherError("");
      try {
        const data = await api.getWeatherHistory(user.location, 3);
        if (mounted) setWeatherHistory(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setWeatherError("Unable to load weather");
      }
      if (mounted) setWeatherLoading(false);
    }

    fetchWeather();
    return () => (mounted = false);
  }, [user]);

  useEffect(() => {
    const m = [
      { id: "1", title: "Flood Safety", type: "video", icon: "🌊", color: "#3b82f6", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "2", title: "Earthquake Preparedness", type: "video", icon: "🏚️", color: "#f59e0b", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "3", title: "Cyclone Awareness", type: "video", icon: "🌀", color: "#8b5cf6", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: "4", title: "Fire Safety Quiz", type: "quiz", icon: "🔥", color: "#ef4444" }
    ];
    setModules(m);
    setActiveModule(m[0]);
  }, []);

  const getRiskIcon = (risk) => {
    const icons = { LOW: "✓", MEDIUM: "⚠", HIGH: "⚠", CRITICAL: "✕" };
    return icons[risk] || "•";
  };

  return (
    <div className={dark ? "dashboard-root dark" : "dashboard-root"}>
      
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo">🛡️</div>
          <h1 className="navbar-title">Disaster Intelligence</h1>
        </div>
        <div className="navbar-right">
          <div className="user-badge">
            <span className="user-icon">👤</span>
            <div className="user-details">
              <div className="user-name">{user.name || "Guest"}</div>
              <div className="user-location">📍 {user.location || "Unknown"}</div>
            </div>
          </div>
          <button className="theme-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="dashboard-layout">

        <aside className="sidebar">
          <div className="sidebar-header">
            <h3 className="sidebar-title">🧭 Quick Access</h3>
          </div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/emergency-contacts')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#ef4444' }}
          >
            <span className="module-icon">🚨</span>
            <span className="module-title">Emergency Contacts</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/evacuation-routes')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#f59e0b' }}
          >
            <span className="module-icon">🗺️</span>
            <span className="module-title">Evacuation Routes</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/checklist')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#22c55e' }}
          >
            <span className="module-icon">📋</span>
            <span className="module-title">Disaster Checklist</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/alerts')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#ec4899' }}
          >
            <span className="module-icon">🔔</span>
            <span className="module-title">Alerts Center</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/report-incident')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#8b5cf6' }}
          >
            <span className="module-icon">📢</span>
            <span className="module-title">Report Incident</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/risk-profile')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#3b82f6' }}
          >
            <span className="module-icon">📊</span>
            <span className="module-title">Risk Profile</span>
          </motion.div>
          <motion.div
            className="module-item"
            onClick={() => navigate('/volunteer')}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeftColor: '#f97316' }}
          >
            <span className="module-icon">🤝</span>
            <span className="module-title">Volunteer</span>
          </motion.div>
          
          <div className="sidebar-divider"></div>
          
          <div className="sidebar-header">
            <h3 className="sidebar-title">📚 Learning Center</h3>
            <span className="module-count">{modules.length} modules</span>
          </div>
          {modules.map(m => (
            <motion.div
              key={m.id}
              className={activeModule?.id === m.id ? "module-item active" : "module-item"}
              onClick={() => setActiveModule(m)}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{ borderLeftColor: m.color }}
            >
              <span className="module-icon">{m.icon}</span>
              <span className="module-title">{m.title}</span>
            </motion.div>
          ))}
        </aside>

        <main className="main-content">

          {/* Stats Overview */}
          <div className="stats-grid">
            <motion.div 
              className="stat-card stat-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-label">Risk Level</div>
                <div className="stat-value" style={{ color: prediction?.color }}>
                  {predictionLoading ? "..." : prediction?.risk || "N/A"}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card stat-info"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="stat-icon">🌡️</div>
              <div className="stat-content">
                <div className="stat-label">Temperature</div>
                <div className="stat-value">{currentWeather?.temp?.toFixed(1) || "--"}°C</div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card stat-warning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="stat-icon">💧</div>
              <div className="stat-content">
                <div className="stat-label">Humidity</div>
                <div className="stat-value">{currentWeather?.humidity || "--"}%</div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card stat-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="stat-icon">💨</div>
              <div className="stat-content">
                <div className="stat-label">Wind Speed</div>
                <div className="stat-value">{currentWeather?.wind?.toFixed(1) || "--"} m/s</div>
              </div>
            </motion.div>
          </div>

          {/* Hero Section - Risk & Current Weather */}
          <div className="hero-section">
            <motion.div 
              className="hero-card risk-hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {predictionLoading ? (
                <div className="loading">Analyzing data...</div>
              ) : predictionError ? (
                <div className="error">{predictionError}</div>
              ) : prediction && (
                <>
                  <div className="hero-header">
                    <span className="badge badge-live">Live Risk Assessment</span>
                  </div>
                  <div className="hero-content">
                    <div className="hero-icon-large" style={{ background: prediction.color }}>
                      {getRiskIcon(prediction.risk)}
                    </div>
                    <div className="hero-info">
                      <div className="hero-label">Current Risk Level</div>
                      <div className="hero-value" style={{ color: prediction.color }}>
                        {prediction.risk}
                      </div>
                      <div className="hero-meta">
                        <span>🧠 {(prediction.confidence*100).toFixed(0)}% Confidence</span>
                        <span>•</span>
                        <span>🤖 {prediction.model || "XGBoost"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hero-recommendation">
                    <strong>💡 Action Required:</strong> {prediction.recommendation}
                  </div>
                </>
              )}
            </motion.div>

            <motion.div 
              className="hero-card weather-hero"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hero-header">
                <span className="badge badge-info">Current Conditions</span>
              </div>
              <div className="current-weather-grid">
                <div className="current-weather-item">
                  <div className="weather-icon-large">🌡️</div>
                  <div className="weather-value-large">{currentWeather?.temp?.toFixed(1) || "--"}°C</div>
                  <div className="weather-label-small">Temperature</div>
                </div>
                <div className="current-weather-item">
                  <div className="weather-icon-large">💧</div>
                  <div className="weather-value-large">{currentWeather?.humidity || "--"}%</div>
                  <div className="weather-label-small">Humidity</div>
                </div>
                <div className="current-weather-item">
                  <div className="weather-icon-large">💨</div>
                  <div className="weather-value-large">{currentWeather?.wind?.toFixed(1) || "--"}</div>
                  <div className="weather-label-small">Wind (m/s)</div>
                </div>
              </div>
              <div className="location-display">
                <span className="location-icon">📍</span>
                <span className="location-text">{user.location || "Unknown Location"}</span>
              </div>
            </motion.div>
          </div>

          {/* Weather Forecast Timeline */}
          <motion.div 
            className="card timeline-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card-header">
              <h3 className="card-title">📅 3-Day Weather Forecast</h3>
              <span className="badge badge-info">Updated Now</span>
            </div>
            {weatherLoading ? (
              <div className="loading">Loading forecast...</div>
            ) : weatherError ? (
              <div className="error">{weatherError}</div>
            ) : (
              <div className="timeline-container">
                {weatherHistory.map((w, i) => (
                  <motion.div 
                    key={i} 
                    className="timeline-item"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="timeline-marker">{i + 1}</div>
                    <div className="timeline-content">
                      <div className="timeline-date">{w.date}</div>
                      <div className="timeline-weather">
                        <div className="timeline-temp">{w.temp}°C</div>
                        <div className="timeline-icon">☁️</div>
                      </div>
                      <div className="timeline-details">
                        <span className="timeline-detail">💧 {w.humidity}%</span>
                        <span className="timeline-detail">💨 {w.wind_speed} m/s</span>
                      </div>
                      <div className="timeline-desc">{w.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Learning Module */}
          <motion.div 
            className="card learning-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="card-header">
              <div className="module-header-info">
                <span className="module-header-icon">{activeModule?.icon}</span>
                <h3 className="card-title">{activeModule?.title}</h3>
              </div>
              <span className="badge" style={{ background: activeModule?.color }}>
                {activeModule?.type}
              </span>
            </div>
            <AnimatePresence mode="wait">
              {activeModule?.type === "video" && (
                <motion.iframe 
                  key={activeModule.id}
                  src={activeModule.url} 
                  title={activeModule.title}
                  className="video-iframe"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              {activeModule?.type === "quiz" && (
                <motion.div 
                  className="quiz-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="quiz-icon">🎯</div>
                  <h4>Interactive Quiz</h4>
                  <p>Test your disaster preparedness knowledge</p>
                  <button className="quiz-button">Start Quiz</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </main>
      </div>
    </div>
  );
}