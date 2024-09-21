import { parseNumber, removeLeadingZeros } from "./utils";

export function divide(
  left: string,
  right: string,
  precision: number = 20
): string {
  // Function to compare two numbers
  function compare(num1: string, num2: string): number {
    num1 = removeLeadingZeros(num1);
    num2 = removeLeadingZeros(num2);
    if (num1.length > num2.length) return 1;
    if (num1.length < num2.length) return -1;
    for (let i = 0; i < num1.length; i++) {
      if (num1[i] > num2[i]) return 1;
      if (num1[i] < num2[i]) return -1;
    }
    return 0;
  }

  // Function to subtract two numbers (num1 - num2, assuming num1 >= num2)
  function subtractStrings(num1: string, num2: string): string {
    let result = "";
    let borrow = 0;
    num1 = num1.split("").reverse().join("");
    num2 = num2.split("").reverse().join("");

    for (let i = 0; i < num1.length; i++) {
      let digit1 = parseInt(num1[i]) - borrow;
      let digit2 = parseInt(num2[i] || "0");
      if (digit1 < digit2) {
        digit1 += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result = digit1 - digit2 + result;
    }

    return removeLeadingZeros(result);
  }

  // Function to add two numbers
  function addStrings(num1: string, num2: string): string {
    let result = "";
    let carry = 0;
    let num1Arr = num1.split("").reverse();
    let num2Arr = num2.split("").reverse();

    let maxLength = Math.max(num1Arr.length, num2Arr.length);
    for (let i = 0; i < maxLength; i++) {
      let digit1 = parseInt(num1Arr[i] || "0");
      let digit2 = parseInt(num2Arr[i] || "0");
      let sum = digit1 + digit2 + carry;
      result = (sum % 10) + result;
      carry = Math.floor(sum / 10);
    }
    if (carry > 0) {
      result = carry + result;
    }
    return result;
  }

  // Modified rounding function
  function roundResult(result: string): string {
    let [integerPart, fractionalPart] = result.split(".");
    if (!fractionalPart) {
      return result;
    }

    if (fractionalPart.length <= precision) {
      return result;
    }

    // Digit to be rounded
    let roundingDigit = parseInt(fractionalPart[precision]);
    let fractionToRound = fractionalPart.slice(0, precision);

    // Combine integer part and fraction to round into one large number (without removing leading zeros)
    let combinedNumber = integerPart + fractionToRound;

    if (roundingDigit >= 5) {
      // Add 1
      let incrementedNumber = addStrings(combinedNumber, "1");

      // Separate new integer part and fractional part
      let integerPartLength = integerPart.length;
      let combinedLength = combinedNumber.length;
      let incrementedLength = incrementedNumber.length;

      // Check if the number of digits increased
      let lengthDifference = incrementedLength - combinedLength;
      integerPartLength += lengthDifference;

      let newIntegerPart = incrementedNumber.slice(0, integerPartLength);
      let newFractionalPart = incrementedNumber.slice(integerPartLength);

      result = newIntegerPart;
      if (newFractionalPart) {
        result += "." + newFractionalPart;
      }
    } else {
      // No rounding needed
      result = integerPart;
      if (fractionToRound) {
        result += "." + fractionToRound;
      }
    }

    // Remove unnecessary trailing zeros in the fractional part
    result = result.replace(/(\.\d*?[1-9])0+$/g, "$1");
    result = result.replace(/\.0+$/, "");
    result = result.replace(/\.$/, "");

    return result;
  }

  // Division function
  function divideStrings(
    dividend: string,
    divisor: string,
    precision: number
  ): string {
    let result = "";
    let remainder = dividend;
    let decimalPointAdded = false;
    let decimalPlaces = 0;

    // Calculate one more digit than the desired precision
    let maxDecimalPlaces = precision + 1;

    while (true) {
      // Calculate quotient
      let count = "0";
      while (compare(remainder, divisor) >= 0) {
        remainder = subtractStrings(remainder, divisor);
        count = addStrings(count, "1");
      }
      result += count;

      // If remainder is 0, terminate
      if (compare(remainder, "0") === 0) {
        break;
      }

      // Handle decimal point
      if (!decimalPointAdded) {
        result += ".";
        decimalPointAdded = true;
      } else {
        decimalPlaces++;
        if (decimalPlaces >= maxDecimalPlaces) {
          break;
        }
      }

      // Add 0 to remainder for next digit
      remainder += "0";

      // If remainder is 0 but desired precision not reached, add 0s
      if (compare(remainder, "0") === 0 && decimalPlaces < maxDecimalPlaces) {
        result += "0".repeat(maxDecimalPlaces - decimalPlaces);
        break;
      }
    }

    // Apply rounding
    result = roundResult(result);

    return result || "0";
  }

  let num1 = parseNumber(left);
  let num2 = parseNumber(right);

  if (num2.integerPart === "0" && num2.fractionalPart === "") {
    throw new Error("Division by zero");
  }

  // Convert to whole numbers (integer part + fractional part)
  let wholeNum1 = num1.integerPart + num1.fractionalPart;
  let wholeNum2 = num2.integerPart + num2.fractionalPart;

  // Adjust decimal places
  let decimalPlacesNum1 = num1.fractionalPart.length;
  let decimalPlacesNum2 = num2.fractionalPart.length;
  let scale = decimalPlacesNum2 - decimalPlacesNum1;

  if (scale > 0) {
    wholeNum1 = wholeNum1 + "0".repeat(scale);
  } else if (scale < 0) {
    wholeNum2 = wholeNum2 + "0".repeat(-scale);
  }

  // Remove leading zeros
  wholeNum1 = removeLeadingZeros(wholeNum1);
  wholeNum2 = removeLeadingZeros(wholeNum2);

  // Determine sign
  let resultSign = num1.sign * num2.sign;

  // Perform division
  let quotient = divideStrings(wholeNum1, wholeNum2, precision);

  // Apply sign to result
  if (resultSign === -1 && quotient !== "0") {
    quotient = "-" + quotient;
  }

  return quotient;
}

export default divide;
