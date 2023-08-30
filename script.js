const words = ['roshan', 'karthik', 'navin', 'sabesh', 'ashif', 'samson', 'macwin', 'nixon','metha','joseph','rogan','ariharan','ashwin','caleb','bijith','dennis','dhavasakthi','gibin','hrithik','iraiyanbu','issac','jessica','joshwa','leka','laya','marshall','metha','reshma','richie','rufus','niranjan','shreehari','sneha','sona','joel','sancia','vijayanand'];
const totalLife = 5;

let pickedWord = words[Math.floor(Math.random() * words.length)];
let emptyList = Array(pickedWord.length).fill('_');
let remainingLife = totalLife;

const wordDisplay = document.getElementById('word-display');
const lifeDisplay = document.getElementById('life-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const hintButton = document.getElementById('hint-button');
const showButton = document.getElementById('show-button');
const resultDisplay = document.getElementById('result');
const tryAgainButton = document.getElementById('try-again-button');

function updateDisplay() {
    wordDisplay.textContent = emptyList.join(' ');
    lifeDisplay.textContent = `Remaining Lives: ${'❤️'.repeat(remainingLife)}`;
}

function checkWin() {
    if (!emptyList.includes('_')) {
        resultDisplay.textContent = 'Congratulations! You guessed the word!';
        guessInput.disabled = true;
        guessButton.disabled = true;
        hintButton.disabled = true;
        showButton.disabled = true;
    }
}

function checkLoss() {
    if (remainingLife === 0) {
        resultDisplay.textContent = `You have lost! The word was "${pickedWord}". Try again.`;
        guessInput.disabled = true;
        guessButton.disabled = true;
        hintButton.disabled = true;
        showButton.disabled = true;
    }
}

guessButton.addEventListener('click', () => {
    const userGuess = guessInput.value.toLowerCase();
    if (userGuess.length === 1) {
        if (pickedWord.includes(userGuess)) {
            for (let i = 0; i < pickedWord.length; i++) {
                if (pickedWord[i] === userGuess) {
                    emptyList[i] = userGuess;
                }
            }
            updateDisplay();
            checkWin();
        } else {
            remainingLife--;
            updateDisplay();
            checkLoss();
        }
        guessInput.value = '';
    }
});

hintButton.addEventListener('click', () => {
    emptyList[0] = pickedWord[0];
    updateDisplay();
    remainingLife--; // Reduce life when using a hint
    checkLoss();
    hintButton.disabled = true;
});

showButton.addEventListener('click', () => {
    for (let i = 0; i < pickedWord.length; i++) {
        emptyList[i] = pickedWord[i];
    }
    updateDisplay();
    resultDisplay.textContent = 'Try again'; // Update the result message
    checkLoss();
    showButton.disabled = true;
});

// Listen for the "Enter" key press to trigger the guess
guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        guessButton.click(); // Simulate a click on the guess button
    }
});

tryAgainButton.addEventListener('click', () => {
    location.reload(); // Reload the page to start a new game
});

updateDisplay();
