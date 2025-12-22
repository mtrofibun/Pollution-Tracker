
import React,{ useState } from 'react';

export default function Selection({sensors, onAddSelection}){
/* allow users to create their own sensors here
input box 1 for name
selection box for location
selection box for type // temp, pollution, lux, color

*/

const [newSensor, setNewSensor] = useState ({
    name : '',
    location : '',
    type : '',
    date : ''
})
const [addNewSensor, setAddNewSensor] = useState(false);

const createSensor = () => {
    if(newSensor.name && newSensor.location && newSensor.type){
        onAddSelection({
            name : newSensor.name,
            location : newSensor.location,
            type : newSensor.type,
            date : newSensor.date
        })
    }
    console.log(newSensor)
    setAddNewSensor(false);
    setNewSensor({ name : '',
    location : '',
    type : '',
    date : ''});
   
}

/* inputs */
return(
<>
<button onClick = {()=> setAddNewSensor(!addNewSensor)}>Add Sensor</button>


{addNewSensor && (<div class = "main-form">
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
        <h3>Location</h3>
        <select onChange = {(e) => setNewSensor({...newSensor, location : e.target.value})}>
            <option>Park</option>
            <option>City</option>
            <option>Forest</option>
            <option>Neighborhood</option>
        </select>
    </div>
    <div class = "form">
        <h3>Type</h3>
        <select onChange = {(e) => setNewSensor({...newSensor, type : e.target.value})}>
            <option>Temperature</option>
            <option>PM10</option>
            <option>PM2.5</option>
            <option>Neighborhood</option>
        </select>
    </div>
    <button onClick = {() => setAddNewSensor(createSensor)}>Add Selection</button>
    <button onClick = {() => setAddNewSensor(false)}>Exit</button>
</div>)}

</>
);

}
