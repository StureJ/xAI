import { useState, useEffect } from "react";

function Other() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);
    }
    fetchPatient();
  }, []);

  const isSmoker = patient?.risk_smoker === "true" || patient?.risk_smoker === true;
  const isPhysio = patient?.physiotherapy_start_within_3days === "true" || patient?.physiotherapy_start_within_3days === true;

  return (
    <div style={{ padding: 8 }}>

      {/* Active smoker */}
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>Active smoker</div>
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #ddd", width: 260, height: 30, marginBottom: 24 }}>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: !isSmoker ? "#d9d9d9" : "white", fontWeight: !isSmoker ? "bold" : "normal" }}>No</div>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: isSmoker ? "#d9d9d9" : "white", fontWeight: isSmoker ? "bold" : "normal" }}>Yes</div>
      </div>

      {/* Physiotherapy */}
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>Physiotherapy initiated &gt;= 72 hours after</div>
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #ddd", width: 260, height: 30 }}>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: !isPhysio ? "#d9d9d9" : "white", fontWeight: !isPhysio ? "bold" : "normal" }}>No</div>
        <div style={{ flex: 1, textAlign: "center", padding: "5px 0", backgroundColor: isPhysio ? "#d9d9d9" : "white", fontWeight: isPhysio ? "bold" : "normal" }}>Yes</div>
      </div>

    </div>
  );
}

export default Other;