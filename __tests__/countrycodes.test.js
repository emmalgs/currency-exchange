import { CountryInfo, CountryCodes } from "../src/js/countrycodes";

describe('CountryInfo', () => {
  let code;
  let country;
  let countryInfo;

  beforeEach(() => {
    code = 'USD';
    country = 'United States';
    countryInfo = new CountryInfo(code, country);
  })

  test('it should create an instance of an object when called', () => {
    expect(typeof countryInfo).toEqual('object');
  });

  test('it should add the code and country name when called correctly', () => {
    expect(countryInfo).toEqual({ code: 'USD', country: 'United States' });
  });
})

describe('CountryCodes', () => {
  let code;
  let country;
  let countryInfo;
  let countryCodes;

  beforeEach(() => {
    code = 'USD';
    country = 'United States';
    countryInfo = new CountryInfo(code, country);
    countryCodes = new CountryCodes();
  });

  test('it should create an instance of CountryCodes object when called', () => {
    expect(typeof countryCodes).toEqual('object');
  });

  test('it should add a country and code when method addCode is called', () => {
    
  })
})