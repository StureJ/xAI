import { useState, useEffect } from "react";

const chronic_disease = [
  { field: "risk_diabetes",                                         label: "Diabetes" },
  { field: "risk_congestive_heart_failure",                         label: "Congestive Heart Failure" },
  { field: "risk_coronary_artery_disease_or_myocardial_infarction", label: "Coronary Artery Disease" },
  { field: "risk_hiv",                                              label: "HIV" },
  { field: "risk_hyperlipidemia",                                   label: "Hyperlipidemia" },
  { field: "risk_hypertension",                                     label: "Hypertension" },
  { field: "risk_previous_hemorrhagic_stroke",                      label: "Previous Hemorrhagic Stroke" },
  { field: "risk_smoker",                                           label: "Smoker" },
];

const onset_medicine = [
  { field: "before_onset_clopidrogel",  label: "Clopidogrel" },
  { field: "before_onset_cilostazol",   label: "Cilostazol" },
  { field: "before_onset_dipyridamol",  label: "Dipyridamol" },
  { field: "before_onset_prasugrel",    label: "Prasugrel" },
  { field: "before_onset_ticagrelor",   label: "Ticagrelor" },
  { field: "before_onset_ticlopidine",  label: "Ticlopidine" },
  { field: "before_onset_warfarin",     label: "Warfarin" },
];

const isTrue = (v) => v === true || v === "true";
const yesNo = (v) => isTrue(v) ? "Yes" : "No";
const showIfExists = (v) => (v === null || v === undefined || v === "" || v === "none") ? null : v;
const showMrs = (v) => typeof v === "number" && v >= 2 && v <= 5 ? "Yes" : "No";
const capitalize = (v) => v ? v.charAt(0).toUpperCase() + v.slice(1) : v;

function Fixed({ onPatientSwitch, setMode, mode }) {
  const [patient, setPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    async function init() {
      const [patientRes, patientsRes] = await Promise.all([
        fetch("http://localhost:8000/patient"),
        fetch("http://localhost:8000/patients"),
      ]);
      const patientData = await patientRes.json();
      const patientList = await patientsRes.json();
      setPatient(patientData);
      setPatients(patientList);
      setActiveId(patientList[0]);
    }
    init();
  }, []);

  async function cyclePatient() {
    const currentIndex = patients.indexOf(activeId);
    const nextId = patients[(currentIndex + 1) % patients.length];
    await fetch(`http://localhost:8000/switch-patient/${nextId}`, { method: "POST" });
    setActiveId(nextId);
    const res = await fetch("http://localhost:8000/patient");
    const data = await res.json();
    setPatient(data);
    if (onPatientSwitch) onPatientSwitch();
  }

  const chronic = chronic_disease
    .filter(({ field }) => isTrue(patient?.[field]))
    .map(({ label }) => label)
    .slice(0, 3);

  const medicine = onset_medicine
    .filter(({ field }) => isTrue(patient?.[field]))
    .map(({ label }) => label)
    .slice(0, 3);

  return (
    <div className="VariableFixed">
      <div className="grid">
        <div className="cell c1"><strong>Patient ID:</strong></div>
        <div
          className="cell c2"
          onClick={cyclePatient}
        >
          {activeId}
        </div>
        <div className="cell c3"><strong>Chronic disease:</strong></div>
        <div className="cell c4"><strong>Medicin before onset:</strong></div>
        <div className="cell c5"><strong>Stroke mimics:</strong></div>
        <div className="cell c6"></div>
        <div className="cell c7"><strong>Previous ICH:</strong></div>
        <div className="cell c8"></div>

        <div className="cell c6"><strong>Age:</strong></div>
        <div className="cell c7" onClick={() => setMode(m => m === "A" ? "B" : m === "B" ? "C" : "A")}>
          {patient?.age}
        </div>
        <div className="cell c8">{chronic[0]}</div>
        <div className="cell c9">{medicine[0]}</div>
        <div className="cell c10"><strong>In-hospital stroke:</strong></div>
        <div className="cell c11">{yesNo(patient?.hospital_stroke)}</div>
        <div className="cell c12"><strong>NIHSS:</strong></div>
        <div className="cell c13">{showIfExists(patient?.nihss_score)}</div>

        <div className="cell c11"><strong>Gender:</strong></div>
        <div className="cell c12">{capitalize(patient?.gender)}</div>
        <div className="cell c13">{chronic[1]}</div>
        <div className="cell c14">{medicine[1]}</div>
        <div className="cell c15"><strong>Source of bleeding found:</strong></div>
        <div className="cell c16"></div>
        <div className="cell c17"><strong>TICI Score:</strong></div>
        <div className="cell c18">{showIfExists(patient?.tici_score)}</div>

        <div className="cell c16"><strong>Covid positive</strong></div>
        <div className="cell c17">{yesNo(patient?.covid_test)}</div>
        <div className="cell c18">{chronic[2]}</div>
        <div className="cell c19">{medicine[2]}</div>
        <div className="cell c20"><strong>Previous IS/TIA:</strong></div>
        <div className="cell c21">{yesNo(patient?.risk_previous_ischemic_stroke)}</div>
        <div className="cell c22"><strong>mRS 2-5:</strong></div>
        <div className="cell c23">{showMrs(patient?.discharge_mrs)}</div>
      </div>
    </div>
  );
}

export default Fixed;