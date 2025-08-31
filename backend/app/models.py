
from sqlalchemy import Column, Integer, Float, String, DateTime, func

from .database import Base

class PestReport(Base):
    __tablename__ = "pest_reports"

    id = Column(Integer, primary_key=True, index=True)
    pest = Column(String, index=True)            # e.g., 'bollworm', 'aphid'
    crop = Column(String, index=True)            # e.g., 'cotton', 'wheat'
    lat = Column(Float, index=True)
    lon = Column(Float, index=True)
    temperature = Column(Float)
    humidity = Column(Float)
    rainfall = Column(Float)
    soil_moisture = Column(Float)
    wind_speed = Column(Float)

    label = Column(Integer, index=True, default=1) # 1 = infestation observed
    created_at = Column(DateTime, server_default=func.now())

class PestType(Base):
    __tablename__ = "pest_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, default="")
