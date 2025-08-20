const imageUrls = [
    'Imgs/carta1.png',
    'Imgs/carta2.png',
    'Imgs/carta3.png',
    'Imgs/carta4.png',
    'Imgs/carta5.png',
    'Imgs/carta6.png',
    'Imgs/carta7.png',
    'Imgs/carta8.png'
]

let cards = [];
let flippedCards = [];
let marchedPairs = 0;
let attempts = 0;
let gameStarted = false;
let startTime = null;
let timerInterval = null;

const gameBoard = document.getElementById('gameBoard');
const attemptsSpan = document.getElementById('attempts');
const timeSpan = document.getElementById('time');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

function suffleArray(array) {
    const shuffled = [...array];
    for (let  i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createCardsArray() {
    const pairs = [...imageUrls, ...imageUrls];
    return shuffledArray(pairs);
}

