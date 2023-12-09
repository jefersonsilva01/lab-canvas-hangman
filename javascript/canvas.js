class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
    this.positions = [];
    this.wrongLetters;

    console.log(secretWord);
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);

    this.drawLines();
  }

  drawLines() {
    const countLines = this.secretWord.length;

    this.context.beginPath();

    let positionX = 125;
    let positionY = 700

    for (let i = 0; i < countLines; i++) {
      this.context.moveTo(positionX += 50, positionY);
      this.context.lineTo(positionX += 50, positionY);
      this.context.stroke();

      this.positions.push({ positionX, positionY });
    }
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    const arraySecretWord = [...this.secretWord];
    let position;

    for (let i = 0; i < arraySecretWord.length; i++) {
      if (index === arraySecretWord[i]) {
        position = this.positions[i];
        this.context.font = 'bold 65pt Arial';
        this.context.fillText(`${index}`, position.positionX - 55, position.positionY - 25);
      }
    }
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    this.wrongLetters = letter;
    let positionX = 400;
    let positionY = 150;

    this.wrongLetters.forEach(letter => {
      this.context.font = 'bold 45pt Arial';
      this.context.fillText(`${letter}`, positionX += 50, positionY);
    });

    this.drawHangman(errorsLeft);
  }

  drawHangman(errorsLeft) {
    switch (errorsLeft) {
      case 9:
        // Base
        this.context.beginPath();
        this.context.moveTo(50, 600);
        this.context.lineTo(100, 550);
        this.context.stroke();

        this.context.moveTo(150, 600);
        this.context.lineTo(100, 550);
        this.context.stroke();

        this.context.moveTo(50, 600);
        this.context.lineTo(150, 600);
        this.context.stroke();
        break;
      case 8:
        // Column 1
        this.context.moveTo(100, 200);
        this.context.lineTo(100, 550);
        this.context.stroke();
        break;
      case 7:
        // Column 2
        this.context.moveTo(100, 200);
        this.context.lineTo(300, 200);
        this.context.stroke();
        break;
      case 6:
        // Rope
        this.context.moveTo(300, 200);
        this.context.lineTo(300, 230);
        this.context.stroke();
        break;
      case 5:
        // Head
        this.context.beginPath();
        this.context.arc(300, 260, 30, 0, 2 * Math.PI, true);
        this.context.stroke();
        break;
      case 4:
        // body
        this.context.moveTo(300, 290);
        this.context.lineTo(300, 450);
        this.context.stroke();
        break;
      case 3:
        // right-arm
        this.context.moveTo(300, 300);
        this.context.lineTo(350, 350);
        this.context.stroke();
        break;
      case 2:
        // left-arm
        this.context.moveTo(300, 300);
        this.context.lineTo(250, 350);
        this.context.stroke();
        break;
      case 1:
        // right-leg
        this.context.moveTo(300, 450);
        this.context.lineTo(350, 500);
        this.context.stroke();
        break;
      case 0:
        // left-leg
        this.context.moveTo(300, 450);
        this.context.lineTo(250, 500);
        this.context.stroke();
        break;
    }
  }

  gameOver() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);

    this.img = new Image();

    this.img.onload = () => {
      this.context.drawImage(this.img, 300, 300);
    }

    this.img.src = "../images/gameover.png";
  }

  winner() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);

    this.img = new Image();

    this.img.onload = () => {
      this.context.drawImage(this.img, 150, 50);
    }

    this.img.src = "../images/awesome.png";
  }
}
