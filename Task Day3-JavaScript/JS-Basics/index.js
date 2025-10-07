console.log("Hello World");
let name="Sonjoy Roy";
//let is used to declare a variable
//var is also used to declare a variable but it is not recommended to use var
//const is used to declare a constant variable which cannot be changed
//var vs let vs const
//var is function scoped
//let and const are block scoped
//var can be re-declared and updated
//let can be updated but not re-declared
//const cannot be updated or re-declared
//it is recommended to use let and const instead of var
//it is recommended to use const by default and use let only when you need to update the variable
//it is recommended to use camelCase for variable names
//it is recommended to use meaningful variable names
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
//async programming means the code is executed in a non-blocking way
//event handling means the code is executed in response to an event such as a button click or a form submission

// in ecomercewebsite the callback function is used to handle the response of an api call
//example of api call using fetch
// fetch("https://jsonplaceholder.typicode.com/posts")
// .then(response=>response.json()) // callback function to handle the response
// .then(data=>console.log(data)) // callback function to handle the data
// .catch(error=>console.log(error)); // callback function to handle the error
// //end of example of api call using fetch

// //in a website the callback function is used to handle the click event of a button
// //example of click event
// document.getElementById("myButton").addEventListener("click",function(){
//     console.log("Button clicked");
// });
// //end of example of click event

// //in a website the callback function is used to handle the form submission event
// //example of form submission event
// document.getElementById("myForm").addEventListener("submit",function(event){
//     event.preventDefault(); // prevent the default form submission behavior
//     console.log("Form submitted");
// });
// //end of example of form submission event

// //in a website the callback function is used to handle the setTimeout event
// //example of setTimeout event
// setTimeout(function(){
//     console.log("This message is displayed after 2 seconds");
// },2000);
// //end of example of setTimeout event

// //in a website the callback function is used to handle the setInterval event
// //example of setInterval event
// setInterval(function(){
//     console.log("This message is displayed every 2 seconds");
// },2000);
// //end of example of setInterval event

// //in a website the callback function is used to handle the array methods such as map, filter, reduce, forEach
// //example of map method
// let arr=[1,2,3,4,5];
// let squaredArr=arr.map(function(num){
//     return num*num;
// });
// console.log(squaredArr); // [1,4,9,16,25]
// //end of example of map method

// //example of filter method
// let evenArr=arr.filter(function(num){
//     return num%2===0;
// });
// console.log(evenArr); // [2,4]
// //end of example of filter method

// //example of reduce method
// let sumArr=arr.reduce(function(acc,cur){
//     return acc+cur;
// },0);
// console.log(sumArr); // 15
// //end of example of reduce method

// //example of forEach method
// arr.forEach(function(num){
//     console.log(num);
// });
// //end of example of forEach method

// //end of types of functions 
// //example of callback function
// function displayResult(result){
//     console.log("Result: "+result);
// }
// function calculate(a,b,callback){
//     let sum=a+b;
//     callback(sum);
// }
// calculate(10,5,displayResult);

//simple example of callback function
function fetchData(callback){
    setTimeout(function(){
        const data="Hello from fetchData";
        callback(data);
    },2000);
}
fetchData(function(result){
    console.log("callback:"+result);
});
//end of simple example of callback function    

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
console.log("This is a higher-order function example");
//8. Generator Function
//description: A generator function is a special type of function that can be paused and resumed, allowing it to generate a sequence of values over time.
// It is defined using the function* syntax and uses the yield keyword to produce values.
// The generator function returns an iterator object that can be used to iterate over the generated values.
//in a website the generator function is used to handle large data sets
//example of generator function
function* generatorFunction(){
    yield 1;
    yield 2;
    yield 3;
}
const generator=generatorFunction();
console.log("generator call : "+generator.next().value); // 1
console.log("generator call : "+generator.next().value); // 2
console.log("generator call : "+generator.next().value); // 3
console.log("generator call : "+generator.next().value); // undefined
//end of example of generator function
//end of types of functions

