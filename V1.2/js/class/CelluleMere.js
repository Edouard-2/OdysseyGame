class CelluleMere extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color, bool ){

        super( scene, x, y );
        this.scene = scene;

        this.scene.add.existing( this );

        this.color = color;

        this.hitbox = false;

        this.dist = false;

        this.setDepth(500);

        // La mettre a la bonne couleur
        this.fond = this.scene.add.sprite( 0, 0, 'celluleMereContour' ).setScale(0.5* proportion);
        this.sprite = this.scene.add.sprite( 0, 0, 'celluleMere' ).setScale(0.5* proportion);
        this.sprite3 = this.scene.add.sprite( 0, 0, 'celluleFin3' ).setScale(0)

        this.add( [ this.fond, this.sprite, this.sprite3 ] );

        this.sprite.parent = this;

        if( bool ){

            console.log("vzoHFGIJbzgr")
            this.hitbox = createHitbox( this.scene, 0, 0, 10, 10, true );

            this.hitbox.body.setCircle( this.sprite.width/4 ).setOffset( -this.sprite.width/4 )

            this.overlap = true;

            this.hitbox.parent = this;

            this.scene.physics.add.overlap( player, this.hitbox, null, this.endGame, this );

            this.add( this.hitbox );

        }
        else{
            this.hitbox = createHitbox( this.scene, 0, game.config.height*2, 1000, 10, true );

            this.overlap = true;

            this.scene.physics.add.overlap( player, this.hitbox, null, this.changeDimension, this );

            this.add( this.hitbox );

        }

        this.makeColor( color );

        // Animation de grossissement (donner un effet de vivant)
        this.createTweenScale();
    }

    endGame( curPlayer, curCellule ){

        if( curPlayer.curCellule != curCellule){
            console.log("heyeyyeye")
            this.endTraj( curPlayer );

            curPlayer.addCellule(curCellule)
        }
    }

    endTraj( obj ){
        this.scene.event.compareColor();
        obj.body.setVelocity(0)
        obj.setDepth(10)
        this.tweenStop = true;
        this.scene.event.tweenBg = false;

        this.scene.tweens.add({
            targets: obj,
            x: this.x,
            y: this.y,
            scale: 0,
            duration: 2000,
            ease: "Power1",
            // repeat: -1
            onComplete: (tween)=>{
                this.scene.tweens.add({
                    targets: this.sprite3,
                    scale: 10,
                    duration: 3000,
                    ease: "Power1",
                    onComplete: (tween)=>{
                        console.log(this.scene.level)
                        this.scene.scene.start("Credit");
                    }
                });
            }
        });
    }

    changeDimension(){
        if( this.overlap ){
            this.overlap = false;
            // Changer le fond (changement de dimension)
            player.switchColor();

            this.scene.event.compareColor();

            // Desactiver la mort avec les bordures
            this.scene.space.desactive()
            
            player.body.velocity.y = player.body.velocity.y/1.5;
            
            setTimeout(() => {
                this.scene.cameras.main.fadeOut( 1000 );
            }, 3000);

            // Lancer la scene apres le fade out
            this.scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 

                // Variable pour initialiser le main menu
                gameState = 0;
                boutonReady = 1;
                onInitBouton = true;

                // Faire un fade in lorsque le fade out est fini
                ui.cameras.main.fadeIn( 1000 );

                // Lancer le main Menu
                this.scene.scene.stop( curLevel )
                curLevel = dataBase.level[ indexLvl ];
                this.scene.scene.launch( curLevel )
            }, this);
        }
    }

    createTweenScale(){
        this.scene.tweens.add({
            targets: this,
            scale: 1.05* proportion,
            ease: "Expo.easeInOut",
            hold: getRand( 200 ),
            yoyo: true,
            duration: 2000,
            repeat: -1,
            repeatDelay: getRand( 1000 )
        });

        this.dist = this.scene.tweens.add({
            targets: this,
            y: this.y + 100,
            ease: "linear",
            yoyo: true,
            duration: 5000,
            repeat: -1,
        });
    }

    tweenScaleFond( bool ){
        if( bool ){
            var scale = 1.3;
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

    makeColor( color ){
        if( color == White ){
            // console.log('white')
            // this.sprite.play("White");
            this.fond.setTint( Black );
            this.sprite.setTint( White );
            this.sprite3.setTint( White );
            
        }
        else if( color == Black ){
            // console.log('black')
            // this.sprite.play("Black");
            this.fond.setTint( White );
            this.sprite.setTint( Black );
            this.sprite3.setTint( White );
            
        }
    }
}