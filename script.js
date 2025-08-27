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

const clickSound = new Audio('Sounds/carta-virando.mp3');

const gameBoard = document.getElementById('gameBoard');
const attemptsSpan = document.getElementById('attempts');
const timeSpan = document.getElementById('time');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

function shuffleArray(array) {
    const shuffled = [...array];
    for (let  i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createCardsArray() {
    const pairs = [...imageUrls, ...imageUrls];
    return shuffleArray(pairs);
}

function createCardElement(imageUrl, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.dataset.image = imageUrl;

    card.innerHTML = `
        <div class="card-face card-back">?</div>
        <div class="card-face card-front">
            <img src="${imageUrl}" alt="Carta ${index}">
        </div>
    `;

    card.addEventListener('click', () => flippedCards(card));
    return card;
}

function flipCard(card) {
    if (!gameStarted) {
        startGame();
    }

    if (card.classList.contains('flipped') ||
        card.classList.add('flipped') ||
        flippedCards.length >= 2) {
            return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);
    clickSound.play();

    if (flippedCards.length === 2) {
        attempts++;
        attemptsSpan.textContent = attempts;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    // Compara se as imagens são iguais
    if (card1.dataset.image === card2.dataset.image) {
        matchSound.play()
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        matchedPairsSpan.textContent = matchedPairs;
        // Faz as cartas "sumirem" visualmente após um pequeno atraso
        setTimeout(() => {
            card1.style.opacity = '0';
            card2.style.opacity = '0';
            card1.style.pointerEvents = 'none';
            card2.style.pointerEvents = 'none';
        }, 500); // Sumir 0.5 segundos após o match

        // Verifica se o jogo terminou (todos os 8 pares encontrados)
        if (matchedPairs === 8) {
            endGame()
        }
    } else {
        noMatchSound.play();
        // São diferente, vira as cartas de volta
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    // Limpa a lista de cartas viradas
    flippedCards = [];
}

function startGame() {
    gameStarted = true;
    startTime = Date.now();
    // Atualiza o timer a cada segundo
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeSpan.textContent = formattedTime;
}