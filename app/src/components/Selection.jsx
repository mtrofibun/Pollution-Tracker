
import React,{ useState } from 'react';

export default function Selection({sensors, onAddSelection}){
/* allow users to create their own sensors here
input box 1 for name
selection box for location
selection box for type // temp, pollution, lux, color

*/

const [newSensor, setNewSensor] = useState ({
    name : 'Sensor 1',
    location : 'Park',
    attr : 'Temperature',
})
const [addNewSensor, setAddNewSensor] = useState(false);


const createSensor = () => {
     const time = new Date();
     console.log(time);
     console.log('newSensor:', newSensor); 
    if(newSensor.name && newSensor.location && newSensor.attr){
        onAddSelection({
            name: newSensor.name,
            location: newSensor.location,
            attr: newSensor.attr,
            date: time,
        });
    }
    console.log(newSensor)
    setAddNewSensor(false);
    setNewSensor({  name : 'Sensor 1',
    location : 'Park',
    attr : 'Temperature',});
   
}

/* inputs */
return(
<>
<button onClick = {()=> setAddNewSensor(!addNewSensor)}>Add Sensor</button>


{addNewSensor && (<div class = "main-form">
    <div class = "form-gap">
    <h3>New Sensor</h3>
    <div class = "form">
    <label>Name</label>
    <input 
    type = "text"
    placeholder = "Sensor 1"
    value = {newSensor.name}
    onChange = {(e) => setNewSensor({...newSensor, name : e.target.value})}
    />
    </div>
    <div class = "form">
        <label>Location</label>
        <select value = {newSensor.location}
        onChange = {(e) => setNewSensor({...newSensor, location : e.target.value})}>
            <option>Park</option>
            <option>City</option>
            <option>Forest</option>
            <option>Neighborhood</option>
        </select>
    </div>
    <div class = "form">
        <label>Type</label>
        <select value = {newSensor.attr}
         onChange = {(e) => setNewSensor({...newSensor, attr : e.target.value} )}>
            <option>Temperature</option>
            <option>PM10</option>
            <option>PM2.5</option>
            <option>Lux</option>
        </select>
    </div>
   <button class = "button-gap" onClick={() => {
  createSensor();
  setAddNewSensor(false);}}>Add Selection</button>
    <button class = "button-gap" onClick = {() => setAddNewSensor(false)}>Exit</button>
</div></div>)}
<div class = "sensor-display">
      {sensors.map(sensor => (
        <div key={sensor.id}>
            <h2>{sensor.name}</h2>
            <p>Location : {sensor.location}</p>
            <p>Type : {sensor.attr}</p>
        </div>
      ))}
    </div>
</>
);

}
