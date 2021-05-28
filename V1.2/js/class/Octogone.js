class Octogone extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color, bool, value, ori, end, cameraID, transDial ){

        super( scene, x, y );
        this.scene = scene;

        this.scene.add.existing( this );

        this.color = color;

        this.cameraID = cameraID;

        this.setDepth(100)

        if( bool ){
            this.trans = true;
            this.scroll = value;
            this.addHitBox( ori )
            this.cameraHitCheck = false;
        }

        else if ( cameraID || cameraID == 0 ){
            this.trans = false;
            this.scroll = false;
            this.firstHitbox = false;
            this.secondHitbox = false;
            this.cameraHitCheck = this.addCameraDetection();
        }

        else{
            this.trans = false;
            this.scroll = false;
            this.firstHitbox = false;
            this.secondHitbox = false;
            this.cameraHitCheck = false;
        }

        // console.log(this.scroll)
        // console.log(this.trans)

        this.a_pos = [];

        this.saturation = 1;

        this.Green = "0x4DF732";

        this.safe = true;
        
        this.fond = this.scene.add.sprite( 0 , -4 , 'receptriceFond' ).setScale(0);
        this.sprite = this.scene.add.sprite( 0 , -4 , 'receptrice' ).setScale( 1 );

        // console.log(this.spriteCenter)
        // this.sprite.setDepth(10);
        if( end ){
            // console.log("end true")
            this.end = true;
        }
        this.end = false;

        this.makeColor( color );

        this.createPosCellule();

        this.sprite.parent = this;
        
        if( this.cameraHitCheck ){
            // console.log('hitititiit')
            this.add( [ this.sprite, this.cameraHitCheck, this.fond ] );
        }
        else{
            this.add( [ this.sprite, this.fond ] );
        }
        
        // console.log(this.sprite)
        this.scene.physics.world.enable( this.sprite ); 

        this.sprite.body.setCircle( this.sprite.width / 2);
        // this.sprite.setScale(0.19)

        // Animation de grossissement (donner un effet de vivant)
        this.createTweenScale();
    }

    createTweenScale(){
        this.scene.tweens.add({
            targets: this,
            scale: 1.1 ,
            ease: "linear",
            hold: getRand( 200 ),
            yoyo: true,
            duration: 3000,
            repeat: -1,
            repeatDelay: getRand( 2000 )
        });
    }

    tweenScaleFond( bool ){
        console.log(bool)
        if( bool ){
            var scale = 1;
            var delay = 0;
        }
        else{
            var scale = 0;
            var delay = 700;
        }
        this.scene.tweens.add({
            targets: this.fond,
            scale: scale,
            ease: "expo",
            duration: 300,
            delay: delay
        });
    }

    addCameraDetection(){
        var cameraHitCheck =  createHitbox( this.scene, 0,0, 500, 500, true);
        this.scene.physics.add.overlap(player, cameraHitCheck, null, this.cameraReposition, this);
        return cameraHitCheck;
    }

    cameraReposition(){
        if( this.scene.indexCamera != this.cameraID && player.curScroll != this.cameraID ){
            console.log("diffffffff")
            player.curScroll = this.cameraID - 1;
            this.scene.indexCamera = this.cameraID;
            this.scene.curCameraNodes = this.scene.cameraNodes[this.scene.indexCamera];
            player.changeCamera();
        }
    }

    display(){
        this.scene.physics.world.enable( this.sprite );
        if( this.firstHitbox ){
            this.scene.physics.world.enable( this.firstHitbox );
        }
        if( this.secondHitbox ){
            this.scene.physics.world.enable( this.secondHitbox );
        }
        if( this.cameraHitCheck ){
            this.scene.physics.world.enable( this.cameraHitCheck );
        }
    }

    hide(){
        
        this.scene.physics.world.disable( this.sprite );
        if( this.firstHitbox ){
            this.scene.physics.world.disable( this.firstHitbox );
        }
        if( this.secondHitbox ){
            this.scene.physics.world.disable( this.secondHitbox );
        }
        if( this.cameraHitCheck ){
            this.scene.physics.world.disable( this.cameraHitCheck );
        }
    }

    addHitBox( orientation ){
        if( orientation == 0 ){
            this.firstHitbox = this.createHitBoxCamera( 150, 300, -200, 0, 1);
            this.secondHitbox = this.createHitBoxCamera( 200, 400, 100, 0, 2);
        }
        else if( orientation == 1 ){
            this.firstHitbox = this.createHitBoxCamera( 300, 150, 0, -200, 1);
            this.secondHitbox = this.createHitBoxCamera( 400, 200, 0, 100, 2);
        }
        else if( orientation == 2 ){
            this.secondHitbox = this.createHitBoxCamera(  200, 400, -100, 0, 2);
            this.firstHitbox = this.createHitBoxCamera( 150, 300, 200, 0, 1);
        }
        else if( orientation == 3 ){
            this.secondHitbox = this.createHitBoxCamera( 400, 200, 0, -100, 2);
            this.firstHitbox = this.createHitBoxCamera( 300, 150, 0, 200, 1);
        }
    }

    firstHit( curPLayer ){
        if( curPLayer.curScroll == this.scroll && curPLayer.tweenCameraVar ){
            player.checkCamera( this, true );
            // console.log("reste1");
        }
    }
    
    secondHit( curPLayer ){
        if( curPLayer.curScroll != this.scroll && curPLayer.tweenCameraVar ){
            player.checkCamera( this );
            // console.log("scroll2");
            curPLayer.curScroll = this.scroll;
        }
    }

    createHitBoxCamera( w, h, x, y, nbr ){
        this.hitbox = this.scene.add.sprite( x, y, "" ).setAlpha(0);
        this.scene.physics.world.enable( this.hitbox ); 
        this.hitbox.body.allowGravity = false;
        this.hitbox.body.setSize( w, h );
        if(nbr == 1){
            this.scene.physics.add.overlap( player, this.hitbox, this.firstHit, null, this )
        }
        else{
            this.scene.physics.add.overlap( player, this.hitbox, this.secondHit, null, this )
        }
        this.add( this.hitbox )
        return this.hitbox;
    }

    makeColor( color ){
        if( color == White ){
            // console.log('white')
            // this.sprite.play("White");
            this.sprite.setTint( White );
            this.fond.setTint( White );
            
        }
        else if( color == Black ){
            // console.log('black')
            // this.sprite.play("Black");
            this.sprite.setTint( Black );
            this.fond.setTint( Black );
            
        }
        else{
            this.sprite.setTint( this.Green );
        }
    }

    createPosCellule() {
        this.a_pos.push({
            id: 0,
            x: this.x,
            y:( this.y - this.sprite.height  / 2.3 - 10 )
        });
        this.a_pos.push({
            id: 1,
            x: ( this.x + this.sprite.width  / 3.4 + 10 ),
            y: ( this.y - this.sprite.height  / 3.4 - 10 )
        });
        this.a_pos.push({
            id: 2,
            x: ( this.x + this.sprite.width / 2.3 + 10 ),
            y: ( this.y )
        });
        this.a_pos.push({
            id: 3,
            x: ( this.x + this.sprite.width / 3.4 + 10 ),
            y: ( this.y + this.sprite.height / 3.4 + 10 )
        });
        this.a_pos.push({
            id: 4,
            x: ( this.x ),
            y: ( this.y + this.sprite.height / 2.3 + 10 )
        });
        this.a_pos.push({
            id: 5,
            x: ( this.x - this.sprite.width / 3.4 - 10 ),
            y: ( this.y + this.sprite.height / 3.4 + 10 )
        });
        this.a_pos.push({
            id: 6,
            x: ( this.x - this.sprite.width / 2.3 - 10 ),
            y: ( this.y )
        });
        this.a_pos.push({
            id: 7,
            x: ( this.x - this.sprite.width / 3.4 - 10 ),
            y: ( this.y - this.sprite.height / 3.4 - 10 )
        });
    }
}