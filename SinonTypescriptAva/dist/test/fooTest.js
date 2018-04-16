"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const ava_1 = require("ava");
//const foo: any = require('../src/foo'); // how you import the module under test does not matter
const foo = require("../src/foo");
ava_1.default.beforeEach(t => {
    t.context.rp = require('request-promise-native'); // how you import dependencies matters
    t.context.sandbox = sinon.createSandbox();
});
ava_1.default.afterEach.always(t => {
    t.context.sandbox.restore();
});
ava_1.default.serial('testPromiseResolveStub', (t) => __awaiter(this, void 0, void 0, function* () {
    // stub your dependency
    const resolveStub = t.context.sandbox.stub(t.context.rp, 'Request').resolves({
        statusCode: 200,
        msg: 'tee hee!'
    });
    const res = yield foo.default();
    t.true(resolveStub.calledOnce);
    //t.context.sandbox.restore();
}));
ava_1.default.serial('testPromiseRejectStub', (t) => __awaiter(this, void 0, void 0, function* () {
    const rejectStub = t.context.sandbox.stub(t.context.rp, 'Request').rejects({
        statusCode: 500,
        msg: 'aha! a rejection!'
    });
    try {
        const res = yield foo.default();
        t.true(rejectStub.calledOnce);
        //t.context.sandbox.restore();
    }
    catch (err) {
        // you can't "catch" a Promise rejection.
        // Promises are not an error. An error is 
        // thrown but these async errors are 
        // actually lost in the EventLoop so the 
        // following should never be seen:
        console.log('YOU SHALL NOT PASS!!!');
    }
}));
