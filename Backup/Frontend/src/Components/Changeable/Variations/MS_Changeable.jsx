import { useState, useEffect } from "react";
import SliderTrackVisual from "../SliderTrackVisual.jsx";
import DischargeMedication from "../../Categories/DischargeMedication.jsx";
import Metrics from "../../Categories/Metrics.jsx";
import Other from "../../Categories/Others.jsx";


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
            top: -40,
          }}
        >
          {Math.round(v)}
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

function MS_Changeable({
  setPrediction,
  setShapData,
  setIsLoading,
  activeTab,
  refreshKey
}){

  const [patient, setPatient] = useState(null);
  const [a, setA] = useState([150, 180]);
  const [b, setB] = useState(80);
  const [c, setC] = useState([60, 140]);
  const [d, setD] = useState([70, 100]);

  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);
      await sendToBackend();
    }
    fetchPatient();
  }, [refreshKey]);

  async function sendToBackend() {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/run-script3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setPrediction(data.prediction);

      const binsRes = await fetch("http://localhost:8000/bins-3");
      const rawBins = await binsRes.json();

      const newA = rawBins.sys_blood_pressure?.filter(v => v !== null) ?? a;
      const newB = rawBins.dis_blood_pressure?.filter(v => v !== null)[0] ?? b;
      const newC = rawBins.glucose?.filter(v => v !== null).map(v => v * 18) ?? c;
      const newD = rawBins.cholesterol?.filter(v => v !== null).map(v => v * 38.67) ?? d;

      setA(newA);
      setB(newB);
      setC(newC);
      setD(newD);

      const shapRes = await fetch("http://localhost:8000/shap3");
      const shapData = await shapRes.json();
      setShapData(shapData);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="VariableChangeable" style={{ position: "relative" }}>
      <h2 className="Changeabletitle">Changeable Variables</h2>
      <div className="VariableSliders" style={{ gap: "14px" }}>

        {activeTab === "cardiometabolic" && (
          <>
            <div className="slider-group" style={{ marginBottom: "0px"}}>
              <label className="slider-label" style={{ marginBottom: "-10px" }}>BP Systolic:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{ color: isInRange(patient?.sys_blood_pressure, a) ? "#8CC8EB" : "#FFB89C", WebkitTextStroke: "0.8px black" }}>
                    {patient?.sys_blood_pressure}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mmHg</span>
                </div>
                <div className="slider-right">
                  <SliderTrackVisual value={a} min={60} max={240} marker={patient?.sys_blood_pressure} />
                  <ThresholdLabels value={a} min={60} max={240} />
                  <div className="slider-input-wrapper">
                    <p className="GuidelineTextBox">Thresholds based on the model’s optimal binning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "0px"}}>
              <label className="slider-label">BP Diastolic:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{ color: isInRange(patient?.dis_blood_pressure, b) ? "#8CC8EB" : "#FFB89C", WebkitTextStroke: "0.8px black" }}>
                    {patient?.dis_blood_pressure}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mmHg</span>
                </div>
                <div className="slider-right">
                  <SliderTrackVisual value={b} min={20} max={220} marker={patient?.dis_blood_pressure} />
                  <ThresholdLabels value={b} min={20} max={220} />
                  <div className="slider-input-wrapper">
                    <p className="GuidelineTextBox">Thresholds based on the model’s optimal binning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "0px"}}>
              <label className="slider-label">Glucose:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{ color: isInRange(patient?.glucose * 18, c) ? "#8CC8EB" : "#FFB89C", WebkitTextStroke: "0.8px black" }}>
                    {(patient?.glucose * 18).toFixed()}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mg/dL</span>
                </div>
                <div className="slider-right">
                  <SliderTrackVisual value={c} min={0} max={190} marker={(patient?.glucose * 18).toFixed(1)} />
                  <ThresholdLabels value={c} min={0} max={190} />
                  <div className="slider-input-wrapper">
                    <p className="GuidelineTextBox">Thresholds based on the model’s optimal binning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group" style={{ marginBottom: "-10px"}}>
              <label className="slider-label">LDL Cholesterol:</label>
              <div className="slider-row">
                <div className="slider-info-box">
                  <span style={{ color: isInRange(patient?.cholesterol * 38.67, d) ? "#8CC8EB" : "#FFB89C", WebkitTextStroke: "0.8px black" }}>
                    {(patient?.cholesterol * 38.67).toFixed(0)}
                  </span>
                  <span style={{ fontSize: 11, color: "#000000" }}>mg/DL</span>
                </div>
                <div className="slider-right">
                  <SliderTrackVisual value={d} min={0} max={220} marker={(patient?.cholesterol * 38.67).toFixed(1)} />
                  <ThresholdLabels value={d} min={0} max={220} />
                  <div className="slider-input-wrapper">
                    <p className="GuidelineTextBox">Thresholds based on the model’s optimal binning</p>
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
    </div>
  );
}

export default MS_Changeable;