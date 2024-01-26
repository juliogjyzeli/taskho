"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe("Feature check function", () => {
    it("Should check if the feature array contains the allowed values", () => {
        expect((0, index_1.checkFeatureValues)(["palindrome", "prime"])).toEqual(true);
    });
});
describe("Prime number check function", () => {
    it("Should return prime numbers based on minimum and maximum values", () => {
        expect((0, index_1.getPrimeNumbers)(2, 10)).toEqual([2, 3, 5, 7]);
    });
});
describe("Prime number check function", () => {
    it("Should return prime numbers based on minimum and maximum values", () => {
        expect((0, index_1.getPalindromeNumbers)(2, 10)).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
