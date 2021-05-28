class Map {
    constructor( scene, level, bool ){

        this.scene = scene;
        this.level = level;
        this.map = false;
        this.color = White;
        this.tab = false;

        // Scene du stage
        if( bool ){
            this.createTile( true );

            this.createStageLayer();
        }

        // Level TuTo
        else if( level == "Level0" ){
            this.createTile();

            this.createOctogonesLayer();

            this.createCelluleMereLayer();

            this.createBarriereLayer();

            this.scene.bg = this.scene.add.image( game.config.width / 2, game.config.height / 2, 'Background2').setScale(6).setScrollFactor(0.10);

            if(player.contour == Black){
                this.scene.bg.setTint(Black);
            }
            else{
                this.scene.bg.setTint(White);
            }

        }

        // Les autres niveaux
        else{

            this.createTile();
            
            this.createEndLayer();

            this.createOctogonesLayer();

            this.createRebondsLayer();

            this.createTriangleLayer();

            this.createBarriereLayer();

            this.createPentagoneLayer();
            
            this.scene.bg = this.scene.add.image( game.config.width / 2, game.config.height / 2, 'Background2').setScale(6).setScrollFactor(0.10);

            if(player.contour == Black){
                this.scene.bg.setTint(Black);
            }
            else{
                this.scene.bg.setTint(White);
            }
        }
    }

    checkColor(obj){
        
        if( obj.value == "White" ){
            // console.log(obj.properties[0].value)
            this.color = White;
            this.tab = this.scene.tabWhite;
        }else{
            this.color = Black;
            this.tab = this.scene.tabBlack;
        }
    }

    createTile( bool ){
        // Creation de la map
        this.map = this.scene.make.tilemap( { key: this.level } );

        if( bool ){
            console.log('Stage')
            this.Stage = this.map.getObjectLayer('Boutons')['objects'];
        }
        else if( this.level == "Level0"){
            // Creation du tileSet
            this.tileSet = this.map.addTilesetImage( 'tileSet', 'tileSet' );

            // Creation des calques objet
            this.Octogone = this.map.getObjectLayer( 'Octogone' )[ 'objects' ];
            this.CelluleMere = this.map.getObjectLayer( 'CelluleMere' )[ 'objects' ];
            this.Barriere = this.map.getObjectLayer( 'Barriere' )[ 'objects' ];
        }
        else{
            // Creation du tileSet
            this.tileSet = this.map.addTilesetImage( 'tileSet', 'tileSet' );

            // Creation des calques objet
            this.Octogone = this.map.getObjectLayer( 'Octogone' )[ 'objects' ];
            this.Rebond = this.map.getObjectLayer( 'Rebond' )[ 'objects' ];
            this.Triangle = this.map.getObjectLayer( 'Triangle' )[ 'objects' ];
            this.Barriere = this.map.getObjectLayer( 'Barriere' )[ 'objects' ];
            this.Pentagone = this.map.getObjectLayer( 'Pentagone' )[ 'objects' ];
            this.End = this.map.getObjectLayer( 'End' )[ 'objects' ];
        }
    }

    createStageLayer(){
        // // Faire spawn les planètes bleu
        // console.log(this.Stage)
        this.Stage.forEach(Stage => {
            
            if( Stage.properties[0] && Stage.properties[0].value <= gameNav.niveau ){
                // console.log(Stage)
                // console.log(gameNav.niveau )
                // console.log(this.scene.t_BoutonsStage)
                this.scene.t_BoutonsStage.push( new StageBouton( this.scene, Stage.x * 2 + game.config.width / 5, Stage.y * 2 + game.config.width / 10, Stage.properties[0].value, 1, true ) );
            }
            else{
                this.scene.t_BoutonsStage.push( new StageBouton( this.scene, Stage.x * 2 + game.config.width / 5, Stage.y * 2 + game.config.width / 10, 0 , 1 ) );
            }
            // console.log(Stage)
        });
    }

    createEndLayer(){
        this.End.forEach(End => {
            // console.log(End)
            if( End.properties ){
                if( End.properties[0].name == "color" ){
                    this.checkColor( End.properties[0] );
                }
                else{
                    this.checkColor( End.properties[1] );
                }
                // console.log(End.properties)
                if( End.properties[0] && End.properties[0].name == "celluleMere" ){
                    createCelluleMere( this.scene, End.x*1.6, End.y*1.5, this.tab.celluleMere, this.color, player, true );
                }
                else if( End.properties[1] && End.properties[1].name == "end" ){
                    createEnd( this.scene, End.x*1.6, End.y*1.5, this.color, this.tab.end, player );
                }
                
            }
        });
    }

    createOctogonesLayer(){
        
        // Faire spawn les planètes bleu
        this.Octogone.forEach(Octogone => {
            // console.log(Octogone)
            if( Octogone.properties ){
                
                // console.log(Octogone.properties)
                if( Octogone.properties[0] && Octogone.properties[0].name == "TransDialogue" ){
                    this.checkColor( Octogone.properties[1] );
                    createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player, false, false, false, false, false, Octogone.properties[0].value );
                }
                else{
                        this.checkColor( Octogone.properties[0] );
                    
                    if( Octogone.properties[1] && Octogone.properties[1].name == "end" ){
                        
                        createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player, false, false, false, true );
                    }
                    else if( Octogone.properties[2] && Octogone.properties[2].name == "spawnCamera" ){
                        
                        spawnCamera(this.scene, Octogone, this.scene.cameras.main, Octogone.properties[1].value );
                        createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player );

                        this.scene.event.spawnPerso( player, this.tab.octogone[this.tab.octogone.length-1] );
                    }
                    else if(Octogone.properties[1] && Octogone.properties[1].name == "idCamera" ){
                        // console.log("slide")
                        createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player, false, false, false, false, Octogone.properties[1].value );
                    }
                    else if( Octogone.properties[3] ) {
                        createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player, Octogone.properties[2].value, Octogone.properties[3].value, Octogone.properties[1].value );
                    }
                    else{
                        createCellule( this.scene, Octogone.x*1.6, Octogone.y*1.5, this.color, this.tab.octogone, player );
                    }
                }
            }
        });
    }

    createRebondsLayer(){
        this.Rebond.forEach(Rebond => {
            if( Rebond.properties ){
                this.checkColor( Rebond.properties[0] );
            }
            createRebond( this.scene, Rebond.x*1.6, Rebond.y*1.5, this.color, this.tab.rebond, player );
        });
    }

    createTriangleLayer(){
        this.Triangle.forEach(Triangle => {
            if( Triangle.properties ){
                this.checkColor( Triangle.properties[0] );
            }
            createTriangle( this.scene, Triangle.x*1.6, Triangle.y*1.5, this.color, this.tab.triangle, player );
        });
    }

    createBarriereLayer(){
        this.Barriere.forEach(Barriere => {
            if( Barriere.properties ){
                this.checkColor( Barriere.properties[0] );
                if( Barriere.properties[1] ){
                    if( Barriere.properties[2] ){
                        createBarriere( this.scene, Barriere.x*1.6, Barriere.y*1.5, Barriere.properties[2].value, this.color, Barriere.properties[1].value, this.tab.barriere, player );
                    }
                    else{
                        createBarriere( this.scene, Barriere.x*1.6, Barriere.y*1.5, 0, this.color, Barriere.properties[1].value, this.tab.barriere, player );
                    }
                }
                else{
                    createBarriere( this.scene, Barriere.x*1.6, Barriere.y*1.5, 0, this.color, 0, this.tab.barriere, player );
                }
            }
            
        });
    }

    createPentagoneLayer(){
        this.Pentagone.forEach(Pentagone => {
            if( Pentagone.properties ){
                this.checkColor( Pentagone.properties[0] );
            }
            if( Pentagone.properties[0] && Pentagone.properties[1] ){
                createPentagone( this.scene, Pentagone.x*1.6, Pentagone.y*1.5, Pentagone.properties[1].value, this.color, this.tab.triangle, player );
            }
            else{
                createPentagone( this.scene, Pentagone.x*1.6, Pentagone.y*1.5, 0, this.color, this.tab.triangle, player );
            }
            
        });
    }

    createCelluleMereLayer(){
        this.CelluleMere.forEach(CelluleMere => {
            if( CelluleMere.properties ){
                this.checkColor( CelluleMere.properties[0] );
            }
            createCelluleMere( this.scene, CelluleMere.x*1.6, CelluleMere.y*1.5, this.tab.celluleMere, this.color, player );
        });
    }
}