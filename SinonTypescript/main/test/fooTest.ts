import * as sinon from 'sinon';

const rp: any = require('request-promise-native'); // how you import dependencies matters
//const foo: any = require('../src/foo'); // how you import the module under test does not matter
import * as foo from '../src/foo';
import { assert } from 'chai';

describe('SomeHttpTestSuite', () => {
    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    it('testPromiseResolveStub', async () => {
        // stub your dependency
        const resolveStub: sinon.SinonStub = 
        sandbox.stub(rp, 'Request').resolves({
            statusCode: 200,
            msg: 'tee hee!'
        });

        const res: any = await foo.default();
        assert.isTrue(resolveStub.calledOnce);
    });

    it('testPromiseRejectStub', async () => {
        const rejectStub: sinon.SinonStub = 
        sandbox.stub(rp, 'Request').rejects({
            statusCode: 500,
            msg: 'aha! a rejection!'
        });

        try {
            const res: any = await foo.default();
            assert.isTrue(rejectStub.calledOnce);
        } catch(err) {
            // you can't "catch" a Promise rejection.
            // Promises are not an error. An error is 
            // thrown but these async errors are 
            // actually lost in the EventLoop so the 
            // following should never be seen:
            console.log('YOU SHALL NOT PASS!!!');
        }
        
    });

    afterEach(() => {
        sandbox.restore();
    });
});