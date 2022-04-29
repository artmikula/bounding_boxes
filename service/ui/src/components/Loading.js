import React from "react";

export default function Loading({ setLoading }) {
  return (
    <div className="popup-box">
      <div className="box">
        <h4>Loading data...</h4>
        <div className="loader"></div>
        <button onClick={() => setLoading(false)}>Cancel</button>
      </div>
    </div>
  );
}
