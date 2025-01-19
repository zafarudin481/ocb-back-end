// fs is nodejs core module which enables interaction with file system

// to use the module use require keyword
const fs = require('fs');
const crypto = require('crypto');

const randomInt = crypto.randomInt(1000, 9999);

// create a directory
fs.mkdir(`fs-files/${randomInt}`, { recursive: true }, (err) => {
    // when recursive is set to true, error will not be given if the directory is already exist
    if (err) {
        console.log('Directory is not created');
    } else {
        console.log('Directory successfully created');
    }
});

// create a file
fs.writeFile(
    `fs-files/${randomInt}/message-${randomInt}.txt`,
    `Hello NodeJS, this message is located in the file message-${randomInt}.txt`,
    'utf-8',
    function (err) {
        if (err) {
            console.log('File failed to be created');
        } else {
            console.log('File successfully created');
        }
    }
);

// read a file
fs.readFile(
    `fs-files/${randomInt}/message-${randomInt}.txt`,
    'utf-8',
    function (err, data) {
        if (err) {
            console.log('File fails to be read');
        } else {
            console.log('The data contained in the file are:');
            console.log(data);
        }
    }
);
