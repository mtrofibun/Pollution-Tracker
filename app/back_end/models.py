from sqlalchemy import Column, Integer, float, String, DateTime,Boolean,ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Sensors(Base):
    __tablename__ = "sensors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String,unique=True,index=True)
    type = Column(String)
    location = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    sensor = relationship("sensor",back_populates="readings")

class SensorReadings(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String, index=True)
    pm25 = Column(float)
    pm10 = Column(float)
    value = Column(float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    readings = relationship("SensorReading",back_populates="sensor")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True)
    sensor_id = Column(Integer, ForeignKey("sensors.id"), nullable=False)
    reading_id = Column(Integer, ForeignKey("sensor_readings.id"), nullable=True)

    type = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    message = Column(String, nullable=False)

    acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    sensor = relationship("Sensor")