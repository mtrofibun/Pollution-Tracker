from pydantic import BaseModel

class SensorCreate(BaseModel):
    selfId : str
    name : str
    location : str
    type : str
    class Config:
        from_attributes = True


class SensorReadingCreate(BaseModel):
    value : float
    colorTemp : int
    flickerRate : int
    moonVisibility : float
    class Config:
        from_attributes = True

class AlertCreate(BaseModel):
    severity : int
    unit : str
    status : str
    class Config:
        from_attributes = True