  
const API_URL = "http://localhost:5001/api/countries";
const API_KEY = "2eaf71315bf87f5e4229f1df0f84b6840df2a58226cb8d2e681a408eaff74bd7";

export const countryService = {
    getAllCountries: async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
  
        return data.map((c) => ({
          name: c.name.common,
          capital: c.capital ? c.capital[0] : "N/A",
          currency: c.currencies ? Object.keys(c.currencies)[0] : "N/A",
          flag: c.flags?.svg || "",
        })).sort((a, b) => a.name.localeCompare(b.name)); 
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        return [];
      }
    },
  };

  export const restCountryService = {
    getCountryDetails: async (countryName) => {
      try {
        const res = await fetch(`${API_URL}/${countryName}`, {
          headers: {
            Authorization: API_KEY,
          },
        });
  
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          const country = result.data[0];
  
          // Extract currency info
          const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
          const currencyData = currencyCode ? country.currencies[currencyCode] : null;
  
          return {
            name: country.name.common,
            capital: country.capital?.[0] || "N/A",
            language: country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A",
            flag: country.flags?.svg || "",
            currency: currencyCode
              ? `${currencyData.name} (${currencyCode}) ${currencyData.symbol}`
              : "N/A"
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch country details:", error);
        return null;
      }
    },
  };
  