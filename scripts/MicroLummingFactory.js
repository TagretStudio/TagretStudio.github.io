define(['LummingFactory', 'VisionEnum', 'ColorEnum'],
	   function(LummingFactory, VisionEnum, ColorEnum) {

    var _game = null;
	var _vision = null;

    var MicroLumming = function(game, x, y, vitesseX) {
	this.sprite = 'media/img/lumming_radio';
    this.color = ColorEnum.getColorEnum().MICRO;
	LummingFactory.Lumming.call(this, game, 'lumming_micro', x, y, vitesseX, 1);
    }

    MicroLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    MicroLumming.prototype.constructor = MicroLumming;

    return {
        init: function(game) {
            _game = game;
			_vision = VisionEnum.getVisionEnum().INFRA;
            LummingFactory.init(_game);
	    _game.load.spritesheet('lumming_micro', 'media/img/lumming_micro.png', 32, 32, 32);
	},

	create: function(x, y, vitesseX) {
            return (new MicroLumming(_game, x, y, vitesseX));
        }
    }
})
