const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//const controlCanvas = document.getElementById("ControlCanvas");
//const ctx2 = controlCanvas.getContext("2d");

const gameScreenW = 650;
const gameScreenH = 600;



var x = gameScreenW / 2;
var y = gameScreenH - 75;

var blockWigth = gameScreenW / 13;
var blockHight = (gameScreenH / 13);
var dx1 = (gameScreenW / 13) / 8;
var dy1 = -(gameScreenH / 13) / 8;
var dx = dx1
var dy = dy1
var Sx = x;
var Sy = y;
var fruits_spawn = 0;
var j = 0;
var wPressed = false;
var playerX = 6;
var WP = 0;
var u = 0;
var fruits_tick = 0;
var fruitsrandom = 0;
var fruitsdawn_speed = 0;
var score = 0;
var reBlock = 0;
var reBlocks1 = 0;
var reBlocks2 = 0;
var blueA = 0;
var goldA = 0;
var blueA_score = 0;
var goldA_score = 0;
var scores = 0;

let touchLeft = false;
let touchRight = false;
let touchFire = false;
let touchRestart = false;
var gameOver = false;


var blocks = [];
var blocks_p = [];
for (var c = 0; c <= 11; c++) {
    blocks[c] = [];
    blocks_p[c] = [];
    blocks[c] = { x: 0, y: 0, status: 1, break: 0, break_spd: 0 };
    blocks_p[c] = { x: 0, y: 0, dx: 0, dy: 0 };
}

