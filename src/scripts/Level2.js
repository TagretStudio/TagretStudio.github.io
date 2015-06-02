define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'Transition', 'MenuFactoryTest', 'ItemsLevel'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory, Transition, MenuFactoryTest, ItemsLevel) {
	var _game = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupLol = null;
	var _groupFilter = null;
	var _groupDoors = null;
	var _music = null;
	var text = null;
	var _menuNiveau = null;

	var _level2 = {

		preload : function(){
			_music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
			MenuFactoryTest.init(_game);

		},
		create : function(){
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();

			_game.physics.startSystem(Phaser.Physics.ARCADE);

			_groupPlatforms = _game.add.group();
			_groupPlatforms.enableBody = true;
			{
				platform1 = PlatformFactory.create(-200, 100, false);
				platform2 = PlatformFactory.create(100, 200, false);
				platform3 = PlatformFactory.create(400, 300, false);
				platform4 = PlatformFactory.create(700, 280, false);
			  platform5 = PlatformFactory.create(0, 504, false);
			  platform6 = PlatformFactory.create(400, 504, false);
			}
			_groupPlatforms.add(platform1);
			_groupPlatforms.add(platform2);
			_groupPlatforms.add(platform3);
			_groupPlatforms.add(platform4);
		    _groupPlatforms.add(platform5);
		    _groupPlatforms.add(platform6);



			_groupDoors = _game.add.group();
			_groupDoors.enableBody = true;
			door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 0, 470);
			door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 470);
			lol= DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 0, 270);
			_groupDoors.add(door1);
			_groupDoors.add(door2);
			_groupLum = _game.add.group();

			lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 0, 0, 200);

		    //
			lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 100, 0, -200);
			lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 0, 0);
			 _nbLummingsV = 3;
			text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});


			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);
			_menuNiveau = MenuFactoryTest.create();
			ItemsLevel.reinit(_game);

			_game.startText = _game.add.text(0, 450, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			_game.paused = true;


		},
		update : function(){
			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
	//		_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);


			_menuNiveau.update();
			_groupLum.forEach(
				function(p){
					p.update();
				})
			_groupDoors.forEach(
				function(p){
					p.update();
				})

			if (_nbLummingsV == _nbLummingsSaved) {
				Transition.nextState('MainMenu', _music);
			}
		}

	}

	function mayExit(lum, door){
		var exit = lum.collideWithDoor(door);
		if (exit == 1){
			_nbLummingsSaved = _nbLummingsSaved +1;
			text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
		}
	}




	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},
		getLevel2 : function(){
			return _level2;
		}
	}

})
