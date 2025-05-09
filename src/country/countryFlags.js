import React from 'react';
import flags from '../../data/countryFlags';

const CountryFlag = ({ country }) => {
  const flag = flags.find(f => f.name === country);
  return flag ? (
    <img 
      src={flag.image} 
      alt={`${country} flag`} 
      className="country-flag"
      style={{ width: '24px', height: '16px', marginRight: '8px' }}
    />
  ) : null;
};

export default CountryFlag;