import { useState } from "react"
import Heatmap from './Heatmap'

export default function Alerts(){
const [getAlerts,setGetAlerts] = useState({})

const [alertStatus, setAlertStatus] = useState(false)


const changeStatus = async (id) => {

    try {
        const response = await fetch(`http://localhost:8000/fixedAlert/${id}`, {method:"POST"})
        if(response.ok){
             throw new Error(`Response status: ${response.status}`);
        }
    }
    catch (error){
        console.log(error.message);
    }

}

const displayAlerts = async () => {

    try {
        const response = await fetch('http://localhost:8000/testing',  {method:"GET"})
        if(response.ok){
            throw new Error(`Response status: ${response.status}`);
            
        }
        const alertsArray = Object.entries(response).map(([id,content]) => ({
                id, ...content
            }));

        setGetAlerts(alertsArray);
        const result = await response.json();
        console.log(result);
    } catch (error){
        console.log(error.message);
    }
}

return(<>
<div class = "row border-2 border-[#303641] w-100 h-100vh">
 <Heatmap />
</div>
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white"
onClick = {()=>{}}
>Save Layout</button>
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" 
onClick = {()=>{displayAlerts()
    setAlertStatus(true);
}}>Run Simulation</button>

{alertStatus && (
    <div class = "">
    {Object.entries(getAlerts).map(([id,response])=>(
        <div key = {getAlerts.id}> 
            <h3>{getAlerts.name}</h3>
            <p>Results</p>
            <p>Location: {getAlerts.location}</p>
            <p>Type: {getAlerts.type}</p>
            <p>Unit : {getAlerts.unit}</p>
            <p>Value : {getAlerts.value}</p>
            <p>Color Type : {getAlerts.colorType}</p>
            <button onClick = {() => changeStatus(getAlerts.id)}>Resolve</button>
        </div>
    ))}

    </div>

)}
</>)


}
