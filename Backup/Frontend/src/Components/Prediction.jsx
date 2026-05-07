import mRS1 from "../assets/mRS1.png";
import mRS3 from "../assets/mRS4.png";
import mRS4 from "../assets/mRS4.png";
import mRS5 from "../assets/mRS5.png";
import mRS6 from "../assets/mRS6.png";
import LoadingOverlay from "./LoadingOverlay";
import React from "react";

const mRSImages = {
  0: mRS1, 1: mRS1, 2: mRS1,
  3: mRS3, 4: mRS4, 5: mRS5, 6: mRS6,
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

      {isLoading && <LoadingOverlay message="Running model…" />}
    </div>
  );
}

export default Prediction;