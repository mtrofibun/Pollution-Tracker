import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';


var markerIcon = L.Icon.extend({
  options : {
    iconUrl : './src/assets/markers/bluemarker.png',
    iconSize : [20,20],
    iconAnchor: [22,22],
    popupAnchor : [-9,-9]
  }
});

var blueMarker = new markerIcon({iconUrl : "./src/assets/markers/bluemarker.png"})
var redMarker = new markerIcon({iconUrl : "./src/assets/markers/redmarker.png"})
var yellowMarker = new markerIcon({iconUrl : "./src/assets/markers/yellowmarker.png"})



export default function Heatmap() {
  const sensorMarkers = {};
    const onMapClick = async(e) => {
      try {
        const response = await fetch(`http://localhost:8000/getSensors`, {method:"GET"})
        if(response.ok){
          const sensors = await response.json();
          const popupContent = document.createElement('div');
          const selection = document.createElement('select');
          const popupButton = document.createElement('button');
          popupButton.textContent = 'Submit';
          popupButton.addEventListener("click", async() => {
           try {
            const sensorValue = selection.value.split(",").map(String);
            const sensorId = sensorValue[1]
            const latResponse = await fetch(`http://localhost:8000/updatelang/${sensorId}`, 
              {method:"PATCH",
                headers: {
                'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
              latlng: `${e.latlng.lat},${e.latlng.lng}`
              })

              });
            if(latResponse.ok){
              const markerContent = document.createElement('div');
              const markerButton = document.createElement('button');
              const heading = document.createElement('h3');
              heading.textContent = `${sensorValue[0]},${sensorValue[2]}`
              markerButton.textContent = 'Reposition';
              markerButton.addEventListener("click", async()=>{
                try{
                const clearLat = await fetch(`http://localhost:8000/deletelang/${`${e.latlng.lat},${e.latlng.lng}`}`,
                  {method : "DELETE"})
                if(clearLat.ok){
                  console.log(clearLat.response);
                  sensorMarkers[sensorId].remove();
                }}
                catch(err){
                  console.log(err);
                }
              })
              markerContent.appendChild(heading);
              markerContent.appendChild(markerButton);
              
               const marker = L.marker(e.latlng,{icon: blueMarker}).addTo(mapRef.current).bindPopup(markerContent);
                sensorMarkers[sensorId] = marker;
            }
           }
           catch(error){
            console.log(error.message);
           }
          
          });
          
          var df = document.createDocumentFragment();
          sensors.forEach(sensor=>{
            if(sensor.latlng === "N/A" || sensor.latlng === null){
              var option = document.createElement('option');
              option.value = `${sensor.name},${sensor.selfId},${sensor.type}`;
              option.appendChild(document.createTextNode(`${sensor.name} : ${sensor.selfId}`));
              df.appendChild(option);
            }
            selection.appendChild(df)
          })
          
            popupContent.appendChild(selection);
            popupContent.appendChild(popupButton);
            L.popup()
            .setLatLng(e.latlng)
            .setContent(popupContent)
            .openOn(mapRef.current);
          
        }
    }
    catch (error){
        console.log(error.message);
    }
      
    }

  const mapRef = useRef(null);
  const heatLayerRef = useRef(null);
  const [sensorData, setSensorData] = useState([
    [40.7128, -74.0060, 0.8],
    [40.7150, -74.0080, 0.5],
    [40.7100, -74.0100, 0.3],
  ]);
  useEffect( () => {
    const loadMarkers = async () => {
      if(!mapRef.current) return;
      try {
        const response = await fetch(`http://localhost:8000/getSensors`, {method:"GET"});
        if(response.ok) {
          const sensors = await response.json();
          console.log(sensors);
          sensors.forEach(sensor =>{
            console.log(sensor);
             const [lat, lng] = sensor.latlng.split(',').map(Number);
            const markerContent = document.createElement('div');
              const markerButton = document.createElement('button');
              const heading = document.createElement('h3');
              heading.textContent = `${sensor.name}, ${sensor.type}`
              markerButton.textContent = 'Reposition';
              markerButton.addEventListener("click", async()=>{
                try{
                const clearLat = await fetch(`http://localhost:8000/deletelang/${sensor.latlng}`,
                  {method : "DELETE"})
                if(clearLat.ok){
                  console.log(clearLat.response);
                  sensorMarkers[sensor.id].remove()
                }}
                catch(err){
                  console.log(err);
                }
              })
              markerContent.appendChild(heading);
              markerContent.appendChild(markerButton);
              
            L.marker([lat, lng],{icon: blueMarker}).addTo(mapRef.current).bindPopup(markerContent)
          
        })
        }
        
      }
      catch(error){
        console.log(error);
      }
    }
    loadMarkers();
  },[]);
   useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('heatmap').setView([40.7128, -74.0060], 20);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
      mapRef.current.on('click', onMapClick);
    }
  }, []);
  useEffect(() => {
    if (mapRef.current) {
      if (heatLayerRef.current) {
        mapRef.current.removeLayer(heatLayerRef.current);
      }
      
      heatLayerRef.current = L.heatLayer(sensorData, {
        radius: 25,
        blur: 15,
        maxZoom:17,
        max:1.0,
        min:1.0,
        gradient: {
          0.0: 'blue',
          0.5:'lime',
          0.7:'yellow',
          1.0:'red'
        }
      }).addTo(mapRef.current);
    }
  }, [sensorData]);

  

  return <div id="heatmap" style={{ height: '500px', width: '100%' }} />;
}