define(['./Images', 'MusicFactory', 'Transition', 'MenuFactoryTest', 'ItemsLevel'], function(Images, MusicFactory, Transition, MenuFactoryTest, ItemsLevel){
	var _game = null;
	var _etapesuivante = null;

	var _prechargement = {

		init : function(){
			_game.scale.pageAlignHorizontally = true;

			_game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

		},

		preload : function(){
			Images.init(_game);
			Images.boot().preload();
			MusicFactory.init(_game);
			Transition.init(_game);
			//Musiques.init(_game);
			//Musiques.getmaintheme().preload();
			MenuFactoryTest.init(_game);
			ItemsLevel.init(_game);

		}
				  ,
				  create : function(){
				//		_game.scale.startFullScreen(false);

					//	Transition.nextState(_etapesuivante);
					  _game.state.start(_etapesuivante);
				  }

	}


	return {
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		}
			   ,
			   getPreChargement : function(){
				   return _prechargement;
			   }
	}
})
