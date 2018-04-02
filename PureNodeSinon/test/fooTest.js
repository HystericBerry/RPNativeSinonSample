const rp = require('request-promise-native');
const sinon = require('sinon');
const assert = require('assert');

const foo = require('../src/foo').foo; // <- lazy style of importing modules
// ^ figure this part out yourself

describe('SampleRequestPromiseTestSuite', function() {
    let sandbox, requestGetStub;
    beforeEach(function() {
        //1 ) create your own sandbox so you can let sinon clean up 
        // your spies, stubs, mocks, etc.
        sandbox = sinon.createSandbox();
    });

    it('MockGetRequest', function() {
        // 2) stub Request in the rp module
        requestGetStub = sandbox.stub(rp, 'Request');
        // 3) rp() is a function which returns a promise. This means you need 
        // to resolve or reject it to stub a value of your wish.
        requestGetStub.resolves({
            statusCode: 500,
            body: "Hmmm... it works."
        });
        
        foo(); // call your function of interest
        // you should see a console print out of the injected json above...
    });

    afterEach(function() {
        sandbox.restore();
    });
});