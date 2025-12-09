//somewhat scales for moblie

// A and B: numbers
// C and D: colors
// E and F: ascii
// G and H: advanced colors

//extra (if I have the time): smth for I and J

//victory screen gives time spent and a reset button (brings back to menu, same room so it's a choice to swap sides, solutions are re-randomized)

//all the localglobal vars:
let roomName;

let currentScene = 0;

let centerXPos;
let centerYPos;
let margin = 100;

let textSizeNum = 24; //default is 24, maybe shrink this is mobile
let textBoxSize = 500; //default being 500
let hintWidth = 60; // shrink for moblie
let buttonWidth = 100; // shrink for moblie
let buttonHeight = 50; //shrink for moblie

let nextButtonVisible = false;
let timeStarted = false;
let timeTracked = 0;
let clickCounter = -1;
let resetButtonVisible = false;

//for the number password puzzle
let password;
let passwordArray = [];
//let passwordAttempt;

let hintAClicked = false;

let number1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let number2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let number3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let number4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let index1 = 0;
let index2 = 0;
let index3 = 0;
let index4 = 0;

//for color puzzle
let hintDClicked = false;
let dHintTime = 0;

let colorPassword = [];
let colorPassBank = ["red", "yellow", "green", "blue", "black", "white"];
//let colorPasswordAttempt = [];
let colorMatched = false;

let color1 = ["red", "yellow", "green", "blue", "black", "white"];
let color2 = ["red", "yellow", "green", "blue", "black", "white"];
let color3 = ["red", "yellow", "green", "blue", "black", "white"];
let color4 = ["red", "yellow", "green", "blue", "black", "white"];

//ascii puzzle vars

let symbolPass;
let symbolPasswordBank = ["€", "œ", "©", "§", "µ", "ƒ", "‰", "ä", "Å"];
let symbolBank = [
  "£",
  "¢",
  "æ",
  "¬",
  "®",
  "@",
  "¦",
  "¤",
  "»",
  ">",
  "«",
  "<",
  "¶",
  "±",
  "Þ",
  "ç",
  "ß",
  "‡",
  "ð",
  "%",
  "¾",
  "Ä",
  "î",
  "å",
];
let symbolPassAttempt = "_";
let symbolsComplete = false;

let symbols1 = [];
let symbols2 = [];
let symbols3 = [];
let symbols4 = [];
let symbols5 = [];
let symbols6 = [];
let symbols7 = [];
let symbols8 = [];
//using index1-4 again/aswell
let index5 = 0;
let index6 = 0;
let index7 = 0;
let index8 = 0;

let symbolsE = false;
let symbolsF = false;

//advanced colors vars
let advColorPassword = [];
// reuse colorPassBank
let currentColor;
let i;
//reuse colorMatched

let gPassAttempt = ["_"];
let hPassAttempt = ["_"];

let colorRed = "red";
let colorYellow = "yellow";
let colorGreen = "green";
let colorBlue = "blue";
let colorBlack = "black";
let colorWhite = "white";

let instructionsLine = "Tell your partner what color to click on";
let redHint = [
  "The color of stop signs",
  "Romance burns bright with this color",
  "I see this color when angry",
  "The color with the shortest name",
  "A winner's number",
];
let yellowHint = [
  "The bright color of the sun",
  "Happiness is smiles and this color",
  "A golden king adorned with a pallid mask",
  "The color with the longest name",
  "Duo, twins, the number...",
];
let greenHint = [
  "The color of healthy plants",
  "Go touch grass it's this color",
  "Frogs, turtles, and lizards",
  "How many little pigs are there",
  "The number of points on a triangle",
];
let blueHint = [
  "The color of sky or sea",
  "This color is a sad feeling",
  "Rivers and lakes",
  "The number of suits in a deck of cards",
  "The number of leaves on a lucky clover",
];
let blackHint = [
  "The combination of all colors",
  "Bats and cats, a witch's favorite",
  "The color of the night sky",
  "The absence of light",
  "My multiples either end in 0 or my number",
];
let whiteHint = [
  "The color of clouds on a sunny day",
  "Peaceful doves are this color",
  "An association with bones",
  "The largest number here",
  "I am the number of yellow times green",
];

let hintPlaying = false;
let gHintTime = 0;
let hHintTime = 0;
//could probably reuse/condense some of these vars but tbh I might get confused lol

//setup and draw
//---------------------------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  centerXPos = windowWidth / 2;
  centerYPos = windowHeight / 2;
  input = createInput(""); //gets created below the canvas,

  if (windowWidth < 450) {
    //adjusts certain vars based off width
    textSizeNum = 16;
    textBoxSize = 300;
    margin = 50;
    hintWidth = 40;
    buttonWidth = 60;
    buttonHeight = 35;
    input.size(200, 14);
    input.position(centerXPos - 100, centerYPos + textSizeNum); //this is based on absolute position
  } else {
    input.size(200, 25);
    input.position(centerXPos - 100, centerYPos + textSizeNum); //this is based on absolute position
  }
  //set up allignment and style
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(textSizeNum);
  noStroke();

  //set up puzzle solutions
  password = ceil(random(1000, 9999)); //ceil used for the password number to be a randomized whole number

  //randomizing a color combination
  for (i = 0; i < 4; i++) {
    shuffle(colorPassBank, true);
    colorPassword.push(colorPassBank[0]);
  }

  //randomizing an ascii combination
  symbolPass = random(symbolPasswordBank);
  for (i = 0; i < 3; i++) {
    symbolPass += random(symbolPasswordBank);
  }
  //print(symbolPass);
  for (i = 0; i < symbolBank.length; i++) {
    //tossing in the whole amount into each array
    symbols1.push(symbolBank[i]);
    symbols2.push(symbolBank[i]);
    symbols3.push(symbolBank[i]);
    symbols4.push(symbolBank[i]);
    symbols5.push(symbolBank[i]);
    symbols6.push(symbolBank[i]);
    symbols7.push(symbolBank[i]);
    symbols8.push(symbolBank[i]);
  }
  //shuffing each one up (without making a duplicate array)
  symbols1 = shuffle(symbols1, true);
  symbols2 = shuffle(symbols2, true);
  symbols3 = shuffle(symbols3, true);
  symbols4 = shuffle(symbols4, true);
  symbols5 = shuffle(symbols5, true);
  symbols6 = shuffle(symbols6, true);
  symbols7 = shuffle(symbols7, true);
  symbols8 = shuffle(symbols8, true);

  //popping off a random ascii character from each array until each reaches a length of 9 (to set up for the ascii puzzle displays)
  for (i = 0; i < 15; i++) {
    symbols1.splice(ceil(random(0, symbols1.length - 1)), 1);
    symbols2.splice(ceil(random(0, symbols2.length - 1)), 1);
    symbols3.splice(ceil(random(0, symbols3.length - 1)), 1);
    symbols4.splice(ceil(random(0, symbols4.length - 1)), 1);
    symbols5.splice(ceil(random(0, symbols5.length - 1)), 1);
    symbols6.splice(ceil(random(0, symbols6.length - 1)), 1);
    symbols7.splice(ceil(random(0, symbols7.length - 1)), 1);
    symbols8.splice(ceil(random(0, symbols8.length - 1)), 1);
  }

  //randomizing a color combination for advacned color puzzle
  for (i = 0; i < 6; i++) {
    shuffle(colorPassBank, true);
    advColorPassword.push(colorPassBank[0]);
  }
}

function draw() {
  background("white");
  if (timeStarted) {
    timeTracked++;
  }
  //started using switch cases in lieu of if elif else statements, https://editor.p5js.org/esztvi/sketches/yuvIkGYR3
  switch (currentScene) {
    case 0: //start screen
      startScene();
      break;
    case 1: //menu screen to split the players onto their different paths
      menuScene();
      break;
    case 2: // scene A (numPass hint)
      sceneA();
      checkAnswer();
      break;
    case 3: // scene B (numPass submit)
      sceneB();
      break;
    case 4: // scene C (colorPass submit)
      sceneC();
      break;
    case 5: // scene D (colorPass hint)
      sceneD();
      checkAnswer();
      break;
    case 6:
      sceneE(); //scene E (ascii puzzle)
      checkAnswer();
      break;
    case 7:
      sceneF(); //scene F (ascii puzzle)
      checkAnswer();
      break;
    case 8:
      sceneG();
      break;
    case 9:
      sceneH();
      break;
    default:
      winScene();
      break;
  }
  // ellipse(shared.x, shared.y, 100, 100);
}
//custom function functions
//---------------------------------------------------------------------------
function connectToRoom() {
  //print(roomName);
  partyConnect("wss://demoserver.p5party.org", "differentRooms", roomName);
  //set up/establish the globalglobal vars
  shared = partyLoadShared("globals", {
    firstSceneSwap: true,
    aTime: 0,
    bTime: 0,
    nextButtonVisible: false,
    passwordAnswer: 0,
    passwordAttempt: 1,
    colorPasswordAnswer: [],
    colorPasswordAttempt: ["_"],
    symbolAnswer: "",
    eHintClicked: false,
    fHintClicked: false,
    symbolsECorrect: false,
    symbolsFCorrect: false,
    gSolved: false,
    hSolved: false,
  });
}

