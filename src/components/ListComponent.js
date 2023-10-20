import React, { useEffect, useState } from 'react';
import CityList from './CityList';

export default function ListComponent() {
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState({ stateId: '', stateName: '' });

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedState = stateList.find((state) => state.stateId === selectedStateId);

    if (selectedState) {
      setSelectedState(selectedState);
    } else {
      setSelectedState({ stateId: '', stateName: '' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://api.minebrat.com/api/v1/states');
      const jsonData = await response.json();
      setStateList(jsonData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select onChange={handleStateChange} value={selectedState.stateId}>
        <option value="">Select a state</option>
        {stateList.map((state, index) => (
          <option key={index} value={state.stateId}>
            {state.stateName}
          </option>
        ))}
      </select>
      <CityList stateData={selectedState} />
    </div>
  );
}
