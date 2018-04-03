# frontend-nanodegree-arcade-game

Its a simple game for one of the third project in the udacity frontend developer [nanodegree](https://de.udacity.com/course/front-end-web-developer-nanodegree--nd001).

### TOC
1. Usage
  1. To the players
  2. To the developers
1. Installation
2. Licence
3. Original README

## Usage:
### To the players:

The game works like the old arcade game Frogger. Just without frogs.
Move the player with the _up, down, left_ and _right_ keys of your keyboard and dont touch the bugs! If you do so you die and you need to start over. To win the game reach the water.

Use the github pages link for a easy tryout: https://fr33d-.github.io/frontend-nanodegree-arcade-game/index.html


### To the developers:
Its a simple HTML/JS game in a single view. index.html contains all semantic data. The js/app.js file has all player and enemy logic in it. To understand the logic please see the comments in that file. The js/engine.js provides the game engine and the js/resources.js provides all resources for the project.

The development uses:
1. node and npm
2. Gulp to build scss and run a liveserver

## Installation:
You can run it from the index.html or as a developer runt the development server:

or, as a developer:

1: run
```shell
npm install
```
2: start the liveserver
```shell
gulp
```

## License:
MIT License

Copyright (c) [2018] [Frederic Wollinger]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Original README

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