//in industrylevel the generator function is used to handle large data sets
//example of generator function
function* idGenerator(){
    let id=1;
    while(true){
        yield id++;
    }
}
const idGen=idGenerator();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2
console.log(idGen.next().value); // 3
//end of example of generator function
//end of industrylevel the generator function is used to handle large data sets
//in a website the generator function is used to handle pagination
//example of pagination using generator function
function* paginate(items,pageSize){
    let page=0;
    while(page*pageSize<items.length){
        yield items.slice(page*pageSize,(page+1)*pageSize);
        page++;
    }
}
const items=[1,2,3,4,5,6,7,8,9,10];
const paginator=paginate(items,3);
console.log(paginator.next().value); // [1,2,3]
console.log(paginator.next().value); // [4,5,6]
console.log(paginator.next().value); // [7,8,9]
console.log(paginator.next().value); // [10]
console.log(paginator.next().value); // undefined
//end of example of pagination using generator function
//end of types of functions
//in ecomerce website the generator function is used to handle infinite scrolling
//example of infinite scrolling using generator function
function* infiniteScroll(items){
    let index=0;
    while(true){
        if(index<items.length){
            yield items[index++];
        }else{
            yield null;
        }
    }
}
const scrollItems=[1,2,3,4,5,6,7,8,9,10];
const scroller=infiniteScroll(scrollItems);
console.log(scroller.next().value); // 1
console.log(scroller.next().value); // 2
console.log(scroller.next().value); // 3
console.log(scroller.next().value); // 4
console.log(scroller.next().value); // 5
console.log(scroller.next().value); // 6
console.log(scroller.next().value); // 7
console.log(scroller.next().value); // 8
console.log(scroller.next().value); // 9
console.log(scroller.next().value); // 10
console.log(scroller.next().value); // null
console.log(scroller.next().value); // null
//end of example of infinite scrolling using generator function
//end of types of functions 

//9. Async Function
//description: An async function is a function that is declared with the async keyword and allows the use of the await keyword inside it.
// It is used to handle asynchronous operations in a more synchronous-like manner, making the code easier to read and maintain.
//example of async function 
async function asyncFunction(){
    return "Hello from async function";
}
asyncFunction().then(result=>console.log(result));


// //in industrylevel the async function is used to handle api calls
// //example of api call using async function
// //explaination: the function fetchApiData is declared as async
// //the await keyword is used to wait for the fetch call to complete
// //the response is then converted to json format using response.json() method
// //the data is then logged to the console
// //if there is an error it is caught in the catch block and logged to the console    

// async function fetchApiData(){
//     try{
//         const response=await fetch("https://jsonplaceholder.typicode.com/posts");
//         const data=await response.json();
//         console.log(data);
//     }catch(error){
//         console.log(error);
//     }
// }
// fetchApiData();//output: [{userId: 1, id: 1, title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", body: "quia et suscipit\nsuscipit... (example output)}
// //end of example of api call using async function
// //end of industrylevel the async function is used to handle api calls

