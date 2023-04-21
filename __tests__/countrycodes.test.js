import { CountryInfo } from "../src/js/countrycodes";

describe('CountryInfo', () => {
  let code;
  let country;
  let countryInfo;

  beforeEach(() => {
    code = USD;
    country = 'United States';
    countryInfo = new CountryInfo(code, country);
  })

  test('it should create an instance of an object when called', () => {
    expect(typeof countryInfo).toEqual('object');
  });
})