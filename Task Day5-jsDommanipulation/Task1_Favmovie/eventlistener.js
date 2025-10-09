//Dom manipulations

//Event Listeners
//1. addEventListener()
//2. removeEventListener()
//3. event object
//4. event types
//5. event bubbling
//6. event capturing
//7. event delegation
//8. inline event handlers
//9. DOM Level 0 event handlers
//10. this keyword in event handlers
//11. event.preventDefault()
//12. event.stopPropagation()

//addEventListener()
//syntax: element.addEventListener(event, function, useCapture);
//event: the event to listen for like click, mouseover, mouseout, keydown, keyup etc
//function: the function to be called when the event is triggered
//useCapture: a boolean value that indicates whether to use event capturing or event bubbling
//default is false which means event bubbling

//change background color of the button when clicked
//element.addEventListener("click", function, false);
//adding a click event on change bg button
// const changeBgButton = document.getElementById("change-bg-btn")
// changeBgButton.addEventListener("click", function() {
//   document.body.style.backgroundColor = "lightblue";
// });


const changeBgButton = document.querySelector("#change-bg-btn");
function changeBgColor() {
  document.body.style.backgroundColor = "lightblue";
  alert("Background color changed to lightblue");
}

changeBgButton.addEventListener("click", changeBgColor);


//mouseover event
// the main heading is a h1 element TO access h1 element we 
//can use getElementById method the in the first bracket 
// we pass the id of the element just telling the id of the element
// we want to access and store it in a variable called heading
// then we can add an event listener to the heading variable
// using the addEventListener method 
// we pass two arguments in the first argument we pass the event type
// which is mouseover in this case and in the second argument we pass 
//an anonymous function which will be executed when the event is triggered
// inside the function we change the color of the heading to skyblue
// and add a transition effect of 0.3 seconds
// then we add another event listener for mouseout event 
// which will revert the color back to white when the mouse leaves the heading  

const heading = document.getElementById("main-heading");

heading.addEventListener("mouseover", function() {
  heading.style.color = "skyblue";
  heading.style.transition = "0.3s";
});

heading.addEventListener("mouseout", function() {
  heading.style.color = "white"; // revert when mouse leaves
});


//Highlight the movie name on hover.
const listItems = document.querySelectorAll(".list-items");

listItems.forEach(item => {
  item.addEventListener("mouseover", function() {
    item.style.backgroundColor = "rgba(71, 236, 6, 0.2)";
    item.style.transform = "scale(1.05)";
    item.style.transition = "0.3s";
    alert("You hovered over: " + item.textContent);
    console.log(item.textContent);
  });

  item.addEventListener("mouseout", function() {
    item.style.backgroundColor = "";
    item.style.transform = "scale(1)";
  });
});
// The above code selects all elements with the class name "list-items"
// and adds mouseover and mouseout event listeners to each item.
// On mouseover, it changes the background color and scales up the item slightly.
// On mouseout, it reverts the background color and scale back to normal.
// You can customize the styles as per your preference.
// The forEach method is used to iterate over the NodeList of list items
// and attach the event listeners to each item individually.
// This way, each movie name will be highlighted when hovered over.


//Make each button glow when hovered.
const buttons = document.querySelectorAll("#container2 button");

buttons.forEach(button => {
  button.addEventListener("mouseover", function() {
    button.style.boxShadow = "0 0 10px rgba(25, 0, 255, 0.8)";
  });

  button.addEventListener("mouseout", function() {
    button.style.boxShadow = "";
  });
});

// 4. Hover over instruction container
const instructionBox = document.getElementById("container3");
instructionBox.addEventListener("mouseover", () => {
  instructionBox.style.background = "rgba(51, 226, 7, 0.1)";
  instructionBox.style.transition = "0.4s";
});
instructionBox.addEventListener("mouseout", () => {
  instructionBox.style.background = "transparent";
});



