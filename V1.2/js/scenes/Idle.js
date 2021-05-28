class Idle extends Phaser.Scene {

    constructor() {

        super( 'Idle' );

        this.gamestate = 1;
        
    }

    preload() {

        var progressBar = this.add.graphics();

        this.load.json('dataBase', 'assets/JSON/DataBase.json');

        // console.log(curLevel)

        this.load.on('progress', function (value) {
            // console.log(value);
            progressBar.clear();
            progressBar.fillStyle(Black, 1);
            progressBar.fillRect(0, config.height / 2 - 10, config.width * value, 20);
        });

        this.load.on('complete',  () => {

            this.scene.start( "MainMenu" );

        });
 
        //////////////////////////// UI ////////////////////////////

        this.load.image('boiteDialogue', 'assets/Sprites/BoiteDialogue.png');

        this.load.image('chargement', 'assets/Sprites/chargementSheet.png');

        this.load.image('bgPause', 'assets/Sprites/backgroundPause.png');

        this.load.image('Bouton', 'assets/Sprites/Bouton.png');

        this.load.image('Stage Bouton', 'assets/Sprites/StageBouton.png');

        //////////////////////////// Type de cellules ////////////////////////////
        this.load.image('celluleMere', 'assets/Sprites/celluleMere.png');
        this.load.image('celluleMereContour', 'assets/Sprites/celluleMereContour.png');

        this.load.image('receptrice', 'assets/Sprites/celluleReceptrice.png');
        this.load.image('receptriceFond', 'assets/Sprites/celluleReceptriceFond.png');

        this.load.image('rebond', 'assets/Sprites/rebond.png');
        this.load.image('rebond2', 'assets/Sprites/rebond2.png');
        this.load.image('rebondCercleFond', 'assets/Sprites/rebondCercleFond.png');
        this.load.image('rebondFond', 'assets/Sprites/rebondFond.png');

        this.load.image('triangle', 'assets/Sprites/Triangle.png');

        this.load.image('barriere', 'assets/Sprites/Barriere.png');

        this.load.image('pentagone', 'assets/Sprites/Pentagone.png');

        //////////////////////////// Cellule planète fin de niveau ////////////////////////////
        this.load.image('celluleFin1', 'assets/Sprites/celluleFin.png');
        this.load.image('celluleFin2', 'assets/Sprites/celluleFin2.png');
        this.load.image('celluleFin3', 'assets/Sprites/celluleFinRond.png');

        //////////////////////////// Spritesheet ////////////////////////////
        this.load.spritesheet('player', 'assets/Sprites/persoSpriteSheet.png', { frameWidth: 500, frameHeight: 500 });

        this.load.spritesheet('playerContour', 'assets/Sprites/persoSpriteSheetContour.png', { frameWidth: 500, frameHeight: 500 });

        //////////////////////////// Tile////////////////////////////
        // TileSet
        this.load.image('tileSet',"assets/Tiled/tileSet.png");

        this.load.tilemapTiledJSON('Level0',"assets/Tiled/Level0.json");
        this.load.tilemapTiledJSON('Level1',"assets/Tiled/Level1.json");
        this.load.tilemapTiledJSON('Level2',"assets/Tiled/Level2.json");
        this.load.tilemapTiledJSON('Level3',"assets/Tiled/Level3.json");
        this.load.tilemapTiledJSON('Level4',"assets/Tiled/Level4.json");
        this.load.tilemapTiledJSON('Level5',"assets/Tiled/Level5.json");

        this.load.tilemapTiledJSON('Stage',"assets/Tiled/Stages.json");

        //////////////////////////// BackGround ////////////////////////////
        this.load.image('Background2', 'assets/Sprites/bg2.png');
        
        //////////////////////////// Audio ////////////////////////////
        this.load.audio('musicBg', 'assets/Sounds/Music/musicBackGround.mp3');

        this.load.audio('dialogueSound', 'assets/Sounds/Effects/dialogueSound.mp3');

        this.load.audio('click', 'assets/Sounds/Effects/clickSound.mp3');

        this.load.audio('rebondSound', 'assets/Sounds/Effects/rebondSound.mp3');

        this.load.audio('takeDownSound', 'assets/Sounds/Effects/takeDownSound.mp3');
        this.load.audio('takeDownSound2', 'assets/Sounds/Effects/takeDownSound2.mp3');

        this.load.audio('deathSound', 'assets/Sounds/Effects/deathSound.mp3');

        this.load.audio('endSound', 'assets/Sounds/Effects/finLvl.mp3');


    }

    create() {

        // Creation de la variable pour la proportion d'écran et le zoom de la camrea
        proportion = game.config.width * 1 / 1920;

        if( proportion < 0.9 && proportion > 0.8 ){
            proportionZoom = 0.8;
            proportion = 1;
        }

        else if( proportion < 0.8 && proportion > 0.7 ){
            proportionZoom = 0.7;
            proportion = 1;
        }

        else if(proportion < 0.7){
            proportionZoom = 0.6;
            proportion = 1;
        }

        else{
            proportionZoom = 1;
            proportion = 1;
        }

        console.log(proportion)

        // Creation des effets audio
        click = this.sound.add("click", {volume: 0.5, rate: 0.6});
        end = this.sound.add("endSound", { volume: 0.4, rate: 1.1 });
        rebond = this.sound.add("rebondSound", { volume: 0.25, rate: 0.9 });
        barriere = this.sound.add("rebondSound", { volume: 0.25, rate: 0.8 });
        death = this.sound.add("deathSound", { volume: 0.3 });
        dialogue = this.sound.add("dialogueSound", { volume: 0.1 });
        octo = this.sound.add("takeDownSound", { volume: 0.4, rate: 0.5  });
        octoArrive = this.sound.add("takeDownSound2", { volume: 0.4, rate: 0.5  });

        // Recupérer la data base
        dataBase = this.cache.json.get('dataBase')

        // Initialisation du cur level
        curLevel = dataBase.level[indexLvl];
        console.log(curLevel);
    }
}