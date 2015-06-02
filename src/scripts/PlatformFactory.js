 define(function() {
    
    var _game = null;
    
    var Platform = function(game, x, y, isPb) {
        this.isPb = isPb;
        if (isPb) {
            this.spriteName = ''; //A CHANGER une fois qu'on aura un sprite pour le plomb
        } else {
            this.spriteName = 'platform';
        }
        Phaser.Sprite.call(this, game, x, y, this.spriteName);
		game.physics.arcade.enable(this);
        this.body.immovable = true;
   }
    
    Platform.prototype = Object.create(Phaser.Sprite.prototype);
    Platform.prototype.constructor = Platform;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('platform', 'media/img/platform.png');
			
        },
        
        create : function(x, y, isPb) {
	        return (new Platform(_game, x, y, isPb));
        }
    }
 })	