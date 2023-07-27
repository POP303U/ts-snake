const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

interface Segment {
    x: number;
    y: number;
}

let snake: Segment[] = [{ x: 10, y: 10 }];
let food: Segment = { x: 15, y: 10 };
let direction: Segment = { x: 1, y: 0 };

function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const newHead: Segment = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * gridWidth);
    food.y = Math.floor(Math.random() * gridHeight);
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= gridWidth ||
        head.y >= gridHeight ||
        snake.some(segment => segment !== head && segment.x === head.x && segment.y === head.y)
    );
}

function gameLoop() {
    if (checkCollision()) {
        alert("Game Over!");
        snake = [{ x: 10, y: 10 }];
        direction = { x: 1, y: 0 };
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    moveSnake();

    setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", event => {
    const keyCode = event.keyCode;
    switch (keyCode) {
        case 37: // Left arrow
            direction = { x: -1, y: 0 };
            break;
        case 38: // Up arrow
            direction = { x: 0, y: -1 };
            break;
        case 39: // Right arrow
            direction = { x: 1, y: 0 };
            break;
        case 40: // Down arrow
            direction = { x: 0, y: 1 };
            break;
    }
});

gameLoop();
