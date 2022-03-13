const CELL_SIZE=15,CANVAS_SIZE=600,REDRAW_INTERVAL=50,WIDTH=40,HEIGHT=40,DIRECTION={LEFT:0,RIGHT:1,UP:2,DOWN:3};function initPosition(){return{x:Math.floor(40*Math.random()),y:Math.floor(40*Math.random())}}function initHeadAndBody(){let e=initPosition();return{head:e,body:[{x:e.x,y:e.y}]}}function initDirection(){return Math.floor(4*Math.random())}function initSnake(e){return{color:e,...initHeadAndBody(),direction:initDirection(),score:0,lifepos:[{x:1,y:1},{x:2,y:1},{x:3,y:1}],level:1,speed:150}}let snake=initSnake("green"),apples=[{color:"red",position:initPosition()},{color:"green",position:initPosition()}],obstacles=[{level:1,walls:[]},{level:2,walls:[{startX:13,startY:20,endX:26,endY:20,width:15,height:7.5}]},{level:3,walls:[{startX:23,startY:20,endX:36,endY:20,width:15,height:7.5},{startX:9,startY:30,endX:22,endY:30,width:15,height:7.5}]},{level:4,walls:[{startX:23,startY:20,endX:36,endY:20,width:15,height:7.5},{startX:9,startY:30,endX:22,endY:30,width:15,height:7.5},{startX:4,startY:10,endX:17,endY:10,width:15,height:7.5}]},{level:5,walls:[{startX:25,startY:13,endX:36,endY:13,width:15,height:7.5},{startX:7,startY:22,endX:19,endY:22,width:15,height:7.5},{startX:32,startY:22,endX:36,endY:22,width:15,height:7.5},{startX:13,startY:30,endX:26,endY:30,width:15,height:7.5},{startX:0,startY:0,endX:39,endY:0,width:15,height:15},{startX:0,startY:39,endX:39,endY:39,width:15,height:15},{startX:0,startY:0,endX:0,endY:39,width:15,height:15},{startX:39,startY:0,endX:39,endY:39,width:15,height:15}]}];function drawScore(e){let t;t=document.getElementById("score1Board");let n=t.getContext("2d");n.clearRect(0,0,600,600),n.font="30px Arial",n.fillStyle=e.color,n.fillText(e.score,35,t.scrollHeight/2)}function drawSpeed(e){let t=document.getElementById("speedBoard"),n=t.getContext("2d");n.clearRect(0,0,600,600),n.font="20px Arial",n.fillStyle=e.color,n.fillText(e.speed+" .ms",10,t.scrollHeight/2)}function drawLevel(e){document.getElementById("snakeLevel").innerText="Level "+e.level}function drawSnakeHead(e,t){var n;switch(t.direction){case DIRECTION.LEFT:n=document.getElementById("snake-head-left"),e.drawImage(n,15*t.head.x-10,15*t.head.y,25,15);break;case DIRECTION.RIGHT:n=document.getElementById("snake-head-right"),e.drawImage(n,15*t.head.x,15*t.head.y,25,15);break;case DIRECTION.UP:n=document.getElementById("snake-head-up"),e.drawImage(n,15*t.head.x,15*t.head.y-10,15,25);break;case DIRECTION.DOWN:n=document.getElementById("snake-head-down"),e.drawImage(n,15*t.head.x,15*t.head.y,15,25)}}function drawObstacles(e,t,n){let a=n.find((function(e){return e.level===t.level})).walls;e.fillStyle="grey";for(let t=0;t<a.length;t++)for(let n=a[t].startX;n<=a[t].endX;n++)for(let o=a[t].startY;o<=a[t].endY;o++)e.fillRect(15*n,15*o,a[t].width,a[t].height)}function draw(){setInterval((function(){let e=document.getElementById("snakeBoard").getContext("2d");e.clearRect(0,0,600,600),drawObstacles(e,snake,obstacles),drawSnakeHead(e,snake);var t=document.getElementById("snake-body");for(let n=1;n<snake.body.length;n++)e.drawImage(t,15*snake.body[n].x,15*snake.body[n].y,15,15);for(let t=0;t<apples.length;t++){let a=apples[t];var n=document.getElementById("apple");e.drawImage(n,15*a.position.x,15*a.position.y,15,15)}for(let t=0;t<snake.lifepos.length;t++){n=document.getElementById("life");e.drawImage(n,15*snake.lifepos[t].x,15*snake.lifepos[t].y,15,15)}drawScore(snake),drawSpeed(snake),drawLevel(snake)}),50)}function teleport(e){e.head.x<0&&(e.head.x=39),e.head.x>=40&&(e.head.x=0),e.head.y<0&&(e.head.y=39),e.head.y>=40&&(e.head.y=0)}function getLevel(e){switch(e){case 5:return 2;case 10:return 3;case 15:return 4;default:return 5}}function getSpeed(e){return 150-25*(e-1)}function eat(e,t){for(let n=0;n<t.length;n++){let a=t[n];e.head.x==a.position.x&&e.head.y==a.position.y&&(a.position=initPosition(),e.score++,e.score%5==0&&e.level<5&&(e.level=getLevel(e.score),e.speed=getSpeed(e.level),document.getElementById("level-up").play(),alert("Level Up")),e.body.push({x:e.head.x,y:e.head.y}))}}function moveLeft(e){e.head.x--,teleport(e),eat(e,apples)}function moveRight(e){e.head.x++,teleport(e),eat(e,apples)}function moveDown(e){e.head.y++,teleport(e),eat(e,apples)}function moveUp(e){e.head.y--,teleport(e),eat(e,apples)}function checkObstaclesCollision(e,t){let n=t.find((function(t){return t.level===e.level})).walls;for(let t=0;t<n.length;t++)if(e.head.x>=n[t].startX&&e.head.x<=n[t].endX&&e.head.y>=n[t].startY&&e.head.y<=n[t].endY)return!0;return!1}function checkGameover(e,t){let n=!1;for(let t=1;t<e.body.length;t++)e.head.x==e.body[t].x&&e.head.y==e.body[t].y&&(n=!0);return checkObstaclesCollision(e,t)&&(n=!0),n&&(snake.lifepos.pop(),0===snake.lifepos.length?(document.getElementById("gameover").play(),alert("Game Over!"),snake=initSnake("green"),apples=[{color:"red",position:initPosition()},{color:"green",position:initPosition()}]):snake={...snake,...initHeadAndBody()}),n}function move(e){switch(e.direction){case DIRECTION.LEFT:moveLeft(e);break;case DIRECTION.RIGHT:moveRight(e);break;case DIRECTION.DOWN:moveDown(e);break;case DIRECTION.UP:moveUp(e)}moveBody(e),checkGameover(e,obstacles)?initGame():setTimeout((function(){move(e)}),e.speed)}function moveBody(e){e.body.unshift({x:e.head.x,y:e.head.y}),e.body.pop()}function turn(e,t){t!=={[DIRECTION.LEFT]:DIRECTION.RIGHT,[DIRECTION.RIGHT]:DIRECTION.LEFT,[DIRECTION.DOWN]:DIRECTION.UP,[DIRECTION.UP]:DIRECTION.DOWN}[e.direction]&&(e.direction=t)}function initGame(){move(snake)}document.addEventListener("keydown",(function(e){"ArrowLeft"===e.key?turn(snake,DIRECTION.LEFT):"ArrowRight"===e.key?turn(snake,DIRECTION.RIGHT):"ArrowUp"===e.key?turn(snake,DIRECTION.UP):"ArrowDown"===e.key&&turn(snake,DIRECTION.DOWN)})),initGame();
