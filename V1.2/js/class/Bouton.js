class Bouton extends Phaser.GameObjects.Container{

    constructor( scene, x, y, name , taille, scale){

        super( scene, x, y );

        this.scene = scene;

        this.ScaleY = scale;

        this.scene.add.existing( this );

        this.setSize( 10 );

        this.bg = scene.add.image( 0,0,'Bouton' ).setTint( White );

        // this.bg.setTint('0x9E90EE')

        this.name = name;

        this.text = scene.add.text( 0, 0, name, { fontFamily: "SaintTropez",fontSize: taille*80 + 'px', color : BlackText }).setOrigin( 0.5, 0.53 );

        this.add( [this.bg, this.text] );

        this.bg.setScale(0);
        this.text.setScale(0);
        this.addTweens(); 

        this.graphics = this.scene.add.graphics();
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        // this.points = [
        //     this.x*0.77 +( -this.bg.width / 8), this.y*0.85 + (-this.bg.height / 8),
        //     this.x*0.77 + this.bg.width, this.y*0.85 + (-this.bg.height / 8),
        //     this.x*0.77 + this.bg.width, this.y*0.85 + this.bg.height,
        //     this.x*0.77 +( -this.bg.width / 8),this.y*0.85 + this.bg.height,
        //     this.x*0.77 +( -this.bg.width / 8), this.y*0.85 + (-this.bg.height / 8),
        // ];
    
        this.curve = new Phaser.Curves.Path(50, 500);

        this.scene.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 2000,
            // yoyo: true,
            repeat: -1,
            // onYoyo: ()=>{
            //     graphics.clear();
            // },
            // onRepeat: ()=>{
            //     graphics.clear();
            // }
        });

    }

    addObj(obj){
        this.add(obj);
    }

    addTweens(){
        this.tween = { 
            0:  this.scene.tweens.add({
                targets: this.text,
                scale: 1.1,
                ease: 'Back',
                duration: 1000,
            }),
            1: this.scene.tweens.add({
                targets: this.bg,
                scale: 1,
                ease: 'Back',
                duration: 1000,

            })
        }
    }
}