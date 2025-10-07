console.log("Hello World");
let name="Sonjoy Roy";
console.log(name);
// naming rules if is not valid
// let 1name="Sonjoy Roy"; // cannot start with number
// let my name="Sonjoy Roy"; // cannot contain space
// let my-name="Sonjoy Roy"; // cannot contain hyphen
// let function="Sonjoy Roy"; // cannot use reserved keywords
// case sensitive
// valid naming rules
let $name="Sonjoy Roy"; // can start with $ sign
let _name="Sonjoy Roy"; // can start with _ sign
let myName="Sonjoy Roy"; // can use camelCase

// alert("Welcome to JavaScript");
// document.write("This is JavaScript Basics");

let firstName="Sonjoy";
let lastName="Roy";
console.log(firstName+" "+lastName);
console.log(firstName.concat(" ",lastName));
console.log(`My name is ${firstName} ${lastName}`); // template literals

// Data types in JavaScript
// Primitive data types: string, number, boolean, null, undefined, symbol, bigint
// Non-primitive data types: object, array, function
//primitive means simple data types which store single value
//more about primitive and non-primitive data types in next file
//primitive data types are immutable (cannot be changed)
//non-primitive data types are mutable (can be changed) 
//non-primitive means complex data types which store multiple values

let age=22; // number
let isStudent=true; // boolean
let address=null; // null
let phoneNumber; // undefined
let symbol=Symbol("id"); // symbol
let bigInt=9007199254740991n; // bigint
// non-primitive data types 
// object, array, function
let person={
    name:"Sonjoy Roy",
    age:22,
    isStudent:true
}; // object
//accessing object properties
console.log(person.name);
console.log(person["age"]);
// modifying object properties
person.age=23;
console.log(person.age);
// adding new property
person.address="Dhaka, Bangladesh";
console.log(person);
// deleting property
delete person.isStudent;
console.log(person);        

let numbers=[1,2,3,4,5]; // array

function greet(){
    console.log("Hello World");
} // function

greet();

//types of functions
//1. Function Declaration
function add(a,b){
    return a+b;
}
console.log(add(10,5));

//2. Function Expression
// const subtract =function(a,b){
//     return a-b;
// }
// console.log(subtract(10,5));

//3. Arrow Function
const multiply=(a,b)=>{
    return a*b;
}
console.log(multiply(10,5));

//4. Immediately Invoked Function Expression (IIFE)
(function(a,b){
    console.log(a/b);
})(10,5);

//5. Recursive Function
function factorial(n){
    if(n===0){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}
console.log(factorial(5)); // 5*4*3*2*1=120

//6. Callback Function
function displayResult(result){
    console.log("Result: "+result);
}
function calculate(a,b,callback){
    let sum=a+b;
    callback(sum);
}
calculate(10,5,displayResult);

//7. Higher-Order Function
function higherOrderFunction(fn){
    fn();
}
higherOrderFunction(function(){
    console.log("This is a higher-order function");
});

//8. Generator Function
function* generatorFunction(){
    yield 1;
    yield 2;
    yield 3;
}
const generator=generatorFunction();
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
console.log(generator.next().value); // undefined

//9. Async Function
async function asyncFunction(){
    return "Hello from async function";
}
asyncFunction().then(result=>console.log(result));

//10. Constructor Function
function Person(name,age){
    this.name=name;
    this.age=age;
}
const person1=new Person("Sonjoy Roy",22);
console.log(person1.name);
console.log(person1.age);

//11. Method
const obj={
    name:"Sonjoy Roy",
    age:22,
    greet:function(){
        console.log("Hello "+this.name);
    }
};
obj.greet();

//12. Static Method
class MyClass{
    static myStaticMethod(){
        console.log("This is a static method");
    }
}
MyClass.myStaticMethod();

//13. Instance Method
class AnotherClass{
    constructor(name){
        this.name=name;
    }
    myInstanceMethod(){
        console.log("Hello "+this.name);
    }
}
const anotherObj=new AnotherClass("Sonjoy Roy");
anotherObj.myInstanceMethod();

//14. Async/Await Function
async function fetchData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Data fetched");
        },2000);
    });
}
async function asyncAwaitFunction(){
    const data=await fetchData();
    console.log(data);
}
asyncAwaitFunction();

//15. Pure Function
function pureFunction(a,b){
    return a+b;
}
console.log(pureFunction(10,5));
console.log(pureFunction(10,5)); // always returns same output for same input

//16. Impure Function
let count=0;
function impureFunction(){
    count++;
    return count;
}
console.log(impureFunction());
console.log(impureFunction()); // returns different output for same input

//17. Anonymous Function
setTimeout(function(){
    console.log("This is an anonymous function");
},1000);

//18. Named Function Expression
const namedFunctionExpression=function myNamedFunction(){
    console.log("This is a named function expression");
};
namedFunctionExpression();

