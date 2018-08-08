function Player() {
    this.altura = 50;
    this.posicaoX = 50;
    this.posicaoY = FLOOR_POS_Y - this.altura;
    this.largura = 50;

    this.gravitySpeed = 1;

    this.touchingFloor = true;

    this.isDead = false;

    this.distanciaObstaculo = width;
    this.alturaObstaculo = 0;

    this.output = 0;

    this.distanciaDoPulo = random();

    this.isBest = false;
    this.isSecondBest = false;

    this.score = 0;

    this.display = function () {
        if(this.isBest){
            fill(50, 205, 50);
        }else if(this.isSecondBest){
            fill(30,144,255);
        }else{
            fill(255, 153, 59);
        }
        noStroke();
        rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    };

    this.update = function (obstaculo) {
        this.checkTouchingFloor();

        this.applyGravity();

        this.display();

        this.getDataObstaculo(obstaculo);

        this.learn();

        this.checkIsDead(obstaculo);

        if(!this.isDead){
            this.score++;
        }

    };

    this.checkTouchingFloor = function () {
        this.touchingFloor = this.posicaoY + this.altura >= FLOOR_POS_Y;
    };

    this.applyGravity = function () {
        if (this.touchingFloor) {
            this.posicaoY = FLOOR_POS_Y - this.altura;
            this.gravitySpeed = 1;
        } else {
            this.gravitySpeed += GRAVITY;
            this.posicaoY += this.gravitySpeed;
        }
    };

    this.jump = function () {
        if(!this.touchingFloor){
            return;
        }
        this.touchingFloor = false;
        this.gravitySpeed -= JUMP_FORCE;
        this.applyGravity()
    };

    this.checkIsDead = function(obstaculo){
        if(!obstaculo){
            return;
        }
        if(this.posicaoX + this.largura >= obstaculo.posicaoX && this.posicaoX >= obstaculo.posicaoX + obstaculo.largura){
           return;
        }

        if(this.posicaoX + this.largura <= obstaculo.posicaoX && this.posicaoX <= obstaculo.posicaoX + obstaculo.largura){
            return;
        }

        if(this.posicaoY + this.altura <= obstaculo.posicaoY || this.posicaoY >= obstaculo.posicaoY + obstaculo.altura){
            return;
        }

        this.isDead = true;
    }

    this.getDataObstaculo = function(obstaculo){
        this.distanciaObstaculo = dist(this.posicaoX + this.largura, this.posicaoY + this.altura, obstaculo.posicaoX, obstaculo.posicaoY)
        this.alturaObstaculo = obstaculo.posicaoY;
    }

    this.startBrain = function(){
        const { Layer, Network } = window.synaptic;

        this.inputLayer = new Layer(3);
        this.hiddenLayer = new Layer(3);
        this.outputLayer = new Layer(1);

        this.inputLayer.project(this.hiddenLayer);
        this.hiddenLayer.project(this.outputLayer);

        this.network = new Network({
            input: this.inputLayer,
            hidden: [this.hiddenLayer],
            output: this.outputLayer
        });
    }

    this.learn = function(){
        let output = this.network.activate([
            this.distanciaObstaculo, 
            this.alturaObstaculo,
            GAMESPEED
        ]);

        this.network.propagate(0.3, [this.distanciaObstaculo > this.distanciaDoPulo ? 0 : 1]);

        this.output = output[0];
        if(output[0] > 0.5){
            this.jump();
        }
    }   

    this.clone = function() {
        var player = new Player();
        player.distanciaDoPulo = this.distanciaDoPulo;
        return player;
    }

    this.mutate = function(){
        var player = new Player();
        player.distanciaDoPulo = this.distanciaDoPulo;
        return player;
    }
}
