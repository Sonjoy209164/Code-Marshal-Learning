Game Overview

“Keyboard Whack-a-Rabbit” is a typing-reaction game designed to improve reflexes and keyboard familiarity.
A rabbit pops up from random keyboard keys — the player must hit the corresponding key to “whack” it before it disappears.
The player’s WPM (words per minute) setting controls the rabbit appearance speed.

⚙️ System Architecture

Frontend stack:

HTML5 for structure

CSS3 for layout and animation

Vanilla JavaScript (ES6) for game logic

The code is divided into three main sections:

Setup: Generate the keyboard UI.

Game Engine: Handle the timing, events, and scoring.

UI Layer: Manage animations, visuals, and responsive layout.

🧩 Functional Flow
1. Initialization Phase

The function createKeyboard() dynamically builds the visual keyboard using the keyboardLayout array.

Code snippet:

const keyboardLayout = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M',' ']
];


Loops through each character.

Creates a <div> with class .key.

Adds a .rabbit image inside.

Stores all keys in the keys array for later reference.

2. Game Start

startGame() is triggered when the Start button is clicked.

Process:

Disables start button, enables restart button.

Reads WPM input and calculates the interval time.

const interval = 60000 / (wpm * 5);


(Higher WPM → shorter intervals → faster rabbits.)

Starts setInterval() loop to randomly call showRabbit().

3. Rabbit Pop-up System

showRabbit() randomly picks a key and adds .up class to make the rabbit appear:

function showRabbit(keyDiv) {
  keyDiv.classList.add('up');
  setTimeout(() => {
    if (keyDiv.classList.contains('up')) {
      missed++;
      updateScore();
      keyDiv.classList.remove('up');
    }
  }, 1000);
}


If the rabbit isn’t hit in 1 second, it counts as missed.

4. Player Interaction

When the user presses any key:

A keydown listener captures the pressed key.

It finds the corresponding .key div:

const keyDiv = keys.find(k => k.dataset.key === keyPressed);


If the key had a rabbit (.up), the rabbit disappears, and score increments.

Otherwise, it counts as a miss.

5. Restart Game

The restartGame() function:

Stops the interval (clearInterval()).

Resets score and missed count.

Removes all .up and .active classes.

Resets button states.

🧮 Variables & Game State
Variable	Description
keys	Stores references to all .key DOM elements
score, missed	Track player performance
gameInterval	Stores active interval ID
gameActive	Boolean state to avoid multiple starts
wpm	User-chosen speed (controls rabbit spawn rate)
🖱️ DOM Events Used
Event	Target	Purpose
click	Start & Restart buttons	Begin or reset game
keydown	window	Detects key presses
keyup	window	Removes active key highlight
setInterval	JS Timer	Continuously spawns rabbits
💡 Design & UX Enhancements

Responsive Grid Layout:
The keyboard auto-adjusts from 15 to 5 columns using media queries for various screens.

Color-coded feedback:

Rabbit missed → red counter

Hit → green score

Glassmorphism design:

Uses translucent panels with backdrop-filter: blur(5px) for modern UI feel.

Smooth Animations:

Key press transitions

Rabbit “pop” uses CSS bottom transitions

📱 Responsive Behavior
Device	Layout Adaptation
>1200px	Full keyboard with 15 keys per row
992px–1200px	Compact keys, 10 keys per row
600px–992px	Tablet layout, reduced spacing
<600px	Mobile-friendly grid, 7–5 columns
🧠 Function Overview Table
Function	Type	Description
createKeyboard()	Initialization	Dynamically builds the visual keyboard
startGame()	Game Control	Starts the timer loop and enables gameplay
restartGame()	Game Control	Resets all values and stops the game
showRabbit()	Animation	Pops up a rabbit at random key positions
updateScore()	UI	Updates score and missed values on the screen
🧰 Modern Web Features Used
Feature	Description
CSS Grid	Aligns keyboard layout fluidly
CSS Variables	Used for color consistency
Flexbox	Centers controls and scoreboard
Media Queries	Ensures mobile responsiveness
ES6 Syntax	const, let, arrow functions, template literals
Event Delegation	Efficiently handles keyboard input
🚀 Further Enhancements (for a production-level game)

Add sound effects for hit/miss.

Add increasing difficulty over time.

Integrate leaderboard via localStorage.

Animate rabbits with bounce/scale effects.

Add timer countdown + progress bar.

Create separate profiles and stats tracking.

Would you like me to generate the matching JavaScript (optimized version) that works perfectly with this CSS (with restart, smooth animation, and scaling difficulty)?
That would complete the “industry-level” version.