
function SnakeFragment(x,y){
    this.x = x;
    this.y = y;
}
SnakeFragment.prototype.createFragment = function(ctx){
    ctx.fillStyle = 'grey';
    ctx.fillRect(this.x,this.y,20,20);
    ctx.clearRect(this.x+5, this.y+5, 10, 10);
};
SnakeFragment.prototype.valueOf = function(){
    return this.x +""+this.y;
};

function Snake(snake,direction){
    this.snake = snake;
    this.direction = direction;
}

Snake.prototype.eatMouse = function(ctx,mouse){
    var self = this;
    setInterval(function(){
        var head = self.snake[self.snake.length - 1].valueOf();
        if(head === mouse.valueOf()){
            self.snake.push(new SnakeFragment(mouse.x,mouse.y));
            var points = document.getElementById('points').innerHTML;
            document.getElementById('points').innerHTML = ++points;
            mouse.createMouse(ctx)
        }
    },4);

};
Snake.prototype.isGameOver = function(){
    var head = this.snake[this.snake.length-1].valueOf();
    return this.snake.some(function (x,i,arr) {
        return head == x && i!= arr.length-1;
    });
};

function Mouse(x,y){
    this.x = x;
    this.y = y;
}
Mouse.prototype = Object.create(SnakeFragment.prototype);
Mouse.prototype.constructor = Mouse;

Mouse.prototype.createMouse = function(){
    var x = Math.floor(Math.random()*580);
    var y = Math.floor(Math.random()*580);
    this.x = Math.floor(x/20)*20;
    this.y = Math.floor(x/20)*20;
};

function game(){
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        snakeArray = [new SnakeFragment(20,40),
        new SnakeFragment(40,40),
        new SnakeFragment(60,40),
        new SnakeFragment(80,40),
        new SnakeFragment(100,40)],
         snake = new Snake(snakeArray,'right'),
         mouse = new Mouse(100,300);

     document.addEventListener('keydown',function(event){
            if(!flag) {
                if (snake.direction !== 'right' && event.keyCode == 37) {
                    snake.direction = 'left';
                } else if (snake.direction !== 'down' && event.keyCode == 38) {
                    snake.direction = 'up';
                } else if (snake.direction !== 'left' && event.keyCode == 39) {
                    snake.direction = 'right';
                } else if (snake.direction !== 'up' && event.keyCode == 40) {
                    snake.direction = 'down';
                }
                flag = 1;
            }
        setTimeout(function(){
            flag = 0;
        },56)

    },false);

    function snakeMove(mouse){

             ctx.fillStyle = 'black';
             ctx.fillRect(0, 0, canvas.width, canvas.height);
             var snakeArr = snake.snake;
             var tail = snakeArr.shift();
            tail.x = snakeArr[snakeArr.length - 1].x;
            tail.y = snakeArr[snakeArr.length - 1].y;

             if (snake.direction === 'right') {
                 if (tail.x > canvas.width - 30) {
                     tail.x = 0;
                 } else {
                     tail.x += 20;
                 }
             } else if (snake.direction === 'down') {
                 if (tail.y > canvas.height - 30) {
                     tail.y = 0;
                 } else {
                     tail.y += 20;
                 }
             } else if (snake.direction === 'left') {
                 if (tail.x < 10) {
                     tail.x = canvas.width - 20;
                 } else {
                     tail.x -= 20;
                 }
             } else if (snake.direction === 'up') {
                 if (tail.y < 10) {
                     tail.y = canvas.height - 20;
                 } else {
                     tail.y -= 20;
                 }
             }
             snakeArr.push(tail);
             snakeArr.forEach(function(frag){frag.createFragment(ctx)});

             if (snake.isGameOver()) {
                 alert("game over");
                 clearInterval(timer);
             }

             ctx.fillStyle = 'red';
             ctx.fillRect(mouse.x, mouse.y, 20, 20);

        setTimeout(function(){
            snakeMove(mouse);
        },60)
    }
    snakeMove(mouse);
    snake.eatMouse(ctx,mouse);
}