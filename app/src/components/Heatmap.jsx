import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

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
            const latResponse = await fetch(`http://localhost:8000/updatelang/${selection.value}`, {method:"POST"});
            if(latResponse.ok){
                const sensorId = selection.value
               const marker = L.marker(e.latlng).addTo(mapRef.current).bindPopup(`${selection.value}`)
                sensorMarkers[sensorId] = marker;
            }
           }
           catch(error){
            console.log(error.message);
           }
          
          });
          
          var df = document.createDocumentFragment();
          sensors.forEach(sensor=>{
            if(sensor.latlng !== 'N/A' && sensor.latlng === null){
              var option = document.createElement('option');
              option.value = `${sensor.selfId}`;
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