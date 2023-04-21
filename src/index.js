import CurrencyService from "./js/currency-service";
import { CountryCodes, CountryInfo } from "./js/countrycodes";

function getCurrency(baseCode, targetCode, amount) {
  CurrencyService.getExchangeRate(baseCode, targetCode, amount)
    .then(response => {
      if (response.base_code) {
        console.log(`base code: ${response.base_code}
        target code: ${response.target_code}
        conversion rate: ${response.conversion_rate}
        conversion results: ${response.conversion_result}`);
      } else {
        console.log(`error: ${response}`);
      }
    });
}

function getCountryCodes() {
  CurrencyService.getCountryCodes()
  .then(response => {
    if (response.supported_codes) {
      const supportedCodes = addCountryCodes(response.supported_codes);
    } else {
      console.log(response);
    }
  });
}

function addCountryCodes(result) {
  const countryCodes = new CountryCodes();
  result.forEach(element => {
    let code = element[0];
    let country = element[1];
    const countryInfo = new CountryInfo(code, country);
    countryCodes.addCode(countryInfo);
  });
  return countryCodes
}


getCurrency('EUR', 'GBP', 16);
getCountryCodes();