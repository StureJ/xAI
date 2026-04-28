import { useState, useEffect } from "react";

function Metrics() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);
    }
    fetchPatient();
  }, []);

  const isYes = patient?.thrombolysis === "true" || patient?.thrombolysis === true;
  const ctValue = String(patient?.hypoperfusion_core);

  return (
    <div style={{ padding: 0 }}>

      {/* Number of IVT */}
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>Number of IVT</div>
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #ddd", width: 280, height: 30, marginBottom: 24 }}>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: !isYes ? "#d9d9d9" : "white", fontWeight: !isYes ? "bold" : "normal" }}>No</div>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: isYes ? "#d9d9d9" : "white", fontWeight: isYes ? "bold" : "normal" }}>Yes</div>
      </div>

      {/* CT Perfusion Score */}
      <div style={{ fontWeight: "bold", marginBottom: 8 }}>CT Perfusion Score</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((opt) => (
          <div key={opt} style={{
            width: 48, height: 48,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid #ccc", borderRadius: 6,
            backgroundColor: String(opt) === ctValue ? "#d9d9d9" : "white",
            fontWeight: String(opt) === ctValue ? "bold" : "normal",
            fontSize: 16,
          }}>
            {opt}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, color: "#888", fontSize: 13, width: "90%" }}>
        <span>Normal</span>
        <span>Large infarct</span>
      </div>

    </div>
  );
}

export default Metrics;