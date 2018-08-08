function Player() {
    this.altura = 50;
    this.posicaoX = 50;
    this.posicaoY = FLOOR_POS_Y - this.altura;
    this.largura = 50;

    this.gravitySpeed = 1;

    this.touchingFloor = true;

    this.isDead = false;

    this.display = function () {
        fill(255, 153, 59);
        noStroke();
        rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    };

    this.update = function (obstaculo) {
        this.checkTouchingFloor();

        this.applyGravity();

        this.display();

        this.checkIsDead(obstaculo);

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
}
