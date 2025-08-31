
from pydantic import BaseModel, Field
from typing import Optional, List

class ReportIn(BaseModel):
    pest: str = Field(..., examples=["aphid"])
    crop: str = Field(..., examples=["cotton"])
    lat: float
    lon: float
    temperature: float
    humidity: float
    rainfall: float
    soil_moisture: float
    wind_speed: float
    label: int = 1

class Report(ReportIn):
    id: int
    class Config:
        from_attributes = True

class PredictIn(BaseModel):
    lat: float
    lon: float
    temperature: float
    humidity: float
    rainfall: float
    soil_moisture: float
    wind_speed: float
    crop: str = "generic"
    pest: str = "generic"

class PredictOut(BaseModel):
    risk_score: float
    risk_level: str
    explanation: str

class PestTypeOut(BaseModel):
    id: int
    name: str
    description: str
    class Config:
        from_attributes = True
