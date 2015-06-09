
require(['./Chargement','./MainMenu', './PreChargement', 'LevelFactory', 'LevelSelection']
,function(Chargement, MainMenu, PreChargement, LevelFactory, LevelSelection){
	var _game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');


	//  var _game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
	
	// boot state
	PreChargement.init(_game, 'Chargement');
	_game.state.add('PreChargement', PreChargement.getPreChargement());
	Chargement.init(_game, 'MainMenu');
	_game.state.add('Chargement', Chargement.getChargement());
	MainMenu.init(_game, 'Level1');
	_game.state.add('MainMenu', MainMenu.getMainMenu());

	LevelFactory.init(_game, 'MainMenu');
	_game.state.add('LevelFactory', LevelFactory.getLevel());

	LevelSelection.init(_game, 'LevelSelection');
	_game.state.add('LevelSelection', LevelSelection.getLevelSelection());

	_game.state.start('PreChargement');



});
