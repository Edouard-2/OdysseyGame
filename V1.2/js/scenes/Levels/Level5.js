class Level5 extends Phaser.Scene {

    // Construction de la scene
    constructor() {

        super( 'Level5' );   
        this.bgWhite = false;
        this.bgBlack = false;
        this.bgSwitch = false;
        this.bg = false;
        this.level = false;
    }
    
    create() {
        this.space = false;
        this.multipleY = 1.3;
        this.multipleX = 1.5;
        this.cameraNodes = [ 3, 3, 3, 3, 3 ];
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
            },
            5 : {
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
        };

        this.map = false;
        this.event = false;

        this.levelCreate = new Level(this, 5);

        this.dial = new Dialogue( this, this.tabBlack.celluleMere[0].x, this.tabBlack.celluleMere[0].y, Black, true );
    
    }   

    update() {

        if( gameState == 1 ){
            // Interaction du joueur
            this.event.interaction();

            this.dial.update();
        }
    }

    activePropulse(){
        
        this.event.readyJump = true;
        console.log(this.event.readyJump)
    }
}
