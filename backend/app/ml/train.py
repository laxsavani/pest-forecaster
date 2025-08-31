
import csv, os
import numpy as np
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import PestReport
from .model import MODEL, FEATURES

DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "data", "sample_weather_pest.csv")

def _load_csv_rows():
    rows = []
    with open(DATA_PATH, newline="") as f:
        reader = csv.DictReader(f)
        for r in reader:
            rows.append(r)
    return rows

def build_dataset(db: Session):
    # from CSV
    rows = _load_csv_rows()

    # from DB
    for rep in db.query(PestReport).all():
        rows.append({
            "temperature": rep.temperature,
            "humidity": rep.humidity,
            "rainfall": rep.rainfall,
            "soil_moisture": rep.soil_moisture,
            "wind_speed": rep.wind_speed,
            "label": rep.label
        })

    X, y = [], []
    for r in rows:
        X.append([float(r[k]) for k in FEATURES])
        y.append(int(r["label"]))
    return np.array(X), np.array(y)

def train():
    db = SessionLocal()
    try:
        X, y = build_dataset(db)
        if len(X) == 0:
            raise RuntimeError("No data to train on.")
        from .model import MODEL
        MODEL.train_and_save(X, y)
        return {"samples": len(X)}
    finally:
        db.close()

if __name__ == "__main__":
    print(train())
