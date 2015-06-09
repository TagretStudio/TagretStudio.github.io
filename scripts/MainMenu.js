define(['Images','MusicFactory', 'Transition', 'LevelSelection'], function(Images, MusicFactory, Transition, LevelSelection){
	var _game = null;
	var _etapesuivante = null;
	var _pointLogo = null;
	var _pointButtons = null;
	var _buttons = null;
	var _logo = null;
	var _buttonPlay = null;
	var _buttonCredits = null;
	var _buttonQuit = null;
	var _music = null;

	function gofull() {
		if (_game.scale.isFullScreen) {
			_game.scale.stopFullScreen();
		} else {
			_game.scale.startFullScreen(false);
		}
	}


	function actionPlay() {
		_buttonPlay.kill();
		Transition.nextState('LevelFactory', _music);
	}

	function actionCredits(){
		_buttonCredits.kill();
		Transition.nextState('LevelSelection', null);
	}

	function actionQuit(){
		_buttonQuit.kill();
		Transition.nextState('Chargement', _music);
	}

	var _menu = {
		preload : function(){
			_pointLogo = new Phaser.Point(_game.world.centerX - 216, _game.world.centerY - 66);
			_pointButtons = new Phaser.Point(_game.world.centerX - 20, _game.world.centerY - 100);
		},

		create : function(){
			_game.scale.refresh();
			if (_music.isPlaying() == false){
				_music.play();
			}
			Images.boot().create();
			_logo = _game.add.sprite(_pointLogo.x, _pointLogo.y, 'logo');
			//_logo.scale.set(_game.world.width/1024, _game.world.height/768);

			_buttons = _game.add.group();
			_buttons.scale.set(_game.world.width/1024, _game.world.height/768);
			_buttons.add(_buttonCredits = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 160, 'button', function(){			gofull();
actionCredits()}, _game, 3, 4, 5));
			_buttons.add(_buttonPlay = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 100, 'button', actionPlay, _game, 0, 1, 2));
			_buttons.add(_buttonQuit = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 220, 'button', actionQuit, _game, 6, 7, 8));
		},

		update : function(){
			_buttons.forEach(
					function(butt){
						butt.x += Math.min(30, (_pointButtons.x- butt.x)/4);
					}
					);
		}

	};

	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},

		setMusic : function(music){
			_music = music ;
			LevelSelection.setMusic(_music);
		},

		getMainMenu : function(){
			return _menu;
		}

	}



})
