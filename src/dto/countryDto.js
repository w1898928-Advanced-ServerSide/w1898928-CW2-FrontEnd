export const countryDTO = (country) => ({
  name: country.name,
  code: country.code,
  flag: country.flag,
  capital: country.capital,
  currency: country.currency,
  population: country.population,
  languages: country.languages
});

export const countryListDTO = (countries) => countries.map(countryDTO);