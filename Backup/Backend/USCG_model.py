import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import Patient

_last_result = {}

def model_prediction(BPS_min, BPS_max, BPD_mid, G_min, G_max, C_min, C_max):

    # =========================
    # LOAD + PREPROCESS
    # =========================

    df_long = pd.read_csv('Data/dataREanonymized_long.csv', low_memory=False)

    valid_subjects = df_long[
        (df_long['variable'] == 'three_m_mrs') &
        (df_long['Value'].notna())
    ]['subject_id'].unique()

    df_long_filtered = df_long[df_long['subject_id'].isin(valid_subjects)]

    df_wide = df_long_filtered.pivot(
        index='subject_id',
        columns='variable',
        values='Value'
    ).reset_index()

    df_wide = df_wide[df_wide['stroke_type'] == 'ischemic']

    # =========================
    # TARGET
    # =========================

    target = pd.to_numeric(df_wide['three_m_mrs'], errors='coerce')

    mask = target.notna() & target.between(0, 6)
    df_wide = df_wide.loc[mask].copy()
    target = target.loc[mask].astype(int).copy()

    # =========================
    # FEATURES
    # =========================

    X = df_wide.drop(columns=[
        'three_m_mrs','subject_id','hospitalized_in',
        'before_onset_antidiabetics','bleeding_volume_value',
        'department_type','door_to_groin','door_to_imaging',
        'door_to_needle','imaging_done','imaging_type',
        'occup_physiotherapy_received','onset_to_door',
        'perfusion_core','no_thrombolysis_reason',
        'dysphagia_screening_type','stroke_type'
    ])

    X = X.dropna(axis=1, how='all')
    X = X.apply(pd.to_numeric, errors='coerce')
    X = X.fillna(X.median(numeric_only=True))

    # =========================
    # CUSTOM BINNING
    # =========================

    features_to_bin = [
        'glucose',
        'cholesterol',
        'dis_blood_pressure',
        'sys_blood_pressure'
    ]

    custom_bins = {
        'glucose': [-np.inf, G_min, G_max, np.inf],
        'cholesterol': [-np.inf, C_min, C_max, np.inf],
        'dis_blood_pressure': [-np.inf, BPD_mid, np.inf],
        'sys_blood_pressure': [-np.inf, BPS_min, BPS_max, np.inf],
    }

    for f in features_to_bin:
        if f in X.columns and f in custom_bins:
            bins = sorted(set(custom_bins[f]))
            if len(bins) >= 2:
                X[f] = pd.cut(X[f], bins=bins, labels=False, include_lowest=True)

    # =========================
    # SPLIT
    # =========================

    X_train, X_test, y_train, y_test = train_test_split(
        X, target, test_size=0.3, random_state=59, stratify=target
    )

    # =========================
    # SINGLE MULTICLASS MODEL
    # =========================

    model = XGBClassifier(
        objective='multi:softprob',
        num_class=7,
        eval_metric='mlogloss',
        n_estimators=300,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9
    )

    model.fit(X_train, y_train)

    # =========================
    # PREDICTION
    # =========================

    sample = Patient.Prediction_Patient.copy()
    sample = sample.apply(pd.to_numeric, errors='coerce')

    for f in features_to_bin:
        if f in sample.columns and f in custom_bins:
            bins = sorted(set(custom_bins[f]))
            sample[f] = pd.cut(sample[f], bins=bins, labels=False, include_lowest=True)

    sample = sample[X_train.columns]
    sample = sample.fillna(X_train.median())

    probs = model.predict_proba(sample)[0]
    pred = np.argmax(probs)

    _last_result["model"] = model
    _last_result["X_train"] = X_train
    _last_result["X_test"] = X_test
    _last_result["sample"] = sample
    _last_result["feature_names"] = list(X.columns)

    print("Predicted mRS:", pred)
    print("Class probabilities:", probs)

    return int(pred)

