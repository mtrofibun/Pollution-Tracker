from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from database import SessionLocal,Base,engine, get_db
from models import SensorReadings,Sensors,Alert
import requests,random

Base.metadata.create_all(bind=engine)


poorPM25 = 55.5
criticalPM25 = 150.5
poorPM10 = 25.0
criticalPM10 = 54.0

payload = {
    #randomize data here 
}

app = FastAPI()

@app.get("/")
def reading_from_root():
    return {"Testing"}

@app.post("sensors/")
def addSensor(name : str, type: str, location: str, db: Session = Depends(get_db)):
    pass

@app.post("/sensorData")
def createReading(reading:dict, db: Session = Depends(get_db)):
    pass

@app.get("/sensorData")
def getReading(db: Session = Depends(get_db)):
    pass

@app.post("/alert")
# create alert when sensorData shows critical 
def createAlert(type : str, severity : str, message : str):
    pass

@app.get("/alert")
#grab alert to post on frontend
def getAlert():
    pass
