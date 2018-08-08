function Floor() {
    this.altura = 10;

    this.posicaoX = 0;
    this.largura = width;

    this.display = function (){
        fill(255, 153, 0);
        noStroke();
        rect(this.posicaoX , FLOOR_POS_Y, this.largura, this.altura);
    }

}
