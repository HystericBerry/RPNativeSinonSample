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
const rp = require('request-promise-native');
//const foo: any = require('../src/foo');
const foo = require("../src/foo");
const chai_1 = require("chai");
describe('SomeHttpTestSuite', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    it('testPromiseResolveStub', () => __awaiter(this, void 0, void 0, function* () {
        // stub your dependency
        const resolveStub = sandbox.stub(rp, 'Request').resolves({
            statusCode: 200,
            msg: 'tee hee!'
        });
        const res = yield foo.default();
        chai_1.assert.isTrue(resolveStub.calledOnce);
    }));
    it('testPromiseRejectStub', () => __awaiter(this, void 0, void 0, function* () {
        const rejectStub = sandbox.stub(rp, 'Request').rejects({
            statusCode: 500,
            msg: 'aha! a rejection!'
        });
        try {
            const res = yield foo.default();
            chai_1.assert.isTrue(rejectStub.calledOnce);
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
    afterEach(() => {
        sandbox.restore();
    });
});
