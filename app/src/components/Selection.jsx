
import React,{ useState, useRef, useEffect } from 'react';
export default function Selection({sensors, onAddSelection, onDeleteSensor, onUpdateSensor}){

const [newSensor, setNewSensor] = useState ({
    selfId : 0,
    name : 'Sensor 1',
    location : 'Park',
    radius : '20',
    type : 'Temperature',
})
const [addNewSensor, setAddNewSensor] = useState(false);
const sensorRefs = useRef({});

useEffect(()=>{

});

const createSensor = async () => {
  console.log('newSensor:', newSensor); 
  
  const entry = {
    selfId : newSensor.selfId || crypto.randomUUID(),
    name: newSensor.name,
    location: newSensor.location,
    radius: newSensor.radius,
    type: newSensor.type,

  }
  
  if(newSensor.name && newSensor.location && newSensor.type){
    
    if(newSensor.selfId){
      try {const response = await fetch(`https://locathost:8000/sensors${entry.selfId}`, {
        method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onUpdateSensor(entry);
    }
      catch(error) {
        console.log('Error editing sensor:', error);
      }
    }
    else {
 try {
      const response = await fetch('http://localhost:8000/sensors', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onAddSelection(entry);
      const data = await response.json();
      console.log('Sensor created:', data);
    } catch (error) {
      console.error('Error creating sensor:', error);
    }
    }
   
  }
  
  setAddNewSensor(false);
  setNewSensor({
    selfId : 0,
    name: 'Sensor 1',
    location: 'Park',
    type: 'Temperature',
  });
}

const deleteSensor = async (id) => {
   
  try{
    const response = await fetch(`http://localhost:8000/deleteSensor/${id}`, {method:"DELETE"})
    
     if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
           
        }
      onDeleteSensor(id);
  }
  catch (error){
        console.log(error.message);
    }
}

const editSensor = (sensor) => {
  setNewSensor({
    selfId: sensor.selfId,
    name: sensor.name,  
    location: sensor.location,
    radius : sensor.radius,
    type: sensor.type,
  });
  
  setAddNewSensor(true); 
}

return(
<>
<div class = "text-center">
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white m-10" onClick = {()=> setAddNewSensor(!addNewSensor)}>Add Sensor</button>
</div>

{addNewSensor && (<div class="absolute inset-0 flex items-center justify-center">
  <div class="w-96 h-83 bg-[#171d25] border-4 border-[#303641] rounded-sm p-3 ">
    <div class = "row">
    <h3 class = "border-b-2 border-[#303641] p-2 rounded-sm  text-zinc-400 text-center font-bold text-xl">New Sensor</h3>
    <div class = "p-3 text-zinc-400">
    <label>Name</label>
    <input class = "bg-[#303641] p-2 rounded-sm text-[#67707b]" 
    type = "text"
    placeholder = "Sensor 1"
    value = {newSensor.name}
    onChange = {(e) => setNewSensor({...newSensor, name : e.target.value})}
    />
    </div>
    <div class = "text-zinc-400 p-3">
        <label>Location</label>
        <select class = "bg-[#303641] p-2 rounded-sm text-[#67707b]" 
         value = {newSensor.location}
        onChange = {(e) => setNewSensor({...newSensor, location : e.target.value})}>
            <option>Park</option>
            <option>City</option>
            <option>Forest</option>
            <option>Neighborhood</option>
        </select>
    </div>
    <div class = "text-zinc-400 p-3">
        <label>Type</label>
        <select class = "bg-[#303641] p-2 rounded-sm text-[#67707b]" value = {newSensor.type}
         onChange = {(e) => setNewSensor({...newSensor, type : e.target.value} )}>
            <option>Temperature</option>
            <option>PM10</option>
            <option>PM2.5</option>
            <option>Lux</option>
            <option>RGB</option>
            <option>SQM</option>
        </select>
    </div>
      <div class = "p-3 text-zinc-400">
    <label><Radius></Radius></label>
    <input class = "bg-[#303641] p-2 rounded-sm text-[#67707b]" 
    type = "text"
    placeholder = "20"
    value = {newSensor.radius}
    onChange = {(e) => setNewSensor({...newSensor, radius : e.target.value})}
    />
    </div>
    <div class = "text-center"> 
   <button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white mr-9 mt-5" onClick={() => {
  createSensor();
  setAddNewSensor(false);}}>Add Selection</button>
    <button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" onClick = {() => setAddNewSensor(false)}>Exit</button>
</div>
</div>
</div>
</div>)}
<div class="flex flex-wrap gap-4">
  
  {sensors.map(sensor => (
    <div key={sensor.selfId} 
    ref={el => sensorRefs.current[sensor.selfId] = el}
    class="bg-[#171d25] border-4 border-[#303641] rounded-sm p-3  text-center">
      <h3 class="border-b-2 border-[#303641] p-2 rounded-sm text-zinc-400 text-center w-64 font-bold text-xl">
        {sensor.name}
      </h3>
      <p>Location: {sensor.location}</p>
      <p>Type: {sensor.type}</p>
      <p>Radius : {sensor.radius}</p>
      <button 
      class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white m-4"
      onClick={() => deleteSensor(sensor.selfId)}>Delete Sensor</button>
      <button onClick = {() => editSensor(sensor)}>Edit Sensor</button>
    </div>
  ))}
</div>
</>
);

}
