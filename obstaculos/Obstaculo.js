class Obstaculo{
    constructor(){
        this.posicaoX = width;

        this.isDead = false;
    }

    display(){
        fill(255, 153, 59);
        noStroke();
        rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
    };

    update(){
        this.posicaoX -= GAMESPEED;
        this.display();
        this.checkIsDead();
    };

    checkIsDead () {
        this.isDead = this.posicaoX <= (this.largura*-1);
    }
}