//19. Rest Parameter Function
function restParameterFunction(...args){
    return args.reduce((acc,cur)=>acc+cur,0);
}
console.log(restParameterFunction(1,2,3,4,5)); // 15

//20. Default Parameter Function
function defaultParameterFunction(a,b=5){
    return a+b;
}
console.log(defaultParameterFunction(10)); // 15
console.log(defaultParameterFunction(10,20)); // 30

// End of types of functions        


// typeof operator
console.log(typeof name); // string
console.log(typeof age); // number
console.log(typeof isStudent); // boolean
console.log(typeof address); // object (this is a known bug in JavaScript)
console.log(typeof phoneNumber); // undefined
console.log(typeof symbol); // symbol
console.log(typeof bigInt); // bigint
console.log(typeof person); // object
console.log(typeof numbers); // object (arrays are of type object)
console.log(typeof greet); // function

// Dynamic typing
let dynamicVar="I am a string";
console.log(dynamicVar);
dynamicVar=100; // now it is a number
console.log(dynamicVar);
dynamicVar=true; // now it is a boolean
console.log(dynamicVar);

// Type conversion
let strNum="100";
let num=Number(strNum); // string to number
console.log(num);
let numStr=String(num); // number to string
console.log(numStr);
let boolNum=Boolean(num); // number to boolean
console.log(boolNum);
let numBool=Number(boolNum); // boolean to number
console.log(numBool);

// Operators
let a=10;
let b=5;
console.log(a+b); // addition
console.log(a-b); // subtraction
console.log(a*b); // multiplication
console.log(a/b); // division
console.log(a%b); // modulus
console.log(a**b); // exponentiation

// Comparison operators
console.log(a==b); // equal to
console.log(a!=b); // not equal to
console.log(a===b); // strict equal to
console.log(a!==b); // strict not equal to
console.log(a>b); // greater than
console.log(a<b); // less than
console.log(a>=b); // greater than or equal to
console.log(a<=b); // less than or equal to

// Logical operators
let x=true;
let y=false;
console.log(x&&y); // logical AND
console.log(x||y); // logical OR
console.log(!x); // logical NOT

// Conditional statements
if(a>b){
    console.log("a is greater than b");
}else if(a<b){
    console.log("a is less than b");
}else{
    console.log("a is equal to b");
}

// Loops
for(let i=0;i<5;i++){
    console.log(i);
}

let j=0;
while(j<5){
    console.log(j);
    j++;
}

let k=0;
do{
    console.log(k);
    k++;
}while(k<5);

// Functions
function add(num1,num2){
    return num1+num2;
}
console.log(add(10,5));

// Arrow functions
const subtract=(num1,num2)=>{
    return num1-num2;
}
console.log(subtract(10,5));

// Arrays
let fruits=["Apple","Banana","Orange"];
console.log(fruits);
console.log(fruits.length); // length of array
console.log(fruits[0]); // first element
fruits.push("Mango"); // add element at the end
console.log(fruits);
fruits.pop(); // remove last element
console.log(fruits);
fruits.shift(); // remove first element
console.log(fruits);
fruits.unshift("Grapes"); // add element at the beginning
console.log(fruits);
console.log(fruits.indexOf("Banana")); // index of element
console.log(fruits.includes("Orange")); // check if element exists

// Objects
let car={
    make:"Toyota",
    model:"Camry",
    year:2020,
    color:"Blue"
};
console.log(car);
console.log(car.make); // access property
car.year=2021; // modify property
console.log(car);
car.price=30000; // add new property
console.log(car);
delete car.color; // delete property
console.log(car);
console.log(Object.keys(car)); // get all keys
console.log(Object.values(car)); // get all values

// Date and Time
let currentDate=new Date();
console.log(currentDate);
console.log(currentDate.getFullYear()); // get year
console.log(currentDate.getMonth()+1); // get month (0-11)
console.log(currentDate.getDate()); // get date
console.log(currentDate.getDay()); // get day of the week (0-6)
console.log(currentDate.getHours()); // get hours
console.log(currentDate.getMinutes()); // get minutes
console.log(currentDate.getSeconds()); // get seconds

// JSON
let jsonString='{"name":"Sonjoy Roy","age":22,"isStudent":true}';
let jsonObj=JSON.parse(jsonString); // JSON string to object
console.log(jsonObj);
let newJsonString=JSON.stringify(jsonObj); // object to JSON string
console.log(newJsonString);

// Error handling
try{
    console.log(nonExistentVar); // this will throw an error
}catch(error){
    console.log("An error occurred: "+error.message);
}finally{
    console.log("This will always execute");
}

// Console methods
console.log("This is a log message");
console.info("This is an info message");
console.warn("This is a warning message");
console.error("This is an error message");
console.table([{name:"Sonjoy",age:22},{name:"Alice",age:25}]); // display data in table format
console.time("Timer"); // start timer
for(let i=0;i<1000000;i++){} // some code
console.timeEnd("Timer"); // end timer and display time taken

// End of JavaScript Basics     