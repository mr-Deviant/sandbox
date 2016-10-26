// Typescript installation: npm install -g typescript
// Typescript compilation: tsc typescript.ts
// Call compiled script: node typescript.js
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*** Types ***/
var myNumber = 1;
var myString = 'text';
//let myClass: MyClass = new MyClass();
//let myArray: Array<MyClass> = [new MyClass()];
var myAnything = '123';
var myChanging = 2;
/*** Enums ***/
var Statuses;
(function (Statuses) {
    Statuses[Statuses["Done"] = 0] = "Done";
    Statuses[Statuses["InProgree"] = 1] = "InProgree";
    Statuses[Statuses["ToBeDone"] = 2] = "ToBeDone";
})(Statuses || (Statuses = {}));
;
var doneStatus = Statuses.Done;
/*** Return types ***/
function addOne(num) {
    return num + 1 + '';
}
function checkUser(myUser) { }
/*** Optional arguments ***/
function addNumber(num) { }
function addRecord(record) {
    record.add('Some text');
}
var myRecord = (function () {
    function myRecord(id, _text) {
        this.id = id;
        this._text = _text;
        this.prop = 10; // We can use properties!!!
    } // This will make public and private properties
    myRecord.prototype.add = function (text) { }; // This function should be defined here
    return myRecord;
}());
/*** Decorators ***/
var Log = function () {
    return function (target, // The method targeted by our decorator
        name, // The name of targeted method
        descriptor // A descriptor of the targeted method (is the method enumerable, writable, etc.)
        ) {
        console.log("Call to " + name);
        return descriptor;
    };
};
var SomeClass = (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someMethod = function () { };
    __decorate([
        Log()
    ], SomeClass.prototype, "someMethod");
    return SomeClass;
}());
var someClass = new SomeClass();
//someClass.someMethod();
console.log('test');
