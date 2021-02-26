// select canvas tag and collect context
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// create image
let bird = new Image();
let background = new Image();
let foreground = new Image();
let pipeTop = new Image();
let pipeBottom = new Image();

// load image
bird.src = 'images/bird.png';
background.src = 'images/background.png';
foreground.src = 'images/foreground.png';
pipeTop.src = 'images/pipeTop.png';
pipeBottom.src = 'images/pipeBottom.png';

// create audio
let flyAudio = new Audio();
let scoreAudio = new Audio();

// load audio
flyAudio.src = 'audios/fly.mp3';
scoreAudio.src = 'audios/score.mp3';

// distance between the pipe top and the pipe bottom
const gap = 85;

// Y coordinates of the pipe bottom
let constant;

// X and Y coordinates of the bird
let birdX = 10;
let birdY = 1.5;

// value when the bird falls
const gravity = 1.5;

// score of player
let score = 0;

// on key down
const moveUp = () => {
  birdY -= 25;
  flyAudio.play();
};

document.addEventListener('keydown', moveUp);

// pipe coordinates
let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

const draw = () => {
  context.drawImage(background, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeTop.height + gap;
    context.drawImage(pipeTop, pipe[i].x, pipe[i].y);
    context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x === 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height,
      });
    }

    // reload the page when detect collision
    if (
      (birdX + bird.width >= pipe[i].x &&
        birdX <= pipe[i].x + pipeTop.width &&
        (birdY <= pipe[i].y + pipeTop.height ||
          birdY + bird.height >= pipe[i].y + constant)) ||
      birdY + bird.height >= canvas.height - foreground.height
    ) {
      location.reload();
    }

    if (pipe[i].x === 5) {
      score++;
      scoreAudio.play();
    }
  }

  context.drawImage(foreground, 0, canvas.height - foreground.height);

  context.drawImage(bird, birdX, birdY);

  birdY += gravity;

  context.fillStyle = '#000';
  context.font = '20px Verdana';
  context.fillText('Score : ' + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
};

draw();
