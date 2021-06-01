class Level4 extends Phaser.Scene {

    // Construction de la scene
    constructor() {
        
        // Déclaration, des variables
        super( 'Level4' );   
        this.bgWhite = false;
        this.bgBlack = false;
        this.bgSwitch = false;
        this.bg = false;
        this.level = false;
    }
    
    create() {

        // Initialisation, des variables
        this.space = false;
        this.multipleY = 1.1;
        this.multipleX = 2;
        this.cameraNodes = [ 0, 0, 3, 2, 0, 3 ];
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
            },
            5 : {
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
            celluleMere: [],
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
            celluleMere: [],
            tuto:[],
        };

        this.map = false;
        this.event = false;

        // Creation du niveau
        this.levelCreate = new Level(this, 4);
    
    }   

    update() {

        if( gameState == 1 ){
            // Interaction du joueur
            this.event.interaction();
        }
    }
}
