export default class CurrencyService {
  static async getExchangeRate(baseCode, targetCode, amount, key) {
    return fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${baseCode}/${targetCode}/${amount}`)
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

  static async getCountryCodes(key) {
    return fetch(`https://v6.exchangerate-api.com/v6/${key}/codes`)
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