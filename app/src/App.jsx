import './App.css'
import Selection from './components/Selection';
import React, { useState } from 'react';

function App() {
  const [showSelection, setShowSelection] = useState(false);
  const [sensors, setSensors] = useState([]); 
  
  const handleAddSelection = (newSensor) => {
    setSensors([...sensors, newSensor]);
  };

  return (
    <>
      <Selection 
        sensors={sensors} 
        onAddSelection={handleAddSelection}
      />
    </>
  )
}

export default App
