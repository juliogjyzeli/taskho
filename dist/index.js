"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPalindromeNumbers = exports.getPrimeNumbers = exports.checkFeatureValues = void 0;
const express_1 = __importDefault(require("express"));
const perf_hooks_1 = require("perf_hooks");
const port = 2500;
const app = (0, express_1.default)();
app.use(express_1.default.json());
//HTTP HEADERS
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.listen(port, () => {
    //console.log("Server running");
});
app.post("/", (req, res) => {
    let startTime = perf_hooks_1.performance.now();
    let timeTaken;
    let minNumber = req.body.minNumber;
    let maxNumber = req.body.maxNumber;
    let feature = req.body.feature;
    let primeNumbersArray = [];
    let palindromeNumbersArray = [];
    let response = {
        data: [],
        timeOfExecution: "",
    };
    if (minNumber <= 0) {
        return res
            .status(400)
            .json("INVALID INPUT! Minimum number must contain a positive value!");
    }
    if (maxNumber <= 0 || maxNumber < minNumber) {
        return res
            .status(400)
            .json("INVALID INPUT! Maximum number must contain a positive value greater than minimum number!");
    }
    if (feature.length == 0 || checkFeatureValues(feature) == false) {
        return res
            .status(400)
            .json("INVALID INPUT! Feature array must not be empty and contain only palindrome and/or prime!");
    }
    if (feature.includes("prime") && feature.includes("palindrome")) {
        primeNumbersArray = getPrimeNumbers(minNumber, maxNumber);
        palindromeNumbersArray = getPalindromeNumbers(minNumber, maxNumber);
        let primeAndPalindrome = primeNumbersArray.concat(palindromeNumbersArray);
        timeTaken = perf_hooks_1.performance.now() - startTime;
        response = {
            data: pickDuplicate(primeAndPalindrome),
            timeOfExecution: timeTaken.toFixed(2),
        };
    }
    else if (feature.includes("prime")) {
        primeNumbersArray = getPrimeNumbers(minNumber, maxNumber);
        timeTaken = perf_hooks_1.performance.now() - startTime;
        response = {
            data: primeNumbersArray,
            timeOfExecution: timeTaken.toFixed(2),
        };
    }
    else if (feature.includes("palindrome")) {
        palindromeNumbersArray = getPalindromeNumbers(minNumber, maxNumber);
        timeTaken = perf_hooks_1.performance.now() - startTime;
        response = {
            data: palindromeNumbersArray,
            timeOfExecution: timeTaken.toFixed(2),
        };
    }
    return res.status(200).json(response);
});
//SIMPLE INPUT VALIDATION FOR SQL INJECTION
// app.get('/:userQuery', async (req, res) => {
//     const {userQuery} = req.params;
//     const onlyLettersPattern = /^[A-Za-z]+$/;
//     if(!userQuery.match(onlyLettersPattern)){
//       return res.status(400).json({ err: "Query must not contain special characters or numbers!"})
//     }
//   })
const checkFeatureValues = (feature) => {
    for (let value = 0; value < feature.length; value++) {
        if (feature[value] !== "prime" && feature[value] !== "palindrome") {
            return false;
        }
    }
    return true;
};
exports.checkFeatureValues = checkFeatureValues;
function getPrimeNumbers(minNumber, maxNumber) {
    let primeNumbers = [];
    // looping from minNumber to maxNumber
    for (let i = minNumber; i <= maxNumber; i++) {
        let flag = 0;
        // looping through 2
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                flag = 1;
                break;
            }
        }
        // if number greater than 1 and not divisible by other numbers
        if (i > 1 && flag == 0) {
            primeNumbers.push(i);
        }
    }
    return primeNumbers;
}
exports.getPrimeNumbers = getPrimeNumbers;
function getPalindromeNumbers(minNumber, maxNumber) {
    let palindromeNumbers = [];
    for (var i = minNumber; i <= maxNumber; i++) {
        if (isPalindrome(i))
            palindromeNumbers.push(i);
    }
    return palindromeNumbers;
}
exports.getPalindromeNumbers = getPalindromeNumbers;
function isPalindrome(n) {
    // Find reverse of n
    var rev = 0;
    for (var i = n; Math.trunc(i) > 0; i /= 10) {
        rev = rev * 10 + (Math.trunc(i) % 10);
    }
    // If n and rev are same, then n is palindrome
    return n == rev;
}
function pickDuplicate(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res.sort((a, b) => a - b);
}
