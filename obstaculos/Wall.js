class Wall extends Obstaculo{
    constructor(){
        super();
        this.altura = random(20, 70);
        this.largura = 30;
    
        this.posicaoY = FLOOR_POS_Y - this.altura;
        
    }

}
