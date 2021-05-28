class Triangle extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color ){

        super( scene, x, y );
        this.scene = scene;

        this.color = color;

        this.meteore = true

        this.scene.add.existing( this );  

        this.a_pos = [];

        this.safe = false;

        this.sprite = this.scene.add.sprite( 0 , 0 , 'triangle' ).setScale(0.9).setDepth(-2);

        this.sprite.parent = this;

        this.add( this.sprite );

        this.setDepth(100)

        this.scene.physics.world.enable( this.sprite ); 

        this.sprite.body.setCircle( this.sprite.width / 2.5 ).setOffset(70);

        this.makeColor( this.color );

        this.tweenTringanle();

    }

    tweenTringanle(){
        this.scene.tweens.add({
            targets: this.sprite,
            angle: -360,
            duration: 50000,
            repeat: -1
        });
    }

    display(){
        this.scene.physics.world.enable( this.sprite );
    }

    hide(){
        this.scene.physics.world.disable( this.sprite );
    }
    
    makeColor( color ){
        if( color == White ){
            // console.log('white')
            // this.sprite.play("White");
            this.sprite.setTint( White );
            
        }
        else if( color == Black ){
            // console.log('black')
            // this.sprite.play("Black");
            this.sprite.setTint( Black );
            
        }
        else{
            this.sprite.setTint( this.Green );
        }
    }
}