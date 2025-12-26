from pydantic import BaseModel

class SensorCreate(BaseModel):
    name : str
    location : str
    type : str


class SensorReadingCreate(BaseModel):
    value : str
    colorTemp : int
    flickerRate : int
    moonVisibility : float

class AlertCreate(BaseModel):
    severity : int
    unit : str
    status : str
    selfId : str