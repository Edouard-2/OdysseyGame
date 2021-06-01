class MainMenu extends Phaser.Scene {

    constructor() {

        super( 'MainMenu' );
        
    }

    create() {

        if( indexLvl == -1 ){
            indexLvl = 0;
            curLevel = dataBase.level[indexLvl];
        }

        mainMenu = this;

        this.camera = this.cameras.main;
        this.t_Boutons = [];

        gameState = 0;

        console.log(onInitBouton)

        if( !this.scene.isActive( 'UIScene' ) ){
            this.scene.run( 'UIScene' );
        }
        else{
            this.spawnBouton()
        }

        /////////// INSTANCES ///////////
        this.event = new Event( this );

        this.aReady = true;

        /////////// TEXT ///////////
        this.graviton = this.add.text( game.config.width / 2, game.config.width / 10 - 10, "A Travers l'Odyssee", { fontFamily: "BalbeerRustic", fontSize: '150px', color: BlackText } ).setOrigin( 0.5 ).setVisible(true);

        if( !this.scene.isActive( 'UIScene' ) ){
            this.connected = this.add.text( game.config.width / 2, game.config.width / 4, 'Appuie sur une touche', { fontFamily: "BalbeerRustic",fontSize: '100px', color: BlackText } ).setOrigin( 0.5 ).setVisible(true);
        }

        this.add.image( game.config.width / 2, game.config.height / 2, 'Background2' ).setDepth(-100).setTint(White);


    }

    update() {

        /////////// AFFICHAGE DU MAIN MENU ///////////
        this.event.menu();

        /////////// INTERACTION ( PRESS BOUTON ) ///////////
        this.event.interaction();
        
    }

    spawnBouton(){
        
        this.t_Boutons.push( this.bPlay = new Bouton( this, game.config.width / 2, game.config.width / 4, 'Jouer', 1 ) );
        // this.bPlay.setVisible( false );
        setTimeout(() => {
            // console.log(this.t_Boutons)
            this.t_Boutons.push( this.bStage = new Bouton( this, game.config.width / 2, game.config.width / 4 + 150, 'Niveaux', 0.9 ) );
            // this.bStage.setVisible( false );
        }, 50);
        
        setTimeout(() => {
            this.t_Boutons.push( this.bSettings = new Bouton( this, game.config.width / 2, game.config.width / 4 + 300, 'Credits', 0.8 ) );
            // this.bSettings.setVisible( false );
        }, 100);
        // console.log("boutton")
    }
}