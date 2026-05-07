import pandas as pd

Patient_hyccdxarrydprbq = {
    'age': 84,
    'gender': 'male',
    'cholesterol': 4.5,
    'dis_blood_pressure': 100,
    'glucose': 5.88,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 145,

    'before_onset_cilostazol': 'false',
    'before_onset_clopidrogel': 'false',
    'before_onset_dipyridamol': 'false',
    'before_onset_prasugrel': 'false',
    'before_onset_ticagrelor': 'false',
    'before_onset_ticlopidine': 'false',
    'before_onset_warfarin': 'false',

    'discharge_antidiabetics': 'none',
    'discharge_apixaban': 'false',
    'discharge_cilostazol': 'false',
    'discharge_clopidrogel': 'false',
    'discharge_dabigatran': 'false',
    'discharge_dipyridamol': 'none',
    'discharge_edoxaban': 'false',
    'discharge_heparin': 'false',

    'discharge_mrs': 3,
    'discharge_nihss_score': 5,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 19,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 'none',

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'false',
    'risk_diabetes': 'false',
    'risk_hiv': 'false',
    'risk_hyperlipidemia': 'false',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}

Patient_uthjemmvtwogzcc = {
    'age': 75,
    'gender': 'female',
    'cholesterol': 4.5,
    'dis_blood_pressure': 84,
    'glucose': 12.15,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 130,

    'before_onset_cilostazol': 'false',
    'before_onset_clopidrogel': 'false',
    'before_onset_dipyridamol': 'false',
    'before_onset_prasugrel': 'false',
    'before_onset_ticagrelor': 'false',
    'before_onset_ticlopidine': 'false',
    'before_onset_warfarin': 'false',

    'discharge_antidiabetics': 'none',
    'discharge_apixaban': 'false',
    'discharge_cilostazol': 'false',
    'discharge_clopidrogel': 'false',
    'discharge_dabigatran': 'true',
    'discharge_dipyridamol': 'none',
    'discharge_edoxaban': 'false',
    'discharge_heparin': 'false',

    'discharge_mrs': 1,
    'discharge_nihss_score': 1,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 11,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 'none',

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'true',
    'risk_diabetes': 'true',
    'risk_hiv': 'false',
    'risk_hyperlipidemia': 'true',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}

Patient_dfngrvjkictscmy = {
    'age': 80,
    'gender': 'female',
    'cholesterol': 4.05,
    'dis_blood_pressure': 84,
    'glucose': 7.7,
    'hospital_stroke': 'false',
    'covid_test': 'none',
    'sys_blood_pressure': 164,

    'before_onset_cilostazol': 'false',
    'before_onset_clopidrogel': 'false',
    'before_onset_dipyridamol': 'false',
    'before_onset_prasugrel': 'false',
    'before_onset_ticagrelor': 'false',
    'before_onset_ticlopidine': 'false',
    'before_onset_warfarin': 'false',

    'discharge_antidiabetics': 'none',
    'discharge_apixaban': 'false',
    'discharge_cilostazol': 'false',
    'discharge_clopidrogel': 'false',
    'discharge_dabigatran': 'false',
    'discharge_dipyridamol': 'none',
    'discharge_edoxaban': 'false',
    'discharge_heparin': 'false',

    'discharge_mrs': 4,
    'discharge_nihss_score': 3,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 4,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 'none',

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'false',
    'risk_diabetes': 'true',
    'risk_hiv': 'false',
    'risk_hyperlipidemia': 'true',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}


all_patients = {
    "hyccdxarrydprbq": Patient_hyccdxarrydprbq,
    "uthjemmvtwogzcc": Patient_uthjemmvtwogzcc,
    "dfngrvjkictscmy": Patient_dfngrvjkictscmy,
}

active_patient_id = "hyccdxarrydprbq"
Prediction_Patient = pd.DataFrame([Patient_hyccdxarrydprbq])