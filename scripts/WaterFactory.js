define(['Items', 'ColorEnum', 'SteamFactory'], function(Items, ColorEnum, SteamFactory) {
	var _game = null;

	var Water = function(x, y) {
		Items.Item.call(this, 'water', x, y);
		this.animations.add('animFilter', [], 5, true);
		this.frame = 0;
	}

	Water.prototype = Object.create(Items.Item.prototype);
	Water.prototype.constructor = Water;

	Water.prototype.update = function() {
		//this.animations.play('???');
		this.animations.play('animFilter');
	}

	Water.prototype.interact = function(lum) {
		switch (lum.color) {
			case ColorEnum.getColorEnum().MICRO:
				if (lum.inactive == null) {
					var steam;
					this.parent.add(steam = SteamFactory.create(this.x, this.y));
					steam.width = this.width;
					steam.anchor.set(0, 1);
					lum.inactive = true;
					//faudrait faire quelque chose pour éviter de créer de la fumée en boucle
					//this.kill();
				}
				break;
		}
		switch (lum.color) {
			case ColorEnum.getColorEnum().GAMMA:
				break;
			default:
				if (lum.body.y >= this.body.y) {
					lum.color = null;
				}
		}
	}

	return {
		init : function(game) {
			_game = game;
			Items.init(_game);
			// _game.load.image('water', 'media/img/Water.png');
			_game.load.spritesheet('water', 'media/img/water3.png', 32, 32, 11);
		},

		create : function(x, y) {
			return (new Water(x, y));
		}
	}
})
