class UIScene extends Phaser.Scene {

    constructor() {
        // Construction de la class
        super( 'UIScene' );

        ui = this;

        // Déclaration variable
        this.t_Boutons = [];
        this.aReady = true;
    }

    create() {

        // Ajout de la music de fond dans le jeu
        this.musicBg = this.sound.add("musicBg" , { volume: 0.1, rate: 0.95, loop: true });
        this.musicBg.play();

        // Debug UI allumé
        // this.ui = this.add.text( 0, 0, 'UI ON', { fontSize: '20px', fontStyle: "bold" } );

        // Ajout de la class event
        this.event = new Event( this );

        // Initialisation si le joueur choisit clavier
        this.input.keyboard.on('keydown',  (event) => {
            
            if(mainMenu.connected.visible){
                mainMenu.spawnBouton()
            }

            mainMenu.connected.setVisible( false );
            keyReady = true;
            keyPressed = true;
            boutonReady++;
            
        }, this);

        this.input.on('pointerdown', function(pointer){
            if(mainMenu.connected.visible){
                mainMenu.spawnBouton()
            }

            mainMenu.connected.setVisible( false );
            keyReady = true;
            keyPressed = true;
            boutonReady++;
         });

        // Creation des input clavier
        keys = this.input.keyboard.addKeys( 'ESC, Q, D, Z, SPACE, LEFT, UP, RIGHT ' );

        // Variable pour ne pas spam le start
        this.startReady = false;

        rect = { x: 0, y: 0, width: game.config.width, height: game.config.height};

        

        ////////////////////////////////////////////////////////////////////////////////////////
        ////                         //                        //                          /////
        ////                         //                        //                          /////
        ////      MENU PAUSE UI      //      MENU PAUSE UI     //    MENU PAUSE UI         /////
        ////                         //                        //                          /////
        ////                         //                        //                          /////
        ////////////////////////////////////////////////////////////////////////////////////////

        // Background de l'UI pour le jeu in game
        this.c_bg = this.add.image( config.width / 2, config.height / 2, "bgPause" ).setScale(1.4,1.25).setVisible( false ).setTint( Black );
        this.f_bg = this.add.image( config.width / 2, config.height / 2, "bgPause" ).setScale(1.2,1.1).setVisible( false ).setTint( White );


        // Titre du menu pause
        this.pause = this.add.text( config.width / 2, config.height / 2 - 300, 'PAUSE', { fontFamily: "BalbeerRustic", fontSize: '100px', fontStyle: "bold" } ).setOrigin(0.5).setVisible(false);

        // Bouton pour changer de controllers
        this.t_Boutons.push(this.return = new Bouton( this, game.config.width / 2, game.config.width / 5 -10, 'REPRENDRE', 0.7 ).setVisible(false));
        
        this.t_Boutons.push(this.restartLvl = new Bouton( this, game.config.width / 2, game.config.width / 5 + 150, 'RECOMMENCER', 0.6, ).setVisible(false));
        
        this.t_Boutons.push(this.mainMenu = new Bouton( this, game.config.width / 2, game.config.width / 5 + 310, 'MENU', 0.7, ).setVisible(false));

        // Mettre les boutons interactif
        this.return.bg.setInteractive();
        this.restartLvl.bg.setInteractive();
        this.mainMenu.bg.setInteractive();

        // Faire la mise en plance des fonction des différents états du bouton
        this.t_Boutons.forEach( tab => {
            // console.log(tab.name)
            tab.bg.on('pointerover', ()=>{
                this.event.switchTint( tab, true );
                // tab.setScale( 1.2 ); 
            });
            tab.bg.on('pointerout', ()=>{
                this.event.switchTint( tab, false );
                // tab.setScale( 1 ); 
            });
        });

        this.return.bg.on('pointerdown', () => {
            click.play();
            // Reprendre la partie
            console.log("reprendre")
            this.returnInGame();

        }, this);

        this.restartLvl.bg.on('pointerdown', () => {
            click.play();
            // Recommencer le niveau
            gameState = -1;
            console.log( curLevel );
            this.pauseActive(false);
            this.resetSize();
            // reation de variable
            this.cameras.main.fadeOut( 500 )
            this.cameras.main.on('camerafadeoutcomplete', ()=>{ 
                this.scene.start( curLevel );
            }, this);

        }, this);

        this.mainMenu.bg.on('pointerdown', () => {
            click.play();
            // Retourner au menu principale
            gameState = -1;
            this.pauseActive(false);
            this.resetSize();
            this.startMainMenu();

        }, this);

        ////////////////////////////////////////////////////////////////////////////////////////
        ////                         //                        //                          /////
        ////           FIN           //           FIN          //         FIN              /////
        ////      MENU PAUSE UI      //      MENU PAUSE UI     //    MENU PAUSE UI         /////
        ////                         //                        //                          /////
        ////                         //                        //                          /////
        ////////////////////////////////////////////////////////////////////////////////////////
        

        //////////////////////////////////////// UI LVL 0 //////////////////////////////////////
        this.echap = this.add.text( game.config.width/1.05, game.config.height/1.05, 'Rester appuyer sur ESC pour passer', { fontFamily: "BalbeerRustic", fontSize: '30px', color: WhiteText} ).setVisible( false ).setOrigin(1);

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(White, 1);
        this.bgWhite = this.graphics.fillRect( game.config.width/10, game.config.height/1.1, 50, 50).setVisible( false );
        // console.log(this.bgWhite)
        //////////////////////////////////////// FIN UI LVL 0 //////////////////////////////////////
    }

