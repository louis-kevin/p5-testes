const GRAVITY = 0.6;
const JUMP_FORCE = 15;
let GAMESPEED = 5;
let FLOOR_POS_Y;

let floor;
let player;
let obstaculosHandler;

function setup() {
    createCanvas(720, 400);
    FLOOR_POS_Y = height*0.9;
    floor = new Floor();
    player = new Player();
    obstaculosHandler = new ObstaculosHandler();
}

function draw() {

    background(0);

    floor.display();

    obstaculosHandler.update();

    player.update(obstaculosHandler.getFirstObstaculo());

    if(player.isDead){
        player.isDead = false;
        obstaculosHandler.removeObstaculos();
    }

}


function mouseClicked(){
    player.jump();
}
