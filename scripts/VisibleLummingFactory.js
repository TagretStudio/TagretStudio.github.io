define(['LummingFactory', 'ColorEnum', 'VisionEnum', 'DoorsFactory', 'FilterFactory'],
       function(LummingFactory, ColorEnum, VisionEnum, DoorsFactory, FilterFactory) {

    var _game = null;
    var _vision = null;

    var VisibleLumming = function(game, color, x, y, vitesseX) {
        this.color = color;
        this.spriteName = 'lumming_' + ColorEnum.getName(color);
        LummingFactory.Lumming.call(this, game, this.spriteName, x, y, vitesseX, _vision);
        this.animations.add('kill', [1, 4, 15, 11], 10, true);

    }

    VisibleLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    VisibleLumming.prototype.constructor = VisibleLumming;

    VisibleLumming.prototype.collideWithDoor = function(door){
        if (this.color == door.color){
          this.body.velocity.x = 0;
          this.animations.play('kill');
          this.color = null;
          //this.kill(); géré dans l'update maintenant
          return 1;
        }
        return 0;
    }

    VisibleLumming.prototype.collideWithFilter = function(filter) {
      if (this.color != null){
        var temp = this.color;
        var value = ColorEnum.getValue(temp);
        if (filter.isAdditive()) {
            value = value | ColorEnum.getValue(filter.getColor());
            this.color = ColorEnum.getColorKnowingValue(value);
        } else {
        //  alert(ColorEnum.getValue(filter.getColor()));
            value = value & ColorEnum.getValue(filter.getColor());
            this.color = ColorEnum.getColorKnowingValue(value);

        }
        if (temp != this.color) {
            if (value == 0) {
               this.body.velocity.x = 0;
		this.body.velocity.y = -100;
		this.body.gravity.y = -100;
               this.animations.play('kill');
		this.color = null;
               //this.kill();
            } else {
                LummingFactory.Lumming.prototype.updateColor.call(this, 'lumming_' + ColorEnum.getName(this.color));
            }
        }
      }
    }

    VisibleLumming.prototype.update = function() {
        LummingFactory.Lumming.prototype.update.call(this);
    }

    return {
        init: function(game) {
            _game = game;
            _vision = VisionEnum.getVisionEnum().VISIBLE;
            LummingFactory.init(_game);
            _game.load.spritesheet('lumming_blue', 'media/img/lumming_blue.png', 32, 32, 32);
            _game.load.spritesheet('lumming_cyan', 'media/img/lumming_cyan.png', 32, 32, 32);
            _game.load.spritesheet('lumming_green', 'media/img/lumming_green.png', 32, 32, 32);
            _game.load.spritesheet('lumming_magenta', 'media/img/lumming_magenta.png', 32, 32, 32);
            _game.load.spritesheet('lumming_red', 'media/img/lumming_red.png', 32, 32, 32);
            _game.load.spritesheet('lumming_white', 'media/img/lumming_white.png', 32, 32, 32);
            _game.load.spritesheet('lumming_yellow', 'media/img/lumming_yellow.png', 32, 32, 32);
        },

        create: function(color, x, y, vitesseX) {
            return (new VisibleLumming(_game, color, x, y, vitesseX, _vision));
        }
    }
})
