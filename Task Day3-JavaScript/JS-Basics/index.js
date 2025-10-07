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
//description: A function declaration defines a named function that can be called later in the code. 
// It is hoisted, meaning it can be called before its definition in the code.
function add(a,b){
    return a+b;
}
console.log(add(10,5));

//2. Function Expression
//description: A function expression defines a function as part of a larger expression, 
// such as an assignment or a function call. It is not hoisted, meaning it cannot be called before its definition in the code.
//correct way to define function expression
const subtract1=function(a,b){
    return a-b;
}
console.log(subtract1(10,5));
//3. Arrow Function
//description: An arrow function is a concise way to define a function using the "=>" syntax.
// It does not have its own "this" context and is often used for short functions or callbacks.  
//it is used in website development
//example of arrow function
const multiply=(a,b)=>{
    return a*b;
}
console.log(multiply(10,5));

//4. Immediately Invoked Function Expression (IIFE)
//description: An IIFE is a function that is defined and immediately invoked (called) in the same expression.
// It is often used to create a new scope and avoid polluting the global namespace.
//in the website development it is used to avoid polluting the global namespace
(function(a,b){
    console.log(a/b);
})(10,5);
//explanation: the function is defined and immediately invoked with the arguments 10 and 5
//the result is 2

//5. Recursive Function
//description: A recursive function is a function that calls itself in order to solve a problem.
// It typically has a base case to stop the recursion and a recursive case to continue the recursion.
//example of recursive function
function factorial(n){
    if(n===0){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}
//explanation: the function calculates the factorial of a number n
//the base case is when n is 0, the factorial is 1
//the recursive case is when n is greater than 0, the factorial is n times the factorial of n-1   
console.log(factorial(5)); // 5*4*3*2*1=120
//industrylevel example of recursive function is in tree traversal algorithms
function traverseTree(node){
    if(node===null){
        return;
    }
    console.log("the tree traversal output:" + node.value);
    traverseTree(node.left);
    traverseTree(node.right);
}
//end of industrylevel example of recursive function
//calling the function
traverseTree({value:1,left:{value:2,left:null,right:null},right:{value:3,left:null,right:null}});   
//output: 1 2 3

//in a ecomerce website the recursive function is used to calculate the total price of a shopping cart
function calculateTotalPrice(cart){
    let total=0;
    for(let item of cart){
        if(Array.isArray(item)){
            total+=calculateTotalPrice(item);
        }else{
            total+=item.price*item.quantity;
        }
    }
    return total;
}
//description: the function calculates the total price of a shopping cart
//the cart can contain items and nested carts
//the function uses recursion to calculate the total price of nested carts
//example of cart   
const cart=[
    {price:10,quantity:2},
    {price:20,quantity:1},
    [
        {price:5,quantity:3},
        {price:15,quantity:2}
    ]
];
console.log("calculating price:" + calculateTotalPrice(cart)); // 10*2+20*1+5*3+15*2=100   

// when the api response is in json format and the json contains nested objects and arrays
// the recursive function is used to parse the json and extract the required data
function parseJson(json){
    let result={};
    for(let key in json){
        if(typeof json[key]==="object" && json[key]!==null){
            result[key]=parseJson(json[key]);
        }else{
            result[key]=json[key];
        }
    }
    return result;
}
//example of json
function parseJson(json) {
  if (Array.isArray(json)) {
    // handle arrays separately
    return json.map(item => parseJson(item));
  } else if (typeof json === "object" && json !== null) {
    const result = {};
    for (let key in json) {
      result[key] = parseJson(json[key]);
    }
    return result;
  } else {
    // primitive value (string, number, etc.)
    return json;
  }
} 
//output: {name: "Sonjoy Roy", age: 22, address: {street: "123 Main St", city: "Dhaka", country: "Bangladesh"}, hobbies: Array(3)}
//end of example of json
//suppose i have multiple person and i want to parse the json of multiple person using recursive function
//hobbys is an array of strings
const multipleJsonResponse=[
    {
        name:"Sonjoy Roy",
        age:22,
        address:{
            street:"123 Main St",
            city:"Dhaka",
            country:"Bangladesh"
        },
        hobbies:["Reading","Traveling","Coding"]
    },
    {
        name:"Alice",
        age:25,
        address:{
            street:"456 Main St",
            city:"New York",
            country:"USA"
        },
        hobbies:["Music","Movies","Sports"]
    }
];
//calling the function
// code syntax desciption: using map function to iterate over the array and calling the parseJson function for each element
//the map function returns a new array with the parsed json of each element
//multipleJsonResponse.map(person=>parseJson(person)) is the new array
//console.log is used to print the new array
console.log("parsing multiple json:" + multipleJsonResponse.map(person=>parseJson(person)));
//accessing the parsed data
//code syntax description: using forEach function to iterate over the array and accessing the properties of each element
//the forEach function does not return a new array                                                 ^

multipleJsonResponse.forEach(person => {
  const parsedPerson = parseJson(person);

  console.log("Name: " + parsedPerson.name);
  console.log("Age: " + parsedPerson.age);
  console.log("City: " + (parsedPerson.address?.city || "N/A"));

  // --- handle hobbies properly ---
  let hobbies = parsedPerson.hobbies;

  if (typeof hobbies === "string") {
    // case: hobbies = "reading, painting"
    hobbies = hobbies.split(",").map(h => h.trim());
  } else if (!Array.isArray(hobbies)) {
    // case: hobbies missing or invalid
    hobbies = ["No hobbies listed"];
  }

  console.log("Hobbies: " + hobbies.join(", "));
  console.log("----------------------------");
});
//correct way of printing the parsed data hobbies is an array of strings so we need to join the array elements with a comma
//correct code is console.log("Hobbies: "+parsedPerson.hobbies.join(", "));

//end of calling the function






//end of when the api response is in json format and the json contains nested objects and arrays


//6. Callback Function
//description: A callback function is a function that is passed as an argument to another function and is executed after the outer function completes its task.
// It is often used for asynchronous programming and event handling.
//example of callback function
function displayResult(result){
    console.log("Result: "+result);
}
function calculate(a,b,callback){
    let sum=a+b;
    callback(sum);
}
calculate(10,5,displayResult);

//7. Higher-Order Function
//description: A higher-order function is a function that takes another function as an argument or returns a function as its result.
// It is often used for functional programming and to create more abstract and reusable code.
//example of higher-order function
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