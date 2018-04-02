"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as rp from 'request-promise-native'; // replaced with the require below
const rp = require('request-promise-native'); // <-- include NodeJs Typing
const os = require("os");
function foo() {
    const options = {
        uri: 'http://www.google.com',
        resolveWithFullResponse: true,
        json: true // Automatically parses the JSON string in the response
    };
    // i.e. send GET request to Google.
    const response = rp(options)
        .then((res) => {
        console.log(JSON.stringify(res, null, 4));
    }, (err) => {
        const errStr = JSON.stringify(err, null, 4);
        console.log(`Oops!!!: ${os.EOL}${errStr}`);
    });
    console.log("I am making some other http calls!");
    return Promise.resolve(response);
}
exports.default = foo;
