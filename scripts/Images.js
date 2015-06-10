define (function(){
	var _game = null;
	var _background = null;
	var _tagretlogo = null;
	var _tagret = null;
	var _presents = null;

	logo1 = function(){
		_tagretLogo = _game.add.sprite(_game.world.centerX - 64, _game.world.centerY - 64, 'cible');
	}
	logo2 = function(){
		_tagret = _game.add.sprite(_game.world.centerX - 64, _game.world.centerY + 64, 'tagret');
	}
	logo3 = function(){
	    _presents = _game.add.sprite(_game.world.centerX - 48, _game.world.centerY + 116, 'presents');
	}
	var  _backgroundIntro = {
		preload : function(){
			_game.load.image('preloaderBackground', 'media/img/sky.png');
			_game.load.image('logo', 'media/img/Menu.png');
			_game.load.image('cible', 'media/img/cible.png');
			_game.load.image('tagret', 'media/img/tagret_studio.png');
			_game.load.image('presents', 'media/img/Presents.png');
			_game.load.spritesheet('button', 'media/img/MenuButtons.png', 278, 63);

		},
		crea : function(){
			_background = _game.add.sprite(0, 0, 'preloaderBackground');
			_background.scale.set(1024/_game.world.width, 768/_game.world.height);
		    _game.time.events.add(50, logo1, _game);
			_game.time.events.add(800, logo2, _game);
			_game.time.events.add(1500, logo3, _game);

		},
	    create : function(){
		_background = _game.add.sprite(0, 0, 'preloaderBackground');
		_background.scale.set(1024/_game.world.width, 768/_game.world.height);

	    },
	}


	return{
		init : function(game){
			_game = game;
		},

		boot : function(){
			return _backgroundIntro;
		}

	}
})
