class Stages extends Phaser.Scene {

    constructor() {

        super( 'Stages' );

    }

    create() {
        
        
        gameState = 0.1;
        curLevel = dataBase.level[indexLvl];
        console.log('Stages')

        onInitBouton = true;

        this.escReady = false;

        this.camera = this.cameras.main;

        this.add.text( game.config.width/1.1, game.config.height/1.1, 'ESC pour quitter', { fontFamily: "BalbeerRustic", fontSize: '30px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5);

        this.t_BoutonsStage = [];

        this.graviton = this.add.text( game.config.width / 2, game.config.width / 10 - 10, 'NIVEAUX', { fontFamily: "BalbeerRustic", fontSize: '150px', color: BlackText } ).setOrigin( 0.5 ).setVisible(true);

        this.event = new Event( this );

        this.map = new Map( this, "Stage", true )

        this.add.image( game.config.width / 2, game.config.height / 2, 'Background2' ).setDepth(-100).setTint(White);

        setTimeout(() => {
            gameState = 0.1;
        }, 500);
    }

    update(){       
        if(gameState == 0.1){
            this.event.interaction();
        
            
        }

        if( keys.ESC.isUp ){
            this.escReady = true;
        }
        if( keys.ESC.isDown && this.escReady ){
            this.escReady = false;

            gameState = 0;
            boutonReady = 1;
            onInitBouton = true;

            this.scene.start("MainMenu")
        }
    }
}