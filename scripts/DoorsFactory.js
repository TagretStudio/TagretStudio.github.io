define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
  var _game = null;

  var Doors = function(color, x, y){
    this.color = color;

    this.spriteName = 'door_' + ColorEnum.getName(color);
    Items.Item.call(this, this.spriteName, x, y);
    this.body.setSize(32, 32);
    this.animations.add('animDoor', [], 10, true);
    this.frame = 0;


  }

  Doors.prototype = Object.create(Items.Item.prototype);
  Doors.prototype.constructor = Doors;

  Doors.prototype.update = function(){
    this.animations.play('animDoor');
  }

  return {
    init : function(game){
      _game = game;
      Items.init(_game);
      _game.load.spritesheet('door_blue', 'media/img/door_blue.png', 32, 32, 30);
      _game.load.spritesheet('door_cyan', 'media/img/door_cyan.png', 32, 32, 30);
      _game.load.spritesheet('door_green', 'media/img/door_green.png', 32, 32, 30);
      _game.load.spritesheet('door_magenta', 'media/img/door_magenta.png', 32, 32, 30);
      _game.load.spritesheet('door_red', 'media/img/door_red.png', 32, 32, 30);
      _game.load.spritesheet('door_white', 'media/img/door_white.png', 32, 32, 30);
      _game.load.spritesheet('door_yellow', 'media/img/door_yellow.png', 32, 32, 30);
    },
    create : function(color, x, y){
      return (new Doors(color, x, y));
    }
  }
})
