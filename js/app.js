// Enemies our player must avoid
class Enemy {
    constructor() {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = -100;
        this.speed = 50;

        var random = Math.ceil(Math.random()*3);
        this.col = random + 1;
        this.y = random*rowHeight - this.col*20;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt*this.speed;
    }
}

// Player class
class Player {
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.col = 6;
        this.row = 3;
        this.x = (this.row-1) * 101;
        this.y = (this.col-1) * 83 -20;
        this.movementType = "go";
        this.speed = 200;

    }

    render() {
        // ctx.drawImage(Resources.get(this.sprite), this.col * rowHeight, this.row * rowWidth-20);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt, allEnemies) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        //Value the player should move to
        var xValue = (this.row-1) * rowHeight;
        var yValue = (this.col-1) * rowWidth -20;

        if (this.movementType == "go") {
            //Update the players position, so he/she moves to his position with the player speed
            //+/- 5 px so the character is not flickering
            if (this.x < xValue-5) {
                this.x += dt * this.speed;
            } else if (this.x > xValue+5) {
                this.x -= dt * this.speed;
            }

            if (this.y < yValue-5) {
                this.y += dt * this.speed;
            } else if (this.y > yValue+5) {
                this.y -= dt * this.speed;
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

        this.checkCollisions(allEnemies);

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

    checkCollisions(allEnemies) {
        //Let the player die if he/she collides with an enemy
        var xValue = this.x;
        var colValue = this.col;
        var playerIsDead = false;

        allEnemies.forEach(function(enemy) {
            if (enemy.x-75 <= xValue && enemy.x+75 >= xValue && enemy.col == colValue) {
                if (playerIsDead == false) {
                    playerIsDead = true;
                }
                console.log("You died");
            }
        });

        if (playerIsDead) {
            this.die();
        }

        if (this.col <= 1) {
            this.win();
        }
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
