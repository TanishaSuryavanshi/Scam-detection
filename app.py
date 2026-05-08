"""predict.py — load the trained classifier and return verdict + confidence."""
import os
import joblib

_BASE = os.path.dirname(os.path.abspath(__file__))
_model = joblib.load(os.path.join(_BASE, "model.pkl"))
_vec = joblib.load(os.path.join(_BASE, "vectorizer.pkl"))

LABELS = {0: "safe", 1: "scam"}

def predict(text: str):
    """Return dict with verdict, confidence (0-100), and raw probability."""
    X = _vec.transform([text])
    proba = float(_model.predict_proba(X)[0][1])
    label = 1 if proba >= 0.5 else 0
    return {
        "verdict": LABELS[label],
        "confidence": round(proba * 100, 1),
        "raw": proba,
    }
