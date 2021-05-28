class CameraSlide extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color, angle, dir, id ){

        super( scene, x, y );

        this.scene = scene;

        this.id = id;
        console.log(id)
        console.log("camera slide")

        this.varAngle = angle;

        this.scene.add.existing( this );  

        this.dir = dir;

        this.inverseDir = this.inverse( dir );

        this.color = color;

        if( angle == 0){
            this.hitBox = createHitbox( this.scene, 0, 0, 100, game.config.width*4, true );
            this.hitBoxDeath = createHitbox( this.scene, -100, 0, 100, game.config.width*4, true );
        }
        else{
            this.hitBox = createHitbox( this.scene, 0, 0, game.config.width*4, 100, true );
            this.hitBoxDeath = createHitbox( this.scene, 0, -100, game.config.width*4, 100, true );
        }
        
        this.hitBox.parent = this;
        this.hitBoxDeath.parent = this;

        this.add( [ this.hitBox, this.hitBoxDeath ] );

        this.setDepth(100)

        this.scene.physics.world.enable( this.hitBox ); 

    }

    // Deplacer le scroll de la camera pour bien la centrer
    changeCamera( bool ){
        if( bool ){
            var dir = this.dir;
        }
        else{
            var dir = this.inverseDir;
        }
        console.log("camera")
        if( dir == 0 ){
            // // console.log("Haut");
            tweenCamera( this.scene, false, this.scene.cameras.main.scrollY - game.config.height *2 );
        }
        else if( dir == 1 ){
            // // console.log("Droite");
            tweenCamera( this.scene, this.scene.cameras.main.scrollX + game.config.width *2 );
        }
        
        else if( dir == 2 ){
            // // console.log("Bas");
            tweenCamera( this.scene, false, this.scene.cameras.main.scrollY + game.config.height *2 );
        }

        else if( dir == 3 ){
            // // console.log("Gauche");
            tweenCamera( this.scene, this.scene.cameras.main.scrollX - game.config.width *2 );
        }
    }

    inverse( nbr ){
        if( nbr == 0 ){
            nbr = 2;
        }
        else if( nbr == 1 ){
            nbr = 3;
        }
        else if( nbr == 2 ){
            nbr = 0;
        }
        else if( nbr == 3 ){
            nbr = 1;
        }
        return nbr;
    }

    display(){
        this.scene.physics.world.enable( this.hitBox );
    }

    hide(){
        this.scene.physics.world.disable( this.hitBox );
    }
}