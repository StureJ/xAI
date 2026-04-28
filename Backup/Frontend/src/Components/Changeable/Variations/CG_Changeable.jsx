import { useState, useEffect } from "react";
import SliderTrackVisual from "../SliderTrackVisual.jsx";
import DischargeMedication from "../../Categories/DischargeMedication.jsx";
import Metrics from "../../Categories/Metrics.jsx";
import Other from "../../Categories/Others.jsx";
import Guideline from "../../../assets/Guideline.png";


function ThresholdLabels({ value, min, max }) {
  const vals = Array.isArray(value) ? value : [value];
  return (
    <div style={{ position: "relative", height: 0, overflow: "visible", marginBottom: "-5px" }}>
      {vals.map((v, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${((v - min) / (max - min)) * 100}%`,
            transform: "translateX(-50%)",
            fontSize: 11,
            fontWeight: "bold",
            top: -14,
          }}
        >
          {v}
        </span>
      ))}
    </div>
  );
}


function isInRange(patientVal, sliderVal) {
  if (Array.isArray(sliderVal)) {
    return patientVal >= sliderVal[0] && patientVal <= sliderVal[1];
  }
  return patientVal <= sliderVal;
}

function Changeable({
  setPrediction,
  setShapData,
  setIsLoading,
  activeTab,
  refreshKey
}){

  const [patient, setPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [a, setA] = useState([150, 180]);
  const [b, setB] = useState(80);
  const [c, setC] = useState([60, 140]);
  const [d, setD] = useState([70, 100]);

  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);

      // 👇 IMPORTANT: rerun model AFTER patient update
      await sendToBackend();
    }

    fetchPatient();
  }, [refreshKey]);

  // -----------------------------
  // MODEL CALL (unchanged)
  // -----------------------------
  async function sendToBackend() {
    setIsLoading(true);
    try {
      const payload = {
        a,
        b,
        c: [c[0] / 18, c[1] / 18],
        d: [d[0] / 38.67, d[1] / 38.67],
      };

      const res = await fetch("http://localhost:8000/run-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setPrediction(data.prediction);

      const shapRes = await fetch("http://localhost:8000/shap");
      const shapData = await shapRes.json();
      setShapData(shapData);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="VariableChangeable" style={{ position: "relative" }}>
      <h2 className="Changeabletitle">Changeable Variables</h2>

      <div className="VariableSliders" style={{ gap: "0px" }}>

        {activeTab === "cardiometabolic" && (
          <>
            <div className="slider-group" style={{ marginBottom: "0px" }}>
              <label className="slider-label" style={{ marginBottom: "-10px"}}>BP Systolic:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{
                    color: isInRange(patient?.sys_blood_pressure, a)
                      ? "#8CC8EB"
                      : "#FFB89C",
                    WebkitTextStroke: "0.8px black"
                  }}>
                    {patient?.sys_blood_pressure}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mmHg</span>
                </div>

                <div className="slider-right">
                  <ThresholdLabels value={a} min={60} max={240} />
                  <SliderTrackVisual value={a} min={60} max={240} marker={patient?.sys_blood_pressure} />
                  <div className="slider-input-wrapper">
                    <span className="guideline-link" onClick={() => setModalOpen(true)}>
                      <p className="GuidelineTextBox">Threshold based on the clinical guideline - Blood Pressure Management by American Heart Association</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "0px" }}>
              <label className="slider-label" style={{ marginBottom: "-10px"}}>BP Diastolic:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{
                    color: isInRange(patient?.dis_blood_pressure, b)
                      ? "#8CC8EB"
                      : "#FFB89C",
                    WebkitTextStroke: "0.8px black"
                  }}>
                    {patient?.dis_blood_pressure}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mmHg</span>
                </div>

                <div className="slider-right">
                  <ThresholdLabels value={b} min={20} max={220} />
                  <SliderTrackVisual value={b} min={20} max={220} marker={patient?.dis_blood_pressure} />
                  <div className="slider-input-wrapper">
                    <span className="guideline-link" onClick={() => setModalOpen(true)}>
                    <p className="GuidelineTextBox">Threshold based on the clinical guideline - Blood Pressure Management by American Heart Association</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "0px" }}>
              <label className="slider-label" style={{ marginBottom: "-12px"}}>Glucose:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{
                    color: isInRange(patient?.glucose, c)
                      ? "#8CC8EB"
                      : "#FFB89C",
                    WebkitTextStroke: "0.8px black"
                  }}>
                    {(patient?.glucose * 18).toFixed()}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mg/dL</span>
                </div>

                <div className="slider-right">
                  <ThresholdLabels value={c} min={0} max={190} />
                  <SliderTrackVisual value={c} min={0} max={190} marker={(patient?.glucose * 18).toFixed(1)} />
                  <div className="slider-input-wrapper">
                    <span className="guideline-link" onClick={() => setModalOpen(true)}>
                    <p className="GuidelineTextBox">Threshold based on the clinical guideline - Blood Pressure Management by American Heart Association</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "-10px" }}>
              <label className="slider-label" style={{ marginBottom: "-6px"}}>LDL Cholesterol:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{
                    color: isInRange(patient?.cholesterol, d)
                      ? "#8CC8EB"
                      : "#FFB89C",
                    WebkitTextStroke: "0.8px black"
                  }}>
                    {(patient?.cholesterol * 38.67).toFixed(0)}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mg/DL</span>
                </div>

                <div className="slider-right">
                  <ThresholdLabels value={d} min={0} max={220} />
                  <SliderTrackVisual value={d} min={0} max={220} marker={(patient?.cholesterol * 38.67).toFixed(1)} />
                  <div className="slider-input-wrapper">
                    <span className="guideline-link" onClick={() => setModalOpen(true)}>
                    <p className="GuidelineTextBox">Threshold based on the clinical guideline - Blood Pressure Management by American Heart Association</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "metrics" && <Metrics />}
        {activeTab === "medication" && <DischargeMedication />}
        {activeTab === "other" && <Other />}

      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            <img src={Guideline} alt="Blood Pressure Guideline" style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Changeable;