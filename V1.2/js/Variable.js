// Scene UI
var ui;
var mainMenu;

// Vérifié si le joueur a fait le "tuto"
var tutoDone = false;

// Color
// NoirFoncé : 0x1D1D19
// NoirMarron : 0x1C1A19
// NoirBleu : 0x1E2222
var Black = 0x1E2222;
var BlackText =  "#1E2222";

// BlancCassé : 0xfffef0
// BlancCasséGris : 0xEFEEE0
// BlancBleu : 0xCFE4E6
// BlancRose : 0xFFF3ED
// BlancFoncé : 0xE1E0C9
// BlancFoncé2 : 0xE0DFB7
var White = 0xEFEEE0;
var WhiteText =  "#EFEEE0";

// Variable pour faire du graphics
var graphics;
var graphics1;

// Forme + pos du bg
var rect;

var bgWhite = false;
var bgBlack = false;

// Varaible du joueur
var player;

// Variable pour le clavier activé
var keyReady = false;

// Variable pour le clavier pressé
var keyPressed = false;

var onInitBouton = true;

var gameState;

// Clé du clavier
var keys;

// Level en cours
var curLevel;
var playingLvl;

// Stockage du JSON 
var dataBase = {};

// Index du lvl en cours
var indexLvl = -1;

// Activation des bouton
var boutonReady = 0;

// Animtions variables
var idleAnim;

// Tween test
var objVelo = {
    ortho : 0,
    diagonal : 0
}

// Game Keys Nav
var gameNav = {
    niveau: 2,
    world: 1
};

// Sound Click
var click;
var end;
var rebond;
var barriere;
var death;
var dialogue;
var octo;
var octoArrive;

// Var adaptation de proportion
var proportion;
var proportionZoom;

// Objet qui va faire se d"placer la camera
var cameraEmpty;