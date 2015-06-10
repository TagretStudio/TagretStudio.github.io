define(['Items', 'VisionEnum'], function(Items, VisionEnum) {

	var _game = null;

	var Antenna = function(x, y, isLeft) {
		if (isLeft) {
			this.isLeft = true;
		    this.spriteName = 'left';
		} else {
			this.isLeft = false;
		    this.spriteName = 'right';
		}

		this.spriteName = 'antenna_' + this.spriteName;
		Items.Item.call(this, this.spriteName, x, y);
	
	}

	Antenna.prototype = Object.create(Items.Item.prototype);
	Antenna.prototype.constructor = Antenna;

	Antenna.prototype.isLeft = function() {
		return this.isLeft;
	}

	return {
		init: function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('antenna_left', 'media/img/antenna_left.png');
			_game.load.spritesheet('antenna_right', 'media/img/antenna_right.png');
			},

		create: function(x, y, isLeft) {
			return (new Antenna(x, y, isLeft));
		},

		isLeft: function() {
			return isLeft();
		},
	}

})
