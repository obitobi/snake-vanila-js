import {move, MAX_WIDTH, random, SNAKE_SIDE, GRID_STEP, counter, GAME_SPEED} from './util.js';

const gameField = document.querySelector('.game-field');
const ctx = gameField.getContext('2d');
const body = document.querySelector('.body');
const scoreContainer = document.querySelector('.header__score');
body.addEventListener('keydown', event => snakeControl(event));

let snakeX;
let snakeY;
let snakeCoordinates = [];
let appleCoordinates = [];
let score;
let intervalId = null;

function createField(sideLength, gridStep) {
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    for (let i = 0; i <= sideLength; i += gridStep) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, sideLength);
        ctx.moveTo(0, i);
        ctx.lineTo(sideLength, i);
    }
    ctx.stroke();
    ctx.closePath();
}

function createSnake() {
    score = counter(0, scoreContainer);
    snakeX = move(0);
    snakeY = move(13);
    snakeCoordinates.push([snakeX(), snakeY()], [snakeX(1), snakeY()], [snakeX(1), snakeY()])
    ctx.beginPath();
    ctx.fillStyle = '#000000'
    snakeCoordinates.forEach(([x, y]) => ctx.fillRect(x, y, SNAKE_SIDE, SNAKE_SIDE));
    ctx.closePath();
}

function renderGameField({clientWidth: sideLength}, gridStep) {
    createField(sideLength, gridStep);
    createSnake();
    spawnApple();
}

function snakeControl({key}) {
    switch (key) {
        case 'ArrowUp':
            clearInterval(intervalId);
            intervalId = setInterval(() => renderSnake(snakeX(), snakeY(-1)), GAME_SPEED);
            break;
        case 'ArrowRight':
            clearInterval(intervalId);
            intervalId = setInterval(() => renderSnake(snakeX(1), snakeY()), GAME_SPEED);
            break;
        case 'ArrowLeft':
            clearInterval(intervalId);
            intervalId = setInterval(() => renderSnake(snakeX(-1), snakeY()), GAME_SPEED);
            break;
        case 'ArrowDown':
            clearInterval(intervalId);
            intervalId = setInterval(() => renderSnake(snakeX(), snakeY(1)), GAME_SPEED);
            break;
    }
}

function spawnApple() {
    const [x, y] = getAppleCoordinates();
    ctx.beginPath();
    ctx.fillStyle = '#FF0000'
    ctx.clearRect(x, y, SNAKE_SIDE, SNAKE_SIDE);
    ctx.fillRect(x, y, SNAKE_SIDE, SNAKE_SIDE);
    ctx.closePath();
}

function getAppleCoordinates() {
    return appleCoordinates = [random(), random()];
}

function isEatingYourself(newX, newY) {
    const result = [];
    for (const [x, y] of snakeCoordinates) {
        if (x === newX && y === newY) result.push([x, y]);
        if (result.length > 1) return true;
    }
    return false;
}

function renderSnake(newX, newY) {
    const [tailX, tailY] = snakeCoordinates.shift();
    snakeCoordinates.push([newX, newY]);
    if (newX > MAX_WIDTH || newY > MAX_WIDTH || newY < 0 || newX < 0 || isEatingYourself(newX, newY)) {
        alert('GAME OVER');
        clearInterval(intervalId);
        intervalId = null;
        location.reload();
    }
    ctx.beginPath();
    ctx.fillStyle = '#000000'
    ctx.clearRect(tailX, tailY, SNAKE_SIDE, SNAKE_SIDE);
    ctx.fillRect(newX, newY, SNAKE_SIDE, SNAKE_SIDE);
    ctx.closePath();
    if (appleCoordinates[0] === newX && appleCoordinates[1] === newY) {
        score();
        spawnApple();
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        snakeCoordinates.unshift([tailX, tailY]);
        ctx.fillRect(tailX, tailY, SNAKE_SIDE, SNAKE_SIDE);
        ctx.closePath();
    }
}

renderGameField(gameField, GRID_STEP);

