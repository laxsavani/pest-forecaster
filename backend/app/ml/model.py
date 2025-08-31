
import os
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression

MODEL_PATH = os.path.join(os.path.dirname(__file__), "pest_lr.joblib")

FEATURES = ["temperature","humidity","rainfall","soil_moisture","wind_speed"]

def _risk_level(score: float) -> str:
    if score >= 0.75: return "Severe (ગંભીર)"
    if score >= 0.5: return "High (વધુ)"
    if score >= 0.25: return "Moderate (મધ્યમ)"
    return "Low (ઓછું)"

class PestRiskModel:
    def __init__(self):
        self.model = None

    def is_trained(self):
        return os.path.exists(MODEL_PATH)

    def load(self):
        if self.is_trained():
            self.model = joblib.load(MODEL_PATH)

    def predict_proba(self, X):
        if self.model is None:
            raise RuntimeError("Model not loaded/trained.")
        return self.model.predict_proba(X)[:,1]

    def train_and_save(self, X, y):
        lr = LogisticRegression(max_iter=500)
        lr.fit(X, y)
        joblib.dump(lr, MODEL_PATH)
        self.model = lr

MODEL = PestRiskModel()
