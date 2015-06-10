define(function(){
  var _game;

  var Item = function(sprite, x, y){
    Phaser.Sprite.call(this, _game, x, y, sprite, [1]);
    _game.physics.arcade.enable(this);
    //this.body.setSize(32, 32);
    this.body.immovable= true;
  }

  Item.prototype = Object.create(Phaser.Sprite.prototype);
  Item.prototype.constructor = Item;

  return{
      init : function(game){
        _game = game;
      },
      Item : Item
  }
})
