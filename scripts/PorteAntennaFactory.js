define(['Items'], function(Items) {
  var _game = null;

  var PorteAntenna = function(x, y, rayon) {
    this.spriteName = 'portantenne';
    Items.Item.call(this, this.spriteName, x, y);
    this.animations.add('ferme', [0], 10, true);
    this.animations.add('ouvert', [1], 10, true);
    this.animations.add('lol', [0,1], 0.2, true);
    this.frame = 0;
    this.anchor.setTo(0.5, 0);
    this.rond = _game.add.graphics(x, y);
    this.rond.beginFill(0xF0FFFF, 0.1);

    this.rond.drawCircle(0 ,0, rayon);


	}

	PorteAntenna.prototype = Object.create(Items.Item.prototype);
	PorteAntenna.prototype.constructor = PorteAntenna;

  PorteAntenna.prototype.fermer = function(){
    this.animations.play('ferme');
    this.body.setSize(10,64);
  }

  PorteAntenna.prototype.ouvrir = function(){
    this.animations.play('ouvert');
    this.body.setSize(10,32);
  }


	PorteAntenna.prototype.update = function() {
    this.animations.play('ouvert');
    this.body.setSize(10,32);

	}



	return{
		init : function(game) {
			_game = game;
      Items.init(_game);
      _game.load.spritesheet('portantenne', 'media/img/porteAntenne.png', 10, 64, 2);

		}	,
		create : function(x, y, rayon) {
			return (new PorteAntenna(x,y,rayon));
		}
	}
})
