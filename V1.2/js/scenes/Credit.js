class Credit extends Phaser.Scene {

    // Construction de la scene
    constructor() {

        super( 'Credit' );   
    }
    
    create() {

        this.escReady = true;
        

        this.esc = this.add.text( game.config.width/1.1, game.config.height/1.1, 'ESC pour quitter', { fontFamily: "BalbeerRustic", fontSize: '30px', fontStyle: "bold", color: BlackText } ).setAlpha(0).setOrigin(0.5);

        // Creation du container qui aura tout les nom
        this.container = this.add.container( game.config.width /2 , game.config.height + 170 );

        // Ajout des texts crédit

        if( indexLvl == 5 ){
            this.container.add( this.add.text( 0, -170, "A Travers L'Odyssee", { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        }

        // Developper
        this.container.add( this.add.text( 0, 0, 'Developpeur', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 70, 'Edouard MORDANT', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // Game Design
        this.container.add( this.add.text( 0, 170+100, 'Game Designer', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 240+100, 'Edouard MORDANT', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // Direction Artistique
        this.container.add( this.add.text( 0, 340+200, 'Direction Artisque', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 410+200, 'Edouard MORDANT', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // Inspiration
        this.container.add( this.add.text( 0, 510+300, 'Sound Track', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 580+300, 'Titre:  Sleep', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 630+300, 'Auteur: Scott Buckley', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // Sound Track
        this.container.add( this.add.text( 0, 730+400, 'Sound Effect', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 800+400, 'Sound from Zapsplat.com', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // Sound Track
        this.container.add( this.add.text( 0, 900+500, 'Meric aux Playtester', { fontFamily: "BalbeerRustic", fontSize: '70px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 970+500, 'Cabanie	Eve', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 1020+500, 'czulowski arsen', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 1070+500, 'De Carvalho Pereira	Francisco', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 1120+500, 'Lobbe Jules', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
        this.container.add( this.add.text( 0, 1170+500, 'Vigne Bastien', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );

        // this.container.add( this.add.text( 0, 840+400, 'Auteur: Scott Buckley', { fontFamily: "BalbeerRustic", fontSize: '40px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5) );
    }   

    update() {

        // Faire apparaitre le esc progressivement
        if( this.esc.alpha <= 1 ){
            this.esc.alpha += 0.007; 
        }
        
        // Faire monter le container avec tout les crédits
        this.container.y -= 0.9;

        if( keys.ESC.isUp ){
            this.escReady = true;
        }
        
        // Appuyer sur esc pour quitter
        if( keys.ESC.isDown && this.escReady ){
            this.escReady = false;

            gameState = 0;
            boutonReady = 1;
            onInitBouton = true;

            this.scene.start("MainMenu");
        }
    }
}