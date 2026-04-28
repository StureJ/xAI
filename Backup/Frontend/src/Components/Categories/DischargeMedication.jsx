import { useState, useEffect } from "react";

function Toggle({ label, value }) {
  const isYes = value === "true" || value === true;

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontWeight: "bold", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #ddd", width: 280, height: 30 }}>
        <div style={{
          flex: 1, textAlign: "center", padding: "5px 0",
          backgroundColor: !isYes ? "#d9d9d9" : "white",
          fontWeight: !isYes ? "bold" : "normal",
        }}>No</div>
        <div style={{
          flex: 1, textAlign: "center", padding: "5px 0",
          backgroundColor: isYes ? "#d9d9d9" : "white",
          fontWeight: isYes ? "bold" : "normal",
        }}>Yes</div>
      </div>
    </div>
  );
}

function DischargeMedication() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatient() {
      const res = await fetch("http://localhost:8000/patient");
      const data = await res.json();
      setPatient(data);
    }
    fetchPatient();
  }, []);

  const discharge = [
    { label: "Anti diabetics",          field: "discharge_antidiabetics" },
    { label: "Cilostazol",              field: "discharge_cilostazol" },
    { label: "Clopidogrel",             field: "discharge_clopidrogel" },
    { label: "Ticagrelor",              field: "discharge_ticagrelor" },
    { label: "Ticlopidine",             field: "discharge_ticlopidine" },
    { label: "Prasugrel",               field: "discharge_prasugrel" },
    { label: "Dipyridamol, slow release", field: "discharge_dipyridamol" },
  ];

  const discharge_af = [
    { label: "Rivaroxaban for AF",                        field: "discharge_rivaroxaban" },
    { label: "Warfarin for AF",                           field: "discharge_warfarin" },
    { label: "Edoxaban for AF",                           field: "discharge_edoxaban" },
    { label: "Dabigatran for AF",                         field: "discharge_dabigatran" },
    { label: "Low molecular weight heparin / heparin for AF", field: "discharge_heparin" },
    { label: "Apixaban for AF",                           field: "discharge_apixaban" },
  ];

  return (
    <div style={{ padding: 0 }}>
      {/* Discharge */}
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          {discharge.map(({ label, field }) => (
            <Toggle key={field} label={label} value={patient?.[field]} />
          ))}
        </div>
      </div>

      {/* divider */}
      <hr style={{ border: "none", borderTop: "1px solid black", margin: "20px 0" }} />
      {/* Discharge_AF */}
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          {discharge_af.map(({ label, field }) => (
            <Toggle key={field} label={label} value={patient?.[field]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DischargeMedication;