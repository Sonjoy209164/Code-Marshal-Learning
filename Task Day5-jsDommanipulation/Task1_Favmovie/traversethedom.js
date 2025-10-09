//Dom manipulation
//Traverse the DOM
//1. parentNode
//2. parentElement
//3. childNodes
//4. children
//5. firstChild
//6. firstElementChild
//7. lastChild
//8. lastElementChild
//9. nextSibling
//10. nextElementSibling
//11. previousSibling
//12. previousElementSibling

//parentNode traversing
//two waysto get the parent node
//1. parentNode
//2. parentElement
//difference between parentNode and parentElement
//parentNode can return any type of node like element node, text node, comment node etc
//parentElement always returns an element node or null if there is no parent element
// element node is a node that represents an element in the document like <div>, <p>, <ul> etc
// text node is a node that represents the text content of an element or attribute
// comment node is a node that represents a comment in the document
//in most cases parentNode and parentElement will return the same result
//but in some cases they may return different results
//for example if the parent node is a text node or comment node then parentNode will return that node
//but parentElement will return null
//example
let div = document.querySelector("div");
console.log(div.parentNode);
console.log(div.parentElement);
div.parentNode.style.backgroundColor = "lightblue";
div.parentElement.style.padding = "5px";

//another example
let ul = document.querySelector("ul");
console.log(ul.parentNode);
console.log(ul.parentElement);
ul.parentNode.style.backgroundColor = "darkviolet";
ul.parentElement.style.padding = "10px";

//if i want to go one more level up like the grand parent
console.log(ul.parentNode.parentNode);
console.log(ul.parentElement.parentElement);
ul.parentNode.parentNode.style.backgroundColor = "lightgrey";
ul.parentElement.parentElement.style.padding = "20px";


const html=document.documentElement;
console.log(html.parentElement);
console.log(html.parentNode);




//childNode traversing
//two ways to get the child nodes
//1. childNodes
//2. children
//difference between childNodes and children
//childNodes returns a live NodeList of all child nodes of any type of the specified node
//children returns a live HTMLCollection of only element child nodes of the specified node
//in most cases childNodes and children will return the same result
//but in some cases they may return different results
//for example if the child node is a text node or comment node then childNodes will return that node
//but children will return only element nodes in the case of text node or comment node it will return an empty HTMLCollection
//example

console.log(ul.childNodes);
console.log(ul.children);
console.log(ul.firstChild);
console.log(ul.firstElementChild);
console.log(ul.lastChild);
console.log(ul.lastElementChild);

//if i want to access a specific child node like the second child node
console.log(ul.childNodes[1]);//text node
//another way to access the second child node
console.log(ul.childNodes[3]);//second li element
//if i want to access the text element of the second child node
console.log(ul.childNodes[3].firstChild);//text node    
//if i want to show the text element of the second child node
console.log(ul.childNodes[1].nodeValue);//text node value
//if i want to access the second child element 
console.log(ul.children[1]);//second li element

ul.children[1].style.backgroundColor="lightgreen";
ul.childNodes[3].style.backgroundColor="lightgreen";


//SIBLING NODE TRAVERSAL
//two ways to get the sibling nodes
//1. nextSibling and previousSibling
//2. nextElementSibling and previousElementSibling
//difference between nextSibling and nextElementSibling
//nextSibling returns the next sibling node of any type of the specified node
//nextElementSibling returns the next sibling element node of the specified node
//in most cases nextSibling and nextElementSibling will return the same result
//but in some cases they may return different results
//for example if the next sibling node is a text node or comment node then nextSibling will return that node
//but nextElementSibling will return only element nodes in the case of text node or comment node it will return null
//example

let secondLi = document.querySelector("ul li:nth-child(2)");
console.log(secondLi.nextSibling);//text node
console.log(secondLi.nextElementSibling);//third li element
console.log(secondLi.previousSibling);//text node
console.log(secondLi.previousElementSibling.previousElementSibling);//first li element

secondLi.nextElementSibling.style.backgroundColor = "lightcoral";
secondLi.previousElementSibling.style.backgroundColor = "lightcyan";
