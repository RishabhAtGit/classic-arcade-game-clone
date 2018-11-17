// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.resetXCoord= x;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < 450){
      this.x += this.speed * dt;
    }
    else{
      this.x = this.resetXCoord;
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
  constructor(){
    this.startXCoord = 200;
    this.startYCoord = 380;
    this.xCoord = this.startXCoord;
    this.yCoord = this.startYCoord;
    this.sprite = 'images/char-boy.png';
    this.gameOver = false;
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.xCoord, this.yCoord);
  }

  handleInput(input){
    if(input === 'left' && this.xCoord > 0)
      this.xCoord -= 100;
    if(input === 'right' && this.xCoord < 400)
      this.xCoord += 100;
    if(input === 'up' && this.yCoord > 0)
      this.yCoord -= 80;
    if(input === 'down' && this.yCoord < 380)
      this.yCoord += 80;
  }

  update(){
     for (let enemy of allEnemies){
       if(enemy.y === this.yCoord  && (enemy.x < this.xCoord +50 && enemy.x+50 > this.xCoord)){
         this.reset();
       }
     }
     if(this.yCoord === -20){
       this.gameOver = true;
     }
  }

  reset(){
    this.xCoord = this.startXCoord;
    this.yCoord = this.startYCoord;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Player Class object
const player = new Player();

//Enemy Class object
const enemy1 = new Enemy(-400,60,200);
const enemy2 = new Enemy(-350,140,250);
const enemy3 = new Enemy(-400,220,300);

//Enemies array
const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3);

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
