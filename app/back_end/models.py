from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class SensorReadings(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String, index=True)
    pm25 = Column(float)
    pm10 = Column(float)
    location = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    readings = relationship("SensorReading",back_populates="sensor")

class Sensors(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, index=True)
    nmae = Column(String,unique=True,index=True)
    location = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sensor = relationship("sensor",back_populates="readings")