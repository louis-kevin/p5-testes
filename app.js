const GRAVITY = 0.6;
const JUMP_FORCE = 15;
let GAMESPEED = 5;
let FLOOR_POS_Y;

let floor;
let player;
let walls;


function setup() {
    createCanvas(720, 400);
    FLOOR_POS_Y = height*0.9;
    floor = new Floor();
    player = new Player();
    walls = new Walls();
}

function draw() {
    // Set the background to black and turn off the fill color
    background(0);

    floor.display();

    walls.update();

    player.update(walls.walls[0]);

    if(player.isDead){
        walls.removeWalls();
        walls.addWall();
    }

}


function mouseClicked(){
    player.jump();
}
