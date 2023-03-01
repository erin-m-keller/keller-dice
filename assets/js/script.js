/**
 * @init
 * runs on page load
 */
function init() {
    let scoreCheck = JSON.parse(localStorage.getItem("DiceScores"));
    if (scoreCheck) {
        $(".scores-wrapper").css("display", "block");
        loadScoresFromStorage();
    }
}
// runs on page load
init();
/**
 * @clearScores
 * Clears the scores from local storage and hides the table
 */
function clearScores() {
    localStorage.removeItem("DiceScores");
    $(".search-history").empty();    
    $(".tbl-body").empty();
    $(".winning-player").empty();
    $(".scores-wrapper").css("display", "none");
}
/**
 * @randomDie
 * Generates a random die from 1-6 for both player
 * one and player two
 */
function randomDie(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * @changeDice
 * Changes the displayed images on the page dependent
 * on the score for player one and two
 */
function changeDice(playerOne,playerTwo) {
    $(".player-one").attr("src","./assets/images/die-" + playerOne + ".png");
    $(".player-two").attr("src","./assets/images/die-" + playerTwo + ".png");
    $(".player-one").attr("alt", "Die showing " + playerOne);
    $(".player-two").attr("alt", "Die showing " + playerTwo);
}
/**
 * @loadScoresFromStorage
 * Pulls the score data from local storage to generate the 
 * table rows of the table
 */
function loadScoresFromStorage() {
    let scoresStorage = JSON.parse(localStorage.getItem("DiceScores"));
    $(".tbl-body").empty();
    $(".winning-player").empty();
    for (let i = 0; i < scoresStorage.length; i++) {
        let playerOne = scoresStorage[i].playerOne,
            playerTwo = scoresStorage[i].playerTwo;
        if (playerOne > playerTwo) {
            $(".winning-player").text("Player One Wins");
            $(".tbl-body").append("<tr><th>" + (i + 1) + "</th><td>(" + playerOne + ") Win</td><td>(" + playerTwo + ") Loss</td></tr>");
        } else if (playerOne < playerTwo) {
            $(".winning-player").text("Player Two Wins");
            $(".tbl-body").append("<tr><th>" + (i + 1) + "</th><td>(" + playerOne + ") Loss</td><td>(" + playerTwo + ") Win</td></tr>");
        } else {
            $(".winning-player").text("Draw");
            $(".tbl-body").append("<tr><th>" + (i + 1) + "</th><td>(" + playerOne + ") Draw</td><td>(" + playerTwo + ") Draw</td></tr>");
        }
    }
}
/**
 * @addScoresToLocalStorage
 * Adds the current scores to local storage and
 * then calls @loadScoresFromStorage function
 */
function addScoresToLocalStorage(playerOne,playerTwo) {
    let scoresStorage = JSON.parse(localStorage.getItem("DiceScores")),
        scoresArr = [],
        scoreObj = {
            playerOne: playerOne,
            playerTwo: playerTwo
        };
    if (scoresStorage) {
        scoresStorage.push(scoreObj);
        localStorage.setItem("DiceScores",JSON.stringify(scoresStorage));
    } else {
        scoresArr.push(scoreObj);
        localStorage.setItem("DiceScores",JSON.stringify(scoresArr));
    }
    $(".scores-wrapper").css("display", "block");
    loadScoresFromStorage();
}
/**
 * @rollTheDice
 * Gets the score for player one and two then
 * calls @changeDice and @addScoresToLocalStorage
 */
function rollTheDice() {
    let playerOne = randomDie(1,6),
        playerTwo = randomDie(1,6);
    changeDice(playerOne,playerTwo);
    addScoresToLocalStorage(playerOne,playerTwo);
}
/**
 * event listener for the form, prevents
 * default behavior and calls @rollTheDice
 */
$("#dieroll-form").submit(function(event) {
    event.preventDefault();
    rollTheDice();
});