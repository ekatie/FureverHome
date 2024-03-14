import React from "react";
import "./DogDetails.scss";

const GaugeMeter = ({ level }) => {
  const energyLevels = {
    Low: 1,
    Medium: 2,
    High: 3,
    "Very High": 4,
  };

  // Determine the percentage of the gauge fill based on the energy level
  const levelPercent = {
    1: "25%", // Low
    2: "50%", // Medium
    3: "75%", // High
    4: "100%", // Very High
  }[energyLevels[level] || 1]; // Default to Low if undefined

  return (
    <div className="gauge-container">
      <div className="gauge" style={{ width: levelPercent }}></div>
      <div className="gauge-label">{level}</div>
    </div>
  );
};

export default GaugeMeter;
