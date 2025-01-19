// callback function will be frequently used in nodejs, mostly used in asynchronous events. Its example is as follows:


// define the function where the callback function will be invoked
function addCallBack(a, b, callback) {
    console.log('The callback function is:')
    callback(a, b);
    console.log('The callback function had end its operation')
}

// define the function to be callback
function add(a, b) {
    const result = a + b;
    console.log(a, ' + ', b, ' = ', result);
}

// start the function
addCallBack(3, 5, add);