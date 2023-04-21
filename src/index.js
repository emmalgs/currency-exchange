import './css/styles.css';
import CurrencyService from "./js/currency-service";
import { CountryCodes, CountryInfo } from "./js/countrycodes";

// Utility Logic

function financial(number) {
  return parseFloat(number).toFixed(2);
}

function displayBigNums(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Business Logic

function getCurrency(baseCode, targetCode, amount) {
  CurrencyService.getExchangeRate(baseCode, targetCode, amount)
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Something is not right`;
        throw new Error(errorMessage);
      }
      printResults(response, amount);
    })
    .catch(error => {
      printError(error);
    });
}

function getCountryCodes() {
  CurrencyService.getCountryCodes()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Something is not right`;
        throw new Error(errorMessage);
      }
      if (response.supported_codes) {
        let codes = addCountryCodes(response.supported_codes);
        printCountryCodeOptions(codes);
      }
    })
    .catch(error => {
      printError(error);
    });
}

function validateCode(code) {
  CurrencyService.getCountryCodes()
    .then(response => {
      if (response instanceof Error) {
        const errorMessage = `Oh no! Somethings wrong`;
        throw new Error(errorMessage);
      }
      const codesList = addCountryCodes(response.supported_codes);
      return codesList;
    })
    .then(response2 => {
      const codes = Object.keys(response2.codes);
      code.forEach(element => {
        if (!codes.includes(element)) {
          const errorMessage = `Sorry, ${element} is not a valid code`;
          throw new Error(errorMessage);
        }
      });
      printCurrencyNames([response2.codes[code[0]], response2.codes[code[1]]]);
    })
    .catch(error => {
      printError(error);
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

function printCountryCodeOptions(ctryCodes) {
  let codes = Object.keys(ctryCodes.codes);
  let codesArray = Array.from(codes);
  codesArray.forEach(element => {
    printCodeInputs(element, ctryCodes);
  });
}

function checkTextInputs(input) {
  if (!input || input.length > 3 || input === Number(input)) {
    return null;
  }
  return input;
}

function checkNumberInputs(input) {
  if (input <= 0) {
    return null;
  }
  return parseFloat(input);
}

// UI Logic

function printCurrencyNames(code) {
  const outputDiv = document.querySelector("#output");
  outputDiv.querySelector(".base-code").innerText = `Conversion for ${code[0].toUpperCase()} to ${code[1].toUpperCase()}`;
}

function printResults(response, amount) {
  const outputDiv = document.querySelector("#output");
  outputDiv.querySelector(".amount-entered").innerText = `${response.base_code}: $${displayBigNums(financial(amount))}`;
  outputDiv.querySelector(".exg-rate").innerText = `Conversion Rate: ${response.conversion_rate}`;
  outputDiv.querySelector(".exg-result").innerText = `${response.target_code}: $${displayBigNums(financial(response.conversion_result))}`;
}

function printCodeInputs(code, countryCodes) {
  const datalist = document.querySelectorAll("datalist");
  datalist.forEach(list => {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = countryCodes.codes[code];
    list.append(option);
  });
}

function printError(error) {
  resetOutput();
  document.querySelector(".error").innerText = `${error}`;
}

function resetOutput() {
  document.querySelector(".base-code").innerText = null;
  document.querySelector(".amount-entered").innerText = null;
  document.querySelector(".exg-rate").innerText = null;
  document.querySelector(".exg-result").innerText = null;
}

function resetError() {
  document.querySelector(".error").innerText = null;
}

function handleSubmitEvent(e) {
  e.preventDefault();
  resetError();
  const baseCode = checkTextInputs(document.querySelector("input[list='base-code']").value);
  const targetCode = checkTextInputs(document.querySelector("input[list='target-code']").value);
  let amount = document.querySelector("#amount").value;
  amount = checkNumberInputs(amount);
  if (!baseCode || !targetCode || !amount) {
    document.querySelector("input[list='base-code']").value = baseCode;
    document.querySelector("input[list='target-code']").value = targetCode;
    document.querySelector("#amount").value = amount;
  } else {
    getCurrency(baseCode, targetCode, amount);
    validateCode([baseCode, targetCode]);
  }
}

window.addEventListener("load", function () {
  this.document.querySelector("form").addEventListener("submit", handleSubmitEvent);
  getCountryCodes();
});
