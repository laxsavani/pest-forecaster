
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from .database import Base, engine, get_db
from .models import PestReport, PestType
from .schemas import ReportIn, Report, PredictIn, PredictOut, PestTypeOut
from .ml.model import MODEL, FEATURES, _risk_level
from .ml.train import train as train_model
from .seed import seed

# Initialize
Base.metadata.create_all(bind=engine)
seed()
MODEL.load()

app = FastAPI(title="Pest Forecaster API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/pests", response_model=List[PestTypeOut])
def get_pests(db: Session = Depends(get_db)):
    return db.query(PestType).all()

@app.post("/reports", response_model=Report)
def create_report(payload: ReportIn, db: Session = Depends(get_db)):
    rep = PestReport(**payload.model_dump())
    db.add(rep)
    db.commit()
    db.refresh(rep)
    return rep

@app.get("/reports", response_model=List[Report])
def list_reports(
    db: Session = Depends(get_db),
    pest: Optional[str] = None,
    crop: Optional[str] = None,
):
    q = db.query(PestReport)
    if pest:
        q = q.filter(PestReport.pest == pest)
    if crop:
        q = q.filter(PestReport.crop == crop)
    return q.order_by(PestReport.id.desc()).all()

@app.post("/predict", response_model=PredictOut)
def predict(payload: PredictIn):
    # If model not trained yet, perform on-the-fly heuristic
    x = [[payload.temperature, payload.humidity, payload.rainfall, payload.soil_moisture, payload.wind_speed]]

    if MODEL.model is None:
        # simple heuristic prior to training
        score = min(1.0, max(0.0, 
            0.4*(payload.humidity/100.0) + 
            0.3*(payload.soil_moisture/100.0) + 
            0.2*(payload.rainfall/100.0) + 
            0.1*(payload.temperature/50.0)
        ))
        return {
            "risk_score": round(float(score), 3),
            "risk_level": _risk_level(score),
            "explanation": "Heuristic risk score (train the model for better accuracy)."
        }
    else:
        prob = float(MODEL.predict_proba(x)[0])
        return {
            "risk_score": round(prob, 3),
            "risk_level": _risk_level(prob),
            "explanation": f"LogisticRegression using features: {', '.join(FEATURES)}"
        }

@app.post("/train")
def train_endpoint():
    info = train_model()
    MODEL.load()
    return {"status":"trained", **info}

@app.get("/tiles")
def tiles(lat_min: float, lat_max: float, lon_min: float, lon_max: float, step: float = 0.2):
    # Mock risk scores for map heat layer (client can visualize as choropleth)
    tiles = []
    lat = lat_min
    while lat <= lat_max:
        lon = lon_min
        while lon <= lon_max:
            # simple pseudo field based on lat/lon (demo only)
            risk = (abs((lat*lon) % 1.0))
            tiles.append({"lat": round(lat,3), "lon": round(lon,3), "risk": round(risk,3)})
            lon += step
        lat += step
    return {"tiles": tiles}
