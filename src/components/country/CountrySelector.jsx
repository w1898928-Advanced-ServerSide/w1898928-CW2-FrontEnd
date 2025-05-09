import React from 'react';
import countries from '../../data/countries';

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  return (
    <select
      value={selectedCountry}
      onChange={(e) => onCountryChange(e.target.value)}
      className="country-selector"
    >
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;