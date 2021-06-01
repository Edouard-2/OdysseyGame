class Level0 extends Phaser.Scene {

    // Construction de la scene
    constructor() {

        super( 'Level0' );   
        // Déclaration, des variables
        this.bgWhite = false;
        this.bgBlack = false;
        this.bgSwitch = false;
        this.bg = false;
        this.level = false;
    }
    
    create() {
        // Initialisation, des variables
        this.space = false;
        curLevel = "Level0";
        this.multipleY = 1.5;
        this.multipleX = 1.1;
        this.cameraNodes = [0, 0, 0, 0];
        this.cameraPosition = {
            0 : {
                x: 0,
                y: 0
            },
            1 : {
                x: 0,
                y: 0
            },
            2 : {
                x: 0,
                y: 0
            },
            3 : {
                x: 0,
                y: 0
            },
            4 : {
                x: 0,
                y: 0
            }
        }
        this.indexCamera = 0;
        this.curCameraNodes = this.cameraNodes[this.indexCamera];

        this.tabWhite = {
            barriere : [],
            triangle : [],
            pentagone : [],
            octogone : [],
            rebond : [],
            end: [],
            cameraSlide:[],
            celluleMere:[],
            tuto:[],
        };

        this.tabBlack = {
            barriere : [],
            triangle : [],
            pentagone : [],
            octogone : [],
            rebond : [],
            end: [],
            cameraSlide:[],
            celluleMere:[],
            tuto:[],
        };

        this.map = false;
        this.event = false;
        
        // Creation du niveau
        this.levelCreate = new Level(this, 0);
        
        // Creation du dialoguer
        this.dial = new Dialogue(this, this.tabBlack.celluleMere[0].x, this.tabBlack.celluleMere[0].y);

        this.event.readyJump = false;

        // Adapter la couleur de fond 
        this.event.compareColor();
    }

    update() {

        if( gameState == 10 ){
            // Interaction du joueur
            this.event.interaction();
            this.dial.update()
        }
    }

    // Activer la propulsion pour le joueur
    activePropulse(){
        
        this.event.readyJump = true;
        console.log(this.event.readyJump)
    }

    // Recommencer les dialogues
    restartDial(){
        this.event.readyJump = false;
        this.dial.dialReady = true;
        setTimeout(() => {


            // Faire spawn le nouveau dialogue
            this.dial.spawnDial();
        }, 1000);
        
    }

    // Rendre une touche UI visible
    activeTouche( name ){
        console.log("touche")
        this.tabWhite.tuto.forEach( touche => {
            if( touche.name == name ){
                touche.tweenScale( true );
            }
        });
    }

    // Faire monter la cellule mere
    tweenUp(){
        
        if( this.tabBlack.celluleMere ){
            var tab = this.tabBlack.celluleMere[0];
        }
        else{
            var tab = this.tabWhite.celluleMere[0];
        }

        tab.dist.stop()
        // console.log(this.tabBlack)
        this.tweens.add({
            targets: [tab, this.dial],
            y: this.tabBlack.barriere[0].y - tab.sprite.height/3,
            duration: 3000,
            ease: "Espo.easeIn",
            onComplete: ()=>{
                this.dial.ready = false;
                this.dial.transReady = false;
            }
        });
    }
}


