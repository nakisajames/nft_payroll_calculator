// CountrySelector.js
import React from 'react'; 

const countries = 
  ['Nigeria', 'South Africa', 'Uganda', 'Kenya', 'Swaziland', 'Namibia', 'Botswana', 'Zambia', 'Lesotho','Zimbabwe',
'Mozambique', 'Malawi','Madagascar','Angola','DRC','Congo','Gabon','Burundi','Rwanda','Tanzania','Senegal','Niger',
'Egypt','Morocco','South Sudan','Equatorial Guinea', 'Guinea','Cameroon','Gambia','Guinea Bissau','Liberia','Mauritania',
'Togo', 'Djibouti', 'Seychelles', 'Sao Tome and Principe', 'Ghana', 'Cape Verde', 'Central African Republic', 
'Eritrea', 'Sudan', 'Ivory Coast', 'Benin', 'Comoros', 'Chad', 'Algeria', 'Ethiopia', 'Tunisia', 
'Libya','Sierra Leone', 'Burkina Faso', 'Mauritius', 'Mali', 'Somalia'];

export const sortedCountries = countries.sort();

function CountrySelector({ onSelectCountry }) {
  
  const handleChange = (e) => {
    onSelectCountry(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} defaultValue={sortedCountries[0]} class="selector">
        {sortedCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
