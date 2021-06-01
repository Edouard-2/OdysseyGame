class Barriere extends Phaser.GameObjects.Container {

    constructor( scene, x, y, id, rotation, color ){

        super( scene, x, y );

        this.scene.add.existing( this );  

        // Déclaration des variables
        // La scene actuelle de l'instance
        this.scene = scene;

        // Sa couleur
        this.color = color;

        // Changement de son angle
        this.angle = rotation;

        // Son id par rapport aux autres instances
        this.id = id;

        // Pour savoir si c'est une cellule safe
        this.safe = false;

        // Nom de la cellule
        this.name = "Barriere";
        // console.log(id)

        // Création du sprite
        this.sprite = this.scene.add.sprite( 0 , 0 , 'barriere' ).setScale(0.8* proportion,0.6* proportion).setDepth(-2);

        // Creation d'une variable pour accéder a l'instance depuis le sprite
        this.sprite.parent = this;

        // ajout du sprite dans le container
        this.add( this.sprite );

        // Le mettre en avant par rapport au fond
        this.setDepth( 100 )

        // Mettre la physic au sprite
        this.scene.physics.world.enable( this.sprite ); 

        // Si il a un angle !) de 0 alors sont body est différent
        if( this.angle != 0 ){
            this.sprite.setScale(0.8,0.7)
            this.sprite.body.setSize( this.sprite.width/1.2 , this.sprite.height / 5  );
        }
        else{
            this.sprite.body.setSize( this.sprite.width / 5, this.sprite.height/1.2 );
        }

        // Lui donner la bonne couleur
        this.makeColor( this.color );

    }

    // Position oposé d'un slide de caméra
    inverseCurNode( nbr ){

        for (let i = 0; i <= nbr + 4; i++) {
            if( nbr == 8 ){
                nbr = 0;
            }
            else{
                nbr++
            }
        }
        return nbr;
    }

    // Renvoyer le joueur dans une direction
    giveVelocity( obj ){

        // Si le joueur arrive en diagonale
        if( obj.body.velocity.x != 0 && obj.body.velocity.y != 0){
            console.log(obj.curPos)
            if( this.angle != 0 ){
                obj.body.setVelocityY(obj.body.velocity.y * -1)
                
            }
            else{
                obj.body.setVelocityX(obj.body.velocity.x * -1)
            }
        }

        // Si le joueur arrive perpendiculairement
        else{
            console.log("hey")
            obj.curPos = this.inverseCurNode( obj.curPos );
            obj.body.setVelocity(obj.body.velocity.x*-1, obj.body.velocity.y*-1)
        }
    }

    // Faire apparaitre le body
    display(){
        this.scene.physics.world.enable( this.sprite );
    }

    // Faire disparaitre le body
    hide(){
        this.scene.physics.world.disable( this.sprite );
    }

    // Assigner une couleur au sprite
    makeColor( color ){
        if( color == White ){
            // console.log('white')
            this.sprite.setTint( White );
        }
        else if( color == Black ){
            // console.log('black')
            this.sprite.setTint( Black );
        }
    }
}