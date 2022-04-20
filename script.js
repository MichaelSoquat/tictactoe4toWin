// variables

let playerActive;
let playerNotActive;
let player1;
let player2;
let playerActiveImg;
let player1Caskets = [];
let player2Caskets = [];
let id;
let gameWon = false;
let playerWon;
let filteredNumbers = [];
let endOfGame = false;
let countPlayer1 = 0;
let countPlayer2 = 0;
const rows = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35]
];
const columns = [
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35]
];
const diagonal = [
    [3, 8, 13, 18],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25, 30],
    [11, 16, 21, 26, 31],
    [17, 22, 27, 32],
    [2, 9, 16, 23],
    [1, 8, 15, 22, 29],
    [0, 7, 14, 21, 28, 35],
    [6, 13, 20, 27, 34],
    [12, 19, 26, 33]
];

// onload

function render() {
    getCount();
    setPlayerActiveAtStart();
    underlineActivePlayer();
}

function getCount() {
    count1 = sessionStorage.getItem('player1');
    count2 = sessionStorage.getItem('player2');
    if (count1 && count2) {
        countPlayer1 = JSON.parse(count1)
        countPlayer2 = JSON.parse(count2)
    }
}
// first Player

function setPlayerActiveAtStart() {
    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');
    playerActive = player1;
    playerNotActive = player2;
    playerActiveImg = document.getElementById('player1Img').src;
};

// change the active player after set icon

function changeActivePlayer() {
    if (playerActive == player1) {
        pushToPlayer1();
        checkWinGame(player1Caskets);
        playerActive = player2;
        playerNotActive = player1;
        playerActiveImg = document.getElementById('player2Img').src;
    } else {
        pushToPlayer2();
        checkWinGame(player2Caskets);
        playerActive = player1;
        playerNotActive = player2;
        playerActiveImg = document.getElementById('player1Img').src;
    }
    underlineActivePlayer();
};

// always underline the active player

function underlineActivePlayer() {
    if (!gameWon) {
        playerActive.classList.add('underlined');
        playerNotActive.classList.remove('underlined');
    }
};
// set icon but only if its possible, please check changeActivePlayer - function!
function setIcon(id) {
    console.log(id)
    this.id = id;
    if (checkIfsetIconPossible()) {
        let currentCasket = document.getElementById(id);
        currentCasket.innerHTML += `<img class="set-icon-img" src="${playerActiveImg}">`;
        changeActivePlayer();
    }
}

// filled fields of player 1 and sorted!

function pushToPlayer1() {
    console.log(player1Caskets);
    let number = parseInt(this.id);
    player1Caskets.push(number);
    player1Caskets.sort((a, b) => {
        return a - b
    })

}

// filled fields of player 2 and sorted!

function pushToPlayer2() {
    let number = parseInt(this.id);
    player2Caskets.push(number)
    player2Caskets.sort((a, b) => {
        return a - b
    })
}

// check if a player has won the game, always checks rows,columns and diagonals

function checkWinGame(player) {
    checkRows(player);
    checkColumns(player);
    checkDiagonal(player);
}

function checkRows(player) {
    for (let i = 0; i < rows.length; i++) {
        filteredNumbers = player.filter((number) => {
            return rows[i].includes(number)
        })
        if (filteredNumbers.length >= 4 && (filteredNumbers[3] - filteredNumbers[0] <= 3)) {
            playerWon = playerActive;
            console.log('game won from', playerWon)
            gameWon = true;
            animateWinnerIcons();
        }
    }
}

function checkColumns(player) {
    for (let i = 0; i < columns.length; i++) {
        filteredNumbers = player.filter((number) => {
            return columns[i].includes(number)
        })
        if (filteredNumbers.length >= 4 && (filteredNumbers[3] - filteredNumbers[0] <= 18)) {
            playerWon = playerActive;
            console.log('game won from', playerWon);
            gameWon = true;
            animateWinnerIcons();
        }

    }
}

function checkDiagonal(player) {
    for (let i = 0; i < diagonal.length; i++) {
        filteredNumbers = player.filter((number) => {
            return diagonal[i].includes(number)
        })
        if (filteredNumbers.length >= 4 && (filteredNumbers[3] - filteredNumbers[0] <= 15)) {
            playerWon = playerActive;
            console.log('game won from', playerWon);
            gameWon = true;
            animateWinnerIcons();
        }

    }
}

function animateWinnerIcons() {

    document.getElementById(filteredNumbers[0]).classList.add('winner-icons');
    document.getElementById(filteredNumbers[1]).classList.add('winner-icons');
    document.getElementById(filteredNumbers[2]).classList.add('winner-icons');
    document.getElementById(filteredNumbers[3]).classList.add('winner-icons');
    playerWon.classList.add('winner')
    showEndscreen();

}

// Set Icon is only possible in lowest row or if an icon underneath is there!

function checkIfsetIconPossible() {
    let number = parseInt(this.id);
    console.log(this.id)
    return (this.id == 30 || this.id == 31 || this.id == 32 || this.id == 33 || this.id == 34 || this.id == 35 ||
            player1Caskets.includes((number + 6)) || player2Caskets.includes((number + 6))) && !player1Caskets.includes(number) &&
        !player2Caskets.includes(number) && !gameWon
}

// endscreen

function showEndscreen() {
    let gamefield = document.getElementById('gamefield');
    let endscreen = document.getElementById('end-screen');
    let winner = document.getElementById('winner');
    let players = document.getElementById('players');
    let button = document.getElementById('restart-button')
    setTimeout(() => {
        gamefield.classList.add('d-none');
        players.classList.add('d-none')
        endscreen.classList.remove('d-none');
        winner.classList.add('winner-animation')
        button.classList.add('button-animation')
        winner.innerText = `${playerWon.id.replace('p','P')} won the game!`;
        console.log(playerWon.id)
        saveInSessionStorage();
    }, 1500)
}

function saveInSessionStorage() {
    if (playerWon.id == 'player1') {
        countPlayer1++;
    } else {
        countPlayer2++;
    }
    let count1 = JSON.stringify(countPlayer1);
    sessionStorage.setItem('player1', count1);
    let count2 = JSON.stringify(countPlayer2)
    sessionStorage.setItem('player2', count2);
}
// restart game

function restartGame() {
    location.reload();
}