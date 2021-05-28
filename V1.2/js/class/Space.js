class Space extends Phaser.GameObjects.Container {
    constructor( scene, cameraEmpty){
        super( scene, cameraEmpty.x, cameraEmpty.y);

        scene.add.existing(this);

        this.scene = scene;
        this.hit = [];

        // Gauche
        this.hit.push( createHitbox( this.scene, -( game.config.width * 2 / proportionZoom )-900, game.config.height -300, 100, game.config.height * 6 / proportionZoom ) );

        // Haut
        this.hit.push( createHitbox( this.scene, 0-900, -game.config.height*2/proportionZoom -300, game.config.width*6, 100  ) );

        // Droite
        this.hit.push( createHitbox( this.scene, ( game.config.width * 3 / proportionZoom )-900, game.config.height -300, 100, game.config.height * 6 / proportionZoom ) );

        // Bas
        this.hit.push( createHitbox( this.scene, 0-900, game.config.height*3/proportionZoom -300, game.config.width*6, 100) );

        this.add( this.hit );
    }

    desactive(){
        this.hit.forEach( elem =>{
            this.scene.physics.world.disable( elem );
        } );
    }    
}