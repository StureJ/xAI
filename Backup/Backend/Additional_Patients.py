import pandas as pd

# -------------------------------- 1,2 mRS SCORE --------------------------------
Patient_flyznqpwnirobkw = {
    'age': 58,
    'gender': 'female',
    'cholesterol': 5.5,
    'dis_blood_pressure': 98,
    'glucose': 7.04,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 160,

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
    'discharge_nihss_score': 2,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 2.0,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 0,

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'false',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'true',
    'risk_hypertension': 'false',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}

#DEN HER
Patient_wrtnikjvfomphym = {
    'age': 87,
    'gender': 'male',
    'cholesterol': 'none', #Måske problem?
    'dis_blood_pressure': 70,
    'glucose': 11.5,
    'hospital_stroke': 'true',
    'covid_test': 'false',
    'sys_blood_pressure': 110,

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

    'discharge_mrs': 2,
    'discharge_nihss_score': 6,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 23,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 0,

    'risk_congestive_heart_failure': 'true',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'true',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'false',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 3,
}

# -------------------------------- 3 mRS SCORE --------------------------------

#DEN HER
Patient_sgatdffhrrlsnto = {
    'age': 63,
    'gender': 'female',
    'cholesterol': 4.4,
    'dis_blood_pressure': 90,
    'glucose': 10.62,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 169,

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
    'discharge_nihss_score': 0,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 7,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 3,

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'false',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'false',
    'risk_hypertension': 'false',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}

Patient_ukxpovwxfubwxax = {
    'age': 69,
    'gender': 'male',
    'cholesterol': 'none', #Problem
    'dis_blood_pressure': 'none', #Problem
    'glucose': 'none',
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 'none',

    'before_onset_cilostazol': 'none',
    'before_onset_clopidrogel': 'none',
    'before_onset_dipyridamol': 'none',
    'before_onset_prasugrel': 'none',
    'before_onset_ticagrelor': 'none',
    'before_onset_ticlopidine': 'none',
    'before_onset_warfarin': 'none',

    'discharge_antidiabetics': 'none',
    'discharge_apixaban': 'true',
    'discharge_cilostazol': 'false',
    'discharge_clopidrogel': 'false',
    'discharge_dabigatran': 'false',
    'discharge_dipyridamol': 'none',
    'discharge_edoxaban': 'false',
    'discharge_heparin': 'false',

    'discharge_mrs': 3,
    'discharge_nihss_score': 1,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 'none',
    'nihss_score': 4,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 0,

    'risk_congestive_heart_failure': 'none',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'none',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'none',
    'risk_hypertension': 'none',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'none',

    'thrombolysis': 'false',
    'tici_score': 'none'
}


# -------------------------------- 4,5 mRS SCORE --------------------------------

Patient_nlfjjwqzfbsayos = {
    'age': 69,
    'gender': 'female',
    'cholesterol': 3.17,
    'dis_blood_pressure': 85,
    'glucose': 12.0,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 136,

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

    'discharge_mrs': 4,
    'discharge_nihss_score': 6,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 15.0,
    'nihss_score': 6,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 4,

    'risk_congestive_heart_failure': 'false',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'true',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'true',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 'none'
}

#DEN HER
Patient_mieuyyadyjobnrd = {
    'age': 59,
    'gender': 'female',
    'cholesterol': 3.38,
    'dis_blood_pressure': 78,
    'glucose': 21.0,
    'hospital_stroke': 'false',
    'covid_test': 'false',
    'sys_blood_pressure': 182,

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

    'discharge_mrs': 5,
    'discharge_nihss_score': 5,
    'discharge_prasugrel': 'false',
    'discharge_rivaroxaban': 'false',
    'discharge_ticagrelor': 'false',
    'discharge_ticlopidine': 'false',
    'discharge_warfarin': 'false',

    'hypoperfusion_core': 147.0,
    'nihss_score': 19,
    'physiotherapy_start_within_3days': 'none',
    'prenotification': 'none',
    'prestroke_mrs': 0,

    'risk_congestive_heart_failure': 'true',
    'risk_coronary_artery_disease_or_myocardial_infarction': 'none',
    'risk_diabetes': 'true',
    'risk_hiv': 'none',
    'risk_hyperlipidemia': 'true',
    'risk_hypertension': 'true',
    'risk_previous_hemorrhagic_stroke': 'none',
    'risk_previous_ischemic_stroke': 'none',
    'risk_smoker': 'false',

    'thrombolysis': 'true',
    'tici_score': 3
}