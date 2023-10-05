// Handle Target Score

let targetScore = 0;

// Start Button and New Game Button Functionality
const startButton = document.querySelector(".start-button");
const newGameButton = document.querySelector(".new-game-btn");
const startScreen = document.querySelector("#start-screen");
const instructions = document.querySelector(".top-container");
const startMsg = document.querySelector("#start-msg");
startButton.addEventListener("click", () => {
    targetScore = parseInt(document.querySelector("#target-score-input").value);
    if (targetScore > 2) {
        startScreen.style.display = "none";
    } else {
        startMsg.innerText += `, Value must be larger than 2`;
    }
});
newGameButton.addEventListener("click", () => {
    if (startMsg.innerText.length > 27) {
        const msgArr = startMsg.innerText.split(
            ", Value must be larger than 2"
        );
        startMsg.innerText = msgArr.join("");
    }
    gameOn = true;
    reset();
    startScreen.style.display = "flex";
    instructions.style.visibility = "hidden";
});

function reset() {
    playerTurn = 1;
    player1TotalScore = 0;
    player1CurrentScore = 0;
    player2TotalScore = 0;
    player2CurrentScore = 0;
    gameOn = true;
    player1TotalScoreDisp.innerText = player1TotalScore;
    player2TotalScoreDisp.innerText = player2TotalScore;
    player1CurrentScoreDisp.innerText = player1CurrentScore;
    player2CurrentScoreDisp.innerText = player2CurrentScore;
    player1.classList.remove("player1-win");
    player1EndMsg.style.visibility = "hidden";
    player2.classList.remove("player2-win");
    player2EndMsg.style.visibility = "hidden";
}

// in-Game elements
const holdButton = document.querySelector(".hold-btn");
const player1 = document.querySelector("#left-player1");
const player1CurrentScoreDisp = document.querySelector(
    "#player1-current-score"
);
const player1TotalScoreDisp = document.querySelector("#player1-score");
const player2 = document.querySelector("#right-player2");
const player2CurrentScoreDisp = document.querySelector(
    "#player2-current-score"
);
const player2TotalScoreDisp = document.querySelector("#player2-score");
const player1EndMsg = document.querySelector("#player1-end-msg");
const player2EndMsg = document.querySelector("#player2-end-msg");

let playerTurn = 1;
let player1TotalScore = 0;
let player1CurrentScore = 0;
let player2TotalScore = 0;
let player2CurrentScore = 0;
let gameOn = true;

holdButton.addEventListener("click", () => {
    if (gameOn === false) {
        return;
    }
    if (playerTurn === 2) {
        player1.style.background = "#189b9b";
        player2.style.background = "#127a7a";
        playerTurn = 1;
    } else {
        player1.style.background = "#127a7a";
        player2.style.background = "#189b9b";
        playerTurn = 2;
    }
    player1TotalScore += player1CurrentScore;
    player2TotalScore += player2CurrentScore;
    player1TotalScoreDisp.innerText = player1TotalScore;
    player2TotalScoreDisp.innerText = player2TotalScore;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    player1CurrentScoreDisp.innerText = player1CurrentScore;
    player2CurrentScoreDisp.innerText = player2CurrentScore;
    if (player1TotalScore === targetScore || player2TotalScore > targetScore) {
        player1.classList.add("player1-win");
        player1EndMsg.style.visibility = "visible";
        gameOn = false;
    }
    if (player2TotalScore === targetScore || player1TotalScore > targetScore) {
        player2.classList.add("player2-win");
        player2EndMsg.style.visibility = "visible";
        gameOn = false;
    }
});

// Dice Functionality
const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");

let dice1Value = 1;
let dice2Value = 1;
let diceSum = 0;
// function that generates random number between 1 & 6
function generateRandomDiceNumber() {
    return Math.ceil(Math.random() * 6);
}
// when clicking roll dice button generate two random numbers change images and save the sum into diceSum
const rollDiceButton = document.querySelector(".roll-dice-btn");
rollDiceButton.addEventListener("click", () => {
    if (gameOn === false) {
        return;
    }
    dice1Value = generateRandomDiceNumber();
    dice1.style.backgroundImage = `url(../Img/dice-${dice1Value}.png)`;
    dice2Value = generateRandomDiceNumber();
    dice2.style.backgroundImage = `url(../Img/dice-${dice2Value}.png)`;
    diceSum = dice1Value + dice2Value;
    if (diceSum === 12) {
        if (playerTurn === 1) {
            player1CurrentScore = 0;
        } else {
            player2CurrentScore = 0;
        }
        holdButton.click();
        // show popup
    } else {
        if (playerTurn === 1) {
            player1CurrentScore += diceSum;
        } else {
            player2CurrentScore += diceSum;
        }
    }
    player1CurrentScoreDisp.innerText = player1CurrentScore;
    player2CurrentScoreDisp.innerText = player2CurrentScore;
});
