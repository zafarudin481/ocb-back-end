// including other js file as module
const m = require("./math.js")
const t = require("./time.js")

// calling back function from math.js
const a = m.add(5, 3)
const b = m.substract(5, 3)
const c = m.multiply(5, 3)

console.log("Import from math.js");
console.log("5 add 3 =", a);
console.log("5 minus 3 =", b);
console.log("5 times 3 =", c);

// calling back value from time.js
console.log("Import from time.js");
console.log('time:', t.time);
console.log('hours:', t.hours);
console.log('minutes:', t.minutes);
console.log('seconds:', t.seconds);
console.log('no. of day:', t.day);