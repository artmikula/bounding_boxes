import React from "react";
import cam_view from "../images/camera_view.png";
import { useNavigate } from "react-router-dom";

export default function View1() {
  let navigate = useNavigate();

  return (
    <div className="viewCont">
      <div className="viewSide">
        <select name="classrooms" id="classrooms">
          <option value="classroom1">Camera 1</option>
        </select>
      </div>
      <div className="viewMain">
        <div className="viewTitle">
          <h3>Live CCTV view from the farm</h3>
        </div>
        <div className="viewCam">
          <img src={cam_view} id="cam_view" alt={"cam_view"} />
        </div>
        <div className="viewButton">
          <button className="button2" onClick={() => navigate("/detect")}>
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}
