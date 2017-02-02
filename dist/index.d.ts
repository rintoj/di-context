import 'reflect-metadata';
export declare namespace Context {
    interface ContextItem {
        name?: string;
        type?: Function;
        value: any;
    }
    let contextItems: ContextItem[];
    function findItemByType(context: ContextItem[], type: Function): ContextItem;
    function addItemByType(context: ContextItem[], type: Function, value: any): ContextItem[];
    function removeItemByType(context: ContextItem[], type: Function): ContextItem[];
    function findItemByName(context: ContextItem[], name: string): ContextItem;
    function addItemByName(context: ContextItem[], name: string, value: any): ContextItem[];
    function removeItemByName(context: ContextItem[], name: string): ContextItem[];
}
export declare function bind(name?: string): (target: any, propertyKey: string) => any;
export declare function provide(name?: string): (constructor: any) => any;
export declare function provideValue(name: string | Function, value: any): void;
