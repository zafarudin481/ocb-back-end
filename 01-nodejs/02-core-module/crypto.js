// including crypto core module
const crypto = require('crypto');

// using randomInt from crypto module
const randomNumber = crypto.randomInt(10000, 99999);
console.log(randomNumber);

// using randomByte from crypto module
const randomString = crypto.randomBytes(10);
console.log(randomString);
console.log('hex:', randomString.toString('hex'));
console.log('latin1:', randomString.toString('latin1'));
console.log('utf8:', randomString.toString('utf8'));
console.log('ascii:', randomString.toString('ascii'));
console.log('base64:', randomString.toString('base64'));

// toString encoding supported: 'ascii', 'utf8', 'utf16le' / 'ucs2', 'base64', 'base64url', 'latin1' / 'binary', and 'hex'

// some way in which to create unique id or url, is by using randomInt
const name = "zafarudin";

const userName = name + "-" + randomNumber;
console.log("Your username:", userName);


// exploring encryption using crypto module
// ========================================

const message = 'Today is the day that I learnt about encryption and decryption';

// 1) defining the algorithm
const algorithm = 'aes-256-cbc';
// 2) defining the key
const key = crypto.randomBytes(32);
// 3) defining the iv
const iv = crypto.randomBytes(16);

// 4) create encryption function
function encrypt(text) {
    // creating cipheriv with its parameter
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    // updating the text
    let encrypted = cipher.update(text);

    // using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

// display output
var encryptedMessage = encrypt(message);
console.log('Encrypted message:', encryptedMessage);


// exploring decryption using crypto module
// ========================================

// 1) all attribute for decryption such as algorithm, key and iv need to be same with attribute used during encryption

// 2) create decryption function
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedMessage = Buffer.from(text.encryptedData, 'hex');

    // creating decipher
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    // updating encrypted text
    let decrypted = decipher.update(encryptedMessage);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted.toString();
}

// display decrypted message
console.log('The message:', decrypt(encryptedMessage));