import CurrencyService from "./js/currency-service";

function getCurrency(baseCode, targetCode, amount) {
  CurrencyService.getExchangeRate(baseCode, targetCode, amount)
    .then(response => {
      if (response) {
        console.log(`base code: ${response.base_code}
        target code: ${response.target_code}
        conversion rate: ${response.conversion_rate}
        conversion results: ${response.conversion_result}`)
      } else {
        console.log(`error: ${response}`)
      }
    })
}

getCurrency('EUR', 'GBP', 16);