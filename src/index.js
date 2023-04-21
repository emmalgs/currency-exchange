import CurrencyService from "./js/currency-service";
import { CountryCodes, CountryInfo } from "./js/countrycodes";

// Business Logic

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
        console.log(supportedCodes)
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
  return countryCodes;
}

function handleSubmitEvent(e) {
  e.preventDefault();
  const baseCode = document.querySelector("#base-code").value;
  const targetCode = document.querySelector("#target-code").value;
  const amount = parseFloat(document.querySelector("#amount").value);

  getCurrency(baseCode, targetCode, amount);
}

getCountryCodes();
window.addEventListener("load", function() {
  this.document.querySelector("form").addEventListener("submit", handleSubmitEvent);
})