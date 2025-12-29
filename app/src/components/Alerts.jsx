import { useState } from "react"
import * as d3 from "d3" //* https://www.react-graph-gallery.com/heatmap  https://codesandbox.io/p/sandbox/react-d3-heatmap-demo-jzvr5?file=%2Fsrc%2FOneYearHeatMap.jsx
export default function Alerts(){
/* 
when sensor goes over threshold make alert appear
have an option for the user to make it as resolved <-- this should change the color of the background

*/
const [getAlerts,setGetAlerts] = useState({})

const [alertStatus, setAlertStatus] = useState(false)


const displayAlerts = async () => {

    try {
        const response = await fetch('http://localhost:8000/testing')
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

</div>
<button class = "bg-gradient-to-r from-sky-400 to-blue-600 text-white" 
onClick = {()=>{displayAlerts()
    setAlertStatus(true);
}}>Run Simulation</button>

{alertStatus && (
    <div>
    {Object.entries(getAlerts).map(([id,response])=>(
        <div> 
            <h3>{getAlerts.name}</h3>
            <p>Results</p>
            <p>Location: {getAlerts.location}</p>
            <p>Type: {getAlerts.type}</p>
            <button>Resolve</button>
        </div>
    ))}

    </div>

)}
</>)


}
