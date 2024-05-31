// CountrySelector.js
import React from 'react'; 

export const countries = ["Uganda", "Kenya", "Rwanda", "Burundi", "Tanzania", "South Sudan", "Malawi", "Botswana", "Zambia", 
"Algeria", "Angola", "Benin", "Burkina Faso", "Cameroon", "Cape Verde", "Central African Republic", 
"Chad", "Comoros", "Congo", "DRC", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Ethiopia", 
"Gabon", "Gambia", "Ghana", "Guinea", "Guinea Bissau", "Ivory Coast", "Lesotho", "Liberia", "Libya", 
"Madagascar", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", 
"Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "Sudan", 
"Swaziland", "Togo", "Tunisia", "Zimbabwe"];



function CountrySelector({ onSelectCountry }) {
  
  const handleChange = (e) => {
    onSelectCountry(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} defaultValue="Uganda" class="selector">
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