    update() {
        // console.log(this.scene.sys.config)
        if( gameState == 1){
            if( this.bgWhite.visible ){
                this.echap.setVisible(false);
                this.bgWhite.setVisible(false);
            }
            // Si le clavier est autorisé et activer
            if( keyReady && keyPressed ){

                if( keys.ESC.isUp ){
                    this.startReady = true;
                }

                // Activer le menu pause
                if( keys.ESC.isDown && this.startReady ){
                    this.startReady = false;
                    this.returnInGame();
                }
            }
        }
        else if( gameState == 10){
            // Si le clavier est autorisé et activer
            if( !this.bgWhite.visible ){
                this.echap.setVisible(true);
                this.bgWhite.setVisible(true);
            }

            if( keys.ESC.isUp ){
                this.tweenReady = false;
            }

            // Activer le menu pause
            if( keys.ESC.isDown ){
                this.tweenReady = true;
                this.timer = this.tweens.add({
                    targets: this.bgWhite,
                    scaleX: 11,
                    duration : 1000,
                    onUpdate: (tween)=>{
                        if( !this.tweenReady ){
                            this.bgWhite.scaleX = 1;
                            tween.stop();
                        }
                    },
                    onComplete: (tween)=>{
                        
                        gameState = 0;
                        console.log("heuuueuthjbeiz");
                        this.tweenReady = false;
                        this.scene.stop( curLevel )
                        if( indexLvl == 0){
                            indexLvl++;
                        }
                        curLevel = dataBase.level[ indexLvl ];
                        this.scene.launch( curLevel )
                        
                    }
                });
            }
        }
    }

    // Reset Le niveau
    resetFeedBack(){

        this.cameras.main.fadeOut( 500 )
        console.log( curLevel );
        this.pauseActive(false);
        this.resetSize();

        playingLvl.scene.pause();

        this.cameras.main.on('camerafadeoutcomplete', ()=>{ 
            this.scene.launch( curLevel );
            this.cameras.main.fadeIn( 500 )
        }, this);
    }

    // Remettre a sa taille de base
    resetSize(){
        this.t_Boutons.forEach( tab => {
            tab.setScale(1)
        });
    }

    // Retouner dans le jeu
    returnInGame(){
        // Cacher le menu UI
        console.log(curLevel)
        this.scene.resume(curLevel);
        this.pauseActive(false);
    }

    // Start main Menu
    startMainMenu(){
        this.bgWhite.setVisible(false)
        this.echap.setVisible(false)
        gameState = -1;
        console.log(curLevel)
        this.scene.stop(curLevel);
        this.scene.stop('Background');
        boutonReady = 1;
        onInitBouton = true;
        this.scene.launch('MainMenu');
    }

    // Fonction pour activer le menu pause 
    pauseActive(bool){
        this.resetSize();
        this.restartLvl.setVisible(bool);
        this.mainMenu.setVisible(bool);
        this.f_bg.setVisible(bool);
        this.c_bg.setVisible(bool);
        this.return.setVisible(bool);
        this.pause.setVisible(bool);
    }
}