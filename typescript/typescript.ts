// Docs: https://www.typescriptlang.org/docs/handbook/basic-types.html

// Typescript installation: npm install -g typescript
// Typescript compilation: tsc typescript.ts
// Call compiled script: node typescript.js

/*** Types ***/

let myNumber: number = 1;
let myString: string = 'text';
//let myClass: MyClass = new MyClass();
//let myArray: Array<MyClass> = [new MyClass()]; // Or you may use number[] or [string, number]
let myAnything: any = '123';
let myChanging: number|boolean = 2;
let function extend<T, U>(first: T, second: U): T & U {
	return {'1': first, '2': second};
}
type MyString = string;
let myString: MyString = 'text';

/*** Enums ***/

enum Statuses {
	Done,
	InProgree,
	ToBeDone
};
let doneStatus:Statuses = Statuses.Done; // Or Statuses[0]

/*** Return types ***/

function addOne(num: number): string { // If function return nothing use ":void"
	return num + 1 + '';
}

function identity<T>(arg: T): T { // Type variable, accept any type as argument, but function shuld return same type as argument
    return arg;
}

// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

/*** Interfaces ***/
interface userInterface {
	name: string; // Check property
	secondName?: string; // Optional property
	readonly x: number; // Readonly property, should only be modifiable when an object is first created.
	// Can be used also ReadonlyArray<number>
}
function checkUser(myUser: userInterface): void {}

/*** Optional arguments ***/
function addNumber(num?: number): void {}

/*** Functions as property ***/
interface recordInterface {
	add(text: string): void; // Check method
}
function addRecord(record: recordInterface): void {
	record.add('Some text');
}

/*** Classes ***/
interface recordInterface { // Can extend other interfaces
	add(text: string): void; // Text os optional parameter
}
abstract class recordClass {
	abstract add(): void;
}
class myRecord implements recordInterface extends recordClass { // We cam implemets several interfaces in same time
	add(text: string): void {} // This function should be defined here

	constructor(public id: number, private _text: string) {} // This will make public and private properties

	prop: number = 10; // We can use properties!!!

	private name: string;
	protected surname: string;
}

/*** Decorators ***/
let Log = function () {
	return (target: any, // The method targeted by our decorator
		name: string, // The name of targeted method
		descriptor: any // A descriptor of the targeted method (is the method enumerable, writable, etc.)
	) => {
		console.log(`Call to ${name}`);
		return descriptor;
	}
};

class SomeClass {
	@Log()
	someMethod() {}
}
let someClass = new SomeClass();
//someClass.someMethod();

/*** Namespaces ***/
namespace Validation {
    export class StringValidator {
        isAcceptable(s: string): boolean {};
    }
}
let stringValidator = new Validation.StringValidator();

/*** Modules, no need in namespaces ***/
declare module "SomeModule" {
    export function fn(): string;
}
import * as m from "SomeModule";