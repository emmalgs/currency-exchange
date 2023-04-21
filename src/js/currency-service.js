// https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${baseCode}/${targetCode}/${amount} this takes starting currency, what you want to exchange to, and the amount. base_code, target_code, and conversion_rate are keys in the response object.
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/codes returns a json file of all supported currency codes and country name, outputs an array of an array at supported_codes

export default class CurrencyService {
  static async getExchangeRate(baseCode, targetCode, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${baseCode}/${targetCode}/${amount}`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }

  static async getCountryCodes() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .catch(error => {
        return error;
      })
  }
}