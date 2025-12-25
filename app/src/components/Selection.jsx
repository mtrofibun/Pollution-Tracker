
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
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" onClick = {()=> setAddNewSensor(!addNewSensor)}>Add Sensor</button>


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
        <select class = "bg-[#303641] p-2 rounded-sm text-[#67707b]" value = {newSensor.attr}
         onChange = {(e) => setNewSensor({...newSensor, attr : e.target.value} )}>
            <option>Temperature</option>
            <option>PM10</option>
            <option>PM2.5</option>
            <option>Lux</option>
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
<div class = "row-16">
    <div class = "col">
      {sensors.map(sensor => (
        <div class = "bg-[#171d25] border-4 border-[#303641] rounded-sm p-3">
        <div key={sensor.id}>
            <h3  class = "border-b-2 border-[#303641] p-2 rounded-sm  text-zinc-400 text-center font-bold text-xl">{sensor.name}</h3>
            <p>Location : {sensor.location}</p>
            <p>Type : {sensor.attr}</p>
        </div>
        </div>
      ))}
      </div>
    </div>
</>
);

}
