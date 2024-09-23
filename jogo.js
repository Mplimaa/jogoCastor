var beaverImage;
var beaverJumpImage;

function preload() {
    beaverImage = loadImage("imagens/Hopper-Happy.jpg");
    beaverJumpImage = loadImage("imagens/Hopper-Jumping.jpg");
}

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = beaverImage;
    this.sticks = 0;
};

Beaver.prototype.draw = function() {
    this.y = constrain(this.y, 0, height - 50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = beaverJumpImage;
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = beaverImage;
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400; // Remove o stick
        this.sticks++;
    }
};

var beaver;
var sticks = [];
var gameOver = false;

function setup() {
    createCanvas(800, 400);
    beaver = new Beaver(200, 300);

    for (var i = 0; i < 40; i++) {
        sticks.push(new Stick(i * 40 + 300, random(20, 260)));
    }
}

function draw() {
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height * 0.90, width, height * 0.10);

    for (var i = 0; i < sticks.length; i++) {
        if (sticks[i].x >= 0) {
            sticks[i].draw();
            beaver.checkForStickGrab(sticks[i]);
            sticks[i].x -= 1;
        }
    }

    textSize(18);
    text("Score: " + beaver.sticks, 20, 30);

    // Verifica se todos os sticks saíram da tela
    if (sticks[sticks.length - 1].x < 0 && !gameOver) {
        // Avalia a condição de derrota
        if (beaver.sticks < sticks.length * 0.95) {
            gameOver = true;
        } else {
            // Condição de vitória
            textSize(36);
            text("VOCÊ GANHOU, PARABÉNS!!!!", 100, 200);
            noLoop(); // Para o jogo
        }
    }

    if (gameOver) {
        textSize(36);
        text("VOCÊ PERDEU, TENTE NOVAMENTE!", 100, 200);
        noLoop(); // Para o jogo
    } else {
        // Permitir pular
        if (keyIsPressed && keyCode === 32) {
            beaver.hop();
        } else {
            beaver.fall();
        }
        beaver.draw();
    }
}
