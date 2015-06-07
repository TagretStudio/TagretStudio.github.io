define(['LummingFactory', 'VisionEnum', 'ColorEnum'],
	   function(LummingFactory, VisionEnum, ColorEnum) {

    var _game = null;
	var _vision = null;

    var GammaLumming = function(game, x, y, vitesseX) {
	this.sprite = 'media/img/lumming_gamma';
    this.color = ColorEnum.getColorEnum().GAMMA;
	LummingFactory.Lumming.call(this, game, 'lumming_gamma', x, y, vitesseX, 3);
    }

    GammaLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    GammaLumming.prototype.constructor = GammaLumming;

    GammaLumming.prototype.collideWithDoor = function(door){
        door.kill();
    }

    return {
        init: function(game) {
            _game = game;
			_vision = VisionEnum.getVisionEnum().ULTRA;
            LummingFactory.init(_game);
	    _game.load.spritesheet('lumming_gamma', 'media/img/lumming_gamma.png', 32, 32, 32);
	},

	create: function(x, y, vitesseX) {
            return (new GammaLumming(_game, x, y, vitesseX));
        }
    }
})
