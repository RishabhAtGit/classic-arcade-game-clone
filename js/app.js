// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x; // initial x coordinate of enemy
  this.y = y; // initial y coordinate of enemy
  this.speed = speed; // initial speed of enemy
  this.resetXCoord = x; // starting x coordinate used resetting enemy position
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'; // stores the image for the enemy
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  if (this.x < 450) {
    this.x += this.speed * dt; // updating the position of enemy
  } else {
    this.x = this.resetXCoord; // resetting the position of enemy when it reaches the boundary of the game board
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// player class
class Player {
  constructor() {
    this.startXCoord = 200; // initial x coordinate of player
    this.startYCoord = 380; // initial y coordinate of player
    this.xCoord = this.startXCoord; // x coordinate of player after the game begins
    this.yCoord = this.startYCoord; // y coordinate of player after the game begins
    this.sprite = 'images/char-boy.png'; // stores the images used for player
    this.gameOver = false; // game status
  }

  // method for rendering player on the game board
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.xCoord, this.yCoord);
  }

  // method for handling input from keyboard
  handleInput(input) {
    if (input === 'left' && this.xCoord > 0)
      this.xCoord -= 100;
    if (input === 'right' && this.xCoord < 400)
      this.xCoord += 100;
    if (input === 'up' && this.yCoord > 0)
      this.yCoord -= 80;
    if (input === 'down' && this.yCoord < 380)
      this.yCoord += 80;
  }

  // method for updating the player position in the game
  update() {
    for (let enemy of allEnemies) {
      if (enemy.y === this.yCoord && (enemy.x < this.xCoord + 50 && enemy.x + 50 > this.xCoord)) {
        this.reset();
      }
    }
    if (this.yCoord === -20) {
      this.gameOver = true;
    }
  }
  // method to reset player position
  reset() {
    this.xCoord = this.startXCoord;
    this.yCoord = this.startYCoord;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Player Class object
const player = new Player();

//Enemy Class objects
const enemy1 = new Enemy(-400, 60, 200);
const enemy2 = new Enemy(-350, 140, 250);
const enemy3 = new Enemy(-400, 220, 300);

//Enemies array
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
