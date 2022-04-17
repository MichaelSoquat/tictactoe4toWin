let playerActive;
let playerNotActive;
let player1;
let player2;
let playerActiveImg;
let rows = [];
let columns = [];
let diagonal = [];

function render() {
    setPlayerActiveAtStart();
    underlineActivePlayer();
    defineLines();
}

// first Player

function setPlayerActiveAtStart() {
    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');
    playerActive = player1;
    playerNotActive = player2;
    playerActiveImg = document.getElementById('player1Img').src;
};

function changeAcitvePlayer() {
    if (playerActive == player1) {
        playerActive = player2;
        playerNotActive = player1;
        playerActiveImg = document.getElementById('player2Img').src;
    } else {
        playerActive = player1;
        playerNotActive = player2;
        playerActiveImg = document.getElementById('player1Img').src;
    }
    underlineActivePlayer();
};


function underlineActivePlayer() {
    playerActive.classList.add('underlined');
    playerNotActive.classList.remove('underlined');
};

function setIcon(id) {
    console.log(id)

    let currentCasket = document.getElementById(id);
    currentCasket.innerHTML += `<img class="set-icon-img" src="${playerActiveImg}">`;
    changeAcitvePlayer();
    checkWinGame(id);
}

function defineLines() {

}

function checkWinGame(id) {

}

