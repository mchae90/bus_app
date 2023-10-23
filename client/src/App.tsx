import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [busInfo, setBusInfo] = useState([]);

  const updateState = useCallback(async () => {
    const response = await fetch('http://localhost:9000/');
    const data = await response.json();
    console.log(data['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['VehicleActivity'])
    setBusInfo(data['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['VehicleActivity']);
  }, []);

  useEffect(() => {
    console.log('useEffect ran');
    setInterval(updateState, 3000);
  }, [updateState]);

  return (
    <div>
      {busInfo.length > 0 && busInfo[0]['MonitoredVehicleJourney'] && busInfo[0]['MonitoredVehicleJourney']['VehicleLocation'] && (
        <div>
          {busInfo[0]['MonitoredVehicleJourney']['VehicleLocation']['Latitude']}
        </div>
      )}
    </div>
  );
}

export default App;
