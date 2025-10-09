//Dommaipulation

//getElementById
let title = document.getElementById("main-heading");
console.log(title);
title.style.color = "blue";
title.style.fontSize = "40px";
title.style.textAlign = "center";

//getElementByClassName
//description : the list items are selected using class name and style is added to each item using loop
//The getElementsByClassName() method returns a collection of all elements in the document with the specified class name, as a live HTMLCollection object.
//The HTMLCollection is not an array. To use array methods, you need to convert it to an array.
//The length property of the HTMLCollection object returns the number of elements in the collection.
//The item() method of the HTMLCollection object returns the element at the specified index in the collection.
//The namedItem() method of the HTMLCollection object returns the element with the specified ID or name attribute.
//The getElementsByClassName() method is case-sensitive. It will only return elements with the exact class name specified.
//The getElementsByClassName() method can be used to select multiple classes by separating the class names with a space.
let listItems = document.getElementsByClassName("list-items");
console.log(listItems);
for (let i = 0; i < listItems.length; i++) {
  listItems[i].style.fontSize = "20px";
  listItems[i].style.color = "green";
  listItems[i].style.backgroundColor = "lightgrey";
  listItems[i].style.margin = "5px";
  listItems[i].style.padding = "5px";
  listItems[i]. style.borderRadious="5px";
}
//  

//get element by tagname
let tagItems = document.getElementsByTagName("li");
console.log(tagItems);  
for (let i = 0; i < tagItems.length; i++) {
  tagItems[i].style.fontSize = "18px";
  tagItems[i].style.color = "purple";
  tagItems[i].style.backgroundColor = "lightyellow";
  tagItems[i].style.margin = "3px";
  tagItems[i].style.padding = "3px";
  tagItems[i].style.borderRadious="5px";
}

//querySelector
let firstListItem = document.querySelector("div");
console.log(firstListItem);
firstListItem.style.fontSize = "25px";
firstListItem.style.color = "red";
firstListItem.style.backgroundColor = "lightblue";
firstListItem.style.margin = "10px";
firstListItem.style.padding = "10px";
firstListItem.style.borderRadious="5px";

//querySelectorAll
// let allListItems = document.querySelectorAll("div");
// console.log(allListItems);
// allListItems.forEach((item) => {
//   item.style.fontSize = "22px";
//   item.style.color = "brown";
//   item.style.backgroundColor = "lightgreen";
//   item.style.margin = "8px";
//   item.style.padding = "8px";
//   item.style.borderRadious="5px";
// });


let allListItems = document.querySelectorAll("div");
console.log(allListItems)



//creating  elements
const ul = document.querySelector("ul");
const li = document.createElement("li");

ul.append(li);
li.innerText = "The Dark Knight";
li.style.fontSize = "20px";
li.style.color = "navy";
li.style.backgroundColor = "lightgrey";
li.style.margin = "5px";
li.style.padding = "5px";
li.style.borderRadious="5px";

//modifying the  elements
const firstListItem1= document.querySelector('.list-items');
console.log(firstListItem1);
console.log(firstListItem1.innerText);
console.log(firstListItem1.textContent);
console.log(firstListItem1.innerHTML);
firstListItem1.innerText = "The Shawshank Redemption (1994) - Modified";


//modifying attribues and classes
li.setAttribute("id", "main-heading");
li.removeAttribute("id");

const title1= document.querySelector("#main-heading");
console.log(title1.getAttribute("id"));

li.classList.remove("list-items");
console.log(li.classList.contains("list-items"));
li.classList.add("list-items");
console.log(li.classList.contains("list-items"));

//remove elements
li.remove();


