import api from './api';

export const getCountryInfo = async (countryName) => {
  const response = await api.get(`/countries/${countryName}`);
  return response.data;
};

export const getAllCountries = async () => {
  const response = await api.get('/countries');
  return response.data;
};