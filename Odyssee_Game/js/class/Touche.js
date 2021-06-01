class Touche extends Phaser.GameObjects.Container{

    constructor( scene, x, y, name){

        super( scene, x, y );

        this.scene.add.existing( this );

        // Déclaration des variables
        // La scene actuelle de l'instance
        this.scene = scene;

        this.touche = false;

        this.name = name;

        if( name == "Q" ){
            this.touche = scene.add.image( 0, 0, 'Qtuto' );
        }   
        else if( name == "D" ){
            this.touche = scene.add.image( 0, 0, 'Dtuto' );
        }
        else if( name == "Z" ){
            this.touche = scene.add.image( 0, 0, 'Ztuto' );
        }
        else{
            this.touche = scene.add.image( 0, 0, 'Espacetuto' );
        }

        this.setDepth(100)
        // Ajout du fond et du text dans le container
        this.add( this.touche );

        this.touche.setScale(0);
        
    }

    tweenScale( bool ){
        if( bool ){
            var scale = 1;
        }
        else{
            var scale = 0;
        }
        this.scene.tweens.add({
            targets: this.touche,
            scale: scale,
            ease: 'Expo',
            duration: 2000,
            delay: 700,
        });
    }

}