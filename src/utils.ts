/**
 * Function to parse a number into sign, integer part, and fractional part
 * @param num
 * @returns
 */
export function parseNumber(num: string) {
  let sign = 1;
  if (num.startsWith("-")) {
    sign = -1;
    num = num.substring(1);
  }
  let [integerPart, fractionalPart] = num.split(".");
  if (!fractionalPart) fractionalPart = "";
  return {
    sign,
    integerPart,
    fractionalPart,
  };
}

/**
 * Function to compare absolute values of two parsed numbers
 * @param a
 * @param b
 * @returns
 */
export function compareAbsolute(a: any, b: any): number {
  // Pad integer parts to equal length
  const maxIntLen = Math.max(a.integerPart.length, b.integerPart.length);
  const intA = a.integerPart.padStart(maxIntLen, "0");
  const intB = b.integerPart.padStart(maxIntLen, "0");

  // Compare integer parts
  if (intA > intB) return 1;
  if (intA < intB) return -1;

  // If integer parts are equal, compare fractional parts
  const maxFracLen = Math.max(a.fractionalPart.length, b.fractionalPart.length);
  const fracA = a.fractionalPart.padEnd(maxFracLen, "0");
  const fracB = b.fractionalPart.padEnd(maxFracLen, "0");

  if (fracA > fracB) return 1;
  if (fracA < fracB) return -1;

  // Numbers are equal
  return 0;
}

/**
 * Function to add two numbers based on absolute values
 * @param num1
 * @param num2
 * @returns
 */
export function addAbsolute(num1: any, num2: any): string {
  const maxFractionLength = Math.max(
    num1.fractionalPart.length,
    num2.fractionalPart.length
  );
  const frac1 = num1.fractionalPart.padEnd(maxFractionLength, "0");
  const frac2 = num2.fractionalPart.padEnd(maxFractionLength, "0");

  let fractionalSum = "";
  let carry = 0;
  for (let i = maxFractionLength - 1; i >= 0; i--) {
    let sum = parseInt(frac1[i] || "0") + parseInt(frac2[i] || "0") + carry;
    fractionalSum = (sum % 10) + fractionalSum;
    carry = Math.floor(sum / 10);
  }

  const int1 = num1.integerPart;
  const int2 = num2.integerPart;

  let integerSum = "";
  let i = int1.length - 1;
  let j = int2.length - 1;
  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(int1[i]) : 0;
    const digit2 = j >= 0 ? parseInt(int2[j]) : 0;
    const sum = digit1 + digit2 + carry;
    integerSum = (sum % 10) + integerSum;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }

  let result = integerSum;
  fractionalSum = fractionalSum.replace(/0+$/, "");
  if (fractionalSum) {
    result += "." + fractionalSum;
  }

  return result;
}

/**
 * Function to subtract two numbers based on absolute values (assuming num1 >= num2)
 * @param num1
 * @param num2
 * @returns
 */
export function subtractAbsolute(num1: any, num2: any): string {
  let maxFractionLength = Math.max(
    num1.fractionalPart.length,
    num2.fractionalPart.length
  );
  const frac1 = num1.fractionalPart.padEnd(maxFractionLength, "0");
  const frac2 = num2.fractionalPart.padEnd(maxFractionLength, "0");

  let fractionalDiff = "";
  let borrow = 0;
  for (let i = maxFractionLength - 1; i >= 0; i--) {
    let digit1 = parseInt(frac1[i]) - borrow;
    let digit2 = parseInt(frac2[i]);
    if (digit1 < digit2) {
      digit1 += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    let diff = digit1 - digit2;
    fractionalDiff = diff + fractionalDiff;
  }

  let int1 = num1.integerPart;
  let int2 = num2.integerPart.padStart(int1.length, "0");

  let integerDiff = "";
  for (let i = int1.length - 1; i >= 0; i--) {
    let digit1 = parseInt(int1[i]) - borrow;
    let digit2 = parseInt(int2[i]);
    if (digit1 < digit2) {
      digit1 += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    let diff = digit1 - digit2;
    integerDiff = diff + integerDiff;
  }

  integerDiff = integerDiff.replace(/^0+/, "") || "0";
  fractionalDiff = fractionalDiff.replace(/0+$/, "");

  let result = integerDiff;
  if (fractionalDiff) {
    result += "." + fractionalDiff;
  }

  return result;
}

/**
 * Function to remove leading zeros
 * @param str
 * @returns
 */
export function removeLeadingZeros(str: string): string {
  return str.replace(/^0+/, "") || "0";
}

/**
 * Function to remove trailing zeros
 * @param str
 * @returns
 */
export function removeTrailingZeros(str: string): string {
  return str.replace(/0+$/, "") || "0";
}
