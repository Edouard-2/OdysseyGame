class Event {

    constructor(scene, bool){

        // Declaration de variables
        this.scene = scene;
        this.aReady = false;
        this.pause = false;
        this.qReady = false;
        this.leftReady = false;
        this.rightReady = false;
        this.upReady = false;
        this.dReady = false;
        this.spaceReady = false;
        this.afterBounce = true;
        this.startReady = false;
        this.animReady = false;
        this.readyAddLevel = true;
        this.tweenBg = true;
        this.fadeOutReady = true;
        this.readyJump = true;

        if( this.scene.level == 0){
            // console.log("timeererererer")
            this.timeDimension = 3000;
        }
        else{
            this.timeDimension = 1000;
        }

        if( bool ){
            // this.initGraphics()
        }
    }

    /////////// CONTROLS EN FONCTION DU STATE ///////////
    interaction(){

        // Si le clavier est activer
        if( keyReady && keyPressed ){
            // Interaction state 0 du jeua
            if( gameState == 0 ){
                this.menuInputPoint();
            }

            else if( gameState == 0.1 ){
                // // console.log('gamestate 0.1')
                this.StageInputPoint();
            }

            // Interaction state 1 du jeu
            else if( gameState == 1 ){
                this.readyClavier();
                this.keyStartInput();
                this.keyDimension();
                // Le movement Est lorsqu'on touche une cellule octogonale
            }
            else if( gameState == 10 ){
                this.readyClavier();
                // Le movement Est lorsqu'on touche une cellule octogonale
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////                         //                        //                          /////
    ////                         //                        //                          /////
    ////      CLAVIER INPUT      //      CLAVIER INPUT     //      CLAVIER INPUT       /////
    ////                         //                        //                          /////
    ////                         //                        //                          /////
    ////////////////////////////////////////////////////////////////////////////////////////

    // Boutons d'accés pour les niveau depuis la scene stage
    StageInputPoint(){
        // POINTERDOWN
        // // console.log(this.scene.t_BoutonsStage)

        if(onInitBouton){
            // console.log("stage")
            // // console.log(this.scene.t_BoutonsStage)
            onInitBouton = false;
            setTimeout(() => {
                this.scene.t_BoutonsStage.forEach( tab => {
                    
                    if( tab.bool ){
                        // // console.log(tab.name)
                        // // console.log("stage")
                        tab.bg.setInteractive();
                        tab.bg.on('pointerover', ()=>{
                                
                            this.switchTint( tab );
                            // tab.setScale( 1.2 ); 
                        });
                        tab.bg.on('pointerout', ()=>{
                    
                            this.switchTint( tab );
                            // tab.setScale( 1 ); 
                        });
                        

                        tab.bg.on('pointerup', () => {
                            this.readyAddLevel == true
                        });

                        tab.bg.on('pointerdown', () => {
                            

                            if( this.readyAddLevel == true ){
                                click.play();
                                this.readyAddLevel = false;
                                // console.log(tab.name)
                                if( tab.name == 1 ){
                                    this.verifTuto("Level" + tab.name);
                                }
                                else{
                                    startNextLevel(this.scene, tab.name );
                                }
                                
                            }
                        });
                    }
                });
            }, 150);
        }
    }

    // Mettre la couleur inverse par rapport a lui meme
    switchTint(obj){
        // obj.bg.setScale(0.1)
        // // console.log(obj.name)
        if( obj.bg.tintBottomLeft == Black ){
            obj.bg.setTint( White );
            obj.text.setColor( BlackText );
        }
        else{
            obj.bg.setTint( Black );
            obj.text.setColor( WhiteText );
        }
    }

    // Interaction souris bouton
    menuInputPoint(){
        if(onInitBouton){
            // // console.log(onInitBouton)
            onInitBouton = false;
            // POINTERDOWN
            setTimeout(() => {
                // // console.log(this.scene.t_Boutons)
                this.scene.t_Boutons.forEach( tab => {
                    // // console.log(tab)
                    tab.bg.setInteractive();
                    //  // console.log("onInitBouton")
                    tab.bg.on('pointerover', ()=>{
                        
                        this.switchTint( tab );
                        // tab.setScale( 1.2 ); 
                    });
                    tab.bg.on('pointerout', ()=>{
                
                        this.switchTint( tab );
                        // tab.setScale( 1 ); 
                    });
                    if(tab.name == "Jouer"){

                        tab.bg.on('pointerdown', ()=>{

                            

                            // // console.log(curLevel)
                            if( curLevel == "MainMenu" && this.fadeOutReady ){
                                click.play();
                                addIndexLevel();
                                this.fadeOutReady = false;
                                this.scene.cameras.main.fadeOut( 500 );

                                // Lancer la scene apres le fade out
                                this.scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 
                                    this.fadeOutReady = true;
                                    this.verifTuto(curLevel);
                                }, this);
                            }
                            
                            else if ( curLevel == "Level0" && this.fadeOutReady ){
                                click.play();
                                // // console.log(indexLvl)
                                this.fadeOutReady = false;
                                curLevel = 'Level1';
                                indexLvl = 1;
                                this.scene.cameras.main.fadeOut( 500 );
                                // Lancer la scene apres le fade out
                                this.scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 
                                    this.fadeOutReady = true;

                                    // Si c'était le niveaux scénarisé et qu'il faut commencer le niveaux 1
                                    this.scene.scene.start( curLevel );
                                    
                                }, this);
                                
                                
                            }
                            else if ( this.fadeOutReady ){
                                click.play();
                                // console.log(curLevel)
                                if( indexLvl == 0 ){
                                    indexLvl++;
                                }
                                curLevel = dataBase.level[indexLvl];
                                this.fadeOutReady = false;
                                this.scene.cameras.main.fadeOut( 500 );
                                this.scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 
                                    this.fadeOutReady = true;

                                    // Si c'était le niveaux scénarisé et qu'il faut commencer le niveaux 1
                                    this.scene.scene.start( curLevel );
                                    
                                }, this);
                                // startNextLevel(this.scene );
                            }
                        });
                    }
                    else if(tab.name == "Niveaux"){
                        tab.bg.on('pointerdown', ()=>{
                            click.play();
                            onInitBouton = true;
                            this.scene.scene.start('Stages');
                        });
                    }
                    else if(tab.name == "Credits"){
                        tab.bg.on('pointerdown', ()=>{
                            click.play();
                            onInitBouton = true;
                            this.scene.scene.start('Credit');
                        });
                    }
                });
            }, 150);
            
        }
    }

    // Bouton ESC sur clavier pour pause
    keyStartInput(){
        if( keys.ESC.isDown && this.startReady ){
            this.startReady = false;
            // console.log( 'game > pause' );
            this.scene.scene.pause();
            ui.pauseActive( true );
        }
    }

    // Changer de dimension 
    keyDimension(){
        if( keys.SPACE.isDown && this.spaceReady && player.bgTweenReady ){
            // console.log("change dimension")
            this.spaceReady = false; 
            player.switchColor();
            // player.switchBg( White );
            this.compareColor()
            // player.switchColor();
            // player.compareColor();
        }
    }

    // Deplacement du joueur
    keyMovement(){
        if( ( keys.Z.isDown || keys.UP.isDown ) && this.readyJump && this.zReady && this.upReady ){
            player.readyMovement = false;
            this.zReady = false;
            this.upReady = false;
            console.log("apui Z")
            player.curCellule.tweenScaleFond( false );
            player.propulse();
        }

        else if( ( keys.Q.isDown || keys.LEFT.isDown ) && ( this.qReady && this.leftReady ) ){
            this.qReady = false;
            this.leftReady = false;
            // // console.log("apui Q")
            player.removePos();
        }

        else if( ( keys.D.isDown || keys.RIGHT.isDown ) && ( this.dReady && this.rightReady ) ){
            this.dReady = false;
            this.rightReady = false;
            // // console.log("apui D")
            player.addPos();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////                         //                        //                          /////
    ////          FIN            //          FIN           //           FIN            /////
    ////      CLAVIER INPUT      //      CLAVIER INPUT     //      CLAVIER INPUT       /////
    ////                         //                        //                          /////
    ////////////////////////////////////////////////////////////////////////////////////////

    // Verifier si c'est le level tuto
    verifTuto( level ){
        if( !tutoDone ){
            tutoDone = true;
            // console.log("tuto")
            this.scene.scene.start( "Level0" );
        }
        else{
            // console.log(level)
            startNextLevel(this.scene, 1 );
            // this.scene.scene.start( level );
        }
    }

    /////////// AFFICHER LE MENU ///////////
    menu(){
        if( boutonReady == 1 ){

            // Empêcher de rerentrer dans cette condition
            boutonReady = 10;

            /////////// ECRAN DE SECURITE ///////////
            this.scene.connected.setVisible( false );
        }
        
    }

    /////////// VARIABLE READY ///////////
    readyClavier(){
        if( keys.ESC.isUp ){
            this.startReady = true;
        }
        if( keys.SPACE.isUp && this.afterBounce){
            this.spaceReady = true;
        }
        if( keys.Z.isUp ){
            this.zReady = true;
        }
        if( keys.Q.isUp ){
            this.qReady = true;
        }
        if( keys.D.isUp ){
            this.dReady = true;
        }
        if( keys.LEFT.isUp ){
            this.leftReady = true;
        }
        if( keys.RIGHT.isUp ){
            this.rightReady = true;
        }
        if( keys.UP.isUp ){
            this.upReady = true;
        }
    }

    // Get a random number
    getRand(max){
        return Math.floor(Math.random() * max);
    }

    // Faire spawn le joueur sur la prémière planète
    spawnPerso( player, obj ){
        // // console.log(obj)
        player.curCellule = obj;
        player.safeCellule = obj;
        player.color = obj.color;
        player.x = obj.a_pos[0].x;
        player.y = obj.a_pos[0].y;
        player.safeCameraId = player.cameraId;
        player.camera.x = player.scene.cameras.main.scrollX;
        player.camera.y = player.scene.cameras.main.scrollY;
        // // console.log(player.color);
        // // console.log(White);
        obj.tweenScaleFond( true );
        player.giveAngle();
        player.setState( 0 );
        player.setColor();
        // // console.log(player.creature)
    }

    // Faire diparaitre les différentes cellules
    hideColor(tab){
        this.hideCellule(tab.barriere); 
        this.hideCellule(tab.triangle); 
        this.hideCellule(tab.pentagone); 
        this.hideCellule(tab.octogone); 
        this.hideCellule(tab.rebond); 
        this.hideCellule(tab.end); 
        this.hideCellule(tab.cameraSlide);
    }

    // Faire diparaitre un tableau de cellule spécifique
    hideCellule(tab){
        if(tab){
            tab.forEach(elem => {
                if(elem.color != "0x4DF732"){
                    elem.hide();
                }
            });
        }
        
    }

    // Faire apparaitre les différentes cellules
    displayColor(tab){
        this.displayCellule(tab.barriere); 
        this.displayCellule(tab.triangle); 
        this.displayCellule(tab.pentagone); 
        this.displayCellule(tab.octogone); 
        this.displayCellule(tab.rebond); 
        this.displayCellule(tab.end); 
        this.displayCellule(tab.cameraSlide);
        
    }

    // Faire apparaitre un tableau de cellule spécifique
    displayCellule(tab){
        if(tab){
            tab.forEach(elem => {
                if( elem.color ){
                    elem.display();
                }
            });
        }
    }

    // Comparer les couleurs entre le joueur et les obj ds la scene
    compareColor(){
        this.tweenBg = false;
        if( player.color == Black ){
            if( curLevel == "Level5" && this.scene.tabBlack.celluleMere[0] ){
                this.scene.tabBlack.celluleMere[0].makeColor(White);
            }
            setTimeout(() => {
                this.uiSwitch( false );
                // this.transBackground(White);
            }, 10);
            player.switchBg( White );
            this.hideColor( this.scene.tabWhite );
            this.displayColor( this.scene.tabBlack );
        }
        else{
            setTimeout(() => {
                if( curLevel == "Level5" && this.scene.tabBlack.celluleMere[0] ){
                    this.scene.tabBlack.celluleMere[0].makeColor(Black);
                }
                this.uiSwitch( true );
                // this.transBackground(Black);
            }, 10);
            player.switchBg(  Black)
            this.hideColor( this.scene.tabBlack );
            this.displayColor( this.scene.tabWhite );
        }
        
    }

    // Initialiser les variables graphics
    initGraphics(){
        graphics = this.scene.add.graphics();
        graphics.fillStyle(White, 1);
        graphics1 = this.scene.add.graphics();
        graphics1.fillStyle(Black, 1);
        this.scene.bgWhite = graphics.fillRect(-game.config.width*2, -game.config.height*2, game.config.width*5, game.config.height*5).setScrollFactor(0);
        // // console.log(this.scene.bgWhite)
        this.scene.bgBlack = graphics1.fillRect(-game.config.width*2, -game.config.height*2, game.config.width*5, game.config.height*5).setScrollFactor(0);
        this.scene.bgSwitch = this.scene.add.sprite( 0, 0, 'celluleFin3' ).setDepth(3).setScale(0);
    }

    // Animation pour la transition des bg color
    transBackground( color ){
        
        if( color == Black ){
            var obj = this.scene.bgBlack;
            var obj2 = this.scene.bgWhite;
            this.scene.bgSwitch.setTint( Black );
        }
        else{
            var obj = this.scene.bgWhite;
            var obj2 = this.scene.bgBlack;
            this.scene.bgSwitch.setTint( White );
        }

        // Transition avec le cercle qaui grandi que lorsque le joueur joue
        if( gameState == 1 || gameState == 10 ){
            this.scene.bgSwitch.setPosition(player.x, player.y);
            this.scene.tweens.add({
                targets: this.scene.bgSwitch,
                scale: 10,
                ease: 'Lineare',
                duration: this.timeDimension,
                onUpdate : (tween)=>{
                    if( keys.SPACE.isDown && this.spaceReady ){
                        this.tweenBg = true;
                        this.scene.bgSwitch.scale = 0;
                        obj.setDepth(1);
                        obj2.setDepth(0);
                        tween.stop();
                    }
                },
                onComplete:(tween)=>{
                    this.scene.bgSwitch.scale = 0;
                    obj.setDepth(1);
                    obj2.setDepth(0);
                    this.tweenBg = true;
                }
            });
        }

        // Sinon ,transition simple entre les deux fond
        else{
            this.tweenBg = true;

            obj.setDepth(1);
            obj2.setDepth(0);
        }
    }

    // Mettre la bonne couleur pour un bouton en fonction du fond
    setColor( obj, color ){
        if( color == Black ){
            obj.bg.setTint(color);
            obj.text.setColor(WhiteText);
        }
        else{
            obj.bg.setTint(color);
            obj.text.setColor(BlackText);
        }
    }

    // Switch les couleur pour correspondre avec le fond du jeu
    uiSwitch( bool ){
        var color = Black;
        var color2 = White;
        if( bool ){
            color = White;
            color2 = Black;
        }
        this.setColor( ui.restartLvl, color2);
        this.setColor( ui.mainMenu, color2 );
        this.setColor( ui.return, color2 );
        ui.f_bg.setTint(color2);
        ui.c_bg.setTint(color);
        ui.pause.setTint(color);
    }

    // Rebond des field et perso su couleur différente
    rebond( dist ){
        this.afterBounce = false;
        this.spaceReady = false;
        setTimeout(() => {
            this.afterBounce = true;
        }, 20);
        // player.angle = player.curPos * 45;
        for (let i = -1; i < 8; i++) {

            if( i == dist.pos.id ){

                var angle1 = addNumber( i, 9 ); 
                var angle2 = addNumber( i, 8 );            
                var angle3 = addNumber( i, 7 );

                var j = addNumber( i, 3 );          
                var k = addNumber( i, 4 );
                var l = addNumber( i, 5 );
                
                if( player.curPos == j ){
                    // console.log("j");
                    // // console.log(angle1);
                    player.curPos = angle1;
                    rebond.play();
                    player.propulse();
                    
                }
                else if( player.curPos == k ){
                    // console.log("k");
                    // // console.log(angle2);
                    player.curPos = angle2;
                    rebond.play();
                    player.propulse();
                }
                else if( player.curPos == l ){
                    // console.log("l");
                    // // console.log(angle3);
                    player.curPos = angle3;
                    rebond.play();
                    player.propulse();
                }
            }
        }
    }
}

 // Creation de l'animation vectoriel du slide de la camera
 function tweenCamera( scene, x, y ){
    // player.tweenCameraVar = false;  
    if( x && y ){
        scene.tweens.add({
            targets: scene.cameras.main,
            scrollX: x,
            scrollY: y,
            ease: 'Quad',
            duration: 1500,
            onComplete: (tween) => {
                // player.tweenCameraVar = true;
            }
        });
        scene.tweens.add({
            targets: scene.space,
            x: x,
            y: y,
            ease: 'Quad',
            duration: 1500
        });
        
    }
    else if( x != false  ){
        scene.tweens.add({
            targets: scene.cameras.main,
            scrollX: x,
            ease: 'Quad',
            duration: 1500,
            onComplete: (tween) => {
                // player.tweenCameraVar = true;
            }
        });
        scene.tweens.add({
            targets: scene.space,
            x: x,
            ease: 'Quad',
            duration: 1500
        });
    }
    else{
        // scene.readyMovement = false;
        scene.tweens.add({
            targets: scene.cameras.main,
            scrollY: y,
            ease: 'Quad',
            duration: 700,
            onComplete: (tween) => {
                // player.tweenCameraVar = true;
            }
        });
        scene.tweens.add({
            targets: scene.space,
            y: y,
            ease: 'Quad',
            duration: 700
        });
    }
}

// Get un nombre random entre 0 et nbr
function getRand( max ){
    min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Ajouter un nombre et q'il soit toujours inférieur a 7
function addNumber( i, nbr ){
    var j = i;
    for (let k = 0; k < nbr; k++) {
        j ++;
        if(j  > 7){
            j  = 0;
        }
    }
    return j;
}

function addCameraPostion( scene, i, xDir , yDir ){


    var w = 1920/1.2 ;
    var h = 1080/1.2 ;
    

    // Si ce n'est pas la première case du tableau
    if( i != 0 ){
        if( xDir != 0 ){
            scene.cameraPosition[i].x = scene.cameraPosition[i-1].x + w* scene.multipleX * xDir;

            scene.cameraPosition[i].y = scene.cameraPosition[i-1].y;
        }
        else{
            scene.cameraPosition[i].x = scene.cameraPosition[i-1].x;

            scene.cameraPosition[i].y = scene.cameraPosition[i-1].y + h* scene.multipleY * yDir;
        }
        
    }
    // Si c'est la première case du tableau
    else{
        if( xDir != 0 ){
            scene.cameraPosition[i].x = cameraEmpty.x + w* scene.multipleX * xDir;

            scene.cameraPosition[i].y = cameraEmpty.y;
        }
        else{
            scene.cameraPosition[i].x = cameraEmpty.x;
            // console.log(cameraEmpty)

            if( curLevel == "Level0" ){
                scene.cameraPosition[i].y = cameraEmpty.y + h* 1.8 * yDir;
            }
            else{
                scene.cameraPosition[i].y = cameraEmpty.y + h* scene.multipleY * yDir;
            }
        }
    }
}

function createCameraPos( scene ){
    // console.log(scene.cameraNodes.length)
    for (let i = 0; i < scene.cameraNodes.length; i++) {

        if( scene.cameraNodes[i] == 0 ){
            // // // console.log("Haut");
            addCameraPostion( scene, i, 0 , -1 );
        }
        else if( scene.cameraNodes[i] == 1 ){
            // // // console.log("Droite");
            addCameraPostion( scene, i, 1 , 0 );
        }
        
        else if( scene.cameraNodes[i] == 2 ){
            // // // console.log("Bas");
            addCameraPostion( scene, i, 0, 1 );
        }

        else if( scene.cameraNodes[i] == 3 ){
            // // // console.log("Gauche");
            addCameraPostion( scene, i, -1, 0 );
        }
    }
}

function createCameraEmpty( scene ){
    cameraEmpty = scene.add.image(0,0);
    scene.cameras.main.startFollow( cameraEmpty );
}

// Creation de la camera
function initCamera(scene, bool){
    // Zoom tres large pour faire l'effet
    // scene.cameras.main.setZoom(0.1 * proportion);
    // reation de variable

    createCameraEmpty( scene );

    scene.cameras.main.fadeIn( 500 )

    // Faire l'effet de zoom apres le fade in
    scene.cameras.main.zoomTo( 0.2 * proportionZoom ,700 ,'Expo' );
    scene.cameras.main.on('camerafadeincomplete', ()=>{ 
        if( bool ){
            // // console.log("pause21")
            gameState = 10;
        }
        else{
            gameState = 1;
        }
        
    }, this);
}

// Changer de level actuel
function addIndexLevel( index ){
    if( index ){
        indexLvl = index;
    }
    else{
        indexLvl++;
    }
    
    curLevel = dataBase.level[indexLvl];

    // console.log(curLevel);
    // // console.log(curLevel);
}

function startNextLevel(scene, obj, bool, curlvl ){
    if( bool ){
        gameNav.niveau = curlvl + 1;
    }
    gameState = -1;
    if(obj){
        addIndexLevel( obj );
    }
    else{
        addIndexLevel();
    }
    scene.readyAddLevel = false;
    // console.log( curLevel )
    scene.cameras.main.fadeOut(300)
    scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 
        scene.scene.start( curLevel );
    }, scene);
}

