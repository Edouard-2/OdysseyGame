class Bouton extends Phaser.GameObjects.Container{

    constructor( scene, x, y, name , taille, scale){

        super( scene, x, y );

        this.scene.add.existing( this );

        // Déclaration des variables
        // La scene actuelle de l'instance
        this.scene = scene;

        this.ScaleY = scale;

        // Nom du bouton
        this.name = name;

        // Fond du bouton
        this.bg = scene.add.image( 0,0,'Bouton' ).setTint( White );

        // Texte écrit sur le bouton
        this.text = scene.add.text( 0, 0, name, { fontFamily: "SaintTropez",fontSize: taille*80 + 'px', color : BlackText }).setOrigin( 0.5, 0.53 );

        // Ajout du fond et du text dans le container
        this.add( [this.bg, this.text] );

        // Faire l'animation d'arrivé des boutons
        this.bg.setScale(0);
        this.text.setScale(0);
        this.addTweens(); 
    }

    // Creation animaion d'apparition
    addTweens(){
        this.tween = { 
            0:  this.scene.tweens.add({
                targets: this.text,
                scale: 1.1,
                ease: 'Back',
                duration: 1000,
            }),
            1: this.scene.tweens.add({
                targets: this.bg,
                scale: 1,
                ease: 'Back',
                duration: 1000,

            })
        }
    }
}