function nextButton() {
  //trigger onto screen when players have solved a puzzle as a way to progress forward
  fill("yellow");
  rect(
    windowWidth - margin - 15,
    windowHeight - margin + 5,
    buttonWidth,
    buttonHeight
  );
  fill("black");
  text(
    "Next",
    windowWidth - margin - 15,
    windowHeight - margin + 5 + textSizeNum / 3
  );
}

function checkAnswer() {
  //having different cases execute the same block of code, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  switch (currentScene) {
    case 2:
    case 3:
      if (shared.passwordAnswer == shared.passwordAttempt) {
        //shared.nextButtonVisible = true;
        nextButtonVisible = true;
      }
      break;
    case 4:
    case 5:
      if (
        shared.colorPasswordAnswer.length == shared.colorPasswordAttempt.length
      ) {
        for (i = 0; i < 4; i++) {
          if (shared.colorPasswordAnswer[i] == shared.colorPasswordAttempt[i]) {
            //print("correct at "+ i)
            colorMatched = true;
          } else {
            colorMatched = false;
            //print("wrong at " + i)
            break;
          }
        }
        if (colorMatched) {
          //shared.nextButtonVisible = true;
          nextButtonVisible = true;
        } //else {
        //   shared.colorPasswordAttempt = [];
        // }
      }
      break;
    case 6: //E
      if (shared.symbolAnswer == symbolPassAttempt) {
        shared.symbolsECorrect = true;
        symbolsComplete = true;
      } else {
        shared.symbolsECorrect = false;
        symbolsComplete = false;
      }
      symbolsE = shared.symbolsECorrect;
      symbolsF = shared.symbolsFCorrect;
      if (symbolsE && symbolsF) {
        nextButtonVisible = true;
      }
      break;
    case 7: //F
      if (shared.symbolAnswer == symbolPassAttempt) {
        shared.symbolsFCorrect = true;
        symbolsComplete = true;
      } else {
        sharedSymbolsFCorrect = false;
        symbolsComplete = false;
      }
      symbolsE = shared.symbolsECorrect;
      symbolsF = shared.symbolsFCorrect;
      if (symbolsE && symbolsF) {
        nextButtonVisible = true;
      }
      break;

    case 8: //G
      if (!colorMatched) {
        if (gPassAttempt.length >= 6) {
          for (i = 1; i < 7; i++) {
            if (shared.hForGColors[i - 1] == gPassAttempt[i]) {
              colorMatched = true;
            } else {
              colorMatched = false;
              break;
            }
          }
          if (colorMatched) {
            shared.gSolved = true;
            //print("color password submitted and is correct");
          } else {
            gPassAttempt = ["_"];
          }
        }
      } else {
        if (shared.gSolved && shared.hSolved) {
          //print("both sides have solved");
          nextButtonVisible = true;
        }
      }
      break;
    case 9: //H
      if (!colorMatched) {
        if (hPassAttempt.length >= 6) {
          for (i = 1; i < 7; i++) {
            if (shared.gForHColors[i - 1] == hPassAttempt[i]) {
              colorMatched = true;
            } else {
              colorMatched = false;
              break;
            }
          }
          if (colorMatched) {
            shared.hSolved = true;
            //print("color password submitted and is correct");
          } else {
            hPassAttempt = ["_"];
          }
        }
      } else {
        if (shared.hSolved && shared.gSolved) {
          //print("both sides have solved");
          nextButtonVisible = true;
        }
      }
      break;
    default:
      break;
  }
}

//the scenes functions (aka layouts)
//---------------------------------------------------------------------------
function startScene() {
  fill("lightblue");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);
  //background("lightblue");
  fill("black");
  text(
    "Grab a friend to play with and connect to your partner using a shared password:",
    centerXPos,
    centerYPos - textSizeNum * 2,
    textBoxSize
  );
  //enter button:
  fill("yellow");
  rect(centerXPos, centerYPos + textSizeNum * 4, buttonWidth, buttonHeight);
  fill("black");
  text("Enter", centerXPos, centerYPos + textSizeNum * 4 + textSizeNum / 3);
}

function menuScene() {
  fill("plum");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);
  fill("black");
  text(
    "Connected to team " + roomName,
    centerXPos,
    centerYPos - textSizeNum * 2
  );
  text(
    "Please select a side to play, do not pick the same side as your partner",
    centerXPos,
    centerYPos - textSizeNum,
    textBoxSize
  );
  //A or B side buttons
  fill("white");
  rect((centerXPos * 2) / 3, (centerYPos * 4) / 3, 75);
  rect((centerXPos * 4) / 3, (centerYPos * 4) / 3, 75);
  fill("black");
  text("A", (centerXPos * 2) / 3, (centerYPos * 4) / 3 + textSizeNum / 3);
  text("B", (centerXPos * 4) / 3, (centerYPos * 4) / 3 + textSizeNum / 3);
}

function winScene() {
  fill("peachpuff");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //crown shape
  fill("yellow");
  beginShape();
  vertex(centerXPos - 50, centerYPos - (textSizeNum + 10));
  vertex(centerXPos - 35, centerYPos - (textSizeNum + 45));
  vertex(centerXPos - 15, centerYPos - (textSizeNum + 25));
  vertex(centerXPos, centerYPos - (textSizeNum + 45));
  vertex(centerXPos + 15, centerYPos - (textSizeNum + 25));
  vertex(centerXPos + 35, centerYPos - (textSizeNum + 45));
  vertex(centerXPos + 50, centerYPos - (textSizeNum + 10));
  endShape();

  //text element
  let timeSpent = shared.aTime + shared.bTime / 2;
  fill("black");
  if (clickCounter >= 0) {
    text("You've made it to the end!", centerXPos, centerYPos);
    if (clickCounter >= 1) {
      text(
        "Congratulations team " + roomName,
        centerXPos,
        centerYPos + (textSizeNum * 3) / 2
      );
      if (clickCounter >= 2) {
        let timeMin = round(timeSpent / 60 / 60);
        let timeSec = round((timeSpent / 60) % 60);
        if (timeSec < 10){
          text(
          "You and your teammate finished in " + timeMin + ":0" + timeSec,
          centerXPos,
          centerYPos + textSizeNum * 3
        );
        } else 
        {text(
          "You and your teammate finished in " + timeMin + ":" + timeSec,
          centerXPos,
          centerYPos + textSizeNum * 3
        );}
        if (clickCounter >= 3) {
          text(
            "Would you like to play again?",
            centerXPos,
            centerYPos + textSizeNum * 5
          );
          fill("yellow");
          rect(
            centerXPos,
            centerYPos + textSizeNum * 7,
            buttonWidth,
            buttonHeight
          );
          fill("black");
          text(
            "Restart",
            centerXPos,
            centerYPos + textSizeNum * 7 + textSizeNum / 3
          );
          resetButtonVisible = true;
        }
      }
    }
  }
}

