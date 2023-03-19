// Name: Gaurav Ardak
// Coll_Id: gca9216
// StudentID: 1001969216

var dx, dy;       /* displacement at every dt */
var x, y;         /* ball location */
var score = 0;    /* # of walls you have cleaned */
var tries = 0;    /* # of tries to clean the wall */
var started = false;  /* false means ready to kick the ball */
var ball, court, paddle, brick, msg;
var court_height, court_width, paddle_left;

var bricks = new Array(4);  // rows of bricks
var colors = ["red","blue","yellow","green"];
speedMultiplier = 2
ballSpeed = 2*speedMultiplier
/* get an element by id */
function id ( s ) { return document.getElementById(s); }

/* convert a string with px to an integer, eg "30px" -> 30 */
function pixels ( pix ) {
    pix = pix.replace("px", "");
    num = Number(pix);
    return num;
}

/* place the ball on top of the paddle */
function readyToKick () {
    x = pixels(paddle.style.left)+paddle.width/2.0-ball.width/2.0;
    y = pixels(paddle.style.top)-2*ball.height;
    ball.style.left = x+"px";
    ball.style.top = y+"px";
}

/* paddle follows the mouse movement left-right */
function movePaddle (e) {
    var ox = e.pageX-court.getBoundingClientRect().left;
    paddle.style.left = (ox < 0) ? "0px"
                            : ((ox > court_width-paddle.width)
                               ? court_width-paddle.width+"px"
                               : ox+"px");
    if (!started)
        readyToKick();
}

function initialize () {
    court = id("court");
    ball = id("ball");
    paddle = id("paddle");
    wall = id("wall");
    wall.innerHTML='';
    msg = id("messages");
    brick = id("red");
    court_height = pixels(court.style.height);
    court_width = pixels(court.style.width);
    for (i=0; i<4; i++) {
        // each row has 20 bricks
        bricks[i] = new Array(20);
        var b = id(colors[i]);
        for (j=0; j<20; j++) {
            var x = b.cloneNode(true);
            bricks[i][j] = x;
            wall.appendChild(x);
        }
        b.style.visibility = "hidden";
    }
    started = false;
 }

/* true if the ball at (x,y) hits the brick[i][j] */
function hits_a_brick ( x, y, i, j ) {
    var top = i*brick.height - 450;
    var left = j*brick.width;
    return (x >= left && x <= left+brick.width
            && y >= top && y <= top+brick.height);
}

function startGame () {
    started = true;
	rand = Math.random()
	ballSpeedY = -ballSpeed
	ballSpeedX =  (rand >= 0.5) ? (-1*ballSpeed) : ballSpeed 
	moveBallTimer = window.setInterval(moveBall, 20)    // when called its stops the ball
}

function moveBall(){
    dx = ball.style.left + ballSpeedX
	dy = ball.style.top + ballSpeedY

	// Ball hits the paddle
	if(parseInt(ball.style.left) < parseInt(paddle.style.left)+paddle.width && 
        parseInt(ball.style.left) > parseInt(paddle.style.left)-ball.width &&
        parseInt(ball.style.top) >= -parseInt(paddle.style.top) ){
		ballSpeedY = -1*ballSpeedY
	}

	// Ball hits the left boundary of court
	if(parseInt(ball.style.left) < 0){
		ballSpeedX = -1*ballSpeedX
	}

	// Ball hits the right boundary of court
	if(parseInt(ball.style.left) > court_width){
		ballSpeedX = -1*ballSpeedX
	}

	// Ball hits the top boundary of court
    if(parseInt(ball.style.top) < -court_height){
		ballSpeedY = -1*ballSpeedY
	}

	// Ball hits the bottom boundary of court
    if(parseInt(ball.style.top) > 0){
        resetGame()
    }

    for (i=0; i<4; i++){
        for (j=0; j<20; j++){
            if(hits_a_brick(parseInt(ball.style.left), parseInt(ball.style.top), i, j)){
                if(bricks[i][j].style.visibility != "hidden"){
                    bricks[i][j].style.visibility = "hidden"
                    ballSpeedY = -1*ballSpeedY
                }                
            }
        }
    }
    ball.style.left = parseInt(ball.style.left) + ballSpeedX + "px";
	ball.style.top = parseInt(ball.style.top) + ballSpeedY + "px";
}

function resetGame () {
	window.clearInterval(moveBallTimer, 20)
    initialize();
    for (i=0; i<4; i++){
        for (j=0; j<20; j++){
                if(bricks[i][j].style.visibility = "hidden"){
                    bricks[i][j].style.visibility = "visible"
                }              
        }
    }
}
