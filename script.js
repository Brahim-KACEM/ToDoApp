const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let isGameRunning = false;
const winningScore = 5;


const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  dy: 5,
  score: 0
};

const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  dy: 4,
  score: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speed: 5,
  dx: 5,
  dy: 5,
  color: "white"
};

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    isGameRunning = true;
    gameLoop();
  }
  
  function showGameOver(winner) {
    isGameRunning = false;
    document.getElementById("winnerText").textContent = `${winner} Wins!`;
    document.getElementById("gameOverScreen").style.display = "flex";
  }
  
  function restartGame() {
    player.score = 0;
    computer.score = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    document.getElementById("gameOverScreen").style.display = "none";
    isGameRunning = true;
    gameLoop();
  }
  

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = Math.random() > 0.5 ? 5 : -5;
}

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // AI paddle movement
  computer.y += (ball.y - (computer.y + paddleHeight / 2)) * 0.05;

  // Ball collision with top and bottom
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Ball collision with paddles
  let paddle = ball.x < canvas.width / 2 ? player : computer;
  if (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y < paddle.y + paddle.height &&
    ball.y > paddle.y
  ) {
    ball.dx *= -1;
  }

  // Ball out of bounds
  if (ball.x + ball.radius < 0) {
    computer.score++;
    if (computer.score >= winningScore) {
      showGameOver("Computer");
    } else {
      resetBall();
    }
  } else if (ball.x - ball.radius > canvas.width) {
    player.score++;
    if (player.score >= winningScore) {
      showGameOver("Player");
    } else {
      resetBall();
    }
  }
  
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#222");
  drawNet();
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);

  // Draw scores
  drawText(player.score, canvas.width / 4, 50);
  drawText(computer.score, 3 * canvas.width / 4, 50);
}

function gameLoop() {
    if (!isGameRunning) return;
    update();
    render();
    requestAnimationFrame(gameLoop);
  }
  

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    player.y -= player.dy;
  } else if (e.key === "ArrowDown") {
    player.y += player.dy;
  }
});

gameLoop();
