"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var index_1 = require('./index');
var chai_1 = require('chai');
var TestClass = (function () {
    function TestClass(name) {
        this.name = name;
    }
    TestClass = __decorate([
        index_1.provide(), 
        __metadata('design:paramtypes', [String])
    ], TestClass);
    return TestClass;
}());
var TestClass2 = (function () {
    function TestClass2(name) {
        this.name = name;
    }
    TestClass2 = __decorate([
        index_1.provide('testClass2'), 
        __metadata('design:paramtypes', [String])
    ], TestClass2);
    return TestClass2;
}());
var TestClass3 = (function () {
    function TestClass3(name) {
        this.name = name;
    }
    return TestClass3;
}());
index_1.provideValue(TestClass3, new TestClass3());
index_1.provideValue('testClass3', new TestClass3());
describe('di-context', function () {
    describe('@provide()', function () {
        it('should add an instance of class by type', function () {
            var result = index_1.Context.findItemByType(index_1.Context.contextItems, TestClass);
            chai_1.expect(result).not.be.undefined;
            chai_1.expect(result.value instanceof TestClass).to.be.true;
        });
        it('should add an instance of class by name', function () {
            var result = index_1.Context.findItemByName(index_1.Context.contextItems, 'testClass2');
            chai_1.expect(result.value instanceof TestClass2).to.be.true;
        });
        it('should NOT allow duplicate item by name', function () {
            var TestClass4 = (function () {
                function TestClass4() {
                }
                TestClass4 = __decorate([
                    index_1.provide('testClass2'), 
                    __metadata('design:paramtypes', [])
                ], TestClass4);
                return TestClass4;
            }());
            var result = index_1.Context.contextItems.filter(function (item) { return item.name === 'testClass2'; }).length;
            chai_1.expect(result).be.equal(1);
            var item = index_1.Context.findItemByName(index_1.Context.contextItems, 'testClass2');
            chai_1.expect(item.value instanceof TestClass4).to.be.true;
        });
    });
    describe('provideValue()', function () {
        it('should add an instance of class by type', function () {
            var result = index_1.Context.findItemByType(index_1.Context.contextItems, TestClass3);
            chai_1.expect(result).not.be.undefined;
            chai_1.expect(result.value instanceof TestClass3).to.be.true;
        });
        it('should add an instance of class by name', function () {
            var result = index_1.Context.findItemByName(index_1.Context.contextItems, 'testClass3');
            chai_1.expect(result.value instanceof TestClass3).to.be.true;
        });
        it('should NOT allow duplicate item by type', function () {
            index_1.provideValue(TestClass3, new TestClass3());
            var result = index_1.Context.contextItems.filter(function (item) { return item.type === TestClass3; }).length;
            chai_1.expect(result).be.equal(1);
            var item = index_1.Context.findItemByType(index_1.Context.contextItems, TestClass3);
            chai_1.expect(item.value instanceof TestClass3).to.be.true;
        });
        it('should NOT allow duplicate item by name', function () {
            index_1.provideValue('testClass3', new TestClass3());
            var result = index_1.Context.contextItems.filter(function (item) { return item.name === 'testClass3'; }).length;
            chai_1.expect(result).be.equal(1);
            var item = index_1.Context.findItemByName(index_1.Context.contextItems, 'testClass3');
            chai_1.expect(item.value instanceof TestClass3).to.be.true;
        });
    });
    describe('@bind()', function () {
        it('should bind an item from the context by type', function () {
            var SampleClass = (function () {
                function SampleClass() {
                }
                __decorate([
                    index_1.bind(), 
                    __metadata('design:type', TestClass3)
                ], SampleClass.prototype, "testClass3", void 0);
                return SampleClass;
            }());
            var result = new SampleClass();
            chai_1.expect(result.testClass3).not.be.undefined;
            chai_1.expect(result.testClass3 instanceof TestClass3).be.equal(true);
        });
        it('should bind an item from the context by name', function () {
            var SampleClass = (function () {
                function SampleClass() {
                }
                __decorate([
                    index_1.bind('testClass3'), 
                    __metadata('design:type', TestClass)
                ], SampleClass.prototype, "testClass3", void 0);
                return SampleClass;
            }());
            var result = new SampleClass();
            chai_1.expect(result.testClass3).not.be.undefined;
            chai_1.expect(result.testClass3 instanceof TestClass3).be.equal(true);
        });
    });
});
//# sourceMappingURL=index.spec.js.map