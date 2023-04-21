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

function getCountryCodes() {
  CurrencyService.getCountryCodes()
    .then(response => {
      if (response.supported_codes) {
        let codes = addCountryCodes(response.supported_codes);
        checkCountryInput(codes);
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

function checkCountryInput(ctryCodes) {
  let codes = Object.keys(ctryCodes.codes);
  let codesArray = Array.from(codes)
  codesArray.forEach(element => {
    printCodeInputs(element, ctryCodes)
  });
}

function checkTextInputs(input) {
  if (!input || input.length > 3) {
    return null;
  }
  return input;
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

function printCodeInputs(code, countryCodes) {
  const datalist = document.querySelectorAll("datalist")
  datalist.forEach(list => {
    let option = document.createElement("option")
    option.value = code;
    option.innerText = countryCodes.codes[code];
    list.append(option)
  })
}

function handleSubmitEvent(e) {
  e.preventDefault();
  const baseCode = checkTextInputs(document.querySelector("input[list='base-code']").value);
  const targetCode = checkTextInputs(document.querySelector("input[list='target-code']").value);
  const amount = parseFloat(document.querySelector("#amount").value);
  if (!baseCode || !targetCode) {
    console.log(baseCode);
    console.log(targetCode)
    document.querySelector("input[list='base-code']").value = baseCode;
    document.querySelector("input[list='target-code']").value = targetCode;
  } else {
    getCurrency(baseCode, targetCode, amount);
  }
}


window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", handleSubmitEvent);
  getCountryCodes();
});