function sceneA() {
  fill("pink");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //hint button:
  fill("red");
  rect(centerXPos, (centerYPos * 2) / 3, hintWidth);
  fill("black");
  text("?", centerXPos, (centerYPos * 2) / 3 + textSizeNum / 3);

  //displaying A side's hint:
  if (hintAClicked) {
    for (i = 0; i < passwordArray[0]; i++) {
      rect((width * 1) / 5, centerYPos + i * textSizeNum, textSizeNum / 2);
    }
    for (i = 0; i < passwordArray[1]; i++) {
      rect((width * 2) / 5, centerYPos + i * textSizeNum, textSizeNum / 2);
    }
    for (i = 0; i < passwordArray[2]; i++) {
      rect((width * 3) / 5, centerYPos + i * textSizeNum, textSizeNum / 2);
    }
    for (i = 0; i < passwordArray[3]; i++) {
      rect((width * 4) / 5, centerYPos + i * textSizeNum, textSizeNum / 2);
    }
  }

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneB() {
  fill("lightgreen");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);
  //submit button:
  fill("yellow");
  rect(centerXPos, (centerYPos * 3) / 2 + 40, buttonWidth, buttonHeight);
  fill("black");
  text("Submit", centerXPos, (centerYPos * 3) / 2 + textSizeNum / 3 + 40);

  //for the password insert display:
  for (i = 1; i <= 4; i++) {
    fill("white");
    //top row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos - textSizeNum * 4 - 15
    );
    //display rects for the numbers:
    rect(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos,
      textSizeNum * 3,
      textSizeNum * 4
    );
    //bottom row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos + textSizeNum * 4 + 15
    );
  }
  // the numbers text part display
  fill("black");
  textSize(textSizeNum * 2);
  text(
    number1[index1],
    centerXPos - textSizeNum * 12 + 5 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    number2[index2],
    centerXPos - textSizeNum * 12 + 10 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    number3[index3],
    centerXPos - textSizeNum * 12 + 15 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    number4[index4],
    centerXPos - textSizeNum * 12 + 20 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  textSize(textSizeNum);

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneC() {
  fill("lightsalmon");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //submit button
  fill("yellow");
  rect(centerXPos, (centerYPos * 5) / 3, buttonWidth, buttonHeight);
  fill("black");
  text("Submit", centerXPos, (centerYPos * 5) / 3 + textSizeNum / 3);

  //the four color squares, TL, TR, BL, BR
  fill(color1[index1]);
  rect(centerXPos - margin, centerYPos - margin, buttonWidth);
  fill(color2[index2]);
  rect(centerXPos + margin, centerYPos - margin, buttonWidth);
  fill(color3[index3]);
  rect(centerXPos - margin, centerYPos + margin, buttonWidth);
  fill(color4[index4]);
  rect(centerXPos + margin, centerYPos + margin, buttonWidth);

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneD() {
  fill("aquamarine");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //hint button:
  fill("red");
  rect(centerXPos, centerYPos, hintWidth);
  fill("black");
  text("?", centerXPos, centerYPos + textSizeNum / 3);

  //default/not activated
  fill("grey");
  rect(centerXPos - margin, centerYPos - margin, buttonWidth);
  rect(centerXPos + margin, centerYPos - margin, buttonWidth);
  rect(centerXPos - margin, centerYPos + margin, buttonWidth);
  rect(centerXPos + margin, centerYPos + margin, buttonWidth);

  if (hintDClicked) {
    //hint sequence
    if (dHintTime >= 0 && dHintTime <= 60) {
      fill(shared.colorPasswordAnswer[0]);
      rect(centerXPos - margin, centerYPos - margin, buttonWidth);
    }
    if (dHintTime >= 60 && dHintTime <= 120) {
      fill(shared.colorPasswordAnswer[1]);
      rect(centerXPos + margin, centerYPos - margin, buttonWidth);
    }
    if (dHintTime >= 120 && dHintTime <= 180) {
      fill(shared.colorPasswordAnswer[2]);
      rect(centerXPos - margin, centerYPos + margin, buttonWidth);
    }
    if (dHintTime >= 180 && dHintTime <= 240) {
      fill(shared.colorPasswordAnswer[3]);
      rect(centerXPos + margin, centerYPos + margin, buttonWidth);
    }
    dHintTime++;
  }

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneE() {
  fill("lightcoral");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //hint button
  fill("red");
  rect(centerXPos, centerYPos / 2, hintWidth);
  fill("black");
  text("?", centerXPos, centerYPos / 2 + textSizeNum / 3);
  if (shared.eHintClicked) {
    text(
      shared.symbolAnswer[1],
      centerXPos - textSizeNum * 12 + 10 * textSizeNum,
      centerYPos / 2 + textSizeNum
    );
    text(
      shared.symbolAnswer[3],
      centerXPos - textSizeNum * 12 + 20 * textSizeNum,
      centerYPos / 2 + textSizeNum
    );
  }

  //solved indicator
  if (!symbolsComplete) {
    fill("red");
  } else {
    fill("lime");
  }
  circle(centerXPos + margin, (centerYPos * 3) / 2 + 40, 20);

  //reused from B
  //submit button:
  fill("yellow");
  rect(centerXPos, (centerYPos * 3) / 2 + 40, buttonWidth, buttonHeight);
  fill("black");
  text("Submit", centerXPos, (centerYPos * 3) / 2 + textSizeNum / 3 + 40);

  //for the password insert display:
  for (i = 1; i <= 4; i++) {
    fill("white");
    //top row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos - textSizeNum * 4 - 15
    );
    //display rects:
    rect(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos,
      textSizeNum * 3,
      textSizeNum * 4
    );
    //bottom row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos + textSizeNum * 4 + 15
    );
  }
  //ascii character display
  fill("black");
  textSize(textSizeNum * 2);
  text(
    symbols5[index5],
    centerXPos - textSizeNum * 12 + 5 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols6[index6],
    centerXPos - textSizeNum * 12 + 10 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols7[index7],
    centerXPos - textSizeNum * 12 + 15 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols8[index8],
    centerXPos - textSizeNum * 12 + 20 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  textSize(textSizeNum);

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneF() {
  fill("turquoise");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //hint button
  fill("red");
  rect(centerXPos, centerYPos / 2, hintWidth);
  fill("black");
  text("?", centerXPos, centerYPos / 2 + textSizeNum / 3);
  if (shared.fHintClicked) {
    text(
      shared.symbolAnswer[0],
      centerXPos - textSizeNum * 12 + 5 * textSizeNum,
      centerYPos / 2 + textSizeNum
    );
    text(
      shared.symbolAnswer[2],
      centerXPos - textSizeNum * 12 + 15 * textSizeNum,
      centerYPos / 2 + textSizeNum
    );
  }

  //solved indicator
  if (!symbolsComplete) {
    fill("red");
  } else {
    fill("lime");
  }
  circle(centerXPos + margin, (centerYPos * 3) / 2 + 40, 20);

  //reused from B
  //submit button:
  fill("yellow");
  rect(centerXPos, (centerYPos * 3) / 2 + 40, buttonWidth, buttonHeight);
  fill("black");
  text("Submit", centerXPos, (centerYPos * 3) / 2 + textSizeNum / 3 + 40);

  //for the password insert display:
  for (i = 1; i <= 4; i++) {
    fill("white");
    //top row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos - textSizeNum * 4 + 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos - textSizeNum * 4 - 15
    );
    //display rects:
    rect(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos,
      textSizeNum * 3,
      textSizeNum * 4
    );
    //bottom row of triangles:
    triangle(
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) - 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum) + 20,
      centerYPos + textSizeNum * 4 - 20,
      centerXPos - textSizeNum * 12 + 5 * (i * textSizeNum),
      centerYPos + textSizeNum * 4 + 15
    );
  }
  //ascii character display
  fill("black");
  textSize(textSizeNum * 2);
  text(
    symbols1[index1],
    centerXPos - textSizeNum * 12 + 5 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols2[index2],
    centerXPos - textSizeNum * 12 + 10 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols3[index3],
    centerXPos - textSizeNum * 12 + 15 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  text(
    symbols4[index4],
    centerXPos - textSizeNum * 12 + 20 * textSizeNum,
    centerYPos + (textSizeNum * 2) / 3
  );
  textSize(textSizeNum);

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneG() {
  fill("palevioletred");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //solved indicator
  if (!colorMatched) {
    fill("red");
  } else {
    fill("lime");
    if (shared.gSolved && shared.hSolved) {
      //print("both sides have solved");
      nextButtonVisible = true;
    }
  }
  circle(centerXPos + margin, centerYPos / 2, 20);

  //hint button
  fill("red");
  rect(centerXPos, centerYPos / 2, buttonHeight);
  fill("black");
  text("?", centerXPos, centerYPos / 2 + textSizeNum / 3);

  //the 6 color squares, TL, TM, TR, BL, BM, BR
  fill(colorRed);
  rect(centerXPos - (margin * 3) / 2, centerYPos, buttonWidth);
  fill(colorYellow);
  rect(centerXPos, centerYPos, buttonWidth);
  fill(colorGreen);
  rect(centerXPos + (margin * 3) / 2, centerYPos, buttonWidth);
  fill(colorBlue);
  rect(
    centerXPos - (margin * 3) / 2,
    centerYPos + (margin * 3) / 2,
    buttonWidth
  );
  fill(colorBlack);
  rect(centerXPos, centerYPos + (margin * 3) / 2, buttonWidth);
  fill(colorWhite);
  rect(
    centerXPos + (margin * 3) / 2,
    centerYPos + (margin * 3) / 2,
    buttonWidth
  );

  fill("black");
  text(
    "1",
    centerXPos - (margin * 3) / 2,
    centerYPos - (buttonWidth / 2 + textSizeNum / 4)
  );
  text("2", centerXPos, centerYPos - (buttonWidth / 2 + textSizeNum / 4));
  text(
    "3",
    centerXPos + (margin * 3) / 2,
    centerYPos - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "4",
    centerXPos - (margin * 3) / 2,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "5",
    centerXPos,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "6",
    centerXPos + (margin * 3) / 2,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );

  if (hintPlaying) {
    //topleft
    if (
      mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorRed = color(200, 0, 0);
    } else {
      colorRed = "red";
    }

    //topMid
    if (
      mouseX >= centerXPos - buttonWidth / 2 &&
      mouseX <= centerXPos + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorYellow = color(215, 215, 0);
    } else {
      colorYellow = "yellow";
    }

    //topright
    if (
      mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorGreen = color(0, 100, 0);
    } else {
      colorGreen = "green";
    }

    //bottomleft
    if (
      mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorBlue = color(0, 0, 190);
    } else {
      colorBlue = "blue";
    }

    //bottomMid
    if (
      mouseX >= centerXPos - buttonWidth / 2 &&
      mouseX <= centerXPos + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorBlack = color(45, 45, 45);
    } else {
      colorBlack = "black";
    }
    //bottomright
    if (
      mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorWhite = color(200, 200, 200);
    } else {
      colorWhite = "white";
    }

    //hint sequence
    if (gHintTime >= 0 && gHintTime < 180) {
      text(
        instructionsLine,
        centerXPos,
        (centerYPos * 2) / 3 + textSizeNum / 2
      );
    }

    if (gHintTime > 180 && gHintTime < 360) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime > 360 && gHintTime < 540) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime > 540 && gHintTime < 720) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime > 720 && gHintTime < 900) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime > 900 && gHintTime < 1080) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime > 1080 && gHintTime < 1260) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (gHintTime % 180 == 0) {
      redHint = shuffle(redHint, true);
      yellowHint = shuffle(yellowHint, true);
      greenHint = shuffle(greenHint, true);
      blueHint = shuffle(blueHint, true);
      blackHint = shuffle(blackHint, true);
      whiteHint = shuffle(whiteHint, true);
      i++;
      currentColor = shared.gForHColors[i];
    }
    gHintTime++;

    if (gHintTime >= 1260) {
      //print(gPassAttempt) //have the sketch check the answer attempt here
      checkAnswer();
      hintPlaying = false;
    }
  }

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneH() {
  fill("lightseagreen");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);

  //solved indicator
  if (!colorMatched) {
    fill("red");
  } else {
    fill("lime");
    if (shared.gSolved && shared.hSolved) {
      //print("both sides have solved");
      nextButtonVisible = true;
    }
  }
  circle(centerXPos + margin, centerYPos / 2, 20);

  //hint button
  fill("red");
  rect(centerXPos, centerYPos / 2, buttonHeight);
  fill("black");
  text("?", centerXPos, centerYPos / 2 + textSizeNum / 3);

  //the 6 color squares, TL, TM, TR, BL, BM, BR
  fill(colorRed);
  rect(centerXPos - (margin * 3) / 2, centerYPos, buttonWidth);
  fill(colorYellow);
  rect(centerXPos, centerYPos, buttonWidth);
  fill(colorGreen);
  rect(centerXPos + (margin * 3) / 2, centerYPos, buttonWidth);
  fill(colorBlue);
  rect(
    centerXPos - (margin * 3) / 2,
    centerYPos + (margin * 3) / 2,
    buttonWidth
  );
  fill(colorBlack);
  rect(centerXPos, centerYPos + (margin * 3) / 2, buttonWidth);
  fill(colorWhite);
  rect(
    centerXPos + (margin * 3) / 2,
    centerYPos + (margin * 3) / 2,
    buttonWidth
  );

  fill("black");
  text(
    "1",
    centerXPos - (margin * 3) / 2,
    centerYPos - (buttonWidth / 2 + textSizeNum / 4)
  );
  text("2", centerXPos, centerYPos - (buttonWidth / 2 + textSizeNum / 4));
  text(
    "3",
    centerXPos + (margin * 3) / 2,
    centerYPos - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "4",
    centerXPos - (margin * 3) / 2,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "5",
    centerXPos,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );
  text(
    "6",
    centerXPos + (margin * 3) / 2,
    centerYPos + (margin * 3) / 2 - (buttonWidth / 2 + textSizeNum / 4)
  );

  if (hintPlaying) {
    //topleft
    if (
      mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorRed = color(200, 0, 0);
    } else {
      colorRed = "red";
    }

    //topMid
    if (
      mouseX >= centerXPos - buttonWidth / 2 &&
      mouseX <= centerXPos + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorYellow = color(215, 215, 0);
    } else {
      colorYellow = "yellow";
    }

    //topright
    if (
      mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos - buttonWidth / 2 &&
      mouseY <= centerYPos + buttonWidth / 2
    ) {
      colorGreen = color(0, 100, 0);
    } else {
      colorGreen = "green";
    }

    //bottomleft
    if (
      mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorBlue = color(0, 0, 190);
    } else {
      colorBlue = "blue";
    }

    //bottomMid
    if (
      mouseX >= centerXPos - buttonWidth / 2 &&
      mouseX <= centerXPos + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorBlack = color(45, 45, 45);
    } else {
      colorBlack = "black";
    }
    //bottomright
    if (
      mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
      mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
      mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
    ) {
      colorWhite = color(200, 200, 200);
    } else {
      colorWhite = "white";
    }

    //hint sequence
    if (hHintTime >= 0 && hHintTime < 180) {
      text(
        instructionsLine,
        centerXPos,
        (centerYPos * 2) / 3 + textSizeNum / 2
      );
    }

    if (hHintTime > 180 && hHintTime < 360) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime > 360 && hHintTime < 540) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime > 540 && hHintTime < 720) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime > 720 && hHintTime < 900) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime > 900 && hHintTime < 1080) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime > 1080 && hHintTime < 1260) {
      switch (currentColor) {
        case "red":
          text(redHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "yellow":
          text(
            yellowHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "green":
          text(
            greenHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "blue":
          text(blueHint[0], centerXPos, (centerYPos * 2) / 3 + textSizeNum / 2);
          break;
        case "black":
          text(
            blackHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        case "white":
          text(
            whiteHint[0],
            centerXPos,
            (centerYPos * 2) / 3 + textSizeNum / 2
          );
          break;
        default:
        //pass
      }
    }
    if (hHintTime % 180 == 0) {
      redHint = shuffle(redHint, true);
      yellowHint = shuffle(yellowHint, true);
      greenHint = shuffle(greenHint, true);
      blueHint = shuffle(blueHint, true);
      blackHint = shuffle(blackHint, true);
      whiteHint = shuffle(whiteHint, true);
      i++;
      currentColor = shared.hForGColors[i];
    }
    hHintTime++;

    if (hHintTime >= 1260) {
      checkAnswer();
      hintPlaying = false;
    }
  }

  if (nextButtonVisible) {
    nextButton();
  }
}

function sceneI() {
  fill("indianred");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);
}

function sceneJ() {
  fill("teal");
  rect(centerXPos, centerYPos, windowWidth - margin, windowHeight - margin);
}

//functionality, the event handlers, mousepressed first
//---------------------------------------------------------------------------
function mousePressed() {
  if (nextButtonVisible) {
    if (
      mouseX >= windowWidth - margin - 15 - buttonWidth / 2 &&
      mouseX <= windowWidth - margin - 15 + buttonWidth / 2 &&
      mouseY >= windowHeight - margin + 5 - buttonHeight / 2 &&
      mouseY <= windowHeight - margin + 5 + buttonHeight / 2
    ) {
      nextButtonVisible = false;
      currentScene += 2;
      index1 = 0; //reset the index vars bc they can be reused
      index2 = 0;
      index3 = 0;
      index4 = 0;
      colorMatched = false; //reset for the next color puzzle
      if (currentScene == 10) {
        //a side
        shared.aTime = timeTracked;
      } else {
        //b side
        shared.bTime = timeTracked;
      }
      // }
    }
  }
  switch (currentScene) {
    case 0: //start screen functionality
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos + textSizeNum * 4 - buttonHeight / 2 &&
        mouseY <= centerYPos + textSizeNum * 4 + buttonHeight / 2
      ) {
        roomName = input.value();
        input.hide();
        connectToRoom();
        currentScene++;
      }
      break;
    case 1: //menu screen functionality
      if (
        mouseX >= (centerXPos * 2) / 3 - 37.5 &&
        mouseX < (centerXPos * 2) / 3 + 37.5 &&
        mouseY >= (centerYPos * 4) / 3 - 37.5 &&
        mouseY <= (centerYPos * 4) / 3 + 37.5
      ) {
        if (shared.firstSceneSwap) {
          shared.passwordAnswer = password;
          shared.colorPasswordAnswer = colorPassword;
          shared.symbolAnswer = symbolPass;
          //print(shared.symbolAnswer);
          shared.firstSceneSwap = false;
        }
        //inserting the ascii solution combination into the symbols arrays
        symbols1.push(shared.symbolAnswer[0]);
        symbols2.push(shared.symbolAnswer[1]);
        symbols3.push(shared.symbolAnswer[2]);
        symbols4.push(shared.symbolAnswer[3]);

        symbols5.push(shared.symbolAnswer[0]);
        symbols6.push(shared.symbolAnswer[1]);
        symbols7.push(shared.symbolAnswer[2]);
        symbols8.push(shared.symbolAnswer[3]);

        //and then shuffling it again
        symbols1 = shuffle(symbols1, true);
        symbols2 = shuffle(symbols2, true);
        symbols3 = shuffle(symbols3, true);
        symbols4 = shuffle(symbols4, true);

        symbols5 = shuffle(symbols5, true);
        symbols6 = shuffle(symbols6, true);
        symbols7 = shuffle(symbols7, true);
        symbols8 = shuffle(symbols8, true);

        //this is only one-way
        shared.gForHColors = advColorPassword;
        timeStarted = true;

        currentScene += 1; //the A button
        //currentScene += 3; // to C
        //currentScene += 5; // to E
        //currentScene += 7; //to G
      }
      if (
        mouseX >= (centerXPos * 4) / 3 - 37.5 &&
        mouseX < (centerXPos * 4) / 3 + 37.5 &&
        mouseY >= (centerYPos * 4) / 3 - 37.5 &&
        mouseY <= (centerYPos * 4) / 3 + 37.5
      ) {
        if (shared.firstSceneSwap) {
          shared.passwordAnswer = password;
          shared.colorPasswordAnswer = colorPassword;
          shared.symbolAnswer = symbolPass;
          //print(shared.symbolAnswer);
          shared.firstSceneSwap = false;
        }
        //inserting the ascii solution combination into the symbols arrays
        symbols1.push(shared.symbolAnswer[0]);
        symbols2.push(shared.symbolAnswer[1]);
        symbols3.push(shared.symbolAnswer[2]);
        symbols4.push(shared.symbolAnswer[3]);

        symbols5.push(shared.symbolAnswer[0]);
        symbols6.push(shared.symbolAnswer[1]);
        symbols7.push(shared.symbolAnswer[2]);
        symbols8.push(shared.symbolAnswer[3]);

        //and then shuffling it again
        symbols1 = shuffle(symbols1, true);
        symbols2 = shuffle(symbols2, true);
        symbols3 = shuffle(symbols3, true);
        symbols4 = shuffle(symbols4, true);

        symbols5 = shuffle(symbols5, true);
        symbols6 = shuffle(symbols6, true);
        symbols7 = shuffle(symbols7, true);
        symbols8 = shuffle(symbols8, true);

        //this is only one-way
        shared.hForGColors = advColorPassword;
        timeStarted = true;

        currentScene += 2; //the B button
        //currentScene += 4; //to D
        //currentScene += 6; // to F
        //currentScene += 8; //to H
      }
      break;
    case 2: //the A scene functionality
      if (
        mouseX >= centerXPos - hintWidth / 2 &&
        mouseX <= centerXPos + hintWidth / 2 &&
        mouseY >= (centerYPos * 2) / 3 - hintWidth / 2 &&
        mouseY <= (centerYPos * 2) / 3 + hintWidth / 2
      ) {
        hintAClicked = true;
        //print("The passsword is: " + shared.passwordAnswer);
        passwordArray = str(shared.passwordAnswer).split("");
      }

      break;
    case 3: //the B scene functionality
      //top row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index1 > 8) {
          index1 = 0;
        } else {
          index1++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index2 > 8) {
          index2 = 0;
        } else {
          index2++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index3 > 8) {
          index3 = 0;
        } else {
          index3++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index4 > 8) {
          index4 = 0;
        } else {
          index4++;
        }
      }

      //bottom row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index1 < 1) {
          index1 = 9;
        } else {
          index1--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index2 < 1) {
          index2 = 9;
        } else {
          index2--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index3 < 1) {
          index3 = 9;
        } else {
          index3--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index4 < 1) {
          index4 = 9;
        } else {
          index4--;
        }
      }

      // the submit button
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
        mouseY <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
      ) {
        shared.passwordAttempt =
          str(number1[index1]) +
          str(number2[index2]) +
          str(number3[index3]) +
          str(number4[index4]);
        // print("pressed submit");
        // print("submitted: " + passwordAttempt);
        checkAnswer();
      }
      break;

    case 4: // scene C functionality
      //top left
      if (
        mouseX >= centerXPos - margin - buttonWidth / 2 &&
        mouseX <= centerXPos - margin + buttonWidth / 2 &&
        mouseY >= centerYPos - margin - buttonWidth / 2 &&
        mouseY <= centerYPos - margin + buttonWidth / 2
      ) {
        if (index1 > 4) {
          index1 = 0;
        } else {
          index1++;
        }
      }

      //topright
      if (
        mouseX >= centerXPos + margin - buttonWidth / 2 &&
        mouseX <= centerXPos + margin + buttonWidth / 2 &&
        mouseY >= centerYPos - margin - buttonWidth / 2 &&
        mouseY <= centerYPos - margin + buttonWidth / 2
      ) {
        if (index2 > 4) {
          index2 = 0;
        } else {
          index2++;
        }
      }

      //bottomleft
      if (
        mouseX >= centerXPos - margin - buttonWidth / 2 &&
        mouseX <= centerXPos - margin + buttonWidth / 2 &&
        mouseY >= centerYPos + margin - buttonWidth / 2 &&
        mouseY <= centerYPos + margin + buttonWidth / 2
      ) {
        if (index3 > 4) {
          index3 = 0;
        } else {
          index3++;
        }
      }

      //bottomright
      if (
        mouseX >= centerXPos + margin - buttonWidth / 2 &&
        mouseX <= centerXPos + margin + buttonWidth / 2 &&
        mouseY >= centerYPos + margin - buttonWidth / 2 &&
        mouseY <= centerYPos + margin + buttonWidth / 2
      ) {
        if (index4 > 4) {
          index4 = 0;
        } else {
          index4++;
        }
      }

      // the submit button
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= (centerYPos * 5) / 3 - buttonHeight / 2 &&
        mouseY <= (centerYPos * 5) / 3 + buttonHeight / 2
      ) {
        shared.colorPasswordAttempt = [];
        shared.colorPasswordAttempt.push(color1[index1]);
        shared.colorPasswordAttempt.push(color2[index2]);
        shared.colorPasswordAttempt.push(color3[index3]);
        shared.colorPasswordAttempt.push(color4[index4]);
        checkAnswer();
      }

      break;
    case 5: // scene D functionality
      if (
        mouseX >= centerXPos - hintWidth / 2 &&
        mouseX <= centerXPos + hintWidth / 2 &&
        mouseY >= centerYPos - hintWidth / 2 &&
        mouseY <= centerYPos + hintWidth / 2
      ) {
        hintDClicked = true;
        dHintTime = 0;
      }

      break;

    case 6: //scene E functionality
      //hint button
      if (
        mouseX >= centerXPos - hintWidth / 2 &&
        mouseX <= centerXPos + hintWidth / 2 &&
        mouseY >= centerYPos / 2 - hintWidth / 2 &&
        mouseY <= centerYPos / 2 + hintWidth / 2
      ) {
        shared.fHintClicked = true;
      } else {
        shared.fHintClicked = false;
      }
      //reusing from B
      //top row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index5 > 8) {
          index5 = 0;
        } else {
          index5++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index6 > 8) {
          index6 = 0;
        } else {
          index6++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index7 > 8) {
          index7 = 0;
        } else {
          index7++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index8 > 8) {
          index8 = 0;
        } else {
          index8++;
        }
      }

      //bottom row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index5 < 1) {
          index5 = 9;
        } else {
          index5--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index6 < 1) {
          index6 = 9;
        } else {
          index6--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index7 < 1) {
          index7 = 9;
        } else {
          index7--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index8 < 1) {
          index8 = 9;
        } else {
          index8--;
        }
      }

      // the submit button
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
        mouseY <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
      ) {
        symbolPassAttempt =
          str(symbols5[index5]) +
          str(symbols6[index6]) +
          str(symbols7[index7]) +
          str(symbols8[index8]);
        // print("pressed submit");
        // print("submitted: " + symbolPassAttempt);
        checkAnswer();
      }
      break;

    case 7: //scene F functionality
      //hint button
      if (
        mouseX >= centerXPos - hintWidth / 2 &&
        mouseX <= centerXPos + hintWidth / 2 &&
        mouseY >= centerYPos / 2 - hintWidth / 2 &&
        mouseY <= centerYPos / 2 + hintWidth / 2
      ) {
        shared.eHintClicked = true;
      } else {
        shared.eHintClicked = false;
      }
      //reusing from B
      //top row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index1 > 8) {
          index1 = 0;
        } else {
          index1++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index2 > 8) {
          index2 = 0;
        } else {
          index2++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index3 > 8) {
          index3 = 0;
        } else {
          index3++;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos - textSizeNum * 4 - 20 &&
        mouseY <= centerYPos - textSizeNum * 4 + 20
      ) {
        if (index4 > 8) {
          index4 = 0;
        } else {
          index4++;
        }
      }

      //bottom row of triangles
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index1 < 1) {
          index1 = 9;
        } else {
          index1--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index2 < 1) {
          index2 = 9;
        } else {
          index2--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index3 < 1) {
          index3 = 9;
        } else {
          index3--;
        }
      }
      if (
        mouseX >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
        mouseX <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
        mouseY >= centerYPos + textSizeNum * 4 - 20 &&
        mouseY <= centerYPos + textSizeNum * 4 + 20
      ) {
        if (index4 < 1) {
          index4 = 9;
        } else {
          index4--;
        }
      }

      // the submit button
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
        mouseY <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
      ) {
        symbolPassAttempt =
          str(symbols1[index1]) +
          str(symbols2[index2]) +
          str(symbols3[index3]) +
          str(symbols4[index4]);
        // print("pressed submit");
        // print("submitted: " + symbolPassAttempt);
        checkAnswer();
      }
      break;

    case 8: // G functionality
      //topleft
      if (
        mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on red");
        colorRed = "red";
        gPassAttempt.push("red");
      }

      //topMid
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on yellow");
        colorYellow = "yellow";
        gPassAttempt.push("yellow");
      }

      //topright
      if (
        mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on green");
        colorGreen = "green";
        gPassAttempt.push("green");
      }

      //bottomleft
      if (
        mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on blue");
        colorBlue = "blue";
        gPassAttempt.push("blue");
      }

      //bottomMid
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on black");
        colorBlack = "black";
        gPassAttempt.push("black");
      }
      //bottomright
      if (
        mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on white");
        colorWhite = "white";
        gPassAttempt.push("white");
      }

      //instructions button
      if (
        mouseX >= centerXPos - buttonHeight / 2 &&
        mouseX <= centerXPos + buttonHeight / 2 &&
        mouseY >= centerYPos / 2 - buttonHeight / 2 &&
        mouseY <= centerYPos / 2 + buttonHeight / 2 &&
        !hintPlaying
      ) {
        currentColor = shared.gForHColors[i];
        hintPlaying = true;
        i = -2;
        gPassAttempt = ["_"];
        gHintTime = 0;
      }
      break;
    case 9: //H functionality
      //topleft
      if (
        mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on red");
        colorRed = "red";
        hPassAttempt.push("red");
      }

      //topMid
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on yellow");
        colorYellow = "yellow";
        hPassAttempt.push("yellow");
      }

      //topright
      if (
        mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos - buttonWidth / 2 &&
        mouseY <= centerYPos + buttonWidth / 2
      ) {
        //print("clicked on green");
        colorGreen = "green";
        hPassAttempt.push("green");
      }

      //bottomleft
      if (
        mouseX >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on blue");
        colorBlue = "blue";
        hPassAttempt.push("blue");
      }

      //bottomMid
      if (
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on black");
        colorBlack = "black";
        hPassAttempt.push("black");
      }
      //bottomright
      if (
        mouseX >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseX <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
        mouseY >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
        mouseY <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
      ) {
        //print("clicked on white");
        colorWhite = "white";
        hPassAttempt.push("white");
      }

      //intructions button
      if (
        mouseX >= centerXPos - buttonHeight / 2 &&
        mouseX <= centerXPos + buttonHeight / 2 &&
        mouseY >= centerYPos / 2 - buttonHeight / 2 &&
        mouseY <= centerYPos / 2 + buttonHeight / 2 &&
        !hintPlaying
      ) {
        currentColor = shared.hForGColors[i];
        hintPlaying = true;
        i = -2;
        hPassAttempt = ["_"];
        hHintTime = 0;
      }
      break;
    default:
      clickCounter++;
      //restart
      if (
        resetButtonVisible &&
        mouseX >= centerXPos - buttonWidth / 2 &&
        mouseX <= centerXPos + buttonWidth / 2 &&
        mouseY >= centerYPos + textSizeNum * 7 - buttonHeight / 2 &&
        mouseY <= centerYPos + textSizeNum * 7 + buttonHeight / 2
      ) {
        //partyDisconnect();
        shared = partyLoadShared("globals", {
          firstSceneSwap: true,
          aTime: 0,
          bTime: 0,
          nextButtonVisible: false,
          passwordAnswer: 0,
          passwordAttempt: 1,
          colorPasswordAnswer: [],
          colorPasswordAttempt: ["_"],
          symbolAnswer: "",
          eHintClicked: false,
          fHintClicked: false,
          symbolsECorrect: false,
          symbolsFCorrect: false,
          gSolved: false,
          hSolved: false,
        });
        //reseting vars
        resetButtonVisible = false;
        timeStarted = false;
        timeTracked = 0;
        clickCounter = -1;

        hintAClicked = false;
        hintDClicked = false;

        symbolPassAttempt = "_";
        symbolsComplete = false;
        symbolsE = false;
        symbolsF = false;

        index5 = 0;
        index6 = 0;
        index7 = 0;
        index8 = 0;

        randomSeed(Date.now()); //attempt to reseed the randomly generated solutions in order to reroll new solutions
        //randomizing up new solutions
        //set up puzzle solutions
        password = ceil(random(1000, 9999)); //ceil used for the password number to be a randomized whole number

        colorPassword = [];
        //randomizing a color combination
        for (i = 0; i < 4; i++) {
          shuffle(colorPassBank, true);
          colorPassword.push(colorPassBank[0]);
        }

        symbols1 = [];
        symbols2 = [];
        symbols3 = [];
        symbols4 = [];
        symbols5 = [];
        symbols6 = [];
        symbols7 = [];
        symbols8 = [];
        //randomizing an ascii combination
        symbolPass = random(symbolPasswordBank);
        for (i = 0; i < 3; i++) {
          symbolPass += random(symbolPasswordBank);
        }
        //print(symbolPass);
        for (i = 0; i < symbolBank.length; i++) {
          //tossing in the whole amount into each array
          symbols1.push(symbolBank[i]);
          symbols2.push(symbolBank[i]);
          symbols3.push(symbolBank[i]);
          symbols4.push(symbolBank[i]);
          symbols5.push(symbolBank[i]);
          symbols6.push(symbolBank[i]);
          symbols7.push(symbolBank[i]);
          symbols8.push(symbolBank[i]);
        }
        //shuffing each one up (without making a duplicate array)
        symbols1 = shuffle(symbols1, true);
        symbols2 = shuffle(symbols2, true);
        symbols3 = shuffle(symbols3, true);
        symbols4 = shuffle(symbols4, true);
        symbols5 = shuffle(symbols5, true);
        symbols6 = shuffle(symbols6, true);
        symbols7 = shuffle(symbols7, true);
        symbols8 = shuffle(symbols8, true);

        //popping off a random ascii character from each array until each reaches a length of 9 (to set up for the ascii puzzle displays)
        for (i = 0; i < 15; i++) {
          symbols1.splice(ceil(random(0, symbols1.length - 1)), 1);
          symbols2.splice(ceil(random(0, symbols2.length - 1)), 1);
          symbols3.splice(ceil(random(0, symbols3.length - 1)), 1);
          symbols4.splice(ceil(random(0, symbols4.length - 1)), 1);
          symbols5.splice(ceil(random(0, symbols5.length - 1)), 1);
          symbols6.splice(ceil(random(0, symbols6.length - 1)), 1);
          symbols7.splice(ceil(random(0, symbols7.length - 1)), 1);
          symbols8.splice(ceil(random(0, symbols8.length - 1)), 1);
        }

        advColorPassword = [];
        //randomizing a color combination for advacned color puzzle
        for (i = 0; i < 6; i++) {
          shuffle(colorPassBank, true);
          advColorPassword.push(colorPassBank[0]);
        }

        //reset the scene to the menu
        currentScene = 1;
        //input.show();
        break;
      }
  }
}

