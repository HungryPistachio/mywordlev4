import { DICTIONARY } from "./dictionary.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = getWord();

console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function getWord() {
  var today = new Date(); //gets date
  var todaysWord = today.getDate().toString(); //get DAY (1-31) and makes string

  //Labelling the days
  const dayZero = "30";
  const dayOne = "1";
  const dayTwo = "2";
  const dayThree = "3";
  const dayFour = "4";
  const dayFive = "5";
  const daySix = "6";
  const daySeven = "7";
  const dayEight = "8";
  const dayNine = "9";
  const dayTen = "10";
  const dayEleven = "11";
  const dayTwelve = "12";
  const dayThirteen = "13";
  const dayFourteen = "14";
  const dayFifteen = "15";
  const daySixteen = "16";
  const daySeventeen = "17";
  const dayEighteen = "18";
  const dayNineteen = "19";
  const dayTwenty = "20";
  const dayTwentyOne = "21";
  const dayTwentyTwo = "22";
  const dayTwentyThree = "23";
  const dayTwentyFour = "24";
  const dayTwentyFive = "25";

  //writing to console to see work
  console.log(todaysWord);
  console.log(dayOne);

  //if dayZero equals the day today then it will return angel

  if (dayZero === todaysWord) {
    return "words";
  } else if (dayOne === todaysWord) {
    return "words";
  } else if (dayTwo === todaysWord) {
    return "words";
  } else if (dayThree === todaysWord) {
    return "angel";
  } else if (dayFour === todaysWord) {
    return "jesus";
  } else if (dayFive === todaysWord) {
    return "santa";
  } else if (daySix === todaysWord) {
    return "mince";
  } else if (daySeven === todaysWord) {
    return "myrrh";
  } else if (dayEight === todaysWord) {
    return "snowy";
  } else if (dayNine === todaysWord) {
    return "elves";
  } else if (dayTen === todaysWord) {
    return "jolly";
  } else if (dayEleven === todaysWord) {
    return "bells";
  } else if (dayTwelve === todaysWord) {
    return "comet";
  } else if (dayThirteen === todaysWord) {
    return "robin";
  } else if (dayFourteen === todaysWord) {
    return "holly";
  } else if (dayFifteen === todaysWord) {
    return "white";
  } else if (daySixteen === todaysWord) {
    return "frost";
  } else if (daySeventeen === todaysWord) {
    return "cheer";
  } else if (dayEighteen === todaysWord) {
    return "claus";
  } else if (dayNineteen === todaysWord) {
    return "fairy";
  } else if (dayTwenty === todaysWord) {
    return "vixen";
  } else if (dayTwentyOne === todaysWord) {
    return "birth";
  } else if (dayTwentyTwo === todaysWord) {
    return "cupid";
  } else if (dayTwentyThree === todaysWord) {
    return "drink";
  } else if (dayTwentyFour === todaysWord) {
    return "feast";
  } else if (dayTwentyFive === todaysWord) {
    return "carol";
  } else {
    return "merry";
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    //add in if word too short or not in dictionary to not allow
    let row = document.getElementsByClassName("letter-row")[
      6 - guessesRemaining
    ];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
      guessString += val;
    }

    if (!DICTIONARY.includes(guessString)) {
      if (guessString.length !== 5) {
        alert("Now, that wasn't 5 letters was it?");
      } else alert("Well, that wasn't a real word!");
    } else {
      for (let i = 0; i < 5; i++) {
        let letterColor = "";
        let box = row.children[i];
        let letter = currentGuess[i];

        let letterPosition = rightGuess.indexOf(currentGuess[i]);
        // is letter in the correct guess
        if (letterPosition === -1) {
          letterColor = "grey";
        } else {
          // now, letter is definitely in word
          // if letter index and right guess index are the same
          // letter is in the right position
          if (currentGuess[i] === rightGuess[i]) {
            // shade green
            letterColor = "green";
          } else {
            // shade box yellow
            letterColor = "yellow";
          }

          rightGuess[letterPosition] = "#";
        }

        let delay = 250 * i;
        setTimeout(() => {
          //flip box
          animateCSS(box, "flipInX");
          //shade box
          box.style.backgroundColor = letterColor;
          shadeKeyBoard(letter, letterColor);
        }, delay);
      }

      if (guessString === rightGuessString) {
        alert(
          `Merry Christmas, you flithy animal, The right word was: "${rightGuessString}"`
        );
        guessesRemaining = 0;

        return;
      } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
          alert("Bah humbug! You didn't get the word in 6 guesses.");
          alert(`The right word was: "${rightGuessString}"`);
        }
      }
    }

    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

initBoard();
