define (function(){
	var _game = null;
	var _background = null;
	var _tagretlogo = null;
	var _tagret = null;
	var _presents = null;

	logo1 = function(){
		_tagretLogo = _game.add.sprite(336, 236, 'cible');
	}
	logo2 = function(){
		_tagret = _game.add.sprite(336, 364, 'tagret');
	}
	logo3 = function(){
		_presents = _game.add.sprite(350, 416, 'presents');
	}
	var  _backgroundIntro = {
		preload : function(){
			_game.load.image('preloaderBackground', 'media/img/sky.png');
			_game.load.image('logo', 'media/img/Menu.png');
			_game.load.image('cible', 'media/img/cible.png');
			_game.load.image('tagret', 'media/img/tagret_studio.png');
			_game.load.image('presents', 'media/img/Presents.png');
			_game.load.spritesheet('button', 'media/img/MenuButtons.png', 274, 71);

		},
		create : function(){
			_background = _game.add.sprite(0, 0, 'preloaderBackground');
			_background.scale.set(1024/800, 768/600);

		},
		update : function(){
			_game.time.events.add(50, logo1, _game);
			_game.time.events.add(800, logo2, _game);
			_game.time.events.add(1500, logo3, _game);
		}
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
