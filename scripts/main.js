
require(['./Chargement','./MainMenu', './PreChargement', './Level1', './Level2'
, 'Level1Demo', 'Level2Demo', 'Level3Demo', 'Level4Demo', 'LevelFactory']
,function(Chargement, MainMenu, PreChargement, Level1, Level2, Level1Demo
	, Level2Demo, Level3Demo, Level4Demo, LevelFactory){
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

	Level1Demo.init(_game, 'MainMenu');
	_game.state.add('Level1Demo', Level1Demo.getLevel1Demo());
	Level2Demo.init(_game, 'MainMenu');
	_game.state.add('Level2Demo', Level2Demo.getLevel2Demo());
	Level3Demo.init(_game, 'MainMenu');
	_game.state.add('Level3Demo', Level3Demo.getLevel3Demo());
	Level4Demo.init(_game, 'MainMenu');
	_game.state.add('Level4Demo', Level4Demo.getLevel4Demo());
	
	LevelFactory.init(_game, 'MainMenu');
	_game.state.add('LevelFactory', LevelFactory.getLevel());


	_game.state.start('PreChargement');



});
