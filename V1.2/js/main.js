var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    input: {
        gamepad: true
    },
    parent: 'game',
    backgroundColor: WhiteText,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Idle, Credit, MainMenu, Stages, Level0, Level1, Level2, Level3, Level4, Level5, UIScene]
};

var game = new Phaser.Game(config);