// Faire attérire le joueur sur une planète
function takeDownPlayer( player, sprite ){
    octoArrive.play();
    sprite.parent.tweenScaleFond( true );
    player.body.setVelocity(0);
    player.addCellule( sprite.parent );
    player.prevState = 1;
    player.moveToPos( false , true );
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////////////  CREATION CELLULES /////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Creer la cellule mere
function createCelluleMere( scene, x, y, tab, color, player, bool ){
    if( bool ){
        // console.log("booool")
        // Faire la cellule mere du lvl 5
        var celluleMere = new CelluleMere( scene, x, y, color, true );
        tab.push( celluleMere );
    }
    else{
        var celluleMere = new CelluleMere( scene, x, y, color );
        scene.physics.add.overlap( player, celluleMere.sprite, null, attackPlayer, this );
        tab.push( celluleMere );
    }
    
}

// Creation de cellule octogonale
function createCellule( scene, x, y, color, tab, player, scroll, bool, ori, end, cameraId, transDial ){
    // // console.log(bool)
    if( end ){
        // // console.log("end")
        var planetEnd = new Octogone( scene, x, y,  "Green", false, scroll, ori, true );
        scene.physics.add.overlap( player, planetEnd.sprite, null, contact, this );
        tab.push( planetEnd );
    }
    else if( transDial ){
        console.log('transDial')
        var cellule = new Octogone( scene, x, y, color );
        scene.physics.add.overlap( player, cellule.sprite, null, contactDial, this )
        tab.push( cellule );
    }
    else{
        if( bool ){
            var cellule = new Octogone( scene, x, y, color, bool, scroll, ori );
        }
        
        else if( cameraId || cameraId== 0 ){
            // // console.log("camreaSlide")
            var cellule = new Octogone( scene, x, y, color, false, false, false, false, cameraId );
        }
        else{
            var cellule = new Octogone( scene, x, y, color);
        }
        scene.physics.add.overlap( player, cellule.sprite, null, contact, this )
        // // console.log(cellule)
        tab.push( cellule );
    }
}

// Creation de cellule ennemie
function createTriangle( scene, x, y, color, tab, player){
    var triangle = new Triangle( scene, x, y, color );
    scene.physics.add.overlap( player, triangle.sprite, null, attackPlayer, this );
    tab.push(triangle);
}

// Creation cellule rebondissante
function createRebond( scene, x, y, color, tab, player ){
    var rebond = new Rebond( scene, x, y, color );
    scene.physics.add.overlap( player, rebond.sprite, null, contactRebond, this );
    scene.physics.add.overlap( player, rebond.sprite2, null, tweensRebond, this );
    tab.push(rebond);
    // // console.log(scene.tab)
}

// Creation cellule rebondissante
function createBarriere( scene, x, y, rotation, color, id, tab, player ){
    var barriere = new Barriere( scene, x, y, id, rotation, color );
    scene.physics.add.overlap( player, barriere.sprite, null, contactBarriere, this );
    tab.push(barriere);
    // // console.log(scene.tab)
}

// Creation cellule rebondissante
function createPentagone( scene, x, y, rotation, color, tab, player ){
    var pentagone = new Pentagone( scene, x, y, rotation, color );
    scene.physics.add.overlap( player, pentagone.sprite, null, contactPentagone, this );
    tab.push(pentagone);
    // // console.log(scene.tab)
}

function createEnd( scene, x, y, color, tab, player ){
    var end = new CelluleEnd( scene, x, y, color );
    scene.physics.add.overlap( player, end.sprite, null, contactTweenEnd, this );
    tab.push(end);
}

function createSlide( scene, x, y, tab, angle, color, dir, id, player ){
    var slide = new CameraSlide( scene, x, y, color, angle, dir, id );
    // console.log("camera slide")
    scene.physics.add.overlap( player, slide.hitBox, null, contactSlide, this );
    // scene.physics.add.overlap( player, slide.hitBoxDeath, null, contactVerifSlide, this );
    tab.push(slide);
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////  FIN CREATION CELLULES /////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function createHelp( scene, x, y, tab, touche ){
    var Tuto = new Touche( scene, x, y, touche );
    tab.push(Tuto);
}
// Dès que la joueur touche le centre d'une planète
function contact( curPlayer, curSprite ){
    // Permettre le déplacement lorsqu'il est en contact avec la cellule octogonale
    // console.log("launche<rghqhDial")
    if( curPlayer.readyMovement ){
        curPlayer.scene.event.keyMovement();
    }
    
    // Faire attérir le joueur sur cette cellule
    else if( curSprite.parent != player.curCellule ){

        takeDownPlayer( curPlayer, curSprite );
        checkSafePlanet( curPlayer, curSprite.parent );
    }
}

function contactDial( curPlayer, curSprite ){
    // Permettre le déplacement lorsqu'il est en contact avec la cellule octogonale
    if( curPlayer.readyMovement ){
        if( !curPlayer.scene.dial.closeText ){
            this.readyJump = false;
            player.bgTweenReady = false;
        }
        curPlayer.scene.event.keyMovement();
    }

    // Faire attérir le joueur sur cette cellule
    else if( curSprite.parent != player.curCellule ){
        this.readyJump = false;
        player.bgTweenReady = false;
        // console.log("launchDial")
        player.scene.dial.spawnDial( true );
        takeDownPlayer( curPlayer, curSprite );
        checkSafePlanet( curPlayer, curSprite.parent );
    }
}

function tweensRebond( curPlayer, curRebond ){
    if( curPlayer.curCellule != curRebond && curPlayer.curCellule != curRebond.parent.sprite ){
        // console.log( 'tween Rebond' );
        curPlayer.addCellule( curRebond );
        curRebond.parent.tweenClose();
    }
}

// Callback lorsqu'on touche des cellules rebonds
function contactRebond( curPlayer, curRebond ){
    if( curPlayer.curCellule != curRebond.parent ){
        // console.log( 'Rebond' );
        var dist = curPlayer.calculDist( curRebond.parent );
        // // console.log(dist)
        curPlayer.scene.event.rebond( dist );
        curPlayer.addCellule( curRebond );
    }
}

// Rebondir contre la barrière comme pour la cellule ronde
function contactBarriere( curPlayer, curBarriere ){
    // // console.log( 'Barrière' );
    if(  curPlayer.curCellule.id && curPlayer.curCellule.id != curBarriere.parent){
        // console.log("barrière")
        barriere.play();
        // Ajouter cette cellule en cellule courante
        curPlayer.addCellule( curBarriere.parent );
    
        // Amener le joueur au centre du penatgone
        curBarriere.parent.giveVelocity( curPlayer );
    } 
    else if( curPlayer.curCellule != curBarriere.parent && !curPlayer.curCellule.id ){
        // console.log("barrière")
        barriere.play();
        // Ajouter cette cellule en cellule courante
        curPlayer.addCellule( curBarriere.parent );
    
        // Amener le joueur au centre du penatgone
        curBarriere.parent.giveVelocity( curPlayer );
        if( curBarriere.scene.level == 2 && curBarriere.scene.tabWhite.tuto[0].touche.scale == 0 && gameNav.niveau < 3){
            console.log("heyeye")
            curBarriere.scene.tabWhite.tuto[0].tweenScale( true );
        }
    }


    
    // curPlayer.moveToPos();
}

// Etre propulser dans une direction
function contactPentagone( curPlayer, curPentagone ){
    // // console.log( 'Pentagone' );
    if( curPlayer.curCellule != curPentagone.parent ){

        // Ajouter cette cellule en cellule courante
        curPlayer.addCellule( curPentagone.parent );

        // Amener le joueur au centre du penatgone
        curPentagone.parent.tweenCenter( curPlayer );
    }
}

// Etre attirer au centre de la planète
function contactTweenEnd( curPlayer, curEnd ){

    if( curPlayer.curCellule != curEnd && curPlayer.curCellule != curEnd.parent.sprite3 ){
        // Ajouter cette cellule en cellule courante
        curPlayer.readyMovement = false;
        curPlayer.move = true;
        curPlayer.addCellule( curEnd );
        curEnd.parent.tweenTraj( curPlayer );

        
    }
}

// Slide de la camera
function contactSlide( curPlayer, curSlide ){

    if( curPlayer.cameraId != curSlide.parent.id ){
        // // console.log("oui1")
        if( curPlayer.cameraId == 0 || curPlayer.cameraId < curSlide.parent.id ){
            // console.log("oui")
            curSlide.parent.changeCamera( true );
        }

        else {
            // console.log("non")
            curSlide.parent.changeCamera( false );
        }

        curPlayer.cameraId = curSlide.parent.id;

    }
}

// Si le joueur est de la meme couleur que le slide de camera
function contactVerifSlide( curPlayer, curSlide ){

    if( curPlayer.cameraId != curSlide.parent.id && curPlayer.color != curSlide.parent.color ){
        curPlayer.getDegat();
    }
}

// Check si la cellule est "safe"
function checkSafePlanet( curPlayer, planet ){
    // Verifier si la planète est une gravitationnelle (safe)
    // // console.log("planettttttttt")
    if( planet.safe ){
        curPlayer.safeCellule = planet;
        curPlayer.safeCameraId = curPlayer.cameraId;
        curPlayer.camera.x = curPlayer.scene.cameras.main.scrollX;
        curPlayer.camera.y = curPlayer.scene.cameras.main.scrollY;
    }
}

// Mettre la camera sur la bonne position
function spawnCamera( scene, layer, camera, orientation ){
    // Haut gauche
    // // console.log(orientation)
    

    if( orientation == 0 ){
        cameraEmpty.setPosition( layer.x *1.6 + 1920*1.6, layer.y *1.5 + 1080 / 1.25  )
        // camera.centerOn( layer.x *1.6 + game.config.width*1.6, layer.y *1.5 + game.config.height / 1.25 );
    }
    // Milieu Haut
    else if( orientation == 1 ){
        cameraEmpty.setPosition( layer.x *1.6 , layer.y *1.5 + 1080 / 1.25  )
        // camera.centerOn( layer.x *1.6, layer.y *1.5 + game.config.height / 1.25 );
    }

    else if( orientation == 1.5 ){
        cameraEmpty.setPosition( layer.x *1.6, layer.y *1.5 )
        // camera.centerOn( layer.x *1.6, layer.y *1.5 );
    }

    // Milieu Bas
    else if( orientation == 2 ){
        cameraEmpty.setPosition( layer.x *1.6 , layer.y *1.5 - 1080 / 1.25  )
        // camera.centerOn( layer.x *1.6, layer.y *1.5 - game.config.height / 1.25 );
    }

    // Bas Gauche
    else if( orientation == 3 ){
        cameraEmpty.setPosition( layer.x *1.6 + 1920*1.6, layer.y *1.5 - 1080 / 1.25  )
        // camera.centerOn( layer.x *1.6 + game.config.width*1.6, layer.y *1.5 - game.config.height / 1.25 );
    }


    else if( orientation == 3.5 ){
        cameraEmpty.setPosition( layer.x *1.6 + 1920*1.6, layer.y *1.5 )
        // camera.centerOn( layer.x *1.6 + game.config.width*1.6, layer.y *1.5 );
    }

    // Milier Bas++
    else if(orientation == 4 ){
        cameraEmpty.setPosition( layer.x *1.6 , layer.y *1.4 - 1080 / 1.25  )
        // camera.centerOn( layer.x *1.6, layer.y*1.4 - game.config.height / 1.25 );
    }

    // A droite
    else if(orientation == 6 ){
        cameraEmpty.setPosition( layer.x *1.6 - 1920*1.5, layer.y *1.5 )
        // camera.centerOn( layer.x *1.6 - game.config.width*1.5, layer.y *1.5 );
    }

    createCameraPos( scene );

    scene.space = new Space( scene, cameraEmpty );
    
}

// Attacker le joueur
function attackPlayer( curPlayer, curHit ){
    curPlayer.getDegat();
}

// Creation d'hitbox pour regarder si le joueur sort de l'écran
function createHitbox( scene, x, y, w, h, bool ){
    
    var hit = scene.add.rectangle( x, y, w, h );
    scene.physics.world.enable( hit );
    hit.setAlpha( 0 );
    hit.body.allowGravity = false;
    if ( !bool ){
        scene.physics.add.overlap(player, hit, null, attackPlayer, this );
    }
    return hit;
}