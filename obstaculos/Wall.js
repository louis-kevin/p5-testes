class Wall extends Obstaculo{
    constructor(){
        super();
        this.altura = random(30, 100);
        this.largura = 30;
    
        this.posicaoY = FLOOR_POS_Y - this.altura;
        
    }

}
