import React, { useEffect, useState } from 'react';
import SelectedInfo from './SelectedInfo';
import {useNavigate} from 'react-router-dom';

export default function CityList({ stateData }) {
    const navigate = useNavigate();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ cityId: '', cityName: '' });
  const [showSelectedInfo, setShowSelectedInfo] = useState(false);

  useEffect(() => {
    const fetchCityData = async () => {
      if (stateData.stateId) {
        const responseData = await fetch(`http://api.minebrat.com/api/v1/states/cities/${stateData.stateId}`);
        const jsonData = await responseData.json();
        setCityList(jsonData);
      }
    };

    if (stateData.stateId) {
      fetchCityData();
    }
  }, [stateData]);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCity = cityList.find((city) => city.cityId === selectedCityId);

    if (selectedCity) {
      setSelectedCity(selectedCity);
    } else {
      setSelectedCity({ cityId: '', cityName: '' });
    }
  };

  const handleSubmission = () => {
    if (stateData.stateName && selectedCity.cityName) {
      const url = `/selected-info/${stateData.stateName}/${selectedCity.cityName}`;
      navigate(url);
    } else {
      alert('Please select a state and a city before submitting.');
    }
  };

  return (
    <div>
      <select onChange={handleCityChange} value={selectedCity.cityId}>
        <option value="">Select a city</option>
        {cityList.map((city, index) => (
          <option key={index} value={city.cityId}>
            {city.cityName}
          </option>
        ))}
      </select>
      <button onClick={handleSubmission}>Submit</button>
      {showSelectedInfo && (
        <SelectedInfo
          stateName={stateData.stateName}
          cityName={selectedCity.cityName}
        />
      )}
    </div>
  );
}
