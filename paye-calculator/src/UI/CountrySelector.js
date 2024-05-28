// CountrySelector.js
import React from 'react'; 

function CountrySelector({ onSelectCountry }) {
  const countries = 
  ['Nigeria', 'South Africa', 'Uganda', 'Kenya', 'Swaziland', 'Namibia', 'Bostwana', 'Zambia', 'Lesotho','Zimbabwe',
'Mozambique', 'Malawi','Madagscar','Angola','DRC','Congo','Gabon','Burundi','Rwanda','Tanzania','Angola','Senegal','Niger',
'Eygpt','Morocco','South Sudan','Equatorial Guinea', 'Guinea','Cameroon','Gambia','Guinea Bissau','Liberia','Mauritania',
'Togo', 'Djibouti', 'Seychelles', 'Sao Tome and Principe', 'Ghana',
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
