import CurrencyService from "./js/currency-service";
import { CountryCodes, CountryInfo } from "./js/countrycodes";

// Utility Logic

function financial(number) {
  return parseFloat(number).toFixed(2)
}

function displayBigNums(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Business Logic

function getCurrency(baseCode, targetCode, amount) {
  CurrencyService.getExchangeRate(baseCode, targetCode, amount)
    .then(response => {
      if (response.base_code) {
        printResults(response, amount);
      } else {
        console.log(`error: ${response}`);
      }
    });
}

function getCountryCodes(code) {
  CurrencyService.getCountryCodes()
    .then(response => {
      if (response.supported_codes) {
        let codes = addCountryCodes(response.supported_codes);
        checkCountryInput(code, codes);
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

function checkCountryInput(code, ctryCodes) {
  let codes = Object.keys(ctryCodes.codes);
  let codesArray = Array.from(codes)
  codesArray.forEach(element => {
    if (element.includes(code)) {
      console.log(element)
    }
  })
}


// UI Logic

function printResults(response, amount) {
  const outputDiv = document.querySelector("#output");
  outputDiv.querySelector(".base-code").innerText = `Base: ${response.base_code}`;
  outputDiv.querySelector(".target-code").innerText = `Target: ${response.target_code}`;
  outputDiv.querySelector(".amount-entered").innerText = `Amount: $${displayBigNums(financial(amount))}`;
  outputDiv.querySelector(".exg-rate").innerText = `Conversion Rate: ${response.conversion_rate}`;
  outputDiv.querySelector(".exg-result").innerText = `Result: $${displayBigNums(financial(response.conversion_result))}`;
}

function handleSubmitEvent(e) {
  e.preventDefault();
  const baseCode = document.querySelector("#base-code").value;
  const targetCode = document.querySelector("#target-code").value;
  const amount = parseFloat(document.querySelector("#amount").value);
  getCurrency(baseCode, targetCode, amount);
}


window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", handleSubmitEvent);
  let baseCodeInput = ''
  this.document.querySelector("#base-code").addEventListener("keyup", function (event) {
    baseCodeInput += String.fromCharCode(event.keyCode).toUpperCase()
    getCountryCodes(baseCodeInput);
  });
  console.log(baseCodeInput)
  let targetCodeInput = ''
  this.document.querySelector("#target-code").addEventListener("keyup", function (event) {
    targetCodeInput += String.fromCharCode(event.keyCode).toUpperCase()
    getCountryCodes(targetCodeInput);
  });
  console.log(targetCodeInput)
});
