define(['Items', 'VisionEnum'], function(Items, VisionEnum) {
	
	var _game = null;
	
	var Miroir = function(x, y, isVertical) {
		if (isVertical) {
			this.isVertical = true;
		    this.spriteName = 'Vertical';
		} else {
			this.isVertical = false;
		    this.spriteName = 'Horizontal';
		}
		
		this.spriteName = 'miroir_' + this.spriteName;
		Items.Item.call(this, this.spriteName, x, y);
	    this.body.bounce = 1.1;
	    if (isVertical) {
		this.body.setSize(16, 32);
	    } else {
		this.body.setSize(32, 16);
	    }
	}
	
	Miroir.prototype = Object.create(Items.Item.prototype);
	Miroir.prototype.constructor = Miroir;
	
	Miroir.prototype.isVertical = function() {
		return this.isVertical;
	}
	
	return {
		init: function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('miroir_Horizontal', 'src/media/img/mirroirOrizontal.png');
			_game.load.spritesheet('miroir_Vertical', 'src/media/img/mirroirVertical.png');
			},
		
		create: function(x, y, isVertical) {
			return (new Miroir(x, y, isVertical));
		},
		
		isVertical: function() {
			return isVertical();
		},
	}
	
})
