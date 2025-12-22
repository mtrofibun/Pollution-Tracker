from fastapi import FastAPI,Depends,BackgroundTasks
from sqlalchemy.orm import Session
from database import SessionLocal,Base,engine, get_db
from models import SensorReadings,Sensors,Alert
from schemas import AlertCreate, SensorReadingCreate, SensorCreate
import requests,random

Base.metadata.create_all(bind=engine)


poorPM25 = 55.5
criticalPM25 = 150.5
poorPM10 = 25.0
criticalPM10 = 54.0

payload = {
    #randomize data here 
}

def createAlert(alert : AlertCreate, db : Session = Depends(get_db)):
    newAlert = Alert(
        sensorType = alert.sensorType,
        severity = alert.severity,
        unit = alert.unit,
        value = alert.value,
        status = "Not Fixed"
        
    )
    db.add(newAlert)
    db.commit()
    db.refresh(newAlert)

app = FastAPI()

@app.get("/")
def reading_from_root():
    return {"Testing"}

@app.post("/sensors")
def addSensor(sensor : SensorCreate, db: Session = Depends(get_db)):
    newSensor = Sensors(
        name = sensor.name,
        location = sensor.location,
        type = sensor.type
    )
    
    db.add(newSensor)
    db.commit()
    db.refresh(newSensor)
    return newSensor

@app.post("/sensorData")
def createReading(reading : SensorReadingCreate, db: Session = Depends(get_db)):
    pass

@app.get("/sensorData")
def getReading(background_tasks: BackgroundTasks, db: Session = Depends(get_db),):
    logs = db.query(SensorReadings).all()
    thresholdCritical = {
        "temp" : 90,
        "RGB" : 30, # 30% blue light
        "lux" : 1, # lux
        "SQM" : 18, # mag/arcsec^2
        "PM10" : 155.5,#ug/m^3
        "PM25" : 55.5, #ug/m^3
    
    }
    PM25logs = db.query(SensorReadings).filter(SensorReadings.type == "PM25")
    for logs in PM25logs:
        if logs.value > thresholdCritical["PM25"]:
            alertData = {
                "sensorType" : "PM25",
                "severity" : "critical",
                "unit" : "ug/m^3",
                "type" : logs.value
            }
            createAlert(alertData,db)
    



@app.get("/fixedAlert/{id}")
def fixedAlert(log_id : str, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == log_id).first()
    alert.status == "fixed"
    db.commit()
    db.close()

# gets all ids to post
@app.get("/alert")
def getAlert(db : Session = Depends(get_db)):
    alerts = db.query(Alert).all()
    return alerts