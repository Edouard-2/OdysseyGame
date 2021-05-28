class StageBouton extends Phaser.GameObjects.Container{

    constructor( scene, x, y, name , taille, bool){

        super( scene, x, y );

        this.scene = scene;

        this.scene.add.existing( this );

        this.setSize( 10 );

        this.bg = scene.add.image( 0,0,'Stage Bouton' ).setScale(0);
        
        this.name = name;

        this.text = scene.add.text( 0, 0, name, { fontFamily: "BalbeerRustic",fontSize: taille*80 + 'px', color: "#000" }).setOrigin( 0.5 ).setScale(0);

        this.add( [ this.bg, this.text ] );

        if( bool ){
            this.bool = bool;
            // console.log(this.text)
            // this.text.setColor( "#eee");
            // this.bg.setTint('0x9E90EE');
            this.makeColor(White, this.bool)
        }
        
        else{
            this.makeColor(White, this.bool)
            this.bool = false;
        }
        
        this.addTweens(this.bg, 0.2);
        this.addTweens(this.text, 0.7);

    }

    addObj(obj){
        this.add(obj);
    }

    addTweens(obj, scale){
        this.tween = this.scene.tweens.add({
            targets: obj,
            scale: scale,
            ease: 'Bounce',
            duration: 1000,
        });
    }
    makeColor(color, bool){
        if(color == White){
            this.bg.setTint(White);
            if( bool ){
                this.text.setColor(BlackText);
            }
            else{
                this.text.setColor(WhiteText);
            }
            
        }
        else if (color == Black){
            this.bg.setTint(Black);
            if( bool ){
                this.text.setColor(WhiteText);
            }
            else{
                this.text.setColor(BlackText);
            }
            
        }
    }
}