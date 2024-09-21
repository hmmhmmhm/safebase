# SafeBase 🛡️

SafeBase is a lightweight, zero-dependency JavaScript library for safe and precise arithmetic operations on very large numbers. It excels at handling both Big Decimal and Big Number computations with ease. 🧮

## Features 🌟

- 📦 Easy installation: `npm i safebase`
- 🪶 Lightweight: Only 2kb in size
- 🔒 Zero dependencies
- 🔢 Supports operations on extremely large numbers (Big Number)
- 🎯 High precision decimal arithmetic (Big Decimal)
- 💻 TypeScript support
- 🔀 Seamless handling of both Big Decimal and Big Number operations

## Installation 📥

```bash
npm install safebase
```

## Usage 🚀

```javascript
import { add, subtract, multiply, divide } from "safebase";

console.log(add("10000000000000000000000", "0.00000000005"));
// '10000000000000000000000.00000000005'

console.log(subtract("-9999999999999999999999.9", "0.1"));
// '-10000000000000000000000'

console.log(multiply("123456789123456789", "0.000000001"));
// '123.456789123456789'

console.log(divide("1000000000000000000000", "0.1"));
// '10000000000000000000000'
```

## API 📚

### `add(left: string, right: string): string`

Adds two numbers represented as strings.

### `subtract(left: string, right: string): string`

Subtracts the second number from the first, both represented as strings.

### `multiply(left: string, right: string): string`

Multiplies two numbers represented as strings.

### `divide(left: string, right: string, precision: number = 20): string`

Divides the first number by the second, both represented as strings. The `precision` parameter determines the number of decimal places in the result (default is 20).

## Why SafeBase? 🤔

JavaScript's native number type has limitations when dealing with very large numbers or high precision decimals. SafeBase overcomes these limitations by:

- 🔢 Representing numbers as strings, allowing for arbitrary-length integers
- 🎯 Providing high-precision decimal arithmetic
- 🐛 Avoiding floating-point errors common in JavaScript's native math operations

## Performance 🚀

SafeBase is optimized for performance while maintaining accuracy. It's suitable for applications requiring precise calculations with large numbers, such as financial systems, scientific computing, or cryptography.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 👏

- Thanks to all contributors who have helped shape SafeBase
- Inspired by the need for reliable big number arithmetic in JavaScript
