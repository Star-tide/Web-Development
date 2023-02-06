const gameContainer = document.getElementById("game");
gameContainer.addEventListener("click", handleCardClick);
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


const reset = document.querySelector('#reset')
reset.addEventListener('click', function(e) {
  e.preventDefault();
  let gameNode = document.querySelector("#game");
  while (gameNode.firstChild) {
    gameNode.removeChild(gameNode.firstChild);
  }
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
})

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'black';
    newDiv.id = 'newCard';
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let count = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (event.target.id != 'clicked' && event.target.id != 'disabled' && count < 2) {
  count ++;
  console.log(count);
  event.target.id = 'clicked';
  event.target.style.backgroundColor = event.target.classList;
  }

  if (count == 2) {
    nodeList = document.querySelectorAll('#clicked');
    flippedCards = Array.from(nodeList);
    for (let card in flippedCards) {
      console.log(flippedCards[card].classList.value);
    }
    if (flippedCards[0].classList.value == flippedCards[1].classList.value) {
      for (let card in flippedCards) {
        flippedCards[card].id = 'disabled';
        count = 0;
        gameContainer.disabled = false;
      }
      // add to score
    } else if (flippedCards[0].classList.value != flippedCards[1].classList.value) {
      setTimeout(function() {
        for (let card in flippedCards) {
          flippedCards[card].style.backgroundColor = 'black';
          flippedCards[card].id = 'newCard'
          count = 0;
          gameContainer.disabled = false;
        }
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
