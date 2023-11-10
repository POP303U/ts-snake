const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gridSize = 40;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;


type Segment = [number, number];

const food: Segment = [15, 10];
let snake: Segment[] = [[10, 10]];
let direction: Segment = [1, 0];

function drawing_segments(segment: Segment, color: string): void {
    // biome-ignore lint/style/noNonNullAssertion: <i don't need errors>
    ctx!.fillStyle = color;
    ctx?.fillRect(segment[0] * gridSize, segment[1] * gridSize, gridSize, gridSize);
}

function draw_snake(): void {
    // biome-ignore lint/complexity/noForEach: <noob forEach is better>
    snake.forEach(segment => drawing_segments(segment, "blue"));
}

function spawn_food(): void {
    drawing_segments(food, "red");
}

function move_snake(): void {
    const newHead: Segment = [
        snake[0][0] + direction[0],
        snake[0][1] + direction[1],
    ];
    snake.unshift(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
        food_generation();
    } else {
        snake.pop();
    }
}

function food_generation(): void {
    food[0] = Math.floor(Math.random() * gridWidth);
    food[1] = Math.floor(Math.random() * gridHeight);
}

function collision(): boolean {
    const [head, ...tail] = snake;
    return (
        head[0] < 0 ||
        head[1] < 0 ||
        head[0] >= gridWidth ||
        head[1] >= gridHeight ||
        tail.some(segment => segment[0] === head[0] && segment[1] === head[1])
    );
}

function main_loop(): void {
    if (collision()) {
        alert("Game Over!");
        snake = [[10, 10]];
        direction = [1, 0];
    }

    // don't care about null
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    draw_snake();
    spawn_food();
    move_snake();

    setTimeout(main_loop, 100);
}

document.addEventListener("keydown", event => {
    const keyCode = event.keyCode; //developer.mozilla.org/docs/Web/API/KeyboardEvent/keyCodeyCode
    const directions: Record<number, Segment> = {
        37: [-1, 0],
        38: [0, -1],
        39: [1, 0],
        40: [0, 1],
    };
    direction = directions[keyCode] || direction;
});

main_loop();
