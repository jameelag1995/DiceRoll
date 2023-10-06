// audio
let switchAudio = new Audio("./audio/switchplayer.mp3");
let diceRollAudio = new Audio("./audio/rolling-dice.mp3");
let winAudio = new Audio("./audio/winalert.mp3");
let popupAudio = new Audio("./audio/popupalert.mp3");
let playAudio = new Audio("./audio/play.mp3");
// Handle Target Score
let targetScore = 0;

// Select start screen html elements
const startButton = document.querySelector(".start-button");
const newGameButton = document.querySelector(".new-game-btn");
const startScreen = document.querySelector("#start-screen");
const instructions = document.querySelector(".top-container");
const startMsg = document.querySelector("#start-msg");

// initiate game variables
let playerTurn = 1;
let player1TotalScore = 0;
let player1CurrentScore = 0;
let player1TotalWins = 0;
let player2TotalScore = 0;
let player2CurrentScore = 0;
let player2TotalWins = 0;
let gameOn = true;

// Select in-Game elements
// player 1
const holdButton = document.querySelector(".hold-btn");
const player1 = document.querySelector("#left-player1");
const player1CurrentScoreDisp = document.querySelector(
    "#player1-current-score"
);
const player1TotalScoreDisp = document.querySelector("#player1-score");
const player1EndMsg = document.querySelector("#player1-end-msg");
const player1TotalWinsDisp = document.querySelector("#player1-total-wins");
const totalWinsP1 = document.querySelector(".total-wins-p1");

// player 2
const player2 = document.querySelector("#right-player2");
const player2CurrentScoreDisp = document.querySelector(
    "#player2-current-score"
);
const player2TotalScoreDisp = document.querySelector("#player2-score");
const player2EndMsg = document.querySelector("#player2-end-msg");
const player2TotalWinsDisp = document.querySelector("#player2-total-wins");
const totalWinsP2 = document.querySelector(".total-wins-p2");

// target score input
const targetScoreInput = document.querySelector("#target-score-input");
// Dice
// selected dice elements and initiate dice variables
const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");
let dice1Value = 1;
let dice2Value = 1;
let diceSum = 0;
const rollDiceButton = document.querySelector(".roll-dice-btn");

// two six popup elements
const twoSixPopUp = document.querySelector(".two-six-popup");
const twoSixPopUpMsg = document.querySelector("#popup-msg");

// focus on input target
targetScoreInput.focus();

/* -------------------------------------------------------------------------- */
/*                                   Events                                   */
/* -------------------------------------------------------------------------- */
// start button events
startButton.addEventListener("click", () => {
    targetScore = parseInt(targetScoreInput.value);
    if (targetScore => 2) {
        playAudio.play();
        startScreen.style.display = "none";
        totalWinsP1.style.visibility = "visible";
        totalWinsP2.style.visibility = "visible";
    } else {
        startMsg.innerText = `Please select a target score, Value must be larger than 2`;
    }
});
// new game button functionality
newGameButton.addEventListener("click", () => {
    playAudio.play();
    if (startMsg.innerText.length > 27) {
        const msgArr = startMsg.innerText.split(
            ", Value must be larger than 2"
        );
        startMsg.innerText = msgArr.join("");
    }
    reset();
    startScreen.style.display = "flex";
    instructions.style.visibility = "hidden";
});
// hold button functionality
holdButton.addEventListener("click", () => {
    if (gameOn === false) {
        return;
    }
    switchAudio.play();
    playTurn();
    updateScores();
    checkAndAnnounceWinner();
});
// roll button functionality
rollDiceButton.addEventListener("click", () => {
    if (gameOn === false) {
        return;
    }
    diceRollAudio.play();
    roll();
});

// two six popup functionality - click on the popup to continue playing
twoSixPopUp.addEventListener("click", () => {
    twoSixPopUp.style.visibility = "hidden";
    gameOn = true;
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
// reset the game variables and html elements
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
    player1.classList.remove("player-win");
    player1EndMsg.style.visibility = "hidden";
    player2.classList.remove("player-win");
    player2EndMsg.style.visibility = "hidden";
    player1EndMsg.innerText = "";
    player2EndMsg.innerText = "";
}

// function that switches turns
function playTurn() {
    if (playerTurn === 2) {
        player1.style.background = "#189b9b";
        player2.style.background = "#127a7a";
        playerTurn = 1;
    } else {
        player1.style.background = "#127a7a";
        player2.style.background = "#189b9b";
        playerTurn = 2;
    }
}

// function that updates scores and display
function updateScores() {
    player1TotalScore += player1CurrentScore;
    player2TotalScore += player2CurrentScore;
    player1TotalScoreDisp.innerText = player1TotalScore;
    player2TotalScoreDisp.innerText = player2TotalScore;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    player1CurrentScoreDisp.innerText = player1CurrentScore;
    player2CurrentScoreDisp.innerText = player2CurrentScore;
}

// function that check and announce the winner
function checkAndAnnounceWinner() {
    // if player1 hit the target or player2 passe the target announce player1 as winner
    if (player1TotalScore === targetScore || player2TotalScore > targetScore) {
        winAudio.play();
        player1.classList.toggle("player-win");
        player1EndMsg.style.visibility = "visible";
        player1EndMsg.innerText = "You Won!";
        player1TotalWins += 1;
        player1TotalWinsDisp.innerText = player1TotalWins;
        player2EndMsg.style.visibility = "visible";
        player2EndMsg.innerText = "Passed the target score";
        gameOn = false;
    }
    if (player2TotalScore === targetScore || player1TotalScore > targetScore) {
        winAudio.play();
        player2.classList.toggle("player-win");
        player2EndMsg.style.visibility = "visible";
        player2EndMsg.innerText = "You Won!";
        player2TotalWins += 1;
        player2TotalWinsDisp.innerText = player2TotalWins;
        player1EndMsg.style.visibility = "visible";
        player1EndMsg.innerText = "Passed the target score";
        gameOn = false;
    }
}

// Dice Functionality
// function that generates random number between 1 & 6
function generateRandomDiceNumber() {
    return Math.ceil(Math.random() * 6);
}

// Roll the dice Function
function roll() {
    // generate random number for the first dice
    dice1Value = generateRandomDiceNumber();
    // change the img of the dice according to the generated dice1Value
    dice1.style.backgroundImage = `url(../Img/dice-${dice1Value}.png)`;
    dice2Value = generateRandomDiceNumber();
    dice2.style.backgroundImage = `url(../Img/dice-${dice2Value}.png)`;
    diceSum = dice1Value + dice2Value;
    // check if we got 6,6 (sum is 12)
    if (diceSum === 12) {
        if (playerTurn === 1) {
            // change player1 current score to 0
            player1CurrentScore = 0;
            twoSixPopUpMsg.innerText =
                "Player 1, You've just lost all your round's points.";
        } else {
            player2CurrentScore = 0;
            twoSixPopUpMsg.innerText =
                "Player 2, You've just lost all your round's points.";
        }
        // switch players
        holdButton.click();
        // show popup
        popupAudio.play();
        twoSixPopUp.style.visibility = "visible";
        gameOn = false;
    } else {
        // if sum isn't 12 then add dice sum to player's current score
        if (playerTurn === 1) {
            player1CurrentScore += diceSum;
        } else {
            player2CurrentScore += diceSum;
        }
    }
    // update current score display
    player1CurrentScoreDisp.innerText = player1CurrentScore;
    player2CurrentScoreDisp.innerText = player2CurrentScore;
}
