function Walls() {
    this.limitOfWalls = 3;
    this.taxaParaCriacaoDeNovasWalls = 0.3;
    this.walls = [];
    this.indexDeadWalls = [];

    this.update = function () {
        this.updateWalls();

        this.removeDeadWalls();

        this.checkQuantidadeWalls();

        this.tryCreateNewWall();

    };

    this.addWall = function () {
        if(this.limitOfWalls > this.walls.length){
            this.walls.push(new Wall());
        }
    };

    this.removeWalls = function () {
        this.walls = [];
        this.indexDeadWalls = [];
        this.taxaParaCriacaoDeNovasWalls = 0.3;
    };

    this.updateWalls = function () {
        this.walls.forEach((wall, key) => {
            wall.update();
            if (wall.isDead()) {
                this.taxaParaCriacaoDeNovasWalls += 0.1;
                this.indexDeadWalls.push(key)
            } else if (this.taxaParaCriacaoDeNovasWalls > 0.3) {
                this.taxaParaCriacaoDeNovasWalls -= 0.1;
            }
        });
    };

    this.removeDeadWalls = function () {
        this.indexDeadWalls.forEach((index) => this.walls.splice(index, 1));
        this.indexDeadWalls = [];
    };

    this.checkQuantidadeWalls = function () {
        if (this.walls.length <= 0) {
            this.taxaParaCriacaoDeNovasWalls = 0.9;
        }
    };

    this.tryCreateNewWall = function () {
        if (random(0, 1) < this.taxaParaCriacaoDeNovasWalls) {
            const lastWall = this.walls[this.walls.length - 1];
            if (!lastWall || lastWall.posicaoX < width * random(0.15, 0.5)) {
                this.addWall();
            }
        }
    }
}