var fruits = [];
var scores = [];
for (var n = 0; n <= 11; n++) {
    fruits[n] = [];
    scores[n] = [];
    for (var m = 0; m <= 11; m++) {
        fruits[n][m] = { x: 0, y: 0, status: 0, down: 0, score: 1200, type: 0, s: 0 };
        scores[n][m] = { status: 0, score: 0 };
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

canvas.addEventListener(
    "touchstart",
    handleTouchStart,
    { passive: false }
);
canvas.addEventListener(
    "touchend",
    handleTouchEnd,
    { passive: false }
);


function keyDownHandler(e) {
    if (gameOver) {
        if (e.key === "R" || e.key === "r") {
            document.location.reload();
        }
        return;
    }
    if (e.key === "Right" || e.key === "ArrowRight") moveRight();
    if (e.key === "Left" || e.key === "ArrowLeft") moveLeft();
    
    if (e.key === " ") fireStart();
}

function keyUpHandler(e) {
    if (e.key === " ") fireEnd();
}


function moveRight() {
    if (WP != 0) return;
    if (
        blocks[playerX + 1].status === 1 &&
        fruits[playerX + 1][10].status === 0 &&
        j == 0 &&
        WP == 0
    ) {
        x += blockWigth;
        playerX++;
    }
    j = 0;
    dx = dx1;
}

function moveLeft() {
    if (WP != 0) return;
    if (
        blocks[playerX - 1].status === 1 &&
        fruits[playerX - 1][10].status === 0 &&
        j == 1 &&
        WP == 0 &&
        x > (canvas.width / 13) * 2
    ) {
        x -= blockWigth;
        playerX--;
    }
    j = 1;
    dx = -dx1;
}

function fireStart() {
    if (WP == 0) wPressed = true;
}

function fireEnd() {
    wPressed = false;
}

function keyUpHandler(e) {
    if (e.key === " ") {
        wPressed = false;
    }
}

function handleTouchStart(e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    for (let t of e.touches) {
        const xT = (t.clientX - rect.left) * scaleX;
        const yT = (t.clientY - rect.top) * scaleY;

        if (gameOver) {
            if (Math.hypot(xT - (canvas.width / 2), yT - BUTTON_Y) < BUTTON_SIZE / 2) {
                touchRestart = true;
                document.location.reload();
            }
            return;
        }

        if (Math.hypot(xT - 80, yT - BUTTON_Y) < BUTTON_SIZE / 2) {
            touchLeft = true;
            moveLeft();
        }

        if (Math.hypot(xT - 240, yT - BUTTON_Y) < BUTTON_SIZE / 2) {
            touchRight = true;
            moveRight();
        }

        if (Math.hypot(xT - (canvas.width - 100), yT - BUTTON_Y) < BUTTON_SIZE / 2) {
            touchFire = true;
            fireStart();
        }

    }
}


function handleTouchEnd() {
    touchLeft = false;
    touchRight = false;
    touchFire = false;
    touchRestart = false;
    fireEnd();
}

const BUTTON_SIZE = 120;
const BUTTON_Y = canvas.height - BUTTON_SIZE;

function drawTouchButtons() {
    const size = BUTTON_SIZE;
    const y = BUTTON_Y;

    if (gameOver) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = touchRestart ? "#ff6666" : "#aa3333";
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 18px Arial";
        ctx.fillText("RESTART", (canvas.width / 2), y);
        ctx.textAlign = "left";

        return;
    }

    ctx.beginPath();
    ctx.arc(80, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = touchLeft ? "#888" : "#444";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("◀", 65, y + 10);

    ctx.beginPath();
    ctx.arc(240, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = touchRight ? "#888" : "#444";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.fillText("▶", 240, y + 10);

    ctx.beginPath();
    ctx.arc(canvas.width - 100, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = touchFire ? "#ff6666" : "#aa3333";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.fillText("●", canvas.width - 108, y + 10);
}

canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const xT = (e.clientX - rect.left) * scaleX;
    const yT = (e.clientY - rect.top) * scaleY;

    checkButtons(xT, yT);
});

canvas.addEventListener("mouseup", handleTouchEnd);

function checkButtons(xT, yT) {
    const yButton = canvas.height - BUTTON_SIZE - 100;

    if (Math.hypot(xT - 80, yT - yButton) < BUTTON_SIZE / 2) {
        touchLeft = true;
        moveLeft();
    }

    if (Math.hypot(xT - 240, yT - yButton) < BUTTON_SIZE / 2) {
        touchRight = true;
        moveRight();
    }

    if (Math.hypot(xT - (canvas.width - 100), yT - yButton) < BUTTON_SIZE / 2) {
        touchFire = true;
        fireStart();
    }
}


function block() {
    for (c = 1; c <= 11; c++) {

        var blockX = (gameScreenW / 13) * c;
        var blockY = gameScreenH - (gameScreenW / 13);
        blocks[c].x = blockX;
        blocks[c].y = blockY;

        if (blocks[c].break > 0) {
            ctx.beginPath();
            ctx.rect(blockX, blockY + (100 - blocks[c].break), blockWigth / 2.4, blockHight / 2.3);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX + blockWigth / 2, blockY + (100 - blocks[c].break), blockWigth / 1.8, blockHight / 2.2);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX, blockY + (100 - blocks[c].break) - blockHight / 2, blockWigth / 2.4, blockHight / 2.2);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX + blockWigth / 2, blockY + (100 - blocks[c].break) - blockHight / 1.6, blockWigth / 2.2, blockHight / 2.2);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            blocks[c].break -= blocks[c].break_spd;
            blocks[c].break_spd += 0.3;
        } else {
            blocks[c].break_spd = 1;
        }

        if (blocks[c].status === 1) {

            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWigth, blockHight);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWigth, blockHight / 3);
            ctx.fillStyle = "#FFE1E1";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWigth, blockHight);
            ctx.strokeStyle = "#EEEEEE";
            ctx.stroke();
            ctx.closePath();

        }
        if (blocks[c].status > 1) {
            var blockX = (gameScreenW / 13) * c;
            var blockY = gameScreenH - (gameScreenW / 13);


            blocks[c].x = blockX;
            blocks[c].y = blockY;


            ctx.beginPath();
            ctx.rect(blockX, blockY - (blocks[c].status * 11), blockWigth, blockHight);
            ctx.fillStyle = "#829460";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(blockX, blockY - (blocks[c].status * 11), blockWigth, blockHight / 3);
            ctx.fillStyle = "#FFE1E1";
            ctx.fill();
            ctx.closePath();



            blocks[c].status -= 1;
            if (blocks[c].status === 2) {
                for (var g = 1; g <= 11; g++) {
                    if (fruits[c][g].status == 1) {
                        score += fruits[c][g].score;
                        scores[c][g].status = 100;
                    }

                    fruits[c][g].status = 0;
                    fruits[c][g].type = 0;
                }
            }
        }
    }
}

