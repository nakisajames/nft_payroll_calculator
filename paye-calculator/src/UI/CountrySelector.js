// CountrySelector.js
import React from 'react'; 

function CountrySelector({ onSelectCountry }) {
  const countries = ['Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Togo', 'Djibouti', 'Seychelles', 'Sao Tome and Principe', 
  'Cape Verde', 'Central African Republic', 'Lesotho', 'Eritrea'];

  const handleChange = (e) => {
    onSelectCountry(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} defaultValue="South Africa" class="selector">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
