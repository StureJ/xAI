import { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider.jsx";
import SliderTrackVisual from "../SliderTrackVisual.jsx";
import DischargeMedication from "../../Categories/DischargeMedication.jsx";
import Metrics from "../../Categories/Metrics.jsx";
import Other from "../../Categories/Others.jsx";


function isInRange(patientVal, sliderVal) {
  if (Array.isArray(sliderVal)) {
    return patientVal >= sliderVal[0] && patientVal <= sliderVal[1];
  }
  return patientVal <= sliderVal;
}

function US_Changeable({
  setPrediction,
  setShapData,
  setIsLoading,
  activeTab,
  refreshKey
}){

  const [patient, setPatient] = useState(null);

  const [a, setA] = useState([110, 180]);
  const [b, setB] = useState(80);
  const [c, setC] = useState([60, 140]);
  const [d, setD] = useState([70, 100]);

  // -----------------------------
  // FIX 1: patient refetch on switch
  // -----------------------------
  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);

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
    <div className="VariableChangeable">
      <h2 className="Changeabletitle">Changeable Variables</h2>

      <div className="VariableSliders">

        {activeTab === "cardiometabolic" && (
          <>
            <div className="slider-group">
              <label className="slider-label">BP Systolic:</label>
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
                  <SliderTrackVisual value={a} min={60} max={240} marker={patient?.sys_blood_pressure} />
                  <div className="slider-input-wrapper">
                    <RangeSlider value={a} onChange={setA} onAfterChange={sendToBackend} min={60} max={240} />
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group">
              <label className="slider-label">BP Diastolic:</label>
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
                  <SliderTrackVisual value={b} min={20} max={220} marker={patient?.dis_blood_pressure} />
                  <div className="slider-input-wrapper">
                    <RangeSlider value={[b]} onChange={(vals) => setB(vals[0])} onAfterChange={sendToBackend} min={20} max={220} />
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group">
              <label className="slider-label">Glucose:</label>
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
                  <SliderTrackVisual value={c} min={0} max={190} marker={(patient?.glucose * 18).toFixed(1)} />
                  <div className="slider-input-wrapper">
                    <RangeSlider value={c} onChange={setC} onAfterChange={sendToBackend} min={0} max={190} step={1} />
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-group">
              <label className="slider-label">LDL Cholesterol:</label>
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
                  <SliderTrackVisual value={d} min={0} max={220} marker={(patient?.cholesterol * 38.67).toFixed(1)} />
                  <div className="slider-input-wrapper">
                    <RangeSlider value={d} onChange={setD} onAfterChange={sendToBackend} min={0} max={220} />
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

export default US_Changeable;