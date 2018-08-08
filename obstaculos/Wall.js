function Wall(){
    this.altura = random(30, 100);
    this.largura = 30;

    this.posicaoY = FLOOR_POS_Y - this.altura;
    this.posicaoX = width;

    this.isDead = false;

    this.display = function(){
        fill(255, 153, 59);
        noStroke();
        rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    };

    this.update = function () {
        this.posicaoX -= GAMESPEED;
        this.display();
        this.checkIsDead();
    };

    this.checkIsDead = function () {
        this.isDead = this.posicaoX <= (this.largura*-1);
    }
}