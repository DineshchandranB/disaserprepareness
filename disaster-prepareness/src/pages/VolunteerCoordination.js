import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./VolunteerCoordination.css";

export default function VolunteerCoordination() {
  const [opportunities, setOpportunities] = useState([]);
  const [myShifts, setMyShifts] = useState([]);
  const [skills, setSkills] = useState(["First Aid", "Driving"]);

  useEffect(() => {
    const mockOpportunities = [
      { id: 1, title: "Shelter Staff - Night Shift", location: "Community Center", date: "2024-01-20", time: "8:00 PM - 6:00 AM", slots: "3/10", skills: ["First Aid"], urgency: "high" },
      { id: 2, title: "Food Distribution", location: "Central Park", date: "2024-01-21", time: "10:00 AM - 2:00 PM", slots: "8/15", skills: ["None"], urgency: "medium" },
      { id: 3, title: "Medical Support", location: "City Hospital", date: "2024-01-22", time: "9:00 AM - 5:00 PM", slots: "2/5", skills: ["Medical Training"], urgency: "critical" },
      { id: 4, title: "Supply Transport", location: "Warehouse District", date: "2024-01-23", time: "7:00 AM - 3:00 PM", slots: "5/8", skills: ["Driving", "Heavy Lifting"], urgency: "medium" }
    ];
    setOpportunities(mockOpportunities);

    const savedShifts = JSON.parse(localStorage.getItem("volunteerShifts") || "[]");
    setMyShifts(savedShifts);
  }, []);

  const signUp = (opportunity) => {
    const updated = [...myShifts, opportunity];
    setMyShifts(updated);
    localStorage.setItem("volunteerShifts", JSON.stringify(updated));
    alert(`Signed up for: ${opportunity.title}`);
  };

  const getUrgencyColor = (urgency) => {
    const colors = { critical: "#ef4444", high: "#f59e0b", medium: "#3b82f6", low: "#22c55e" };
    return colors[urgency] || "#6b7280";
  };

  return (
    <div className="volunteer-page">
      <header className="page-header">
        <h1>🤝 Volunteer Coordination</h1>
      </header>

      <div className="volunteer-stats">
        <div className="stat-card">
          <h3>24</h3>
          <p>Hours Volunteered</p>
        </div>
        <div className="stat-card">
          <h3>{myShifts.length}</h3>
          <p>Upcoming Shifts</p>
        </div>
        <div className="stat-card">
          <h3>{skills.length}</h3>
          <p>Verified Skills</p>
        </div>
      </div>

      <div className="content-layout">
        <div className="opportunities-section">
          <h2>Available Opportunities</h2>
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              className="opportunity-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="opp-header">
                <h3>{opp.title}</h3>
                <span className="urgency-badge" style={{ background: getUrgencyColor(opp.urgency) }}>
                  {opp.urgency.toUpperCase()}
                </span>
              </div>
              <div className="opp-details">
                <p>📍 {opp.location}</p>
                <p>📅 {opp.date}</p>
                <p>🕒 {opp.time}</p>
                <p>👥 Slots: {opp.slots}</p>
              </div>
              <div className="opp-skills">
                <strong>Required Skills:</strong> {opp.skills.join(", ")}
              </div>
              <button className="btn-signup" onClick={() => signUp(opp)}>
                Sign Up
              </button>
            </motion.div>
          ))}
        </div>

        <div className="my-shifts-section">
          <h2>My Upcoming Shifts</h2>
          {myShifts.length === 0 ? (
            <p className="empty-message">No shifts scheduled yet</p>
          ) : (
            myShifts.map((shift, i) => (
              <div key={i} className="shift-card">
                <h4>{shift.title}</h4>
                <p>{shift.date} at {shift.time}</p>
                <p>📍 {shift.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
