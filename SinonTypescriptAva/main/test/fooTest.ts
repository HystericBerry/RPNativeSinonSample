import * as sinon from 'sinon';
import test from 'ava';

//const foo: any = require('../src/foo'); // how you import the module under test does not matter
import * as foo from '../src/foo';

test.beforeEach(t => {
    t.context.rp = require('request-promise-native'); // how you import dependencies matters
    t.context.sandbox = sinon.createSandbox();
});
test.afterEach.always(t => {
    t.context.sandbox.restore();
});

test.serial('testPromiseResolveStub', async t => {
    // stub your dependency
    const resolveStub: sinon.SinonStub = 
    t.context.sandbox.stub(t.context.rp, 'Request').resolves({
        statusCode: 200,
        msg: 'tee hee!'
    });

    const res: any = await foo.default();
    t.true(resolveStub.calledOnce);
    //t.context.sandbox.restore();
});

test.serial('testPromiseRejectStub', async t => {
    const rejectStub: sinon.SinonStub = 
    t.context.sandbox.stub(t.context.rp, 'Request').rejects({
        statusCode: 500,
        msg: 'aha! a rejection!'
    });

    try {
        const res: any = await foo.default();
        t.true(rejectStub.calledOnce);
        //t.context.sandbox.restore();
    } catch(err) {
        // you can't "catch" a Promise rejection.
        // Promises are not an error. An error is 
        // thrown but these async errors are 
        // actually lost in the EventLoop so the 
        // following should never be seen:
        console.log('YOU SHALL NOT PASS!!!');
    }
});
