import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
import Patient

_last_result = {}

def model_prediction():

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
    # SPLIT (on raw, unbinned data)
    # =========================

    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, target, test_size=0.3, random_state=59, stratify=target
    )

    # =========================
    # FIRST PASS — train without binning to extract splits
    # =========================

    model_for_splits = XGBClassifier(
        objective='multi:softprob',
        num_class=7,
        eval_metric='mlogloss',
        n_estimators=300,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9
    )
    model_for_splits.fit(X_train_raw, y_train)

    # =========================
    # EXTRACT SPLITS FROM XGBOOST
    # =========================

    features_to_bin = ['glucose', 'cholesterol', 'dis_blood_pressure', 'sys_blood_pressure']

    trees_df = model_for_splits.get_booster().trees_to_dataframe()

    auto_bins = {}
    for f in features_to_bin:
        splits = (
            trees_df[trees_df['Feature'] == f]['Split']
            .dropna()
            .astype(float)
        )
        # weight by gain — more important splits rise to the top
        gains = trees_df[trees_df['Feature'] == f]['Gain'].dropna().astype(float)
        split_gain = pd.Series(gains.values, index=splits.values)
        top_splits = split_gain.groupby(level=0).sum().nlargest(2).index.tolist()
        top_splits = sorted(top_splits)
        auto_bins[f] = [-np.inf] + top_splits + [np.inf]

    print("Auto bins:", auto_bins)

    # =========================
    # SECOND PASS — bin with auto splits and retrain
    # =========================

    X_train = X_train_raw.copy()
    X_test = X_test_raw.copy()

    for f in features_to_bin:
        if f in X_train.columns:
            bins = sorted(set(auto_bins[f]))
            X_train[f] = pd.cut(X_train[f], bins=bins, labels=False, include_lowest=True)
            X_test[f] = pd.cut(X_test[f], bins=bins, labels=False, include_lowest=True)

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
        if f in sample.columns:
            bins = sorted(set(auto_bins[f]))
            sample[f] = pd.cut(sample[f], bins=bins, labels=False, include_lowest=True)

    sample = sample[X_train.columns]
    sample = sample.fillna(X_train.median())

    probs = model.predict_proba(sample)[0]
    pred = np.argmax(probs)

    _last_result["model"] = model
    _last_result["X_train"] = X_train
    _last_result["X_test"] = X_test
    _last_result["sample"] = sample
    _last_result["feature_names"] = list(X_train.columns)
    _last_result["auto_bins"] = auto_bins

    print("Predicted mRS:", pred)
    print("Class probabilities:", probs)

    return int(pred)