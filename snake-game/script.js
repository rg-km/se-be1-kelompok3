const CELL_SIZE = 20
const CANVAS_SIZE = 600
const REDRAW_INTERVAL = 50
const WIDTH = CANVAS_SIZE / CELL_SIZE
const HEIGHT = CANVAS_SIZE / CELL_SIZE
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
}

const MOVE_INTERVAL = 200

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  }
}

function initHeadAndBody() {
  let head = initPosition()
  let body = [{ x: head.x, y: head.y }]
  return {
    head: head,
    body: body,
  }
}

function initDirection() {
  return Math.floor(Math.random() * 4)
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
  }
}
let snake = initSnake('purple')

let apples = [
  {
    color: 'red',
    position: initPosition(),
  },
  {
    color: 'green',
    position: initPosition(),
  },
]

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}

function drawScore(snake) {
  let scoreCanvas
  scoreCanvas = document.getElementById('score1Board')
  let scoreCtx = scoreCanvas.getContext('2d')

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  scoreCtx.font = '30px Arial'
  scoreCtx.fillStyle = snake.color
  scoreCtx.fillText(snake.score, 35, scoreCanvas.scrollHeight / 2)
}

function drawSpeed(snake) {
  let speedCanvas = document.getElementById('speedBoard')
  let speedCtx = speedCanvas.getContext('2d')

  speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  speedCtx.font = '20px Arial'
  speedCtx.fillStyle = snake.color
  speedCtx.fillText(MOVE_INTERVAL + ' .ms', 10, speedCanvas.scrollHeight / 2)
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById('snakeBoard')
    let ctx = snakeCanvas.getContext('2d')

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    drawCell(ctx, snake.head.x, snake.head.y, snake.color)
    for (let i = 1; i < snake.body.length; i++) {
      drawCell(ctx, snake.body[i].x, snake.body[i].y, snake.color)
    }

    for (let i = 0; i < apples.length; i++) {
      let apple = apples[i]

      var img = document.getElementById('apple')
      ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }

    drawScore(snake)
    drawSpeed(snake)
  }, REDRAW_INTERVAL)
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0
  }
}

function eat(snake, apples) {
  for (let i = 0; i < apples.length; i++) {
    let apple = apples[i]
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
      apple.position = initPosition()
      snake.score++
      snake.body.push({ x: snake.head.x, y: snake.head.y })
    }
  }
}

function moveLeft(snake) {
  snake.head.x--
  teleport(snake)
  eat(snake, apples)
}

function moveRight(snake) {
  snake.head.x++
  teleport(snake)
  eat(snake, apples)
}

function moveDown(snake) {
  snake.head.y++
  teleport(snake)
  eat(snake, apples)
}

function moveUp(snake) {
  snake.head.y--
  teleport(snake)
  eat(snake, apples)
}

function checkCollision(snakes) {
  let isCollide = false
  //this
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
          isCollide = true
        }
      }
    }
  }
  if (isCollide) {
    alert('Game over')
    snake = initSnake('purple')
  }
  return isCollide
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake)
      break
    case DIRECTION.RIGHT:
      moveRight(snake)
      break
    case DIRECTION.DOWN:
      moveDown(snake)
      break
    case DIRECTION.UP:
      moveUp(snake)
      break
  }
  moveBody(snake)
  if (!checkCollision([snake])) {
    setTimeout(function () {
      move(snake)
    }, MOVE_INTERVAL)
  } else {
    initGame()
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y })
  snake.body.pop()
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  }

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    turn(snake, DIRECTION.LEFT)
  } else if (event.key === 'ArrowRight') {
    turn(snake, DIRECTION.RIGHT)
  } else if (event.key === 'ArrowUp') {
    turn(snake, DIRECTION.UP)
  } else if (event.key === 'ArrowDown') {
    turn(snake, DIRECTION.DOWN)
  }
})

function initGame() {
  move(snake)
}

initGame()
