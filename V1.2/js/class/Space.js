class Space extends Phaser.GameObjects.Container {
    constructor( scene, camera){
        super( scene, camera.scrollX, camera.scrollY);

        scene.add.existing(this);

        this.scene = scene;
        this.hit = [];

        // Gauche
        this.hit.push( createHitbox( this.scene, -( game.config.width * 2 )/ proportion, game.config.height/ proportion, 100, game.config.height * 6 ) );

        // Haut
        this.hit.push( createHitbox( this.scene, 0, -game.config.height*2/ proportion, game.config.width*6, 100  ) );

        // Droite
        this.hit.push( createHitbox( this.scene, ( game.config.width * 3 )/ proportion, game.config.height/ proportion, 100, game.config.height * 6 ) );

        // Bas
        this.hit.push( createHitbox( this.scene, 0, game.config.height*3/ proportion, game.config.width*6, 100) );

        this.add( this.hit );
    }

    desactive(){
        this.hit.forEach( elem =>{
            this.scene.physics.world.disable( elem );
        } );
    }

    
}