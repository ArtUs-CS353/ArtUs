import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from './preferences.png'; 

function PreferencesPage() {
  const location = useLocation();
  const formData = location.state?.formData || {};

  const [types, setTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [movements, setMovements] = useState([]);

  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckboxChange = (preferenceType, preference) => {
    const isPreferenceSelected = selectedPreferences.some(
      (selected) => selected.preferenceType === preferenceType && selected.preference === preference
    );

    if (isPreferenceSelected) {
      setSelectedPreferences((prevSelected) =>
        prevSelected.filter(
          (selected) => !(selected.preferenceType === preferenceType && selected.preference === preference)
        )
      );
    } else {
      setSelectedPreferences((prevSelected) => [
        ...prevSelected,
        { preferenceType, preference },
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get('http://localhost:8080/register/getTypes');
        const materialsResponse = await axios.get('http://localhost:8080/register/getMaterials');
        const raritiesResponse = await axios.get('http://localhost:8080/register/getRarities');
        const movementsResponse = await axios.get('http://localhost:8080/register/getMovements');

        setTypes(typesResponse.data);
        setMaterials(materialsResponse.data);
        setRarities(raritiesResponse.data);
        setMovements(movementsResponse.data);
      } catch (error) {
        console.error('Error fetching preferences data:', error);
      }
    };

    fetchData();
  }, []);


  const handleCompleteSignUp = async () => {
    try {
      const preferences = selectedPreferences.map((selected) => selected.preference);
      const encodedPreferences = encodeURIComponent(JSON.stringify(preferences));
      
      const userData = {
        userName: formData.userName,
        userSurname: formData.userSurname,
        email: formData.email,
        password: formData.password,
        contactInfo: formData.contactInfo,
        address: formData.address,
        role: formData.role === 'collector' ? 4 : formData.role === 'enthusiast' ? 3 : 0,
        Preferences: encodedPreferences,
      };
  
      const response = await axios.post(
        'http://localhost:8080/register/enthusiast',
        null,
        {
          params: userData,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response);
      
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Registration failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error completing sign up:', error);
    }
  };  

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  const backgroundImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '200px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const preferencesTextContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
    width: '100%',
  };

  const preferencesContainerStyle = {
    marginTop: '20px',
  };

  const preferenceCategoryStyle = {
    textAlign: 'center',
    marginBottom: '10px',
  };

  const frameStyle = {
    width: '800px',
    overflow: 'hidden',
  };

  const checkboxesContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const checkboxStyle = {
    margin: '5px',
  };

  const completeButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundImageStyle}>
        <div style={preferencesTextContainerStyle}>
          <h1>Choose your interest</h1>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={preferencesContainerStyle}>
        {/* Types */}
        <div style={preferenceCategoryStyle}>
          <h2>Types</h2>
          <div style={{ ...frameStyle, ...checkboxesContainerStyle }}>
            {types.map((type, index) => (
              <div key={index} style={checkboxStyle}>
                <input
                  type="checkbox"
                  value={type}
                  onChange={() => handleCheckboxChange('types', type)}
                  checked={selectedPreferences.some((selected) => selected.preferenceType === 'types' && selected.preference === type)}
                />
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div style={preferenceCategoryStyle}>
          <h2>Materials</h2>
          <div style={{ ...frameStyle, ...checkboxesContainerStyle }}>
            {materials.map((material, index) => (
              <div key={index} style={checkboxStyle}>
                <input
                  type="checkbox"
                  value={material}
                  onChange={() => handleCheckboxChange('materials', material)}
                  checked={selectedPreferences.some((selected) => selected.preferenceType === 'materials' && selected.preference === material)}
                />
                {material}
              </div>
            ))}
          </div>
        </div>

        {/* Rarities */}
        <div style={preferenceCategoryStyle}>
          <h2>Rarities</h2>
          <div style={{ ...frameStyle, ...checkboxesContainerStyle }}>
            {rarities.map((rarity, index) => (
              <div key={index} style={checkboxStyle}>
                <input
                  type="checkbox"
                  value={rarity}
                  onChange={() => handleCheckboxChange('rarities', rarity)}
                  checked={selectedPreferences.some((selected) => selected.preferenceType === 'rarities' && selected.preference === rarity)}
                />
                {rarity}
              </div>
            ))}
          </div>
        </div>

        {/* Movements */}
        <div style={preferenceCategoryStyle}>
          <h2>Movements</h2>
          <div style={{ ...frameStyle, ...checkboxesContainerStyle }}>
            {movements.map((movement, index) => (
              <div key={index} style={checkboxStyle}>
                <input
                  type="checkbox"
                  value={movement}
                  onChange={() => handleCheckboxChange('movements', movement)}
                  checked={selectedPreferences.some((selected) => selected.preferenceType === 'movements' && selected.preference === movement)}
                />
                {movement}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button style={completeButtonStyle} onClick={handleCompleteSignUp}>
        Complete
      </button>
    </div>
  );
}

export default PreferencesPage;