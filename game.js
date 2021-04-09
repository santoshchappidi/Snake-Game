import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./randomGrid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector(".game-board");
export const snakeScore = document.querySelector(".score-span");



function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost. Press ok to restart")) {
      window.location.reload();
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  // console.log("snakeSpeed");
  lastRenderTime = currentTime;
  update();
  draw();
  }

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  deathCheck();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function deathCheck() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

