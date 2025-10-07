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

let age=22; // number
let isStudent=true; // boolean
let address=null; // null
let phoneNumber; // undefined
let symbol=Symbol("id"); // symbol
let bigInt=9007199254740991n; // bigint

let person={
    name:"Sonjoy Roy",
    age:22,
    isStudent:true
}; // object

let numbers=[1,2,3,4,5]; // array

function greet(){
    console.log("Hello World");
} // function

greet();

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