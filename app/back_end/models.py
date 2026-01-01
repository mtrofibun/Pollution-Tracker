from sqlalchemy import Column, Integer, Float, String, DateTime,Boolean,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Sensors(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    location = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    selfId = Column(String)
    readings = relationship("SensorReadings", back_populates="sensor")
    alerts = relationship("Alert", back_populates="sensor")

class SensorReadings(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), index=True) 
    value = Column(Float)
    colorTemp = Column(Integer)
    flickerRate = Column(Integer)
    moonVisibility = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    sensor = relationship("Sensors", back_populates="readings") 
    alerts = relationship("Alert", back_populates="reading")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), nullable=False)
    reading_id = Column(Integer, ForeignKey("sensor_readings.id"), nullable=True)
    severity = Column(Integer, nullable=False)
    unit = Column(String)
    status = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sensor = relationship("Sensors", back_populates="alerts") 
    reading = relationship("SensorReadings", back_populates="alerts")  