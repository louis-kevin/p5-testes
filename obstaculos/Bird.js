class Bird extends Obstaculo{
    constructor(){
        super();
        this.altura = 20;
        this.largura = 30;
    
        this.posicaoY = FLOOR_POS_Y - this.altura - 60;
    }
}
