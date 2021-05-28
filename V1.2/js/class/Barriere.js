class Barriere extends Phaser.GameObjects.Container {

    constructor( scene, x, y, id, rotation, color ){

        super( scene, x, y );

        this.scene = scene;

        this.color = color;

        this.angle = rotation;

        this.id = id;

        this.name = "Barriere";
        // console.log(id)

        this.scene.add.existing( this );  

        this.a_pos = [];

        this.safe = false;

        this.sprite = this.scene.add.sprite( 0 , 0 , 'barriere' ).setScale(0.8* proportion,0.6* proportion).setDepth(-2);

        this.sprite.parent = this;

        this.add( this.sprite );

        this.setDepth( 100 )

        this.scene.physics.world.enable( this.sprite ); 

        if( this.angle != 0 ){
            this.sprite.setScale(0.8,0.7)
            this.sprite.body.setSize( this.sprite.width/1.2 , this.sprite.height / 5  );
        }
        else{
            this.sprite.body.setSize( this.sprite.width / 5, this.sprite.height/1.2 );
        }

        this.makeColor( this.color );

        

        // this.tweenRond();
    }

    // Position oposé d'un slide de caméra
    inverseCurNode( nbr ){
        if( nbr == 0 ){
            nbr = 4;
        }
        else if( nbr == 1 ){
            nbr = 5;
        }
        else if( nbr == 2 ){
            nbr = 6;
        }
        else if( nbr == 3 ){
            nbr = 7;
        }
        else if( nbr == 4 ){
            nbr = 0;
        }
        else if( nbr == 5 ){
            nbr = 1;
        }
        else if( nbr == 6 ){
            nbr = 2;
        }
        else if( nbr == 7 ){
            nbr = 3;
        }
        return nbr;
    }

    giveVelocity( obj ){
        if( obj.body.velocity.x != 0 && obj.body.velocity.y != 0){
            console.log(obj.curPos)
            if( this.angle != 0 ){
                obj.body.setVelocityY(obj.body.velocity.y * -1)
                
            }
            else{
                obj.body.setVelocityX(obj.body.velocity.x * -1)
            }
            
        }
        else{
            console.log("hey")
            obj.curPos = this.inverseCurNode( obj.curPos );
            obj.body.setVelocity(obj.body.velocity.x*-1, obj.body.velocity.y*-1)
        }
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