//touchstarted event handler (update at the end, don't forget!!!!!!!)
//---------------------------------------------------------------------------
function touchStarted() {
  for (let touch of touches) {
    //mouse pressed wasn't working for moblie, so added a touchStarted, struggled to register a touch's x and y until reading up on: https://p5js.org/reference/p5/touches/
    //mouseX -> touch.x
    //mouseY -> touch.y

    if (nextButtonVisible) {
      if (
        touch.x >= windowWidth - margin - 15 - buttonWidth / 2 &&
        touch.x <= windowWidth - margin - 15 + buttonWidth / 2 &&
        touch.y >= windowHeight - margin + 5 - buttonHeight / 2 &&
        touch.y <= windowHeight - margin + 5 + buttonHeight / 2
      ) {
        nextButtonVisible = false;
        currentScene += 2;
        index1 = 0; //reset the index vars bc they can be reused
        index2 = 0;
        index3 = 0;
        index4 = 0;
        colorMatched = false; //reset for the next color puzzle
        if (currentScene == 10) {
          //a side
          shared.aTime = timeTracked;
        } else {
          //b side
          shared.bTime = timeTracked;
        }
        // }
      }
    }
    switch (currentScene) {
      case 0: //start screen functionality
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos + textSizeNum * 4 - buttonHeight / 2 &&
          touch.y <= centerYPos + textSizeNum * 4 + buttonHeight / 2
        ) {
          roomName = input.value();
          input.hide();
          connectToRoom();
          currentScene++;
        }
        break;
      case 1: //menu screen functionality
        if (
          touch.x >= (centerXPos * 2) / 3 - 37.5 &&
          touch.x < (centerXPos * 2) / 3 + 37.5 &&
          touch.y >= (centerYPos * 4) / 3 - 37.5 &&
          touch.y <= (centerYPos * 4) / 3 + 37.5
        ) {
          if (shared.firstSceneSwap) {
            shared.passwordAnswer = password;
            shared.colorPasswordAnswer = colorPassword;
            shared.symbolAnswer = symbolPass;
            //print(shared.symbolAnswer);
            shared.firstSceneSwap = false;
          }
          //inserting the ascii solution combination into the symbols arrays
          symbols1.push(shared.symbolAnswer[0]);
          symbols2.push(shared.symbolAnswer[1]);
          symbols3.push(shared.symbolAnswer[2]);
          symbols4.push(shared.symbolAnswer[3]);

          symbols5.push(shared.symbolAnswer[0]);
          symbols6.push(shared.symbolAnswer[1]);
          symbols7.push(shared.symbolAnswer[2]);
          symbols8.push(shared.symbolAnswer[3]);

          //and then shuffling it again
          symbols1 = shuffle(symbols1, true);
          symbols2 = shuffle(symbols2, true);
          symbols3 = shuffle(symbols3, true);
          symbols4 = shuffle(symbols4, true);

          symbols5 = shuffle(symbols5, true);
          symbols6 = shuffle(symbols6, true);
          symbols7 = shuffle(symbols7, true);
          symbols8 = shuffle(symbols8, true);

          //this is only one-way
          shared.gForHColors = advColorPassword;
          timeStarted = true;

          currentScene += 1; //the A button
          //currentScene += 3; // to C
          //currentScene += 5; // to E
          //currentScene += 7; //to G
        }
        if (
          touch.x >= (centerXPos * 4) / 3 - 37.5 &&
          touch.x < (centerXPos * 4) / 3 + 37.5 &&
          touch.y >= (centerYPos * 4) / 3 - 37.5 &&
          touch.y <= (centerYPos * 4) / 3 + 37.5
        ) {
          if (shared.firstSceneSwap) {
            shared.passwordAnswer = password;
            shared.colorPasswordAnswer = colorPassword;
            shared.symbolAnswer = symbolPass;
            //print(shared.symbolAnswer);
            shared.firstSceneSwap = false;
          }
          //inserting the ascii solution combination into the symbols arrays
          symbols1.push(shared.symbolAnswer[0]);
          symbols2.push(shared.symbolAnswer[1]);
          symbols3.push(shared.symbolAnswer[2]);
          symbols4.push(shared.symbolAnswer[3]);

          symbols5.push(shared.symbolAnswer[0]);
          symbols6.push(shared.symbolAnswer[1]);
          symbols7.push(shared.symbolAnswer[2]);
          symbols8.push(shared.symbolAnswer[3]);

          //and then shuffling it again
          symbols1 = shuffle(symbols1, true);
          symbols2 = shuffle(symbols2, true);
          symbols3 = shuffle(symbols3, true);
          symbols4 = shuffle(symbols4, true);

          symbols5 = shuffle(symbols5, true);
          symbols6 = shuffle(symbols6, true);
          symbols7 = shuffle(symbols7, true);
          symbols8 = shuffle(symbols8, true);

          //this is only one-way
          shared.hForGColors = advColorPassword;
          timeStarted = true;

          currentScene += 2; //the B button
          //currentScene += 4; //to D
          //currentScene += 6; // to F
          //currentScene += 8; //to H
        }
        break;
      case 2: //the A scene functionality
        if (
          touch.x >= centerXPos - hintWidth / 2 &&
          touch.x <= centerXPos + hintWidth / 2 &&
          touch.y >= (centerYPos * 2) / 3 - hintWidth / 2 &&
          touch.y <= (centerYPos * 2) / 3 + hintWidth / 2
        ) {
          hintAClicked = true;
          //print("The passsword is: " + shared.passwordAnswer);
          passwordArray = str(shared.passwordAnswer).split("");
        }

        break;
      case 3: //the B scene functionality
        //top row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index1 > 8) {
            index1 = 0;
          } else {
            index1++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index2 > 8) {
            index2 = 0;
          } else {
            index2++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index3 > 8) {
            index3 = 0;
          } else {
            index3++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index4 > 8) {
            index4 = 0;
          } else {
            index4++;
          }
        }

        //bottom row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index1 < 1) {
            index1 = 9;
          } else {
            index1--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index2 < 1) {
            index2 = 9;
          } else {
            index2--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index3 < 1) {
            index3 = 9;
          } else {
            index3--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index4 < 1) {
            index4 = 9;
          } else {
            index4--;
          }
        }

        // the submit button
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
          touch.y <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
        ) {
          shared.passwordAttempt =
            str(number1[index1]) +
            str(number2[index2]) +
            str(number3[index3]) +
            str(number4[index4]);
          // print("pressed submit");
          // print("submitted: " + passwordAttempt);
          checkAnswer();
        }
        break;

      case 4: // scene C functionality
        //top left
        if (
          touch.x >= centerXPos - margin - buttonWidth / 2 &&
          touch.x <= centerXPos - margin + buttonWidth / 2 &&
          touch.y >= centerYPos - margin - buttonWidth / 2 &&
          touch.y <= centerYPos - margin + buttonWidth / 2
        ) {
          if (index1 > 4) {
            index1 = 0;
          } else {
            index1++;
          }
        }

        //topright
        if (
          touch.x >= centerXPos + margin - buttonWidth / 2 &&
          touch.x <= centerXPos + margin + buttonWidth / 2 &&
          touch.y >= centerYPos - margin - buttonWidth / 2 &&
          touch.y <= centerYPos - margin + buttonWidth / 2
        ) {
          if (index2 > 4) {
            index2 = 0;
          } else {
            index2++;
          }
        }

        //bottomleft
        if (
          touch.x >= centerXPos - margin - buttonWidth / 2 &&
          touch.x <= centerXPos - margin + buttonWidth / 2 &&
          touch.y >= centerYPos + margin - buttonWidth / 2 &&
          touch.y <= centerYPos + margin + buttonWidth / 2
        ) {
          if (index3 > 4) {
            index3 = 0;
          } else {
            index3++;
          }
        }

        //bottomright
        if (
          touch.x >= centerXPos + margin - buttonWidth / 2 &&
          touch.x <= centerXPos + margin + buttonWidth / 2 &&
          touch.y >= centerYPos + margin - buttonWidth / 2 &&
          touch.y <= centerYPos + margin + buttonWidth / 2
        ) {
          if (index4 > 4) {
            index4 = 0;
          } else {
            index4++;
          }
        }

        // the submit button
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= (centerYPos * 5) / 3 - buttonHeight / 2 &&
          touch.y <= (centerYPos * 5) / 3 + buttonHeight / 2
        ) {
          shared.colorPasswordAttempt = [];
          shared.colorPasswordAttempt.push(color1[index1]);
          shared.colorPasswordAttempt.push(color2[index2]);
          shared.colorPasswordAttempt.push(color3[index3]);
          shared.colorPasswordAttempt.push(color4[index4]);
          checkAnswer();
        }

        break;
      case 5: // scene D functionality
        if (
          touch.x >= centerXPos - hintWidth / 2 &&
          touch.x <= centerXPos + hintWidth / 2 &&
          touch.y >= centerYPos - hintWidth / 2 &&
          touch.y <= centerYPos + hintWidth / 2
        ) {
          hintDClicked = true;
          dHintTime = 0;
        }

        break;

      case 6: //scene E functionality
        //hint button
        if (
          touch.x >= centerXPos - hintWidth / 2 &&
          touch.x <= centerXPos + hintWidth / 2 &&
          touch.y >= centerYPos / 2 - hintWidth / 2 &&
          touch.y <= centerYPos / 2 + hintWidth / 2
        ) {
          shared.fHintClicked = true;
        } else {
          shared.fHintClicked = false;
        }
        //reusing from B
        //top row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index5 > 8) {
            index5 = 0;
          } else {
            index5++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index6 > 8) {
            index6 = 0;
          } else {
            index6++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index7 > 8) {
            index7 = 0;
          } else {
            index7++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index8 > 8) {
            index8 = 0;
          } else {
            index8++;
          }
        }

        //bottom row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index5 < 1) {
            index5 = 9;
          } else {
            index5--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index6 < 1) {
            index6 = 9;
          } else {
            index6--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index7 < 1) {
            index7 = 9;
          } else {
            index7--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index8 < 1) {
            index8 = 9;
          } else {
            index8--;
          }
        }

        // the submit button
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
          touch.y <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
        ) {
          symbolPassAttempt =
            str(symbols5[index5]) +
            str(symbols6[index6]) +
            str(symbols7[index7]) +
            str(symbols8[index8]);
          // print("pressed submit");
          // print("submitted: " + symbolPassAttempt);
          checkAnswer();
        }
        break;

      case 7: //scene F functionality
        //hint button
        if (
          touch.x >= centerXPos - hintWidth / 2 &&
          touch.x <= centerXPos + hintWidth / 2 &&
          touch.y >= centerYPos / 2 - hintWidth / 2 &&
          touch.y <= centerYPos / 2 + hintWidth / 2
        ) {
          shared.eHintClicked = true;
        } else {
          shared.eHintClicked = false;
        }
        //reusing from B
        //top row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index1 > 8) {
            index1 = 0;
          } else {
            index1++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index2 > 8) {
            index2 = 0;
          } else {
            index2++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index3 > 8) {
            index3 = 0;
          } else {
            index3++;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos - textSizeNum * 4 - 20 &&
          touch.y <= centerYPos - textSizeNum * 4 + 20
        ) {
          if (index4 > 8) {
            index4 = 0;
          } else {
            index4++;
          }
        }

        //bottom row of triangles
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 5 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 5 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index1 < 1) {
            index1 = 9;
          } else {
            index1--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 10 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 10 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index2 < 1) {
            index2 = 9;
          } else {
            index2--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 15 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 15 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index3 < 1) {
            index3 = 9;
          } else {
            index3--;
          }
        }
        if (
          touch.x >= centerXPos - textSizeNum * 12 + 20 * textSizeNum - 20 &&
          touch.x <= centerXPos - textSizeNum * 12 + 20 * textSizeNum + 20 &&
          touch.y >= centerYPos + textSizeNum * 4 - 20 &&
          touch.y <= centerYPos + textSizeNum * 4 + 20
        ) {
          if (index4 < 1) {
            index4 = 9;
          } else {
            index4--;
          }
        }

        // the submit button
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= (centerYPos * 3) / 2 + 40 - buttonHeight / 2 &&
          touch.y <= (centerYPos * 3) / 2 + 40 + buttonHeight / 2
        ) {
          symbolPassAttempt =
            str(symbols1[index1]) +
            str(symbols2[index2]) +
            str(symbols3[index3]) +
            str(symbols4[index4]);
          // print("pressed submit");
          // print("submitted: " + symbolPassAttempt);
          checkAnswer();
        }
        break;

      case 8: // G functionality
        //topleft
        if (
          touch.x >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on red");
          colorRed = "red";
          gPassAttempt.push("red");
        }

        //topMid
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on yellow");
          colorYellow = "yellow";
          gPassAttempt.push("yellow");
        }

        //topright
        if (
          touch.x >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on green");
          colorGreen = "green";
          gPassAttempt.push("green");
        }

        //bottomleft
        if (
          touch.x >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on blue");
          colorBlue = "blue";
          gPassAttempt.push("blue");
        }

        //bottomMid
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on black");
          colorBlack = "black";
          gPassAttempt.push("black");
        }
        //bottomright
        if (
          touch.x >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on white");
          colorWhite = "white";
          gPassAttempt.push("white");
        }

        //instructions button
        if (
          touch.x >= centerXPos - buttonHeight / 2 &&
          touch.x <= centerXPos + buttonHeight / 2 &&
          touch.y >= centerYPos / 2 - buttonHeight / 2 &&
          touch.y <= centerYPos / 2 + buttonHeight / 2 &&
          !hintPlaying
        ) {
          currentColor = shared.gForHColors[i];
          hintPlaying = true;
          i = -2;
          gPassAttempt = ["_"];
          gHintTime = 0;
        }
        break;
      case 9: //H functionality
        //topleft
        if (
          touch.x >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on red");
          colorRed = "red";
          hPassAttempt.push("red");
        }

        //topMid
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on yellow");
          colorYellow = "yellow";
          hPassAttempt.push("yellow");
        }

        //topright
        if (
          touch.x >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos - buttonWidth / 2 &&
          touch.y <= centerYPos + buttonWidth / 2
        ) {
          //print("clicked on green");
          colorGreen = "green";
          hPassAttempt.push("green");
        }

        //bottomleft
        if (
          touch.x >= centerXPos - (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos - (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on blue");
          colorBlue = "blue";
          hPassAttempt.push("blue");
        }

        //bottomMid
        if (
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on black");
          colorBlack = "black";
          hPassAttempt.push("black");
        }
        //bottomright
        if (
          touch.x >= centerXPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.x <= centerXPos + (margin * 3) / 2 + buttonWidth / 2 &&
          touch.y >= centerYPos + (margin * 3) / 2 - buttonWidth / 2 &&
          touch.y <= centerYPos + (margin * 3) / 2 + buttonWidth / 2
        ) {
          //print("clicked on white");
          colorWhite = "white";
          hPassAttempt.push("white");
        }

        //intructions button
        if (
          touch.x >= centerXPos - buttonHeight / 2 &&
          touch.x <= centerXPos + buttonHeight / 2 &&
          touch.y >= centerYPos / 2 - buttonHeight / 2 &&
          touch.y <= centerYPos / 2 + buttonHeight / 2 &&
          !hintPlaying
        ) {
          currentColor = shared.hForGColors[i];
          hintPlaying = true;
          i = -2;
          hPassAttempt = ["_"];
          hHintTime = 0;
        }
        break;
      default:
        clickCounter++;
        //restart
        if (
          resetButtonVisible &&
          touch.x >= centerXPos - buttonWidth / 2 &&
          touch.x <= centerXPos + buttonWidth / 2 &&
          touch.y >= centerYPos + textSizeNum * 7 - buttonHeight / 2 &&
          touch.y <= centerYPos + textSizeNum * 7 + buttonHeight / 2
        ) {
          //partyDisconnect();
          shared = partyLoadShared("globals", {
            firstSceneSwap: true,
            aTime: 0,
            bTime: 0,
            nextButtonVisible: false,
            passwordAnswer: 0,
            passwordAttempt: 1,
            colorPasswordAnswer: [],
            colorPasswordAttempt: ["_"],
            symbolAnswer: "",
            eHintClicked: false,
            fHintClicked: false,
            symbolsECorrect: false,
            symbolsFCorrect: false,
            gSolved: false,
            hSolved: false,
          });
          //reseting vars
          resetButtonVisible = false;
          timeStarted = false;
          timeTracked = 0;
          clickCounter = -1;

          hintAClicked = false;
          hintDClicked = false;

          symbolPassAttempt = "_";
          symbolsComplete = false;
          symbolsE = false;
          symbolsF = false;

          index5 = 0;
          index6 = 0;
          index7 = 0;
          index8 = 0;

          randomSeed(Date.now()); //attempt to reseed the randomly generated solutions in order to reroll new solutions
          //randomizing up new solutions
          //set up puzzle solutions
          password = ceil(random(1000, 9999)); //ceil used for the password number to be a randomized whole number

          colorPassword = [];
          //randomizing a color combination
          for (i = 0; i < 4; i++) {
            shuffle(colorPassBank, true);
            colorPassword.push(colorPassBank[0]);
          }

          symbols1 = [];
          symbols2 = [];
          symbols3 = [];
          symbols4 = [];
          symbols5 = [];
          symbols6 = [];
          symbols7 = [];
          symbols8 = [];
          //randomizing an ascii combination
          symbolPass = random(symbolPasswordBank);
          for (i = 0; i < 3; i++) {
            symbolPass += random(symbolPasswordBank);
          }
          //print(symbolPass);
          for (i = 0; i < symbolBank.length; i++) {
            //tossing in the whole amount into each array
            symbols1.push(symbolBank[i]);
            symbols2.push(symbolBank[i]);
            symbols3.push(symbolBank[i]);
            symbols4.push(symbolBank[i]);
            symbols5.push(symbolBank[i]);
            symbols6.push(symbolBank[i]);
            symbols7.push(symbolBank[i]);
            symbols8.push(symbolBank[i]);
          }
          //shuffing each one up (without making a duplicate array)
          symbols1 = shuffle(symbols1, true);
          symbols2 = shuffle(symbols2, true);
          symbols3 = shuffle(symbols3, true);
          symbols4 = shuffle(symbols4, true);
          symbols5 = shuffle(symbols5, true);
          symbols6 = shuffle(symbols6, true);
          symbols7 = shuffle(symbols7, true);
          symbols8 = shuffle(symbols8, true);

          //popping off a random ascii character from each array until each reaches a length of 9 (to set up for the ascii puzzle displays)
          for (i = 0; i < 15; i++) {
            symbols1.splice(ceil(random(0, symbols1.length - 1)), 1);
            symbols2.splice(ceil(random(0, symbols2.length - 1)), 1);
            symbols3.splice(ceil(random(0, symbols3.length - 1)), 1);
            symbols4.splice(ceil(random(0, symbols4.length - 1)), 1);
            symbols5.splice(ceil(random(0, symbols5.length - 1)), 1);
            symbols6.splice(ceil(random(0, symbols6.length - 1)), 1);
            symbols7.splice(ceil(random(0, symbols7.length - 1)), 1);
            symbols8.splice(ceil(random(0, symbols8.length - 1)), 1);
          }

          advColorPassword = [];
          //randomizing a color combination for advacned color puzzle
          for (i = 0; i < 6; i++) {
            shuffle(colorPassBank, true);
            advColorPassword.push(colorPassBank[0]);
          }

          //reset the scene all the way back to menu
          currentScene = 1;
          //input.show();
          break;
        }
    }
  }
}
