import './App.css'
import Selection from './components/Selection';
import Alerts from "./components/Alerts";
import React, { useState } from 'react';
import Heatmap from './components/Heatmap'

function App() {
  const [activeTab, setActiveTab] = useState('simulation');
  const [sensors, setSensors] = useState([]); 
  const handleDeleteSensor = (id) => {
  setSensors(prevSensors => prevSensors.filter(sensor => sensor.selfId !== id));
};
  const handleAddSelection = (newSensor) => {
    setSensors([...sensors, newSensor]);
  };
  const handleUpdateSensor = (updatedSensor) => {
  setSensors(prevSensors => 
    prevSensors.map(sensor => 
      sensor.selfId === updatedSensor.selfId ? updatedSensor : sensor
    )
  );
};

  return (
  <>
    <div className="text-lg fixed p-2 w-300 left-0 top-0 z-10 font-medium text-center text-body bg-[#171d25]">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <button 
            className={`px-4 py-2 font-medium tab ${activeTab === 'simulation' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulation')}
          >
            Simulation
          </button>
        </li>
        <li className="me-2">
          <button 
            className={`px-4 py-2 font-medium tab ${activeTab === 'selection' ? 'active' : ''}`}
            onClick={() => setActiveTab('selection')}
          >
            Sensors
          </button>
        </li>
      </ul>
    </div>
    {activeTab === 'selection' && <Selection sensors={sensors} 
    onAddSelection={handleAddSelection} 
    onDeleteSensor={handleDeleteSensor}
    onUpdateSensor={handleUpdateSensor}/>}
    {activeTab === 'simulation' && <Alerts/>}
  </>
)
}

export default App
