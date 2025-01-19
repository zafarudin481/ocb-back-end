const path = require('path');
const fs = require('fs');

// __dirname is a variable that tells the absolute path of the directory containing the executing file
// __filename is a variable that tells the name of the executing file

const textPath = path.join(__dirname, 'fs-files', '7212', 'message-7212.txt');
console.log('The file directory: ', textPath);
const extFile = path.extname(textPath);
console.log('The file extension:', extFile);

// using the extname to check for file extension
if (extFile === ".txt") {
    console.log('The file is a text file');
} else {
    console.log('The file is not a text file');
};

// using path.join to create the path for other file system operation
fs.readFile(
    textPath,
    'utf-8',
    function (err, data) {
        if (err) {
            console.log("File cannot be read");
        } else {
            console.log("The data contained in the file are:");
            console.log(data);
        }
    }
);
