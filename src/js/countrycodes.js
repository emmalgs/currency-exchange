export class CountryCodes {
  constructor() {
    this.codes = {};
  }
}

CountryCodes.prototype.addCode = function(country) {
  this.codes[country.code] = country.country;
}

export class CountryInfo {
  constructor(code, country) {
    this.code = code;
    this.country = country;
  }
}