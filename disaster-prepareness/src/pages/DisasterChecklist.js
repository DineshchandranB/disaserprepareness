import { useState } from "react";
import { motion } from "framer-motion";
import "./DisasterChecklist.css";

export default function DisasterChecklist() {
  const [selectedType, setSelectedType] = useState("");

  const disasterChecklists = {
    earthquake: [
      "Emergency water (1 gallon/person/day for 3 days)",
      "Non-perishable food (3-day supply)",
      "First aid kit",
      "Flashlight and extra batteries",
      "Battery-powered radio",
      "Whistle to signal for help",
      "Dust masks",
      "Plastic sheeting and duct tape",
      "Wrench or pliers to turn off utilities",
      "Manual can opener"
    ],
    flood: [
      "Waterproof containers for documents",
      "Life jackets",
      "Rubber boots",
      "Emergency water supply",
      "Sandbags",
      "Battery-powered sump pump",
      "Waterproof flashlight",
      "Emergency food supply",
      "First aid kit",
      "Battery-powered radio"
    ],
    fire: [
      "Fire extinguisher",
      "N95 masks for smoke",
      "Emergency ladder (for multi-story homes)",
      "Fireproof safe for documents",
      "Emergency contact list",
      "Flashlight",
      "Battery-powered radio",
      "First aid kit",
      "Emergency water and food",
      "Escape route map"
    ],
    cyclone: [
      "Plywood for windows",
      "Generator",
      "Fuel for generator",
      "Battery-powered weather radio",
      "Emergency water and food",
      "Flashlights and batteries",
      "First aid kit",
      "Plastic sheeting and duct tape",
      "Manual can opener",
      "Important documents in waterproof container"
    ],
    tsunami: [
      "Emergency evacuation plan",
      "Waterproof emergency kit",
      "Life jackets",
      "Emergency whistle",
      "Battery-powered radio",
      "Flashlight and batteries",
      "First aid kit",
      "Emergency food and water",
      "Important documents (waterproof)",
      "Emergency contact information"
    ],
    drought: [
      "Water storage containers",
      "Water purification tablets",
      "Non-perishable food supply",
      "First aid kit",
      "Sun protection (hats, sunscreen)",
      "Emergency cash",
      "Battery-powered radio",
      "Flashlight and batteries",
      "Important documents",
      "Emergency contact list"
    ]
  };

  return (
    <div className="checklist-page">
      <header className="page-header">
        <h1>📋 Disaster Preparedness Checklist</h1>
      </header>

      <div className="selector-section">
        <label htmlFor="disaster-select">Select Disaster Type:</label>
        <select 
          id="disaster-select"
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          className="disaster-dropdown"
        >
          <option value="">-- Choose a disaster type --</option>
          <option value="earthquake">🏚️ Earthquake</option>
          <option value="flood">🌊 Flood</option>
          <option value="fire">🔥 Fire</option>
          <option value="cyclone">🌀 Cyclone</option>
          <option value="tsunami">🌊 Tsunami</option>
          <option value="drought">☀️ Drought</option>
        </select>
      </div>

      {selectedType && (
        <motion.div 
          className="checklist-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Essential Items for {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
          <div className="items-list">
            {disasterChecklists[selectedType].map((item, index) => (
              <motion.div
                key={index}
                className="checklist-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="item-number">{index + 1}</span>
                <span className="item-text">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {!selectedType && (
        <div className="empty-state">
          <p>👆 Please select a disaster type from the dropdown above to view the checklist</p>
        </div>
      )}
    </div>
  );
}
