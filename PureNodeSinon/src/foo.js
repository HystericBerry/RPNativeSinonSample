const rp = require('request-promise-native');
/**
 * Do some task using request promise. Request Promise Native uses 
 * Request internally and exposes it to you on the top layer for 
 * stubbing purposes.
 */
function foo() {
    const options = {
        uri: 'http://www.google.com',
        resolveWithFullResponse: true,
        json: true // Automatically parses the JSON string in the response
    };
    // i.e. send GET request to Google.
    rp(options)
    .then((res) => {
        console.log(`status=${res.statusCode}`);
        console.log(`body=${res.body}`);
    }, (err) => {
        console.error(`Oops: ${err.toString()}`);
    });
}


module.exports = {
    foo: foo
}