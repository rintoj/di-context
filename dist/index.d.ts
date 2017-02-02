import 'reflect-metadata';
export declare function bind(name?: string): (target: any, propertyKey: string) => any;
export declare function provide(name?: string): (constructor: any) => any;
export declare function provideValue(name: string | Function, value: any): void;
