import React, { useState, useEffect } from 'react';
import { getCountryInfo } from '../../services/countryService';
import LoadingSpinner from '../common/LoadingSpinner';

const CountryInfo = ({ countryName }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const data = await getCountryInfo(countryName);
        setCountry(data);
      } catch (err) {
        setError(err.message || 'Failed to load country info');
      } finally {
        setLoading(false);
      }
    };
    
    if (countryName) {
      fetchCountryInfo();
    }
  }, [countryName]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!country) return null;

  return (
    <div className="country-info">
      <div className="country-flag">
        <img src={country.flag} alt={`${country.name} flag`} />
      </div>
      <div className="country-details">
        <h3>{country.name}</h3>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Currency:</strong> {country.currency}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {country.languages.join(', ')}</p>
      </div>
    </div>
  );
};

export default CountryInfo;