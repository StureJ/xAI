from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from USCG_model import model_prediction, _last_result
import shap
from Patient import all_patients, active_patient_id
import Patient
import pandas as pd
import numpy as np
from MS_model import model_prediction as model_prediction3, _last_result as _last_result3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# define expected data shape
class SliderData(BaseModel):
    a: list[int]
    b: int
    c: list[float]
    d: list[float]

@app.get("/patient")
def get_patient():
    # Read from module directly, not the locally-imported copy
    return Patient.Prediction_Patient.astype(object).to_dict(orient="records")[0]
@app.get("/")
def root():
    return {"status": "backend is running"}

@app.post("/run-script")
def run_script(data: SliderData):
    result = model_prediction(data.a[0],data.a[1],data.b,data.c[0],data.c[1],data.d[0],data.d[1])
    print(model_prediction)
    print(data.a[0],data.a[1],data.b,data.c[0],data.c[1],data.d[0],data.d[1])


    return {"prediction": result}

@app.get("/shap")
def get_shap():
    model = _last_result["model"]
    X_train = _last_result["X_train"]
    sample = _last_result["sample"]
    feature_names = _last_result["feature_names"]

    explainer = shap.Explainer(model, X_train)
    shap_values = explainer(sample)

    pred_class = int(model.predict(sample)[0])
    values_for_pred_class = shap_values.values[0, :, pred_class].tolist()

    shap_map = dict(zip(feature_names, values_for_pred_class))

    #print(shap_map)

    groups = {
        "Medication before-onset": [
            "before_onset_cilostazol", "before_onset_clopidrogel",
            "before_onset_dipyridamol", "before_onset_prasugrel",
            "before_onset_ticagrelor", "before_onset_ticlopidine",
            "before_onset_warfarin"
        ],
        "General information": [
            "age", "gender", "covid_test"
        ]
    }

    result = {}
    for group_name, features in groups.items():
        result[group_name] = sum(shap_map[f] for f in features)

    solo = [
        "cholesterol","dis_blood_pressure","discharge_antidiabetics","discharge_apixaban",
        "discharge_cilostazol","discharge_clopidrogel","discharge_dabigatran","discharge_dipyridamol",
        "discharge_edoxaban","discharge_heparin","discharge_prasugrel","discharge_rivaroxaban","discharge_ticagrelor",
        "discharge_ticlopidine","discharge_warfarin","glucose","hypoperfusion_core","physiotherapy_start_within_3days",

        "sys_blood_pressure",
        "thrombolysis", "nihss_score"
    ]
    for f in solo:
        result[f] = shap_map[f]

    result = dict(sorted(result.items(), key=lambda x: x[1], reverse=True))

    print("ACTIVE PATIENT:", active_patient_id)
    print("SAMPLE USED:", _last_result.get("sample", None))

    return result

@app.get("/patients")
def get_patients():
    return list(all_patients.keys())


@app.post("/switch-patient/{patient_id}")
async def switch_patient(patient_id: str):
    if patient_id not in all_patients:
        return {"status": "error", "message": "Patient not found"}

    # Mutate the module-level variables in Patient.py directly
    Patient.active_patient_id = patient_id
    Patient.Prediction_Patient = pd.DataFrame([all_patients[patient_id]])

    return {"status": "success", "active_id": patient_id}

@app.post("/run-script3")
def run_script_3():
    result = model_prediction3()  # no bin params needed
    return {"prediction": result}

@app.get("/bins-3")
def get_bins_3():
    bins = _last_result3.get("auto_bins", {})
    cleaned = {}
    for feature, edges in bins.items():
        cleaned[feature] = [None if np.isinf(e) else round(float(e), 1) for e in edges]
    return cleaned

@app.get("/shap3")
def get_shap_3():
    model = _last_result3["model"]
    X_train = _last_result3["X_train"]
    sample = _last_result3["sample"]
    feature_names = _last_result3["feature_names"]

    explainer = shap.Explainer(model, X_train)
    shap_values = explainer(sample)

    pred_class = int(model.predict(sample)[0])
    values_for_pred_class = shap_values.values[0, :, pred_class].tolist()

    shap_map = dict(zip(feature_names, values_for_pred_class))

    #print(shap_map)

    groups = {
        "Medication before-onset": [
            "before_onset_cilostazol", "before_onset_clopidrogel",
            "before_onset_dipyridamol", "before_onset_prasugrel",
            "before_onset_ticagrelor", "before_onset_ticlopidine",
            "before_onset_warfarin"
        ],
        "General information": [
            "age", "gender", "covid_test"
        ]
    }

    result = {}
    for group_name, features in groups.items():
        result[group_name] = sum(shap_map[f] for f in features)

    solo = [
        "cholesterol","dis_blood_pressure","discharge_antidiabetics","discharge_apixaban",
        "discharge_cilostazol","discharge_clopidrogel","discharge_dabigatran","discharge_dipyridamol",
        "discharge_edoxaban","discharge_heparin","discharge_prasugrel","discharge_rivaroxaban","discharge_ticagrelor",
        "discharge_ticlopidine","discharge_warfarin","glucose","hypoperfusion_core","physiotherapy_start_within_3days",

        "sys_blood_pressure",
        "thrombolysis", "nihss_score"
    ]
    for f in solo:
        result[f] = shap_map[f]

    result = dict(sorted(result.items(), key=lambda x: x[1], reverse=True))

    print("ACTIVE PATIENT:", active_patient_id)
    print("SAMPLE USED:", _last_result3.get("sample", None))  # ← 3

    return result