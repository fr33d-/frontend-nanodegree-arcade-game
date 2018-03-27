// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;

    let random = Math.random();

    if (random < 0.33) {
        this.y = rowHeight-40;
        this.col = 2;
    } else if (random > 0.33 && random < 0.67) {
        this.y = (2*rowHeight)-60;
        this.col = 3;
    } else if (random > 0.67) {
        this.y = (3*rowHeight)-80;
        this.col = 4;
    }

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

    this.x += dt*enemySpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.col = 6;
        this.row = 3;
        this.x = (this.row-1) * 101;
        this.y = (this.col-1) * 83 -20;
        this.movementType = "go";

    }

    render() {
        // ctx.drawImage(Resources.get(this.sprite), this.col * rowHeight, this.row * rowWidth-20);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //Todo: dt stuff
        // this.x = (this.row-1) * rowHeight;
        // this.y = (this.col-1) * rowWidth -20;

        //Value the player should move to
        var xValue = (this.row-1) * rowHeight;
        var yValue = (this.col-1) * rowWidth -20;

        if (this.movementType == "go") {
            //Update the players position, so he/she moves to his position with the player speed
            //+/- 5 px so the character is not flickering
            if (this.x < xValue-5) {
                this.x += dt * playerSpeed;
            } else if (this.x > xValue+5) {
                this.x -= dt * playerSpeed;
            }

            if (this.y < yValue-5) {
                this.y += dt * playerSpeed;
            } else if (this.y > yValue+5) {
                this.y -= dt * playerSpeed;
            }
        }

        if (this.movementType == "die") {
            if (this.y < 600) {
                this.y += dt * 1500;
            } else {
                this.movementType = "birth";
                this.y = -100;
            }
        }

        if (this.movementType == "birth") {
            this.x = xValue;
            if (this.y < yValue) {
                this.y += dt * 1500;
            } else {
                this.movementType = "go";
            }
        }

    }

    die() {
        //The player is dead: Set his "should go"-position to the initial values and he moves there with a nice animation defined in the update method
        this.movementType = "die";
        this.col = 6;
        this.row = 3;
    }

    win() {
        //The player wins: Set his "should go"-position to the initial values and he moves there with a nice animation defined in the update method
        this.movementType = "birth";
        this.col = 6;
        this.row = 3;
    }

    handleInput(key) {
        console.log(key);

        switch (key) {
            case 'left':
                if (this.row > 1) {
                    this.row--;
                }
                break;
            case 'up':
                if (this.col > 1) {
                    this.col--;
                }
                break;
            case 'right':
                if (this.row <= 4) {
                    this.row ++;
                }
                break;
            case 'down':
                if (this.col <= 5) {
                    this.col++;
                }
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var difficulty = 3;
var enemyFrequency = difficulty;

function updateAllEnemies(dt) {

    //Add enemies to the game in a frequency defined by the difficulty
    enemyFrequency += dt;
    if (enemyFrequency > difficulty) {
        allEnemies.push(new Enemy());
        enemyFrequency = 0;
    }

    //Delete enemies from array when they are off the field to save memory.
    //Basic that the game is not slowing down.
    allEnemies.forEach(function(enemy, index) {
        if (enemy.x > canvasWidth) {
            allEnemies.splice(index, 1);
        }
    });
}

function checkCollisions() {
    //Let the player die if he/she collides with an enemy
    allEnemies.forEach(function(enemy) {
        if (enemy.x-75 <= player.x && enemy.x+75 >= player.x && enemy.col == player.col) {
            player.die();
            console.log("You died");
        }
    });

    if (player.col <= 1) {
        player.win();
    }
}



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
