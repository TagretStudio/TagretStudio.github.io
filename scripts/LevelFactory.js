define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest',
		'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory', 'MicroLummingFactory',
		'ItemsLevel', 'MiroirFactory', 'LevelStructure', 'XLummingFactory', 'IceFactory', 'WaterFactory', 'SteamFactory', 'PorteWithAuraFactory'],
	   function(Images, LummingFactory,	VisibleLummingFactory, ColorEnum,
				MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest,
				VisionEnum,	Transition, FilterFactory, RadioLummingFactory, MicroLummingFactory,
				ItemsLevel,	MiroirFactory, LevelStructure, XLummingFactory, IceFactory, WaterFactory, SteamFactory, PorteWithAuraFactory) {

	var _game = null;
	var _currentLevel = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupElements = null;
	var _groupPorteRadioAura = null;
	var _groupPorteRadio = null;
	var _music = null;
	var _menu = null;
	var _text = null;
	var _currentVision = null;
	var _button_restart = null;
	var _button_menu = null;
	var _tabAvailableObjects = null;
	var _dark = null;
	       var _marque = false;
	       var _marque_music = true;
	       var ecranAide = null;
	var LevelFactory = {

		preload: function() {
		    if (_marque_music) {
			_music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
		    } else {
			_music = MusicFactory.create('level2', 'media/audio/level.ogg');
		    }
			_game.load.image('buttonDiamond', 'media/img/menuButton.png');
			_game.load.image('buttonRefresh', 'media/img/refresh.png')
			_game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
		    _game.load.image('aide', 'media/img/aideColore.png');
		    _game.load.image('aideScreen', 'media/img/ecranAide.png');
			MenuFactoryTest.init(_game);
			PlatformFactory.init(_game);
			VisibleLummingFactory.init(_game);
			LevelStructure.init(_game);
			XLummingFactory.init(_game);
			MicroLummingFactory.init(_game);
			IceFactory.init(_game);
			WaterFactory.init(_game);
			SteamFactory.init(_game);
			PorteWithAuraFactory.init(_game);
		},

		create: function() {
			_alreadyChangeLevel = false;
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			VisionEnum.setVisionCurrent(_currentVision);

			_dark = _game.add.sprite(0,0,'preloaderBackground');
			_dark.tint = 0;
			_dark.alpha = 0.5;

			this.levelStruct = LevelStructure.create(_currentLevel);

			_groupPlatforms = this.levelStruct.getPlatforms();
			_groupDoors = this.levelStruct.getDoors();
			_groupLum = this.levelStruct.getLummings();
			_groupElements = this.levelStruct.getElements();
			_groupPorteRadioAura = this.levelStruct.getPorteRadioAura();
			_groupPorteRadio = _game.add.group();
			_groupPorteRadio.enableBody = true;
			_groupPorteRadioAura.forEach(
				function(p){
					_groupPorteRadio.add(p.getDoor());
				}
			)
			_nbLummingsV = this.levelStruct.getNbLummingsWin();
			_tabAvailableObjects = this.levelStruct.getTabAvailableObjects();

			if (_nbLummingsV == 0) {
				_currentLevel = 1;
				_game.state.start('MainMenu');
			} else {
				text = _game.add.text(_game.world.width - 50, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center", fill: '#ffffff', stroke: '#000000', strokeThickness: 2});
				text.anchor.set(1,0);
				button_menu = _game.add.button(10,0, 'buttonDiamond', actionOnMenu, _game);
				button_restart = _game.add.button(_game.world.width - 150,0,'buttonRefresh', actionOnRestart, _game);
			    button_help = _game.add.button(90, 0, 'aide', actionOnHelp, _game);
			    button_help.scale.set(64/148, 32/74);
			    button_menu.scale.set(64/148, 32/74);
				_menu = MenuFactoryTest.create(_tabAvailableObjects);
				ItemsLevel.reinit(_game);
				ItemsLevel.setgroup(_groupLum);
				var cliquez = this.add.sprite(_game.world.width/2, _game.world.height*2/3, 'cliquez');
				cliquez.anchor.set(0.5, 0.5);
				cliquez.scale.set(0.7, 0.7);
				_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
				_game.paused = true;
			}

		},

		update: function() {
			_menu.update();
			_game.physics.arcade.overlap(_groupLum, _groupPlatforms, collidePf, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupElements, elementOverlap, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupLum, mayKill, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupPorteRadioAura, function(lum, door) {door.setOverlap(lum, _game.time.now +100)});
			_game.physics.arcade.collide(_groupLum, _groupPorteRadio);

			_groupLum.forEach(
				function(p){
					p.update(_currentVision);
				}
			)

			_groupDoors.forEach(
				function(p){
					p.update();
				}
			)

			_dark.alphaTarget = 0.5 - 0.5 * _nbLummingsSaved/_nbLummingsV;
			_dark.alpha += (_dark.alphaTarget-_dark.alpha)/8;

		    if (_marque == true) {
			_marque = false;
			ecranAide.kill();
			_game.input.onDown.add(function () {
			    _game.paused = false;
			},_game);
		    }

			if (_nbLummingsV == _nbLummingsSaved) {
				if (!_alreadyChangeLevel) {
					_game.time.events.add(Phaser.Timer.SECOND*1.8, function() {
						if (_nbLummingsV == 0) {
							Transition.nextState('MainMenu', _music);
						} else {
							_currentLevel++;
						    _marque_music = !_marque_music;
							Transition.nextState('LevelFactory', _music, _currentLevel);

						}
					});
				}
				_alreadyChangeLevel = true;
			} else if (_groupLum.countLiving() == 0) {
			    _game.add.sprite(_game.world.centerX - 170, _game.world.centerY - 25, 'gameOver');
			    _music.getMusic().fadeOut(1500);
			    _music.getMusic().onFadeComplete.addOnce(function() {
				_game.time.events.add(Phaser.Timer.SECOND*1.8, function() {
				    _game.state.start('LevelFactory');
				}, _game);
			    }, _game);
			}
			text.setText(_nbLummingsSaved + '/' + _nbLummingsV);
		}

	}

	function elementOverlap(lum, element) {
		element.interact(lum);
	}

	function mayKill(lum1, lum2){
		if(lum1.color == 10 && lum1.body.velocity.x !=0 &&(((lum2.defaultVision == 2) || (lum2.defaultVision == 1)))) {

			var old = lum1.body.velocity.x;
			if (lum1.body.velocity.x < 0){}
			lum2.body.velocity.x = 0;
			lum2.body.velocity.y = -100;
			lum2.body.gravity.y = -100;
			lum2.animations.play('kill');
			lum2.color = null;
			lum1.body.velocity.x = 0;
			_game.time.events.add(Phaser.Timer.SECOND*0.75, function(){
			lum2.kill();
			lum1.body.velocity.x = old;
			}, this);

			//lum2.kill();
		}
	}


	function mayExit(lum, door){
		var lx = (lum.left+lum.right)/2;
		var dl = door.left;
		var dr = door.right;

		if (lx>dl && lx<dr) {
			var exit = lum.collideWithDoor(door);
		    if (exit == 1){
			_nbLummingsSaved = _nbLummingsSaved +1;
				this.time.events.add(1000,
					function() {
						text.setText(_nbLummingsSaved + '/' + _nbLummingsV);
					}
				, this);
				//_nbLummingsSaved = _nbLummingsSaved +1;
				//text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
			}
		}
	}

	function collidePf(lum, platform){
		if(lum.color == 9){
			if(platform.isPb){
			 _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
			}
		} else {
		 _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
		}
	}

	function actionOnRestart() {
		var background = _game.add.sprite(0, 0, 'transitionBackground');
		var logo = _game.add.sprite(_game.world.centerX - 216, _game.world.centerY - 35, 'logo');
		if (_music != null) {
			_music.getMusic().fadeOut(700);
			_music.getMusic().onFadeComplete.dispatch();
			_music.getMusic().onFadeComplete.addOnce(function() {
				_music = null;
				_currentVision = VisionEnum.getVisionEnum().VISIBLE;
				_game.state.start('LevelFactory');
			}, _game);
		}
	}

	function actionOnMenu() {
	   var background = _game.add.sprite(0, 0, 'transitionBackground');
	   var logo = _game.add.sprite(_game.world.centerX - 216, _game.world.centerY - 35, 'logo');
	   _currentLevel = 1;
	   if (_music != null) {
			_music.getMusic().fadeOut(700);
			_music.getMusic().onFadeComplete.dispatch();
			_music.getMusic().onFadeComplete.addOnce(function() {
				_music = null;
				_game.state.start('MainMenu');
			}, _game);
		}
	}

	       function actionOnHelp() {
		   _game.paused = true;
		   ecranAide = this.add.sprite(0, 0, 'aideScreen');
		   ecranAide.scale.set(_game.world.width/786, _game.world.height/588);
		   _marque = true;
	       }

	return {
		init: function(game) {
			_game = game;
			_currentLevel = 1;
		},
		getLevel: function() {
			return LevelFactory;
		},
		setLevel : function(level){
			_currentLevel = level;
		},
		getCurrentLevel : function(level){
			return _currentLevel;
		}
	}

 })
