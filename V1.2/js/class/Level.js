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

        if( id == 0 ){
            initCamera( scene, true );
        }
        else{
            initCamera( scene );
        }
        

        // Lancement de la scene UI
        if( !scene.scene.isActive( 'UIScene' ) ){
            scene.scene.run( 'UIScene' );
            // Ajout d'un background
        }

        // console.log( "LEVEL 1" );      

        // Creation Player
        player = new Player( scene, config.width / 2, config.height / 2 - 100 );

        scene.event = new Event( scene, true );
        //////////////////// TILED MAP ////////////////////////////
        scene.map = new Map( scene, "Level"+id );

        scene.event.compareColor()
    }
}
