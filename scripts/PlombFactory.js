define(['Items'], function(Items) {

    var _game = null;

    var Plomb = function(x, y, shape) {
	//SpriteNames à changer peut etre
	if (shape == 1) {
	    this.shape = 1;
	    this.spriteName = 'Horizontal';
	} else if (shape == 2) {
	    this.shape = 2;
	    this.spriteName = 'Vertical';
	} else {
	    this.shape = 0;
	    this.spriteName = 'Bloc';
	}
		this.spriteName = 'plomb_' + this.spriteName;
		Items.Item.call(this, this.spriteName, x, y);
	
    }

	Plomb.prototype = Object.create(Items.Item.prototype);
	Plomb.prototype.constructor = Plomb;

	Plomb.prototype.datShape = function() {
		return this.shape;
	}

	return {
		init: function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('plomb_Horizontal', 'media/img/plombHorizontal.png');
			_game.load.image('plomb_Vertical', 'media/img/plombVertical.png');
		    _game.load.image('plomb_Bloc', 'media/img/plombCarre.png');
			},

		create: function(x, y, shape) {
			return (new Plomb(x, y, shape));
		},

		shape: function() {
			return datShape();
		},
	}

})
