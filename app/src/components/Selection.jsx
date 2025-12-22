
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

const createSensor = () => {
    if(newSensor.name && newSensor.location && newSensor.type){
        onAddSelection({
            name : newSensor.name,
            location : newSensor.location,
            type : newSensor.type,
            date : newSensor.date
        })
    }
}

/* inputs */
<div class = "main-form">
    <h3>New Sensor</h3>
    <div class = "form">
    <label>Name</label>
    <input 
    type = "text"
    value = {newSensor.name}
    onChange = {(e) => setNewSensor({...newSensor, date : e.target.value})}
    />
    </div>
    <div class = "form">
        <h3>Location</h3>
        <selection>
            <option>Park</option>
            <option>City</option>
            <option>Forest</option>
            <option>Neighborhood</option>
        </selection>
    </div>
</div>


}
