class Level0 extends Phaser.Scene {

    // Construction de la scene
    constructor() {

        super( 'Level0' );   
        this.bgWhite = false;
        this.bgBlack = false;
        this.bgSwitch = false;
        this.bg = false;
        this.level = false;
    }
    
    create() {
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
        
        this.levelCreate = new Level(this, 0);
        
        this.dial = new Dialogue(this, this.tabBlack.celluleMere[0].x, this.tabBlack.celluleMere[0].y);

        this.event.readyJump = false;

        this.event.compareColor();
    }

    update() {

        if( gameState == 10 ){
            // Interaction du joueur
            this.event.interaction();
            this.dial.update()
        }
    }

    activePropulse(){
        
        this.event.readyJump = true;
        console.log(this.event.readyJump)
    }

    restartDial(){
        this.event.readyJump = false;
        this.dial.dialReady = true;
        setTimeout(() => {
            this.dial.spawnDial();
        }, 1000);
        
    }

    activeTouche(){
        this.tabWhite.tuto.forEach( touche => {
            if( touche.name == "Z" ){
                touche.tweenScale( true );
            }
            else{
                touche.tweenScale();
            }
        });
    }

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


