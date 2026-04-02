// Decleration Section 
let choicesArr = ['rock', 'paper', 'scissors'];
let counter = 0;
let winCounter = 0;
let loseCounter = 0;
let drawCounter = 0;
let matches;
let tbody = document.getElementsByTagName('tbody')[0];
let resetButton = document.getElementById("reset");
let wCounter = document.getElementById('win-counter');
let lCounter = document.getElementById('lose-counter');
let dCounter = document.getElementById('draw-counter');

// Functions Section
function showWinLoseDraw() {
    wCounter.innerHTML = winCounter;
    lCounter.innerHTML = loseCounter;
    dCounter.innerHTML = drawCounter;
}

function checkWinner(userChoice, compChoice) {
    let winArr = [['paper', 'rock'], ['rock', 'scissors'], ['scissors', 'paper']];
    for (let winCase in winArr) {
        if (userChoice === winArr[winCase][0] && compChoice === winArr[winCase][1]) {
            winCounter = localStorage.getItem('winCounter') || null;
            if (winCounter === null) localStorage.setItem("winCounter", 0);
            localStorage.setItem("winCounter", ++winCounter);
            showWinLoseDraw();
            return 'win';
        }
        if (userChoice === compChoice) {
            drawCounter = localStorage.getItem('drawCounter') || null;
            if (drawCounter === null) localStorage.setItem("drawCounter", 0);
            localStorage.setItem("drawCounter", ++drawCounter);
            showWinLoseDraw();
            return 'draw';
        }
    }
    loseCounter = localStorage.getItem('loseCounter') || null;
    if (loseCounter === null) localStorage.setItem("loseCounter", 0);
    localStorage.setItem("loseCounter", ++loseCounter);
    showWinLoseDraw();
    return 'lose';
}

function play(userChoice, compChoice, result) {
    counter = localStorage.getItem('counter') || null;
    matches = JSON.parse(localStorage.getItem('matches')) || {};
    if (counter === null) localStorage.setItem('counter', 0);
    if (!matches[+counter + 1]) matches[+counter + 1] = [+counter + 1, userChoice, compChoice, result];
    localStorage.setItem("matches", JSON.stringify(matches));
    localStorage.setItem('counter', ++counter);
}

function choicesAnimation(userChoice, compChoice) {
    let userImg = document.getElementById('user-img');
    let computerI = document.getElementById('computer-i');
    let shuffleIcon = document.getElementById('shuffle');
    if (shuffleIcon) shuffleIcon.style.display = "none";
    let img = document.getElementsByTagName('img')[0];
    if (img) img.style.display = "none";
    let icons = [
        { icon: "fa-hand-back-fist", class: "rock" },
        { icon: "fa-hand", class: "paper" },
        { icon: "fa-hand-scissors", class: "scissors" }];
    icons.forEach(item => {
        let i = document.createElement('i');
        i.classList.add('fa-solid', item.icon, item.class);
        i.style.cssText = "margin-top: 30px; font-size: 30px;";
        if (i.classList.contains(compChoice)) {
            computerI.textContent = '';
            computerI.appendChild(i);
        }
        if (i.classList.contains(userChoice)) {
            userImg.textContent = '';
            let clone = i.cloneNode(false);
            userImg.appendChild(clone);
        };
    });
}

function showResults() {
    let history = JSON.parse(localStorage.getItem('matches'));

    if (history) {
        for (let key in history) {
            let resultIndex = history[key].length - 1;

            let tr = document.createElement('tr');
            let matchNumber = document.createElement('td');
            let userChoice = document.createElement('td');
            let computerChoice = document.createElement('td');
            let result = document.createElement('td');

            matchNumber.textContent = key;
            userChoice.textContent = history[key][1];
            computerChoice.textContent = history[key][2];
            result.textContent = history[key][resultIndex];
            tr.appendChild(matchNumber);
            tr.appendChild(userChoice);
            tr.appendChild(computerChoice);
            tr.appendChild(result);
            tbody.appendChild(tr);
        }
    }
}

// Events Section  
window.onload = showResults;

resetButton.onclick = () => {
    wCounter.innerHTML = 0;
    lCounter.innerHTML = 0;
    dCounter.innerHTML = 0;
    localStorage.clear();
    tbody.innerHTML = '';
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('choice')) {
        if (e.target.classList.contains('rock')) {
            let computerChoice = choicesArr[Math.floor(Math.random() * 3)];
            play('rock', computerChoice, checkWinner('rock', computerChoice));
            choicesAnimation('rock', computerChoice);
            tbody.textContent = '';
            showResults();
        } else if (e.target.classList.contains('paper')) {
            let computerChoice = choicesArr[Math.floor(Math.random() * 3)];
            play('paper', computerChoice, checkWinner('paper', computerChoice));
            choicesAnimation('paper', computerChoice);
            tbody.textContent = '';
            showResults();
        } else {
            let computerChoice = choicesArr[Math.floor(Math.random() * 3)];
            play('scissors', computerChoice, checkWinner('scissors', computerChoice));
            choicesAnimation('scissors', computerChoice);
            tbody.textContent = '';
            showResults();
        }
    }
});