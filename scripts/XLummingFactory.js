define(['LummingFactory', 'VisionEnum', 'ColorEnum'],
	   function(LummingFactory, VisionEnum, ColorEnum) {

    var _game = null;
	var _vision = null;

    var XLumming = function(game, x, y, vitesseX) {
		this.sprite = 'media/img/lumming_x';
		this.color = ColorEnum.getColorEnum().X;
		LummingFactory.Lumming.call(this, game, 'lumming_x', x, y, vitesseX, 3);
    }

    XLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    XLumming.prototype.constructor = XLumming;

    return {
        init: function(game) {
            _game = game;
			_vision = VisionEnum.getVisionEnum().ULTRA;
            LummingFactory.init(_game);
		    _game.load.spritesheet('lumming_x', 'media/img/lumming_x.png', 32, 32, 32);
		},

		create: function(x, y, vitesseX) {
            return (new XLumming(_game, x, y, vitesseX));
        }
    }
})
