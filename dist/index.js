"use strict";
require('reflect-metadata');
var Context;
(function (Context) {
    Context.contextItems = [];
    function findItemByType(context, type) {
        return context.find(function (item) { return item.type === type; });
    }
    Context.findItemByType = findItemByType;
    function addItemByType(context, type, value) {
        return removeItemByType(context, type).concat([{
                type: type,
                value: value
            }]);
    }
    Context.addItemByType = addItemByType;
    function removeItemByType(context, type) {
        return context.filter(function (item) { return item.type == undefined || item.type !== type; });
    }
    Context.removeItemByType = removeItemByType;
    function findItemByName(context, name) {
        return context.find(function (item) { return item.name === name; });
    }
    Context.findItemByName = findItemByName;
    function addItemByName(context, name, value) {
        return removeItemByName(context, name).concat([{
                name: name,
                value: value
            }]);
    }
    Context.addItemByName = addItemByName;
    function removeItemByName(context, name) {
        return context.filter(function (item) { return item.name == undefined || item.name !== name; });
    }
    Context.removeItemByName = removeItemByName;
})(Context = exports.Context || (exports.Context = {}));
function bind(name) {
    return function (target, propertyKey) {
        if (typeof name === 'string') {
            var contextItem_1 = Context.findItemByName(Context.contextItems, name);
            return target[propertyKey] = contextItem_1 && contextItem_1.value;
        }
        var metadata = Reflect.getMetadata('design:type', target, propertyKey);
        if (!metadata)
            throw new Error('No metadata! Make sure "emitDecoratorMetadata" is set to "true" in "tsconfig.json"');
        var contextItem = Context.findItemByType(Context.contextItems, metadata);
        return target[propertyKey] = contextItem && contextItem.value;
    };
}
exports.bind = bind;
function provide(name) {
    return function (constructor) {
        if (name) {
            Context.contextItems = Context.addItemByName(Context.contextItems, name, new constructor());
            return constructor;
        }
        Context.contextItems = Context.addItemByType(Context.contextItems, constructor, new constructor());
        return constructor;
    };
}
exports.provide = provide;
function provideValue(name, value) {
    if (typeof name === 'string') {
        Context.contextItems = Context.addItemByName(Context.contextItems, name, value);
        return;
    }
    Context.contextItems = Context.addItemByType(Context.contextItems, name, value);
}
exports.provideValue = provideValue;
//# sourceMappingURL=index.js.map