function Population() {
    this.population = [];
    this.everyoneIsDead = false;
    this.best;
    this.secondBest;

    this.generateFirstGeneration = function(){
        for(var i = 0; i < 200; i++){
            this.population.push(new Player());
        }
    }

    this.update = function(){
       this.updatePlayers();

       if(this.everyoneIsDead){
           this.generateNextGeneration();
       }
    }

    this.updatePlayers = function(){
        var isOneAlive = false;
        this.population.forEach((player)=>{
            player.update();
            this.updateBests(player);
            if(!isOneAlive && !player.isDead){
                isOneAlive = true;
            }
        })
        this.everyoneIsDead = !isOneAlive;
    }

    this.updateBests = function(player){
        if(!this.best || this.best.score < player){
            this.best = player;
        }else if(!this.secondBest || this.secondBest.score < player.score){
            this.secondBest = player;
        }
    }

    this.generateNextGeneration = function(){
        var newGeneration = [];
        
        newGeneration.push(this.best);
        newGeneration.push(this.secondBest);

        var mutationRate = .3;

        for(var i = 0; i < this.population.length - 3; i++){
            this.newGeneration.push(this.best.crossover(this.secondBest, mutationRate));
        }
    }
}