function block_particle() {



    for (i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.rect(blockX * n + blockWigth / 2, blockY - blockHight / 2, blockWigth / 5, blockHight / 5);
        ctx.fillStyle = "#FFE1E1";
        ctx.fill();
        ctx.closePath();

    }

}

function reblock() {
    for (reBlocks1 = 0; reBlocks1 <= 5 && reBlock > 0; reBlocks1++) {
        for (reBlocks2 = 1; reBlocks2 <= 2 && reBlock > 0; reBlocks2++) {
            reBlocks1 = -reBlocks1
            if (blocks[6 + reBlocks1].status === 0) {

                blocks[6 + reBlocks1].status = 100;
                reBlock -= 1;

            }
        }
    }
    if (reBlock > 0) {
        reBlock -= 1;
    }
}



function chara() {


    if (wPressed) {
        Sx = x;
        Sy = y;
        WP += 1;
        if (WP > 75) {
            WP = 75;
        }
    } else {
        Sx = x;
        Sy = y;
        if (WP > 0) {
            WP -= 1;
        }
    }

    if (WP > 0) {
        for (u = 0; u < WP; u++) {
            ctx.beginPath();
            ctx.arc(Sx, Sy, blockWigth / 7, 0, Math.PI * 2);
            ctx.fillStyle = "pink";
            ctx.fill();
            ctx.closePath();

            Sx += dx;
            Sy += dy;
        }
    }

    if (j == 0) {
        ctx.beginPath();
        ctx.ellipse(x + blockWigth / 2.5, y - blockWigth / 2.5, blockWigth / 6, blockWigth / 2.5, (Math.PI / 180) * 45, 0, 360);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
    if (j == 1) {
        ctx.beginPath();
        ctx.ellipse(x - blockWigth / 2.5, y - blockWigth / 2.5, blockWigth / 6, blockWigth / 2.5, (Math.PI / 180) * -45, 0, 360);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.ellipse(x + blockWigth / 2.5, y, blockWigth / 8, blockWigth / 2.9, (Math.PI / 180) * -50, 0, 360);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(x - blockWigth / 2.5, y, blockWigth / 8, blockWigth / 2.9, (Math.PI / 180) * 50, 0, 360);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(x, y + 2, blockWigth / 2, blockHight / 2.2, 0, 0, 360);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(x, y + blockWigth / 8, blockWigth / 3, blockHight / 3, 0, 0, 360);
    ctx.fillStyle = "#006600";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x + 8, y - 20, blockWigth / 6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x - 8, y - 20, blockWigth / 6, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    if (!gameOver) {
        ctx.beginPath();
        ctx.arc(x + 8, y - 20, blockWigth / 10, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x - 8, y - 20, blockWigth / 10, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    } else {
        drawX(ctx, x + 8, y - 20, blockWigth / 10)
        drawX(ctx, x - 8, y - 20, blockWigth / 10)
    }


    ctx.beginPath();
    ctx.rect(0, gameScreenH, gameScreenW, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

}

function drawX(ctx, cx, cy, half) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    // ＼
    ctx.moveTo(cx - half, cy - half);
    ctx.lineTo(cx + half, cy + half);

    // ／
    ctx.moveTo(cx + half, cy - half);
    ctx.lineTo(cx - half, cy + half);

    ctx.stroke();
}


function fruit() {
    for (n = 1; n <= 11; n++) {
        for (m = 1; m <= 11; m++) {
            if (fruits[n][m].status === 1) {
                var fruitX = (gameScreenW / 13) * n + (gameScreenW / 13) / 2;
                var fruitY = (gameScreenW / 13) * m + (gameScreenW / 13) / 2;
                fruits[n][m].x = fruitX;
                fruits[n][m].Y = fruitY;
                if (fruits[n][m].type === 0) {
                    ctx.beginPath();
                    ctx.arc(fruitX, fruitY, blockWigth / 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#FF7F3F";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(fruitX + 6, fruitY - 7, blockWigth / 10, 0, Math.PI * 2);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.rect(fruitX + 1.5, fruitY - 5, -3, -15);
                    ctx.fillStyle = "black";
                    ctx.fill();
                    ctx.closePath();
                }

                if (fruits[n][m].type === 1) {
                    ctx.beginPath();
                    ctx.arc(fruitX, fruitY, blockWigth / 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#AAC8A7";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(fruitX + 6, fruitY - 7, blockWigth / 10, 0, Math.PI * 2);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.rect(fruitX + 1.5, fruitY - 5, -3, -15);
                    ctx.fillStyle = "black";
                    ctx.fill();
                    ctx.closePath();
                }

                if (fruits[n][m].type === 2) {
                    ctx.beginPath();
                    ctx.arc(fruitX, fruitY, blockWigth / 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#FBDF07";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(fruitX + 6, fruitY - 7, blockWigth / 10, 0, Math.PI * 2);
                    ctx.fillStyle = "white";
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.rect(fruitX + 1.5, fruitY - 5, -3, -15);
                    ctx.fillStyle = "black";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}


function collisionDetection() {

    var score2
    score2 = (Math.floor(score / 1000)) * 10

    if (score2 > 150) {
        score2 = 150;
    }



    fruits_tick += 1;
    var fruits_speed = 0
    if (fruits_tick >= (150 - (Math.floor(score / 1000)))) {
        fruitsrandom = (Math.floor(Math.random() * (12 - 1) + 1));

        if (fruits[fruitsrandom][1].status === 1) {
            fruits_tick == 0;
        } else {
            fruits[fruitsrandom][1].status = 1;
            fruits[fruitsrandom][1].type = 0;

            fruits[fruitsrandom][1].down = 99;
            fruits_tick = 0;
        }
    }

    if (blueA > 0) {
        fruitsrandom = (Math.floor(Math.random() * (12 - 1) + 1));
        fruits[fruitsrandom][1].status = 1;
        fruits[fruitsrandom][1].type = 1;

        fruits[fruitsrandom][1].down = 99;
        blueA -= 1
    }

    if (goldA > 0) {
        fruitsrandom = (Math.floor(Math.random() * (12 - 1) + 1));
        fruits[fruitsrandom][1].status = 1;
        fruits[fruitsrandom][1].type = 2;

        fruits[fruitsrandom][1].down = 99;
        goldA -= 1
    }


    for (let n = 1; n <= 11; n++) {
        for (let m = 1; m <= 11; m++) {
            const b = fruits[n][m];
            if (b.status === 1) {
                fruits[n][2].score = 1200;
                fruits[n][2].score = 1200;
                fruits[n][3].score = 1000;
                fruits[n][4].score = 1000;
                fruits[n][5].score = 500;
                fruits[n][6].score = 500;
                fruits[n][7].score = 300;
                fruits[n][8].score = 300;
                fruits[n][9].score = 100;
                fruits[n][10].score = 0;
                fruits[n][11].score = 0;

                if (
                    Sx > (gameScreenW / 13) * n &&
                    Sx < (gameScreenW / 13) * n + (gameScreenW / 13) &&
                    Sy > (gameScreenW / 13) * m &&
                    Sy < (gameScreenW / 13) * m + (gameScreenW / 13)
                ) {
                    b.status = 0;
                    scores[n][m].status = 100;
                    score += b.score;
                    blueA_score += b.score
                    goldA_score += b.score

                    if (blueA_score >= 3000) {
                        blueA += 1;
                        blueA_score -= 3000
                    }


                    if (goldA_score >= 10000) {
                        goldA += 1;
                        goldA_score -= 10000
                    }

                    if (b.type == 1) {
                        reBlock += 1;
                    }
                    if (b.type == 2) {
                        reBlock += 6;
                    }
                    b.type = 0;
                }

                fruitsdawn_speed = score / 1000
                if (fruitsdawn_speed > 50) {
                    fruitsdawn_speed = 50
                }
                fruits[n][m].down += 1;
                if (fruits[n][m].down >= 100 - fruitsdawn_speed) {
                    fruits[n][m].status = 0;
                    fruits[n][m + 1].status = 1;
                    fruits[n][m].down = 0;
                    if (fruits[n][m].type === 1) {
                        fruits[n][m + 1].type = 1;
                    }

                    if (fruits[n][m].type === 2) {
                        fruits[n][m + 1].type = 2;
                    }
                    fruits[n][m].type = 0;
                }
                if (m == 10 && n == playerX) {

                    //ゲームオーバー
                    gameOver = true;
                }
                if (m == 11) {
                    if (blocks[n].status == 1) {
                        blocks[n].break = 100;
                    }
                    blocks[n].status = 0;
                    fruits[n][11].status = 0;
                }
            }
        }
    }
}


function drawScore() {

    ctx.beginPath();
    ctx.rect(0, 0, gameScreenW, gameScreenH);
    ctx.fillStyle = "#164863";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(0, 0, gameScreenW, 35);
    ctx.fillStyle = "#071952";
    ctx.fill();
    ctx.closePath();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`SCORE:${score}pt`, 8, 30);

    for (var n = 1; n <= 11; n++) {
        for (var m = 1; m <= 11; m++) {

            scores[n][2].score = 1200;
            scores[n][2].score = 1200;
            scores[n][3].score = 1000;
            scores[n][4].score = 1000;
            scores[n][5].score = 500;
            scores[n][6].score = 500;
            scores[n][7].score = 300;
            scores[n][8].score = 300;
            scores[n][9].score = 100;
            scores[n][10].score = 0;
            scores[n][11].score = 0;


            if (scores[n][m].status > 0 && m <= 9) {
                ctx.fillStyle = "white";
                ctx.font = "15px Arial";
                ctx.fillText(`${scores[n][m].score}`, (gameScreenW / 13) * n + 15, (gameScreenW / 13) * m + 20);
            }
            scores[n][m].status -= 1
        }
    }
}

function GameOver() {

}

var deadAnimFallSpd = 0;
var deadAnimFall = false;
function gameloop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    block();
    chara();
    fruit();
    if (!gameOver) collisionDetection();
    reblock();

    if (gameOver) {
        ctx.beginPath();
        ctx.rect(0, 0, gameScreenW, gameScreenH);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 80px Arial";
        ctx.fillText(`記録 ${Math.floor(score)}ポイント`, canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "left";

        if (!deadAnimFall) {
            deadAnimFallSpd -= 4;
            deadAnimFall = true;
        }

        if (Math.abs(deadAnimFallSpd) < 0.3) {
            deadAnimFallSpd += 0.05;
        } else {
            deadAnimFallSpd += 0.2;
        }
        y += deadAnimFallSpd;
        /* if (score > high_score) {
             high_score = score;
             high_score = Math.floor(high_score)
             localStorage.setItem(`high_score`, `${score}`)
 
             ctx.font = "50px Arial";
             ctx.fillText(`ハイスコア更新`, canvas.width / 2, canvas.height / 2 + 100);
 
         } else {
             ctx.font = "50px Arial";
             ctx.fillText(`ハイスコア ${high_score}M`, canvas.width / 2, canvas.height / 2 + 100);
         }*/
    }

    drawTouchButtons();
}
const GL = setInterval(gameloop, 10);
