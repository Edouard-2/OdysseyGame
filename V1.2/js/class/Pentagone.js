class Pentagone extends Phaser.GameObjects.Container {

    constructor( scene, x, y, rotation, color ){

        super( scene, x, y );

        this.scene = scene;

        this.color = color;

        this.angle = rotation;

        this.scene.add.existing( this );  

        this.a_pos = [];

        this.setDepth(100)
        
        this.safe = false;

        this.pos = rotation / 45;

        this.sprite = this.scene.add.sprite( 0 , 0 , 'pentagone' ).setScale(0.7).setDepth(-2);

        this.sprite.parent = this;

        this.add( this.sprite );

        this.scene.physics.world.enable( this.sprite ); 

        this.sprite.body.setCircle( this.sprite.width / 2);

        this.makeColor( this.color );
    }

    ejection( target ){
        target.curPos = this.pos;
        target.giveVelocity();
    }

    tweenCenter( target ){
        // target.body.setVelocity(0);
        console.log(target.body.velocity)
        this.scene.tweens.add({
            targets: target.body.velocity,
            x: 0,
            y: 0,
            ease: "Power1",
            duration: 100,
            onComplete : (tween)=>{
                console.log("velo 0");
            }
        });

        this.scene.tweens.add({
            targets: target,
            x: this.x,
            y: this.y,
            ease: "Power1",
            duration: 100,
            onComplete : (tween)=>{
                // console.log(target.body.velocity)
                // console.log("'zijrbgjierzg")
                this.ejection( target );
            }
        });
    }

    tweenRond(){
        this.scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 10000,
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
    }
}