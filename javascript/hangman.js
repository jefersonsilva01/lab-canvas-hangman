class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    // ... your code goes here
    const randomValue = Math.floor(Math.random() * this.words.length);
    return this.words[randomValue];
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    if (keyCode >= 65 && keyCode <= 90) {
      return true
    } else {
      return false
    };
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    if (!this.guessedLetters.includes(letter)) {
      let letterUpCase = letter.toUpperCase();

      this.secretWord.toUpperCase().split('').forEach(el => {
        if (el === letterUpCase) {
          this.guessedLetters += letterUpCase;
        };
      });
    }

    return this.checkWinner();
  }

  addWrongLetter(letter) {
    // ... your code goes here
    if (!this.secretWord.includes(letter)) {
      this.errorsLeft--;
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    // ... your code goes here
    if (this.errorsLeft === 0) {
      return true;
    } else {
      return false;
    }
  }

  checkWinner() {
    // ... your code goes here
    let secretWord = [...this.secretWord].sort().join('').toUpperCase();
    let guessedLetters = [...this.guessedLetters].sort().join('');

    if (secretWord === guessedLetters) {
      return true;
    } else {
      return false;
    }
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  const keyCode = event.keyCode;
  const key = event.key;
  let notClickedKey;
  let isWinner;

  const isALetter = hangman.checkIfLetter(keyCode);

  if (isALetter) {
    notClickedKey = hangman.checkClickedLetters(key)
  };

  if (notClickedKey) {
    isWinner = hangman.addCorrectLetter(key);
    hangman.addWrongLetter(key);
    hangmanCanvas.writeCorrectLetter(key);
  }

  if (isWinner) {
    hangmanCanvas.winner()
  };

  hangmanCanvas.writeWrongLetter(hangman.letters, hangman.errorsLeft);

  if (hangman.checkGameOver()) {
    hangmanCanvas.gameOver();
  };
});