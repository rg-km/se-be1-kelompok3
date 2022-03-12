const CELL_SIZE=20,CANVAS_SIZE=600,REDRAW_INTERVAL=50,WIDTH=30,HEIGHT=30,DIRECTION={LEFT:0,RIGHT:1,UP:2,DOWN:3},MOVE_INTERVAL=200;function initPosition(){return{x:Math.floor(30*Math.random()),y:Math.floor(30*Math.random())}}function initHeadAndBody(){let e=initPosition();return{head:e,body:[{x:e.x,y:e.y}]}}function initDirection(){return Math.floor(4*Math.random())}function initSnake(e){return{color:e,...initHeadAndBody(),direction:initDirection(),score:0,lifepos:[{x:0,y:0},{x:1,y:0},{x:2,y:0}]}}let snake=initSnake("green"),apples=[{color:"red",position:initPosition()},{color:"green",position:initPosition()}];function drawCell(e,t,n,o){e.fillStyle=o,e.fillRect(20*t,20*n,20,20)}function drawScore(e){let t;t=document.getElementById("score1Board");let n=t.getContext("2d");n.clearRect(0,0,600,600),n.font="30px Arial",n.fillStyle=e.color,n.fillText(e.score,35,t.scrollHeight/2)}function drawSpeed(e){let t=document.getElementById("speedBoard"),n=t.getContext("2d");n.clearRect(0,0,600,600),n.font="20px Arial",n.fillStyle=e.color,n.fillText("200 .ms",10,t.scrollHeight/2)}function drawSnakeHead(e,t){var n;switch(t.direction){case DIRECTION.LEFT:n=document.getElementById("snake-head-left"),e.drawImage(n,20*t.head.x-10,20*t.head.y,30,20);break;case DIRECTION.RIGHT:n=document.getElementById("snake-head-right"),e.drawImage(n,20*t.head.x,20*t.head.y,30,20);break;case DIRECTION.UP:n=document.getElementById("snake-head-up"),e.drawImage(n,20*t.head.x,20*t.head.y-10,20,30);break;case DIRECTION.DOWN:n=document.getElementById("snake-head-down"),e.drawImage(n,20*t.head.x,20*t.head.y,20,30)}}function draw(){setInterval((function(){let e=document.getElementById("snakeBoard").getContext("2d");e.clearRect(0,0,600,600),drawSnakeHead(e,snake);var t=document.getElementById("snake-body");for(let n=1;n<snake.body.length;n++)e.drawImage(t,20*snake.body[n].x,20*snake.body[n].y,20,20);for(let t=0;t<apples.length;t++){let o=apples[t];var n=document.getElementById("apple");e.drawImage(n,20*o.position.x,20*o.position.y,20,20)}for(let t=0;t<snake.lifepos.length;t++){n=document.getElementById("life");e.drawImage(n,20*snake.lifepos[t].x,20*snake.lifepos[t].y,20,20)}drawScore(snake),drawSpeed(snake)}),50)}function teleport(e){e.head.x<0&&(e.head.x=29),e.head.x>=30&&(e.head.x=0),e.head.y<0&&(e.head.y=29),e.head.y>=30&&(e.head.y=0)}function eat(e,t){for(let n=0;n<t.length;n++){let o=t[n];e.head.x==o.position.x&&e.head.y==o.position.y&&(o.position=initPosition(),e.score++,e.body.push({x:e.head.x,y:e.head.y}))}}function moveLeft(e){e.head.x--,teleport(e),eat(e,apples)}function moveRight(e){e.head.x++,teleport(e),eat(e,apples)}function moveDown(e){e.head.y++,teleport(e),eat(e,apples)}function moveUp(e){e.head.y--,teleport(e),eat(e,apples)}function checkGameover(e){let t=!1;for(let n=0;n<e.length;n++)for(let o=0;o<e.length;o++)for(let a=1;a<e[o].body.length;a++)e[n].head.x==e[o].body[a].x&&e[n].head.y==e[o].body[a].y&&(snake.lifepos.pop(),0===snake.lifepos.length&&(t=!0));return t&&(alert("Game Over!"),snake=initSnake("green")),t}function move(e){switch(e.direction){case DIRECTION.LEFT:moveLeft(e);break;case DIRECTION.RIGHT:moveRight(e);break;case DIRECTION.DOWN:moveDown(e);break;case DIRECTION.UP:moveUp(e)}moveBody(e),checkGameover([e])?initGame():setTimeout((function(){move(e)}),200)}function moveBody(e){e.body.unshift({x:e.head.x,y:e.head.y}),e.body.pop()}function turn(e,t){t!=={[DIRECTION.LEFT]:DIRECTION.RIGHT,[DIRECTION.RIGHT]:DIRECTION.LEFT,[DIRECTION.DOWN]:DIRECTION.UP,[DIRECTION.UP]:DIRECTION.DOWN}[e.direction]&&(e.direction=t)}function initGame(){move(snake)}document.addEventListener("keydown",(function(e){"ArrowLeft"===e.key?turn(snake,DIRECTION.LEFT):"ArrowRight"===e.key?turn(snake,DIRECTION.RIGHT):"ArrowUp"===e.key?turn(snake,DIRECTION.UP):"ArrowDown"===e.key&&turn(snake,DIRECTION.DOWN)})),initGame();