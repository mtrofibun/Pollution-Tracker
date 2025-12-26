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
    #randomize data here i wanted to maybe use aws for this but we will see :3
}

def createAlert(alert : AlertCreate, db : Session = Depends(get_db)):
    newAlert = Alert(
        sensorType = alert.sensorType,
        severity = alert.severity,
        unit = alert.unit,
        selfId = alert.selfId,
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
def getReading(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    counter = 0
    logs = db.query(SensorReadings).all()
    sendJson = {}
    thresholdCritical = {
        "temp" : 90, # // value, color temp
        "RGB" : 30, # 30% blue light // flicker rate, color temp, moon visbility
        "lux" : 1, # lux // moonvisbility, value
        "SQM" : 18, # mag/arcsec^2 // moonvisbility, value
        "PM10" : 155.5,#ug/m^3 // value moon visbility
        "PM25" : 55.5, #ug/m^3 // value moon visbility
    
    }
    PM25logs = db.query(SensorReadings).filter(SensorReadings.type == "PM25").first()
    PM10logs = db.query(SensorReadings).filter(SensorReadings.type == "PM10").first()
    Templogs = db.query(SensorReadings).filter(SensorReadings.type == "Temperature").first()
    Luxlogs = db.query(SensorReadings).filter(SensorReadings.type == "Lux").first()
    RGBlogs = db.query(SensorReadings).filter(SensorReadings.type == "RGB").first()
    
    for logs in PM25logs:
        if logs.value > thresholdCritical["PM25"]:
            sensor = db.query(Sensors).filter(Sensors.id == logs.sensor_id)
            alertDataTable = {
                "severity" : "critical",
                "unit" : "ug/m^3",
                "selfId" : f"{counter}PM25"
            }
            jsonAlert = {
                "id" : f"{counter}PM25",
                "name" : sensor.name,
                "type" : sensor.type,
                "location" : sensor.location,
                "unit" : "µg/m³",
                "value" : logs.value,
                "color type" : "N/A",
                "flicker rate" : "N/A",
                "moon visiblity" : logs.moonVisibility,
            }
            sendJson[counter] = jsonAlert
            counter += 1
            createAlert(alertDataTable,db)
    



@app.get("/fixedAlert/{id}")
def fixedAlert(log_id : str, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == log_id).first()
    alert.status == "fixed"
    db.commit()
    db.close()

# gets all ids to post // maybe we will need this idk
@app.get("/alert")
def getAlert(db : Session = Depends(get_db)):
    alerts = db.query(Alert).all()
    return alerts