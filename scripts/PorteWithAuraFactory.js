define(['Items', 'PorteRadioFactory', 'LummingFactory', 'ColorEnum'], function(Items, PorteRadioFactory, LummingFactory, ColorEnum) {
  var _game = null;

  var PorteWithAura = function(x, y, rayon) {
    var group = _game.add.group();
    rond = _game.add.graphics(0, 0);
    rond.beginFill(0xF0FFFF, 0.1);

    rond.drawCircle(0 ,0, rayon);
    texture= rond.generateTexture();
    rond.destroy();
    Phaser.Sprite.call(this, _game, x, y, texture);
    this.anchor.set(0.5,0.5);
    this.door = PorteRadioFactory.create(x, y);
    group.add(this.door);
    this.lastOverlapped = null;
	}

	PorteWithAura.prototype = Object.create(Phaser.Sprite.prototype);
	PorteWithAura.prototype.constructor = PorteWithAura;

  PorteWithAura.prototype.getDoor = function(){
    return this.door;
  }

  PorteWithAura.prototype.getOverlap = function(){
    return this.lastOverlapped;
  }
  PorteWithAura.prototype.setOverlap = function(lum, time){
    if (lum.color == ColorEnum.getColorEnum().RADIO){
      this.door.ouvrir();
      this.lastOverlapped = time;
    }
  }

  PorteWithAura.prototype.ouvert = function(){
    this.door.ouvrir();
  }
  PorteWithAura.prototype.ferme = function(){
    this.door.fermer();
  }

  PorteWithAura.prototype.update = function(){
    if (this.getOverlap() && _game.time.now > this.getOverlap()){
      this.ferme();
    }
  }


	return{
		init : function(game) {
			_game = game;
      Items.init(_game);
      PorteRadioFactory.init(_game);
  //    _game.load.spritesheet('portantenne', 'media/img/porteAntenne.png', 10, 64, 2);

		}	,
		create : function(x, y, rayon) {
			return (new PorteWithAura(x,y, rayon));
		}
	}
})
