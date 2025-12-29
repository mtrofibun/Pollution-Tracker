
import React,{ useState } from 'react';
export default function Selection({sensors, onAddSelection}){
/* TODO: create delete button
figure out how to remove in frontend and from database
*/

const [newSensor, setNewSensor] = useState ({
    name : 'Sensor 1',
    location : 'Park',
    type : 'Temperature',
    selfID : ''
})
const [addNewSensor, setAddNewSensor] = useState(false);


const createSensor = async () => {
  console.log('newSensor:', newSensor); 
  
  const entry = {
    name: newSensor.name,
    location: newSensor.location,
    type: newSensor.type,
    /* try to use this combo to identify thefront end perhaps or use id see which one works */
    selfID : f`${newSensor.name}${newSensor.location}${newSensor.type}`
  }
  
  if(newSensor.name && newSensor.location && newSensor.type){
    onAddSelection(entry);
    
    try {
      const response = await fetch('http://localhost:8000/sensors', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Sensor created:', data);
    } catch (error) {
      console.error('Error creating sensor:', error);
    }
  }
  
  setAddNewSensor(false);
  setNewSensor({
    name: 'Sensor 1',
    location: 'Park',
    type: 'Temperature',
    selfID : ''
  });
}

const deleteSensor = async (id) => {
  try{
    const response = await fetch(`http://localhost:8000/deleteSensor/${id}`)
     if(response.ok){
            throw new Error(`Response status: ${response.status}`);
            
        }
  }
  catch (error){
        console.log(error.message);
    }
    /* figure a way to remove from the front end */
}

return(
<>
<div class = "text-center">
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" onClick = {()=> setAddNewSensor(!addNewSensor)}>Add Sensor</button>
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
    <div class = "text-zinc-400 p-3 ">
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
    <div class = "text-center"> 
   <button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white mr-9 mt-5" onClick={() => {
  createSensor();
  setAddNewSensor(false);}}>Add Selection</button>
    <button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" onClick = {() => setAddNewSensor(false)}>Exit</button>
</div>
</div>
</div>
</div>)}
<div className="flex flex-wrap gap-4">
  {sensors.map(sensor => (
    <div key={sensor.id} className="bg-[#171d25] border-4 border-[#303641] rounded-sm p-3">
      <h3 className="border-b-2 border-[#303641] p-2 rounded-sm text-zinc-400 text-center w-64 font-bold text-xl">
        {sensor.name}
      </h3>
      <p>Location: {sensor.location}</p>
      <p>Type: {sensor.type}</p>
      <button onClick={() => deleteSensor(sensor.id)}>Delete Sensor</button>
    </div>
  ))}
</div>
</>
);

}
