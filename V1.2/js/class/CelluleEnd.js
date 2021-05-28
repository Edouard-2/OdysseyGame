class CelluleEnd extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color ){

        super( scene, x, y );
        this.scene = scene;

        this.scene.add.existing( this );

        this.color = color;

        this.tweenStop = false;

        // console.log(this.scroll)
        // console.log(this.trans)
        
        this.sprite = this.scene.add.sprite( 0 , -4 , 'celluleFin1' ).setScale(1 * proportion);
        this.sprite2 = this.scene.add.sprite( 0 , -4 , 'celluleFin2' ).setScale(1 * proportion);
        this.sprite3 = this.scene.add.sprite( 0 , -4 , 'celluleFin3' ).setScale(0.03 * proportion);

        this.end = true;

        this.setDepth(101)
        this.makeColor( color );

        this.sprite.parent = this;
        this.sprite3.parent = this;

        this.add( [  this.sprite3, this.sprite, this.sprite2 ] );
        // console.log(this.sprite)
        this.scene.physics.world.enable( this.sprite ); 
        this.scene.physics.world.enable( this.sprite3 ); 

        this.sprite3.body.setCircle( this.sprite3.width / 2 - this.sprite3.width / 4 ).setOffset( this.sprite3.width / 4);
        this.sprite.body.setCircle( this.sprite.width / 2 + 200).setOffset( -200 );
        // this.sprite.setScale(0.19)

        this.tweenRond( this.sprite, 1, 5000 );
        this.tweenRond( this.sprite2, -1, 5000 );
    }

    tweenRond( obj, dir, time ){
        this.scene.tweens.add({
            targets: obj,
            angle: dir * 360,
            duration: time,
            repeat: -1,
            onUpdate: ( tween )=>{
                if( this.tweenStop ){
                    tween.stop();
                }
            }
        });
    }

    tweenTraj( obj ){
        player.bgTweenReady = false;
        end.play();
        obj.body.setVelocity(0)
        obj.setDepth(10)
        this.tweenStop = true;
        this.scene.event.tweenBg = false;
        var angle = addNumber( player.curPos, 4 );
        // var angle = Phaser.Math.Angle.Between( this.sprite3.x, this.sprite3.y, obj.x, obj.y );
        console.log( angle );
        this.scene.tweens.add({
            targets: obj,
            x: this.x,
            y: this.y,
            scale: 0.1,
            duration: 1000,
            ease: "Power1",
            // repeat: -1
            onComplete: (tween)=>{
                this.scene.tweens.add({
                    targets: [this.sprite, this.sprite2, obj],
                    scale: 0,
                    duration: 400,
                    ease: "Power1",
                });
                this.scene.tweens.add({
                    targets: this.sprite3,
                    scale: 10,
                    duration: 1000,
                    ease: "Power1",
                    onComplete: (tween)=>{
                        console.log(this.scene.level)
                        startNextLevel( this.scene, false, true, this.scene.level )
                    }
                });
            }
        });
        this.scene.tweens.add({
            targets: [ this.sprite2, this.sprite ],
            angle: angle * 45,
            duration: 400,
            ease: "Power1",
            // repeat: -1
        });
        console.log("heue")
    }

    display(){
        this.scene.physics.world.enable( this.sprite );
        this.scene.physics.world.enable( this.sprite3 );
    }

    hide(){
        this.scene.physics.world.disable( this.sprite );
        this.scene.physics.world.disable( this.sprite3 );
    }

    makeColor( color ){
        if( color == White ){
            // console.log('white')
            // this.sprite.play("White");
            this.sprite.setTint( White );
            this.sprite2.setTint( White );
            this.sprite3.setTint( White );
            
        }
        else if( color == Black ){
            // console.log('black')
            // this.sprite.play("Black");
            this.sprite.setTint( Black );
            this.sprite2.setTint( Black );
            this.sprite3.setTint( Black );
            
        }
        else{
            this.sprite.setTint( this.Green );
        }
    }
}