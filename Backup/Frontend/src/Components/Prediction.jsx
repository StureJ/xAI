import mRS1 from "../assets/mRS1.png";
import mRS3 from "../assets/mRS4.png";
import mRS4 from "../assets/mRS4.png";
import mRS5 from "../assets/mRS5.png";
import mRS6 from "../assets/mRS6.png";
import Loading_prediction from "../assets/Loading_prediction.png";
import React from "react";

const mRSImages = {
  0: mRS1,
  1: mRS1,
  2: mRS1,
  3: mRS3,
  4: mRS4,
  5: mRS5,
  6: mRS6,
};

function Prediction({ prediction, isLoading }) {
  const image = mRSImages[prediction];

  return (
    <div className="VariableOutput" style={{ position: "relative" }}>
      <div className="mRSImage">
        <p className="prediction-label">{prediction}</p>
        <p className="prediction-sublabel">mRS</p>
        <img src={image} alt="Prediction output" />
      </div>

      {isLoading && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          zIndex: 10,
        }}>
          <img src={Loading_prediction} alt="Loading..." style={{ width: 190, opacity: 1 }} />
        </div>
      )}
    </div>
  );
}

export default Prediction;