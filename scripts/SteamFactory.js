define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
	var _game = null;

	var Steam = function(x, y) {
		Items.Item.call(this, 'steam', x, y);
		this.animations.add('animFilter', [], 5, true);
		this.frame = 0;
	}

	Steam.prototype = Object.create(Items.Item.prototype);
	Steam.prototype.constructor = Steam;

	Steam.prototype.update = function() {
		//this.animations.play('???');
		this.animations.play('animFilter');
	}

	Steam.prototype.interact = function(lum) {
		switch (lum.color){
			case ColorEnum.getColorEnum().MICRO:
			case ColorEnum.getColorEnum().X:
				break;
			default:
				if (lum.body.position.x < this.right) lum.body.velocity.y = Math.max(lum.body.velocity.y-15, -300);
				//aucune idee de pourquoi ce if est necessaire
		}
	}

	return {
		init : function(game) {
			_game = game;
			Items.init(_game);
			// _game.load.image('steam', 'media/img/Steam.png');
			_game.load.spritesheet('steam', 'media/img/steam2.png', 32, 32, 11);
		},

		create : function(x, y) {
			return (new Steam(x, y));
		}
	}
})
