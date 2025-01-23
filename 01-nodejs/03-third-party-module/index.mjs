// the following CJS (Common JS) method of importing is not supported by the package, instead
// const { generate } = require('random-words');

// (con't) we use ESM (ECMA script Modules) method as a way to import the third-party module
// to used this method, we need to have .mjs as the extension of this file
import { generate } from "random-words";

// visit the package documentation at npmjs for how to use the package
console.log(generate());

console.log(generate(2));

console.log(generate({ exactly: 5 }));

console.log(generate({ minLenght: 5, maxLength: 5, exactly: 5 }));