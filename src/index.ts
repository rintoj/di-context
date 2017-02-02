import 'reflect-metadata'

namespace Context {

  interface ContextItem {
    name?: string
    type?: Function
    value: any
  }

  export let contextItems: ContextItem[] = []

  export function find(context: ContextItem[], key: any): ContextItem {
    return findItemByType(context, key) || findByName(context, key)
  }

  export function findItemByType(context: ContextItem[], type: Function): ContextItem {
    return (context as any).find(item => item.type === type)
  }

  export function addItemByType(context: ContextItem[], type: Function, value: any): ContextItem[] {
    return removeItemByType(context, type).concat([{
      type: type,
      value: value
    }])
  }

  export function removeItemByType(context: ContextItem[], type: Function): ContextItem[] {
    return context.filter(item => item.type == undefined || item.type !== type)
  }

  export function findByName(context: ContextItem[], name: string): ContextItem {
    return (context as any).find((item) => item.name === name)
  }

  export function addItemByName(context: ContextItem[], name: string, value: any): ContextItem[] {
    return removeItemByName(context, name).concat([{
      name: name,
      value: value
    }])
  }

  function removeItemByName(context: ContextItem[], name: string): ContextItem[] {
    return context.filter(item => item.name == undefined || item.name !== name)
  }
}

export function bind(name?: string) {
  return function (target: any, propertyKey: string) {
    if (name) {
      const contextItem = Context.find(Context.contextItems, name)
      return target[propertyKey] = contextItem && contextItem.value
    }
    let metadata = Reflect.getMetadata('design:type', target, propertyKey)
    if (!metadata) throw new Error('No metadata! Make sure "emitDecoratorMetadata" is set to "true" in "tsconfig.json"')
    const contextItem = Context.find(Context.contextItems, metadata)
    return target[propertyKey] = contextItem && contextItem.value
  }
}

export function provide(name?: string) {
  return function (constructor: any) {
    if (name) {
      Context.contextItems = Context.addItemByName(Context.contextItems, name, new (constructor as any)())
      return constructor
    }
    Context.contextItems = Context.addItemByType(Context.contextItems, constructor, new (constructor as any)())
    return constructor
  }
}

export function provideValue(name: string | Function, value: any) {
  if (typeof name === 'string') {
    Context.contextItems = Context.addItemByName(Context.contextItems, name, value)
    return
  }
  Context.contextItems = Context.addItemByType(Context.contextItems, name, value)
}