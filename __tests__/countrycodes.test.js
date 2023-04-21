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
    countryCodes.addCode(countryInfo);
  });

  test('it should create an instance of CountryCodes object when called', () => {
    expect(typeof countryCodes).toEqual('object');
  });

  test('it should add a country and code when method addCode is called', () => {
    
    expect(countryCodes.codes).toEqual({ USD: 'United States'});
  });

  test('it should add multiple countries to countryCodes', () => {
    let code2 = 'AED';
    let country2 = 'UAE Dirham';
    let countryInfo2 = new CountryInfo(code2, country2);
    let code3 = 'AFN';
    let country3 = 'Afghan Afghani';
    let countryInfo3 = new CountryInfo(code3, country3);
    let code4 = 'ALL';
    let country4 = 'Albanian Lek';
    let countryInfo4 = new CountryInfo(code4, country4);
    countryCodes.addCode(countryInfo2);
    countryCodes.addCode(countryInfo3);
    countryCodes.addCode(countryInfo4);
    console.log(countryCodes.codes);
    expect(countryCodes.codes).toEqual( { USD: 'United States', AED: 'UAE Dirham', AFN: 'Afghan Afghani', ALL: 'Albanian Lek' })
  })  
})