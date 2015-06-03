
require(['./Chargement','./MainMenu', './PreChargement', './Level1', './Level2'],function(Chargement, MainMenu, PreChargement, Level1, Level2){
	var _game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

	//  var _game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');

	// boot state
	PreChargement.init(_game, 'Chargement');
	_game.state.add('PreChargement', PreChargement.getPreChargement());
	Chargement.init(_game, 'MainMenu');
	_game.state.add('Chargement', Chargement.getChargement());
	MainMenu.init(_game, 'Level1');
	_game.state.add('MainMenu', MainMenu.getMainMenu());
	Level1.init(_game, 'MainMenu');
	_game.state.add('Level1', Level1.getLevel1());
	Level2.init(_game, 'MainMenu');

	_game.state.add('Level2', Level2.getLevel2());

	_game.state.start('PreChargement');


});
