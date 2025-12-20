from pydantic import BaseModel

class SensorCreate(BaseModel):
    name : str
    location : str
    type : str


class SensorReadingCreate(BaseModel):
    value : str
    type : str
    colorTemp : int
    flickerRate : int
    moonVisibility : float

class AlertCreate(BaseModel):
    sensorType : str
    severity : int
    unit : str
    status : str