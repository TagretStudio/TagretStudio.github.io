define(['Items'], function(Items) {
  var _game = null;

  var PorteRadio = function(x, y) {
    this.spriteName = 'portantenne';
    Items.Item.call(this, this.spriteName, x, y);
    this.animations.add('ferme', [0], 10, true);
    this.animations.add('ouvert', [1], 10, true);
    this.animations.add('lol', [0,1], 0.2, true);
    this.frame = 0;
    this.anchor.setTo(0.5, 0);
	}

	PorteRadio.prototype = Object.create(Items.Item.prototype);
	PorteRadio.prototype.constructor = PorteRadio;

  PorteRadio.prototype.fermer = function(){
    this.animations.play('ferme');
    this.body.setSize(8,64);
  }

  PorteRadio.prototype.ouvrir = function(){
    this.animations.play('ouvert');
    this.body.setSize(8,32);
  }





	return{
		init : function(game) {
			_game = game;
      Items.init(_game);
      _game.load.spritesheet('portantenne', 'media/img/porteAntenne.png', 10, 64, 2);

		}	,
		create : function(x, y) {
			return (new PorteRadio(x,y));
		}
	}
})
