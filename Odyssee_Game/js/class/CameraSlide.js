class CameraSlide extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color, angle, dir, id ){

        super( scene, x, y );
        
        this.scene.add.existing( this ); 

        // Déclaration des variables
        // La scene actuelle de l'instance
        this.scene = scene;

        // Son id par rapport aux autres instances
        this.id = id;

        // Sauvegarder l'angle de l'instance
        this.varAngle = angle;

        // La direction du slide de camera a faire
        this.dir = dir;

        // Couleur pour savoir quand l'activer en fonction de la dimension
        this.color = color;

        // Avoir la direction opposé
        this.inverseDir = this.inverse( dir );

        // Creation des hitbox en fonction de l'angle
        if( angle == 0){
            this.hitBox = createHitbox( this.scene, 0, 0, 100, game.config.width*4, true );
            this.hitBoxDeath = createHitbox( this.scene, -100, 0, 100, game.config.width*4, true );
        }
        else{
            this.hitBox = createHitbox( this.scene, 0, 0, game.config.width*4, 100, true );
            this.hitBoxDeath = createHitbox( this.scene, 0, -100, game.config.width*4, 100, true );
        }
        
        // Variable pour pouvoir accès a la classe depuis le sprite
        this.hitBox.parent = this;
        this.hitBoxDeath.parent = this;

        // Ajout des hitbox au container
        this.add( [ this.hitBox, this.hitBoxDeath ] );

        // Reglage de la profondeur
        this.setDepth(100)

        // Ajout de la physique 
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

    // Mettre le côté opposé du numéro d'un rectangle
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

    // Faire apparaitre le body
    display(){
        this.scene.physics.world.enable( this.hitBox );
    }

    // Faire disparaitre le body
    hide(){
        this.scene.physics.world.disable( this.hitBox );
    }
}