// //in a website the async function is used to handle form submission
// //example of form submission using async function
// async function submitForm(event){
//     event.preventDefault(); // prevent the default form submission behavior
//     const formData=new FormData(event.target);
//     try{
//         const response=await fetch("https://jsonplaceholder.typicode.com/posts",{
//             method:"POST",
//             body:formData
//         });
//         const data=await response.json();
//         console.log(data);
//     }catch(error){
//         console.log(error);
//     }   
// // in e comerce website the async function is used to handle payment processing
// //example of payment processing using async function
// //description: the function processPayment takes paymentDetails as input and makes a POST request to the api endpoint
// //code explaination: using fetch api to make a POST request to the api endpoint
// //the await keyword is used to wait for the response from the api
// //the response is then converted to json format using response.json() method
// //the data is then logged to the console
// //if there is an error it is caught in the catch block and logged to the console
// async function processPayment(paymentDetails){
//     try{
//         const response=await fetch("https://jsonplaceholder.typicode.com/posts",{
//             method:"POST",
//             body:JSON.stringify(paymentDetails),
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         });
//         const data=await response.json();
//         console.log(data);
//     }catch(error){
//         console.log(error);
//     }
// }
// const paymentDetails={
//     cardNumber:"1234 5678 9012 3456",
//     expiryDate:"12/25",
//     cvv:"123",
//     amount:100
// };
// processPayment(paymentDetails);//output: {id: 101, cardNumber: "1234 5678 9012 3456", expiryDate: "12/25", cvv: "123", amount: 100} (example output)
// //end of example of payment processing using async function
// //end of types of functions 
// }
// document.getElementById("myForm").addEventListener("submit",submitForm);
// //end of example of form submission using async function
// //end of types of functions     
// //10. Constructor Function
// function Person(name,age){
//     this.name=name;
//     this.age=age;
// }
// const person1=new Person("Sonjoy Roy",22);
// console.log(person1.name);
// console.log(person1.age);

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
//description: A static method is a method that belongs to the class itself rather than to any specific instance of the class.
// It is defined using the static keyword and can be called without creating an instance of the class.
// Static methods are often used for utility functions or factory methods that do not require access to instance properties or methods.
//utility functions are functions that perform common tasks that can be reused across multiple parts of an application
//factory methods are methods that create and return instances of a class
//in a website the static method is used to create utility functions that can be used across multiple instances of a class
//in industrylevel the static method is used to create factory methods that create and return instances of a class
//for example in a website the static method is used to create a utility function that formats a date
class DateFormatter{
    static formatDate(date){
        return date.toISOString().split("T")[0];
    }
}
const date=new Date();
console.log("date formater static method"+ DateFormatter.formatDate(date)); // 2023-10-01 (example output)

//ecomerce website example of static method
class Product{
    constructor(name,price){
        this.name=name;
        this.price=price;
    }
    static applyDiscount(product,discount){
        return product.price-(product.price*discount)/100;
    }
}
const product1=new Product("Laptop",1000);
console.log("ecomerce website static method"+Product.applyDiscount(product1,10)); // 900 (example output)   
//end of example of static method
//end of industrylevel the static method is used to create factory methods that create and return instances of a class
//in a website the static method is used to create utility functions that can be used across multiple instances of a class
//for example in a website the static method is used to create a utility function that validates an email
class EmailValidator{
    static validateEmail(email){
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
} 
//example of static method
class MyClass{
    static myStaticMethod(){
        console.log("This is a static method");
    }
}
MyClass.myStaticMethod();

//13. Instance Method
//description: An instance method is a method that belongs to a specific instance of a class.
// It is defined without the static keyword and can be called only on an instance of the class.
// Instance methods often operate on instance properties and can access other instance methods.
//in a website the instance method is used to create methods that operate on instance properties
//for example in a website the instance method is used to create a method that greets a user by name
//description: the class User has a constructor that initializes the name property    

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

//

//14. Async/Await Function
//description: An async/await function is a function that is declared with the async 
// keyword and uses the await keyword to pause the execution of the function until a Promise is resolved.
//promises are used to handle asynchronous operations in JavaScript
//example of async/await function
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

// async/await function in ecomerce website
//example of async/await function
async function fetchProductDetails(productId){
    try{
        const response=await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data=await response.json();
        console.log("dataaaaa"+data);
    }catch(error){
        console.log(error);
    }
}
fetchProductDetails(1); // output: {id: 1, title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", price: 109.95, description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", category          


//15. Pure Function
//description: A pure function is a function that always produces the same output for the same input and does not have any side effects.
// Side effects are any changes to the state of the program or external environment, such as modifying a global variable or changing the DOM.
// Pure functions are often used in functional programming and can make code easier to reason about and test.
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