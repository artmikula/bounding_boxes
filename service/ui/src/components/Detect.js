import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";

function Detect() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate();

  const TargetBox = styled.div`
    position: absolute;
    left: ${(left) => left};
    top: ${(top) => top};
    width: ${(width) => width + "px"};
    height: ${(height) => height + "px"};
    border: 4px solid #1ac71a;
    background-color: transparent;

    &::before {
      content: "${({ label, confidence }) => `${label} ${confidence}`}";
      color: #1ac71a;
      font-weight: 500;
      font-size: 17px;
      position: absolute;
      top: -1.5em;
      left: -5px;
    }
  `;

  const handleChange = function(e) {
    setPredictions([]);
    setError(null);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log(selectedFile);
    setLoading(true);
    const formData = new FormData();
    formData.append("file_name", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/api/baekgok/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.length > 0) {
        console.log(response.data);
        setPredictions(response.data);
      } else {
        console.log("Reseting Bonding Boxes");
        setPredictions(null);
        setError("Try different image");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div id="detect">
      <h2>Cow Position Detection</h2>
      <h3>Upload an image</h3>
      <br />
      <label className="file-upload" onChange={(e) => handleChange(e)}>
        <input type="file" />
      </label>
      <br />
      <br />
      <button className="button2" onClick={() => handleSubmit()}>
        Detect
      </button>
      <div id="uploadedImage">
        {selectedFile && (
          <Zoom>
            <img alt="ai_image" src={preview}></img>
            {predictions &&
              predictions.map((prediction, box) => (
                <TargetBox
                  className="test"
                  key={box}
                  left={prediction.topleft.x}
                  top={prediction.topleft.y}
                  width={prediction.bottomright.x - prediction.topleft.x}
                  height={prediction.bottomright.y - prediction.topleft.y}
                  label={prediction.label}
                  confidence={
                    "confidence: " +
                    Math.round(prediction.confidence * 10) * 10 +
                    "%"
                  }
                />
              ))}
          </Zoom>
        )}
      </div>
      {error && <h2>Error : {error}</h2>}
      <div className="buttons">
        <button className="button2" onClick={() => navigate("/main")}>
          Previous
        </button>
      </div>
      {loading && <Loading setLoading={setLoading} />}
    </div>
  );
}

export default Detect;
