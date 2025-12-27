from pydantic import BaseModel

class SensorCreate(BaseModel):
    name : str
    location : str
    type : str
    class Config:
        from_attributes = True


class SensorReadingCreate(BaseModel):
    value : str
    colorTemp : int
    flickerRate : int
    moonVisibility : float
    class Config:
        from_attributes = True

class AlertCreate(BaseModel):
    severity : int
    unit : str
    status : str
    selfId : str
    class Config:
        from_attributes = True