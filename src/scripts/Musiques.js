define(function(){
	var _game = null;
	var _music = null;


	var _maintheme = {
		preload : function(){
			_game.load.audio('menu_music', 'media/audio/menu_music.ogg');
		},
		create : function(){
			if (_music != null && _music.isPlaying == true) {
				_music.fadeOut(700);
			}
			_music = _game.add.audio('menu_music');
			_music.loop = true;
			_music.play();
		},
		stop : function(){
			_music.stop();
		}
	}

	return {
		init : function(game){
			_game= game;
		},
		getmaintheme : function(){
			return _maintheme;
		}

	}

})
