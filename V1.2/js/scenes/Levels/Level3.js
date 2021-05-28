class Level3 extends Phaser.Scene {

    // Construction de la scene
    constructor() {

        super( 'Level3' );   
        this.bgWhite = false;
        this.bgBlack = false;
        this.bgSwitch = false;
        this.bg = false;
        this.level = false;

        
    }
    
    create() {
        this.space = false;
        this.multipleY = 1.3;
        this.multipleX = 1.1;
        this.cameraNodes = [1, 1, 0, 0];
        this.indexCamera = 0;
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
        this.curCameraNodes = this.cameraNodes[this.indexCamera];

        this.tabWhite = {
            barriere : [],
            triangle : [],
            pentagone : [],
            octogone : [],
            rebond : [],
            end: [],
            cameraSlide:[],
            celluleMere:[]
        };

        this.tabBlack = {
            barriere : [],
            triangle : [],
            pentagone : [],
            octogone : [],
            rebond : [],
            end: [],
            cameraSlide:[],
            celluleMere:[]
        };

        this.map = false;
        this.event = false;

        this.levelCreate = new Level(this, 3);
    
    }   

    update() {

        if( gameState == 1 ){
            // Interaction du joueur
            this.event.interaction();
        }
    }
}
