export default class CurrencyService {
  constructor() {
    this.apiKey = process.env.API_KEY;
  }

  static async getExchangeRate(baseCode, targetCode, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${baseCode}/${targetCode}/${amount}`)
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
    return fetch(`https://v6.exchangerate-api.com/v6/${this.apiKey}/codes`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}