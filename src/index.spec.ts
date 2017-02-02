import { Context, bind, provide, provideValue } from './index'

import { expect } from 'chai'

@provide()
class TestClass {
  constructor(public name: string) { }
}

@provide('testClass2')
class TestClass2 {
  constructor(public name: string) { }
}

class TestClass3 {
  constructor(public name?: string) { }
}

provideValue(TestClass3, new TestClass3())
provideValue('testClass3', new TestClass3())

describe('di-context', () => {

  describe('@provide()', () => {

    it('should add an instance of class by type', () => {
      let result = Context.findItemByType(Context.contextItems, TestClass)
      expect(result).not.be.undefined
      expect(result.value instanceof TestClass).to.be.true
    })

    it('should add an instance of class by name', () => {
      let result = Context.findItemByName(Context.contextItems, 'testClass2')
      expect(result.value instanceof TestClass2).to.be.true
    })

    it('should NOT allow duplicate item by name', () => {
      @provide('testClass2')
      class TestClass4 { }
      let result = Context.contextItems.filter(item => item.name === 'testClass2').length
      expect(result).be.equal(1)
      let item = Context.findItemByName(Context.contextItems, 'testClass2')
      expect(item.value instanceof TestClass4).to.be.true
    })

  })

  describe('provideValue()', () => {

    it('should add an instance of class by type', () => {
      let result = Context.findItemByType(Context.contextItems, TestClass3)
      expect(result).not.be.undefined
      expect(result.value instanceof TestClass3).to.be.true
    })

    it('should add an instance of class by name', () => {
      let result = Context.findItemByName(Context.contextItems, 'testClass3')
      expect(result.value instanceof TestClass3).to.be.true
    })

    it('should NOT allow duplicate item by type', () => {
      provideValue(TestClass3, new TestClass3())
      let result = Context.contextItems.filter(item => item.type === TestClass3).length
      expect(result).be.equal(1)
      let item = Context.findItemByType(Context.contextItems, TestClass3)
      expect(item.value instanceof TestClass3).to.be.true
    })

    it('should NOT allow duplicate item by name', () => {
      provideValue('testClass3', new TestClass3())
      let result = Context.contextItems.filter(item => item.name === 'testClass3').length
      expect(result).be.equal(1)
      let item = Context.findItemByName(Context.contextItems, 'testClass3')
      expect(item.value instanceof TestClass3).to.be.true
    })

  })

  describe('@bind()', () => {

    it('should bind an item from the context by type', () => {
      class SampleClass {
        @bind()
        public testClass3: TestClass3
      }
      let result = new SampleClass()
      expect(result.testClass3).not.be.undefined
      expect(result.testClass3 instanceof TestClass3).be.equal(true)
    })

    it('should bind an item from the context by name', () => {
      class SampleClass {
        @bind('testClass3')
        public testClass3: TestClass
      }
      let result = new SampleClass()
      expect(result.testClass3).not.be.undefined
      expect(result.testClass3 instanceof TestClass3).be.equal(true)
    })
  })

})
