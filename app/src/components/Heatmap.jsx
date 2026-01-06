import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

export default function Heatmap() {
    const onMapClick = async(e) => {
        placement = e.latlng;
        var popup = L.popup(latlng, {
            content: `
    <div>
      <p>Place Sensor here?</p>
      <select>
      /* loop through selection so fetch maybe create api for grabbing names n ids
      also save latlng into database*/
      </select>
      <button onclick="">Submit</button>
    </div>
  `
}).openOn(map);
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
      }).addTo(mapRef.current);
    }
  }, [sensorData]);

  return <div id="heatmap" style={{ height: '500px', width: '100%' }} />;
}