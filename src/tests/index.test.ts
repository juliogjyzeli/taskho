import {
  checkFeatureValues,
  getPrimeNumbers,
  getPalindromeNumbers,
} from "../index";

describe("Feature check function", () => {
  it("Should check if the feature array contains the allowed values", () => {
    expect(checkFeatureValues(["palindrome", "prime"])).toEqual(true);
  });
});

describe("Prime number check function", () => {
  it("Should return prime numbers based on minimum and maximum values", () => {
    expect(getPrimeNumbers(2, 10)).toEqual([2, 3, 5, 7]);
  });
});

describe("Prime number check function", () => {
  it("Should return prime numbers based on minimum and maximum values", () => {
    expect(getPalindromeNumbers(2, 10)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
