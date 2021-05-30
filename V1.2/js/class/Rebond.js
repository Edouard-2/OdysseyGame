class Rebond extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color ){

        super( scene, x, y );

        this.scene.add.existing( this );  

        // Déclaration des variables
        // La scene actuelle de l'instance
        this.scene = scene;

        this.color = color;

        this.a_pos = [];

        this.safe = false;

        // Variable pour avoir un angle aléatoire
        this.varAngle = getRand( 360 );
        
        // Sprites
        this.rond = this.scene.add.sprite( 0 , 0 , 'rebondFond' ).setScale(0).setDepth(-2);
        this.fond = this.scene.add.sprite( 0 , 0 , 'rebondCercleFond' ).setDepth(-2);
        this.sprite = this.scene.add.sprite( 0 , 0 , 'rebond2' ).setDepth(-2).setAngle( this.varAngle );
        this.sprite2 = this.scene.add.sprite( 0 , 0 , 'rebond2' ).setDepth(-2).setAngle( this.varAngle + 180 );

        // Avoir accès a la class depuis le sprite
        this.sprite.parent = this;
        this.sprite2.parent = this;

        // Ajout au container
        this.add( [ this.sprite , this.sprite2, this.rond, this.fond ] );

        this.setDepth(100)

        // Donner la physique au sprite
        this.scene.physics.world.enable( this.sprite ); 
        this.scene.physics.world.enable( this.sprite2 ); 

        // Donner la forme ronde au body
        this.sprite.body.setCircle( this.sprite.width / 2 );
        this.sprite2.body.setCircle( this.sprite2.width / 2 + 200 ).setOffset( -200 );

        // Mettre la bonne couleur
        this.makeColor( this.color );

        // Creer les pos utile pour faire des rebonds
        this.createPosCellule();

        // Creation de l'animation
        this.tweenRond( this.sprite2, -1, 5000 );
    }

    // Animation si le joueur se rapproche de la cellule(elle se remplit)
    tweenClose(){
        // console.log("fermé")
        this.tweenStop = true;
        this.scene.tweens.add({
            targets: this.rond,
            scale: 1* proportion,
            duration: 100,
            hold: 400,
            yoyo: true
            // repeat: -1
        });
    }

    // Animation qui fait tourner les sprites
    tweenRond( obj, dir, time ){
        // console.log("heu")
        var angle = obj.angle;
        this.scene.tweens.add({
            targets: obj,
            angle: angle + (dir * 360),
            duration: time,
            ease: "lineare",
            repeat: -1
        });
    }

    // Apparaitre
    display(){
        this.scene.physics.world.enable( this.sprite );
        this.scene.physics.world.enable( this.sprite2 );
    }

    // Cacher
    hide(){
        this.scene.physics.world.disable( this.sprite );
        this.scene.physics.world.disable( this.sprite2 );
    }
    
    // Mettre a la bonne couleur
    makeColor( color ){
        if( color == White ){
            // console.log('white')
            // this.sprite.play("White");
            this.sprite.setTint( White );
            this.sprite2.setTint( White );
            this.rond.setTint( White );
            this.fond.setTint( White );
            
        }
        else if( color == Black ){
            // console.log('black')
            // this.sprite.play("Black");
            this.sprite.setTint( Black );
            this.sprite2.setTint( Black );
            this.rond.setTint( Black );
            this.fond.setTint( Black );
            
        }
    }

    // initialiser les poses
    createPosCellule() {
        this.a_pos.push({
            id: 0,
            x: this.x,
            y:( this.y - this.sprite.height  / 2 - 23 )
        });
        this.a_pos.push({
            id: 1,
            x: ( this.x + this.sprite.width  / 3 + 23 ),
            y: ( this.y - this.sprite.height  / 3 - 23 )
        });
        this.a_pos.push({
            id: 2,
            x: ( this.x + this.sprite.width / 2 + 18 ),
            y: ( this.y )
        });
        this.a_pos.push({
            id: 3,
            x: ( this.x + this.sprite.width / 3 + 18 ),
            y: ( this.y + this.sprite.height / 3 + 18 )
        });
        this.a_pos.push({
            id: 4,
            x: ( this.x ),
            y: ( this.y + this.sprite.height / 2 + 15 )
        });
        this.a_pos.push({
            id: 5,
            x: ( this.x - this.sprite.width / 3 - 20 ),
            y: ( this.y + this.sprite.height / 3 + 20 )
        });
        this.a_pos.push({
            id: 6,
            x: ( this.x - this.sprite.width / 2 - 18 ),
            y: ( this.y )
        });
        this.a_pos.push({
            id: 7,
            x: ( this.x - this.sprite.width / 3 - 23 ),
            y: ( this.y - this.sprite.height / 3 - 23 )
        });
    }
}