class Level{

    // Construction de la classe
    constructor(scene, id) { 

        scene.level = id;
        
        // State -1 = INNACCESSIBLE
        // State 0 = MAIN MENU
        // State 0.1 = STAGE CHOICE
        // State 1 = IN GAME
        gameState = -1;
        playingLvl = scene;

        // Initialisation de la camera (si lvl 0 alors le positionnement sera différent)
        if( id == 0 ){
            initCamera( scene, true );
        }
        else{
            initCamera( scene );
        }
        

        // Lancement de la scene UI
        if( !scene.scene.isActive( 'UIScene' ) ){
            scene.scene.run( 'UIScene' );
        }

        // Creation Player
        player = new Player( scene, config.width / 2, config.height / 2 - 100 );

        scene.event = new Event( scene, true );
        
        // Creation de la map du niveau
        scene.map = new Map( scene, "Level"+id );

        // Mettre le fond de la bonne couleur
        scene.event.compareColor()
    }
}
