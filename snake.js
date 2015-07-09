
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
            if(snake.direction !== 'right' && event.keyCode == 37){
                snake.direction = 'left';
            }else if( snake.direction !== 'down' && event.keyCode == 38 ){
                snake.direction = 'up';
            }else if(snake.direction !== 'left'&& event.keyCode == 39 ){
                snake.direction = 'right';
            }else if(snake.direction !== 'up' && event.keyCode == 40){
                snake.direction = 'down';
            }
    },false);

    function snakeMove(mouse){

     var timer = setInterval(function(){
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            var snakeArr = snake.snake;
            for(var i = 0; i < snakeArr.length-1; i++){
                snakeArr[i].x = snakeArr[i+1].x;
                snakeArr[i].y = snakeArr[i+1].y;
                snakeArr[i].createFragment(ctx);
            }
         var head = snakeArr[snakeArr.length - 1];

            if(snake.direction == 'right'){
                if(head.x > canvas.width-30){
                    head.x = 0;
                }else{
                    head.x+=20;
                }
            }else if(snake.direction == 'down'){
                if(head.y > canvas.height-30){
                    head.y = 0;
                }else{
                    head.y+=20;
                }
            }else  if(snake.direction == 'left') {
                if (head.x < 10) {
                    head.x = canvas.width - 20;
                } else {
                    head.x -= 20;
                }
            }else if(snake.direction == 'up') {
                if (head.y < 10) {
                    head.y = canvas.height - 20;
                } else {
                    head.y -= 20;
                }
            }
            head.createFragment(ctx);
            if(snake.isGameOver()){
                alert("game over");
                clearInterval(timer);
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(mouse.x,mouse.y,20,20);

        },60);
    }
    snakeMove(mouse);
    snake.eatMouse(ctx,mouse);
}