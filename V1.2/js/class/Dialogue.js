class Dialogue extends Phaser.GameObjects.Container {

    constructor( scene, x, y, color, bool ){

        super( scene, x, y );
        this.scene = scene;

        this.scene.add.existing( this );

        // Tout les dialogues
        this.dialData =  {
            0 : "... ",
            1 : " Tous le monde est la.",
            2 : " Il ne manque plus que toi.",
            3 : " Monte vite avant que je parte ...",
            4 : " Saute je vais pas tarder a partir ...",
            6 : " Tu es revenu ! Aller, vien avant que je parte pour de bon ..."
        };

        // Le dialogue courent
        this.curDialUp = '';
        this.curDialDown = '';

        // Stockage de la dernière boucle de dialogue
        this.indexCurChara = 0;
        this.indexCurDial = 0;

        this.stopDial = true;
        this.switchText = false;

        // Dialogue ready
        this.dialUp = true;
        this.dialDown = true;

        // Pour faire défiler les dialogues
        this.dialReady = true;

        // Variable pour tout bloquer
        this.ready = true;
        this.verifReady = true;

        // Fermé le dialogue
        this.closeText = false;

        this.curDataDial = this.dialData[this.indexCurDial];
        

        // console.log(this.curDial)
        if( bool ){
            this.bool = bool;
            console.log("heybro")
            var x1 = game.config.width*1.3;
            var x2 = -game.config.width*1.5;
            var x3 = game.config.width / 2.5;

            var y = -game.config.height * 1.3;
            this.indexCurDial = 6;
            this.curDataDial = this.dialData[this.indexCurDial];
        
        }
        else{
            this.bool = false;
            var x1 = -game.config.width*1.3;
            var x2 = -game.config.width*1.5;
            var x3 = -game.config.width*2;

            var y = 0;
        }

        this.dialTextBlack = this.scene.add.text( x2 / proportion, y, 'NON REVIENS ', { fontFamily: "BalbeerRustic", fontSize: 300 * proportion +'px', fontStyle: "bold", color: BlackText } ).setOrigin(0.5);
        
        this.dialTextUp = this.scene.add.text( x3 / proportion, y, '', { fontFamily: "BalbeerRustic", fontSize: 200* proportion + 'px', fontStyle: "bold", color: WhiteText } ).setOrigin(0);
        this.dialTextDown = this.scene.add.text( x3 / proportion, y + this.dialTextUp.height, '', { fontFamily: "BalbeerRustic", fontSize: 200* proportion + 'px', fontStyle: "bold", color: WhiteText } ).setOrigin(0);
        this.espace = this.scene.add.text( x1 / proportion, y + this.dialTextUp.height*2, 'ESPACE pour passer', { fontFamily: "BalbeerRustic", fontSize: 100* proportion + 'px', fontStyle: "bold", color: WhiteText } ).setVisible(false).setOrigin(0);

        if( color ){
            if( color == White ){
                this.color1 = BlackText;
                this.color2 = WhiteText;
            }
            else{
                this.color1 = WhiteText;
                this.color2 = BlackText;
            }
            this.dialTextBlack.setVisible(false);
            this.dialTextUp.setColor( this.color2 );
            this.dialTextDown.setColor( this.color2 );
            this.espace.setColor( this.color2 );
        }
        

        this.setDepth(100);

        this.add( [ this.dialTextBlack, this.dialTextUp, this.dialTextDown, this.espace ] );

        if( !this.bool ){
            this.scene.time.delayedCall( 1000, ()=>{ 
                // Faire spawn le dialogue
                console.log(this.bool)
                this.spawnDial(); 
            }, this );
        }
    }

    spawnDial( bool ){
        
        var iCoint = 0;
        // variable pour si le texte est stoppé on arréte
        var bool = false;
        for( let i = this.indexCurChara; i <= this.curDataDial.length; i++ ) { 
            iCoint++;
            this.scene.time.delayedCall( iCoint*90, ()=>{ 
                // Si le texte est coupé on arrête 
                if( !bool ){
                    // console.log("text")
                    bool = this.addTextDial( i );
                }
                
            }, this );
        }
        this.indexCurChara = 0;
    }

    addTextDial( i ){

        var text = this.curDataDial.charAt(i)

        if ( this.curDataDial == this.dialData[4] && this.verifReady ){
            console.log("dial 3")
            this.transReady = true;
            this.dialReady = false;
        }

        if( text == ' ' && this.dialTextUp.width >= 2000 && this.dialUp ){
            this.dialUp = false;
        }

        if( text == ' ' && this.dialTextDown.width >= 2000 && this.dialDown ){
            this.dialDown = false;
        }

        // Ligne 1
        if( this.dialUp && this.dialReady ) {
            if( text != ' ' ){
                dialogue.play()
            }
            
            // console.log("dialUp")
            this.curDialUp = this.curDialUp + text;
            this.dialTextUp.setText( this.curDialUp );
        }

        // Ligne 2
        else if( this.dialDown && this.dialReady ){
            if( text != ' ' ){
                dialogue.play()
            }
            // console.log("dialDown")
            this.curDialDown = this.curDialDown + text;
            this.dialTextDown.setText( this.curDialDown );
        }

        // Plus de ligne
        else{
            
            this.dialUp = true;
            this.dialDown = true;
            this.switchText = true;
            if( this.indexCurChara == 0 ){
                this.indexCurChara = i;
            }
            return true;
        }

        // Si le texte est arrivé a sa dernière lettre alors on change de dialogue
        if( i == this.curDataDial.length && this.dialReady){
            // Reinitialiser le character de debut
            this.indexCurChara = 0;
            this.espace.setVisible(true)
            // Vérifié sir il y a un autre dialogue à lancer
            this.indexCurDial++;

            if( this.dialData[this.indexCurDial] ){
                this.curDataDial = this.dialData[this.indexCurDial];
                this.spawnDial();
            }
            else{
                this.ready = true;
                this.closeText = true;
            }

            return true;
        }
    }

    update(){

        // Appuyer sur espace pour continuer
        if( keys.SPACE.isDown && this.switchText && this.ready ){
            if ( this.indexCurDial == 5 ){
                console.log("dial 3")
                this.espace.setVisible(false)
                this.scene.activePropulse();
                this.transReady = false;
                this.dialReady = false;
                this.verifReady = false;
                this.ready = false;
                this.switchText = false;
                this.closeText = false;
            }

            console.log("spaceDial")
            this.switchText = false;
            this.curDialUp = "";
            this.curDialDown = "";
            this.dialTextUp.text = "";
            this.dialTextDown.text = "";
            if( this.transReady ){
                this.transReady = false;
                this.espace.setVisible(false)
                this.scene.activePropulse();
                this.scene.tweenUp();
            }
            this.spawnDial();
        }

        // Fermer le dialogue
        else if( keys.SPACE.isDown && this.closeText && this.ready ){
            // console.log("closeText")
            this.closeText = false;
            this.dialTextUp.setVisible(false);
            this.dialTextDown.setVisible(false);
            this.scene.activePropulse();
        }
    }
}