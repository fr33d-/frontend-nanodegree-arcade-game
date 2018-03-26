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

    //Todo: time save
    this.x++;
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
    }

    render() {
        // ctx.drawImage(Resources.get(this.sprite), this.col * rowHeight, this.row * rowWidth-20);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //Todo: dt stuff
        this.x = (this.row-1) * rowHeight;
        this.y = (this.col-1) * rowWidth -20;
    };

    die() {
        //Todo: do something when the player dies
        this.col = 6;
        this.row = 3;
    }

    win() {
        //Tod: what happens when the player wins?
        this.col = 6;
        this.row = 2;
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var difficulty = 3
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
