// Build a BlackJack Game

let firstCard = null
let secondCard = null
let cards = [firstCard, secondCard]
let sum = firstCard + secondCard
let hasBlackjack = false
let isAlive = true
let stand = false
let scores = JSON.parse(localStorage.getItem("scores")) || []


function renderGame() {
    let cardsEl = document.getElementById("cards-el")
    cardsEl.innerHTML = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }


    let sumEl = document.getElementById("sum-el")
    sumEl.textContent = "Sum: " + sum

    // determines the game status based on the sum value and updates the message accordingly
    let messageEl = document.getElementById("message-el")

    if (sum < 21 && !stand) {
        messageEl.innerHTML = "Do you want to draw a new card? 🙂"
    } else if (stand) {
        messageEl.innerHTML = "You've stood at " + sum + ". Thanks for playing! 😊"
        renderScores(sum)
    }
    else if (sum == 21) {
        messageEl.innerHTML = "Wohoo! You've got Blackjack! 🥳"
        hasBlackjack = true
        renderScores(sum)
    } else {
        messageEl.innerHTML = "You're out of the game! 😭"
        isAlive = false
        renderScores(sum)
        document.getElementById("stand").disabled = true;
        document.getElementById("new-card").disabled = true;
        document.getElementById("stand").style.cursor = 'not-allowed';
        document.getElementById("new-card").style.cursor = 'not-allowed';
    }

    if (localStorage.getItem("scores")) {
        let scoresEl = document.getElementById("scores-el")
        scoresEl.textContent = "Scores: " + scores

        let scoresAvgEl = document.getElementById("scores-avg")
        scoresAvgEl.textContent = "Scores average: " + Math.round(scores.reduce((a, b) => a + b, 0) / scores.length, 0)

        let maxEl = document.getElementById("max")
        maxEl.textContent = "Max score: " + Math.max(...scores)

        let minEl = document.getElementById("min")  
        minEl.textContent = "Min score: " + Math.min(...scores)
    }

}

function newCard() {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
}

function startGame() {
    let user = prompt("Please enter your name");
    let playerEl = document.getElementById("player-el")
    playerEl.textContent = "Player: " + user
    isAlive = true;
    stand = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new-card").disabled = false;
    document.getElementById("stand").style.cursor = 'pointer';
    document.getElementById("new-card").style.cursor = 'pointer';
    firstCard = getRandomCard();
    secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 9) {
        return 10;
    } else {
        return randomNumber;
    }
}

function standing() {
    stand = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new-card").disabled = true;
    document.getElementById("stand").style.cursor = 'not-allowed';
    document.getElementById("new-card").style.cursor = 'not-allowed';

    renderGame();
}

function renderScores(number) {
    let scoresEl = document.getElementById("scores-el")
    if (scores.length == 4) {
        scores.shift();
    }
    scores.push(number)
    localStorage.setItem("scores", JSON.stringify(scores))

    scoresEl.textContent = "Scores: " + scores

    let scoresAvgEl = document.getElementById("scores-avg")
    scoresAvgEl.textContent = "Scores average: " + Math.round(scores.reduce((a, b) => a + b, 0) / scores.length, 0)

    let maxEl = document.getElementById("max")
    maxEl.textContent = "Max score: " + Math.max(...scores)

    let minEl = document.getElementById("min")
    minEl.textContent = "Min score: " + Math.min(...scores)
}
