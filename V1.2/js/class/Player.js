class Player extends Phaser.GameObjects.Container {

    constructor( scene, x, y ){

        // Construction du container
        super( scene, x, y );

        scene.add.existing( this );

        // Init variable de la scene de jeu
        this.scene = scene;

        // // console.log(this.depth)
        this.contour = this.scene.add.sprite( 0, 0, 'playerContour' ).setScale(0.6* proportion);
        
        this.sprite = this.scene.add.sprite( 0, 0, 'player' ).setScale(0.5* proportion);

        // Ceration des backgrounds
        this.indexTransWhite = -1;
        this.indexTransBlack = -1;

        this.bgTweenReady = true;

        this.WhiteBg = [];
        this.BlackBg = [];

        // this.bgContainer = this.scene.add.container(0, 0);

        for (let i = 0; i < 20; i++) {
            if( i < 10 ){
                this.WhiteBg.push( this.createBg( White ) );
            }
            else{
                this.BlackBg.push( this.createBg( Black ) );
            }
        }

        // Ajout physics / setting container
        this.add( [ this.contour, this.sprite ] );

        this.setDepth( 500 );

        this.scene.physics.world.enable( this );
        this.body.allowGravity = false;
        this.body.setCircle( ( this.sprite.width / 3.5 ) * 0.5 ).setOffset( - (this.sprite.width / 3.5 ) * 0.5 );

        this.scene.tweens.add({
            targets: this.sprite,
            angle: 360,
            duration: 10000,
            repeat: -1
        })

        // Creation / init des variables
        this.cameraId = 0;
        this.safeCameraId = 0;

        // Couleurs du perso
        this.color = false;

        // Précédente state
        this.prevState = false;

        // Position actuelle
        this.curPos = 0;
        this.fromAngle = 0;

        // Cellule current et la dernière safe
        this.curCellule = false;
        this.safeCellule = false;
        this.camera = {
            x: 0,
            y: 0
        }

        // Ready pour tween / bouger
        this.move = false;
        this.tweenCameraVar = true;
        this.readyMovement = true;
        this.rebond = true;

        // Camera slide
        this.curScroll = -2;

        // Speed joueur
        this.speedOrthogonal = 600*3;
        this.speedDiagonal = 540*3;

        // pour la propultion
        // TO DO SET VELOCITY BY ANGLE
        this.PoseToProposle = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1]
        ]
        // Si il peut aller dans l'espace
        this.spaceReady = true;

        // Si le joueur est arrivé sur la planète de fin de niveau
        this.end = false;

        // Mettre la couleur en fonction de la couleur de début 
        this.setColor();
    }


    createBg( color ){
        var sprite = this.scene.add.sprite( 0, 0, 'celluleFin3' ).setScale(0).setTint( color );
        // this.bgContainer.add(sprite)
        return sprite;
    }

    switchBg( color ){
        // // console.log(this.bgContainer);
        // this.bgContainer.setPosition( this.x, this.y )
        // // console.log('sw<itch coloe')
        // // console.log(this.WhiteBg[1].x)
        if( color == White ){
            this.indexTransWhite = this.addIndex( this.indexTransWhite );
            // // console.log(this.indexTransWhite)
            
            this.tweenBgScale( this.WhiteBg, this.indexTransWhite );
        }
        else{
            this.indexTransBlack = this.addIndex( this.indexTransBlack );
            // // console.log(this.indexTransBlack)
            
            this.tweenBgScale( this.BlackBg, this.indexTransBlack );
        }
    }

    depthChange( tab, obj, index ){

        if( tab == this.WhiteBg ){
            var tabInverse = this.BlackBg;
        }
        else{
            var tabInverse = this.WhiteBg;
        }

        for (let i = 0; i < 10; i++) {
            if( i == index){
                tabInverse[i].setDepth(6)
            }
            else{
                tabInverse[i].setDepth(0);
            }
        }

        // tabInverse.forEach( elem => {
        //     if( elem != obj ){
        //         // this.sort( elem );
        //         elem.setDepth(0);
        //     }
        // });
        tab.forEach( elem => {
            if( elem != obj ){
                // this.sort( elem );
                elem.setDepth(0);
            }
            else{
                elem.x = this.x;
                elem.y = this.y;
                elem.setScale(0);
                elem.setDepth(7);
            }
        });

        
    }

    tweenBgScale( tab, i ){
        
        // console.log(i)
        // console.log("scale")
        var obj = tab[ i ];
        // // console.log(obj)
        // // console.log(tab)

        this.depthChange( tab, obj );

        this.scene.tweens.add({
            targets: obj,
            scale: 10,
            ease: 'Lineare',
            duration: 1000,
            onComplete: ()=>{
                
                obj.scale = 100;
            }
        });
    }

    addIndex( nbr ){
        nbr++;
        if( nbr > 9 ){
            nbr = 0;
        }
        return nbr;
    }

    // Envoie le joueur dans une direction
    propulse(){
        setTimeout(() => {
            octo.play()
        }, 500);
        
        if( this.body.velocity.x == 0 && this.body.velocity.y == 0 ){
            this.spaceReady = false;
            // setTimeout( () => {
                this.giveVelocity();
            // },200);
        }
        else{
            this.giveVelocity();
        }
    }

    // Donner de la vélociter au joueur lorsqu'il se fera propulse ou rebond
    giveVelocity(){
        if( this.body.velocity.x == 0 && this.body.velocity.y == 0 ){
            // // console.log("ouoioui")
            this.scene.tweens.add({
                targets: objVelo,
                ortho: this.speedOrthogonal,
                diagonal: this.speedDiagonal,
                ease: 'Back.easeIn',
                duration: 700,
                onUpdate: (tween) => {
                    // // // console.log(this.move)
                    if( !this.move ){
                        this.body.setVelocity(0);
                        // // // console.log("heyey")
                        if( this.curPos % 2 == 0 ){
                            this.body.velocity.x = objVelo.ortho * this.PoseToProposle[ this.curPos ][ 0 ];
                            this.body.velocity.y = objVelo.ortho * this.PoseToProposle[ this.curPos ][ 1 ];
                        }
                        else{
                            this.body.velocity.x = objVelo.diagonal * this.PoseToProposle[ this.curPos ][ 0 ];
                            this.body.velocity.y = objVelo.diagonal * this.PoseToProposle[ this.curPos ][ 1 ];
                        }
                    }
                    else{
                        tween.stop();
                        // // // console.log("hayay")
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                        objVelo.ortho = 0;
                        objVelo.diagonal = 0;
                    }
                },
                onComplete: () => {
                    // // console.log(this.body.velocity.y)
                    this.move = false;
                    objVelo.ortho = 0;
                    objVelo.diagonal = 0;
                }
            });
        }
        else{
            // // console.log(this.PoseToProposle[ this.curPos ][ 1 ] * this.speedOrthogonal)
            if( this.curPos % 2 == 0 ){
                this.body.setVelocity( this.PoseToProposle[ this.curPos ][ 0 ] * this.speedOrthogonal , this.PoseToProposle[ this.curPos ][ 1 ] * this.speedOrthogonal );
            }
            else{
                this.body.setVelocity( this.PoseToProposle[ this.curPos ][ 0 ] * this.speedDiagonal, this.PoseToProposle[ this.curPos ][ 1 ] * this.speedDiagonal );
            }
        }
            
            
    }

    // Mettre a la couleur de la variable
    setColor(){
        if(this.color == White){
            this.sprite.setTint(White);
            this.contour.setTint(Black);
        }
        else if (this.color == Black){
            this.sprite.setTint(Black);
            this.contour.setTint(White);
        }
    }

    // Comparer la couleur avec la planète
    switchColor(){
        if(this.color == White){
            this.color = Black;
        }
        else{
            this.color = White;
        }

        this.setColor();

    }

    // Postion du joueur sur la planète au premier contact   
    moveToPos( Cellule, bool ) {
        // // console.log("mvoe")
        if( bool ){
            var check = true;
        }
        else{
            var check = false;
        }

        this.move = true;
        this.prevState == 1;
        // Si collidion avec planète
        // // // console.log(this.curPos)
        if ( Cellule ) {

            // // console.log('MoveToPos(Cellule)');
            
            // Calcul de la distance entre le joueur et les différents pos possible
            var minPosDist = this.calculDist(Cellule);

            // Mettre le joueur sur cette position
            this.setPos( minPosDist, check );

        } else {
            // // // console.log("1")

            var minPosDist = this.calculDist(this.curCellule);

            this.setPos( minPosDist, check );
        }
    }

    // Calcul de la distance entre le joueur et les différents pos de Cellulee
    calculDist( Cellule ){
        // // // console.log("2")
        var a_posDist = [];
        
        Cellule.a_pos.forEach( pos => {
            var dist = Phaser.Math.Distance.BetweenPoints( this, pos );
            a_posDist.push( { pos: pos, dist: dist } );
        });
        // // console.log(a_posDist)
        return this.selectDist( a_posDist );
    }

    // Selectionne la dist / pos la plus proche
    selectDist( a_posDist ){
        // // // console.log("3")
        var minPosDist = a_posDist[0];
        a_posDist.forEach( posDist => {
            if ( posDist.dist < minPosDist.dist ) {
                minPosDist = posDist;
            }
        });
        
        return minPosDist;
    }

    // Mettre le joueur sur la position la plus proche du contact
    setPos( minPosDist, bool ) {
        // // console.log("set")
        if( bool ){
            var check = true;
        }
        else{
            var check = false;
        }

        if( minPosDist ) {
            // // // console.log("4")
            if( this.curCellule ){

                // Calcul de la position de la planète la plus proche
                this.xT = minPosDist.pos.x;
                this.yT = minPosDist.pos.y;

                // Remplacer la Pos du joueur ( variable )
                this.setCurPos( minPosDist.pos.id );

                // Calcul de l'angle que le joueur devra prendre
                var newAngle = this.giveAngle();
                
                // Creation du tween pour le déplacement
                this.createTween( newAngle, this.xT, this.yT, false, false, check );

            }
        }

        else{
            if( this.curCellule ){

                // Calcul de la position de la planète la plus proche
                this.xT = this.curCellule.a_pos[ this.curPos ].x;
                this.yT = this.curCellule.a_pos[ this.curPos ].y;

                this.readyMovement = false;
                // Calcul de l'angle que le joueur devra prendre
                var newAngle = this.giveAngle();
                // // console.log( newAngle )

                // Creation du tween pour le déplacement
                this.createTween( newAngle, this.xT, this.yT, false, false, check );
            }
        }
    }

    // Deplacement du joueur (tourné ou aspiration)
    createTween(angle, xT, yT, veloX, veloY, bool){
        // Deplacer le joueur autour de la planète
        // // console.log(this.state)
        // Faire revenir le joueur sur la planète ou sur une nouvelle
        if(bool){
            // console.log("1")
            
            this.scene.tweens.add({
                targets: this,
                x: xT,
                y: yT,
                ease: 'Back.easeOut',
                duration: 200,
                onComplete: (tween) => {
                    this.move = false;
                    this.readyMovement = true;
                    // // console.log(this.state)
                }
            });
        }
        else {
            // // console.log("2")
            this.scene.tweens.add({
                targets: this,
                x: xT,
                y: yT,
                ease: 'Quad',
                duration: 100,
                onComplete: (tween) => {
                    if( this.end ){
                        // console.log("fin");
                        this.scene.physics.world.disable(this);
                        addIndexLevel();
                        this.scene.cameras.main.fadeOut(700, 'Expo');
                        this.scene.cameras.main.on('camerafadeoutcomplete', ()=>{ 
                            // console.log(indexLvl);
                            this.scene.scene.start( curLevel );
                        }, this);
                    }
                    this.move = false;
                    this.readyMovement = true;
                    // this.creature.creatureTween(false,this.x, this.y);
                }
            });
        }
        
    }

    // Avoir un angle en fonction de la curPos
    giveAngle(){
        // // console.log(this.curPos)
        // // console.log("Curpos " + this.curPos )
        // // console.log("FromAngle " + this.fromAngle/45)
        var target = this.curPos * 45;
        var current = this.fromAngle;
        var diff = target - current;
        
        if ( ( ( this.curPos <= 6 && this.curPos >= 3 ) && diff < 0 ) ||  

        ( this.curPos <= 7 && this.curPos > 4  && diff > 0 ) ||  

        ( diff > 180 ) ){

            diff -= 360;   
        }

        return current + diff;
    }
    
    // Position oposé d'un slide de caméra
    inverseCurNode( nbr ){
        if( nbr == 0 ){
            nbr = 2;
        }
        else if( nbr == 1 ){
            nbr = 3;
        }
        else if( nbr == 2 ){
            nbr = 0;
        }
        else if( nbr == 3 ){
            nbr = 1;
        }
        return nbr;
    }

    // Verification / selection du bon mouvement de camera
    checkCamera( Cellule, bool ){

        if( bool ){
            // // // console.log( '2gale' );
            playingLvl.curCameraNodes = playingLvl.cameraNodes[playingLvl.indexCamera];
            playingLvl.curCameraNodes = this.inverseCurNode( playingLvl.curCameraNodes );
            this.curScroll--;
            // // // console.log( playingLvl.curCameraNodes );
            playingLvl.indexCamera--;
            this.changeCamera();
        }

        else if( this.curScroll >= -1 ){
            // // // console.log( 'scroll ' +  this.curScroll )
            // // // console.log( 'Cellule scroll ' +  Cellule.scroll )

            if ( this.curScroll < Cellule.scroll ){
                // // // console.log( 'plus' );
                playingLvl.indexCamera = Cellule.scroll;
                playingLvl.curCameraNodes = playingLvl.cameraNodes[playingLvl.indexCamera];
                Math.abs(this.curScroll);
                this.curScroll = Cellule.scroll;
                // // // console.log( playingLvl.curCameraNodes );
                this.changeCamera();
            }
        }
        else{
            this.curScroll = Cellule.scroll;
            playingLvl.indexCamera = Cellule.scroll;
            playingLvl.curCameraNodes = playingLvl.cameraNodes[playingLvl.indexCamera];
            this.changeCamera();
            // // console.log( '000' );
        }
    }

    // Deplacer le scroll de la camera pour bien la centrer
    changeCamera(){
        // console.log("camera")

        this.tweenCamera( playingLvl.cameraPosition[playingLvl.indexCamera].x, playingLvl.cameraPosition[playingLvl.indexCamera].y );

    }

     // Creation de l'animation vectoriel du slide de la camera
    tweenCamera( x, y ){
        
        // console.log(y)
        // console.log(x)
        // // console.log(proportion)
        
        this.tweenCameraVar = false;  
        console.log( playingLvl.cameraPosition )
        console.log( playingLvl.indexCamera )
        // if( x && y){
        // this.readyMovement = false;
        this.scene.tweens.add({
            targets: this.scene.cameras.main,
            scrollX: x,
            scrollY: y,
            ease: 'Quad',
            duration: 700,
            onComplete: (tween) => {
                this.tweenCameraVar = true;
                if( this.scene.level == 0 ){
                    this.scene.restartDial();
                    this.scene.dial.verifReady = false;
                }
            }
        });
        this.scene.tweens.add({
            targets: this.scene.space,
            x: x,
            y: y,
            ease: 'Quad',
            duration: 700
        });
    }

    // Ajouter une curCellule au joueur
    addCellule(Cellule){
        this.curCellule = Cellule;
    }

    // Donner la curPos actuelle
    setCurPos( id ){
        this.fromAngle = this.curPos * 45;
        this.curPos = id;
    }

    // Ajouter 1 a curPos
    addPos(){
        this.fromAngle = this.curPos * 45;
        this.curPos++;
        if( this.curPos > 7 ){
            this.curPos = 0;
        }
        this.setPos();
    }

    // Se positionner a la pos 0
    resetPosition(){
        this.body.setVelocity(0);
        this.curPos = 0;
        this.scale = 0;
        this.scene.tweens.add({
            targets: this,
            scale: 1* proportion,
            ease: "expo",
            duration: 400
        });
        this.x = this.safeCellule.a_pos[0].x;
        this.y = this.safeCellule.a_pos[0].y;
        // // console.log(this.curCellule)
        this.safeCellule.tweenScaleFond( true );
        this.setAngle(0);
    }

    // recevoir 1 degat
    getDegat(){
        death.play()
        // console.log("degat")
        this.resetPosition()
        // this.state = 0;
        // this.prevState = 1;
        if( this.safeCellule.color != this.color ){
            // // console.log("difff")
            this.switchColor();
            setTimeout(() => {
                this.scene.event.compareColor();
            }, 10);
        }
        this.curCellule = this.safeCellule;
        this.moveToPos( this.safeCellule );
    }

    // Reset les pv du joueur
    resetLife(){
        this.life = this.lifeMax;
    }

    // Retirer 1 a curPos
    removePos(){
        this.fromAngle = this.curPos * 45;
        this.curPos--;
        if( this.curPos < 0 ){
            this.curPos = 7;
        }
        this.setPos();
    }
}