define(['LummingFactory', 'VisionEnum', 'ColorEnum'],
	   function(LummingFactory, VisionEnum, ColorEnum) {

    var _game = null;
	var _vision = null;

    var RadioLumming = function(game, x, y, vitesseX) {
	this.sprite = 'media/img/lumming_radio';
    this.color = ColorEnum.getColorEnum().RADIO;
	LummingFactory.Lumming.call(this, game, 'lumming_radio', x, y, vitesseX, 1);
    }

    RadioLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    RadioLumming.prototype.constructor = RadioLumming;

    return {
        init: function(game) {
            _game = game;
			_vision = VisionEnum.getVisionEnum().INFRA;
            LummingFactory.init(_game);
	    _game.load.spritesheet('lumming_radio', 'media/img/lumming_radio.png', 32, 32, 32);
	},

	create: function(x, y, vitesseX) {
            return (new RadioLumming(_game, x, y, vitesseX));
        }
    }
})
