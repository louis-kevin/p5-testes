function ObstaculosHandler() {
    this.limitOfObstaculos = 3;
    this.taxaParaCriacaoDeNovasObstaculos = 0.3;
    this.obstaculos = [];
    this.indexDeadObstaculos = [];

    this.update = function () {
        this.updateObstaculos();
        this.removeDeadObstaculos();
        this.checkQuantidadeObstaculos();
        this.tryCreateNewObstaculos();
    };

    this.addObstaculo = function () {
        if (this.limitOfObstaculos > this.obstaculos.length) {
            this.obstaculos.push(random(0, 1) > 0.5 ? new Wall() : new Bird());
        }
    };

    this.removeObstaculos = function () {
        this.obstaculos = [];
        this.indexDeadObstaculos = [];
        this.taxaParaCriacaoDeNovasObstaculos = 0.9;
    };

    this.updateObstaculos = function () {
        this.obstaculos.forEach((obstaculo, key) => {
            obstaculo.update();
            if (obstaculo.isDead) {
                this.taxaParaCriacaoDeNovasObstaculos += 0.1;
                this.indexDeadObstaculos.push(key);
            } else if (this.taxaParaCriacaoDeNovasObstaculos > 0.3) {
                this.taxaParaCriacaoDeNovasObstaculos -= 0.1;
            }
        });
    };

    this.removeDeadObstaculos = function () {
        this.indexDeadObstaculos.forEach((index) => {
            this.obstaculos.splice(index, 1)
        });
        this.indexDeadObstaculos = [];
    };

    this.checkQuantidadeObstaculos = function () {
        if (this.obstaculos.length <= 0) {
            this.taxaParaCriacaoDeNovasObstaculos = 0.9;
        }
    };

    this.tryCreateNewObstaculos = function () {
        if (random(0, 1.0) > this.taxaParaCriacaoDeNovasObstaculos) {
           return;
        }
         
        if (this.obstaculos.length <= 0) {
            this.addObstaculo();
            return;
        }

        const lastObstaculo = this.obstaculos[this.obstaculos.length - 1];
        if (lastObstaculo.posicaoX < width * random(0.15, 0.5)) {
            this.addObstaculo();
        }
    }

    this.getFirstObstaculo = function(){
        return this.obstaculos.length <= 0 ? false : this.obstaculos[0]
    }
}
