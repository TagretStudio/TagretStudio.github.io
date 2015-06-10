define(['MusicFactory'],function(MusicFactory){
  var _game = null;
  var _nextstate = null;

function transition(){
  _game.state.start(_nextState);
}

return{
  init : function(game){
    _game = game;
    _game.load.image('transitionBackground', 'media/img/sky.png');
    _game.load.image('transitionLogo', 'media/img/Menu.png');
    _game.load.image('gameOver', 'media/img/gameOver.png');


  },
  nextState : function(nextState, musicA, currentLevel){
    var music = null;
    _nextState = nextState;
    if (musicA != null){
      music = musicA.getMusic();
    }
      var background = _game.add.sprite(0, 0, 'transitionBackground');
      background.scale.set(1024/_game.world.width, 768/_game.world.height);
      var logo = _game.add.sprite(_game.world.centerX - 216, _game.world.centerY - 35, 'logo');


      var und = null;
      if (!currentLevel)
        {und = "";}
      else
        {
          und = "Niveau " + currentLevel;
      }


      _game.add.text(300,0, und, {wordWrap: true, wordWrapWidth: _game.world.width, fill: '#ffffff', stroke: '#000000', strokeThickness: 2});

      if (music != null) {
	  music.fadeOut(700);
	music.onFadeComplete.dispatch();
        music.onFadeComplete.addOnce(function() {
          _game.time.events.add(Phaser.Timer.SECOND * 1, transition, this);
	    music = null;
	   // _game.state.start(nextState);
	}, _game);
     } else{
       music = null;
       _game.time.events.add(Phaser.Timer.SECOND * 2, transition, this);

  //    _game.state.start(nextState);
    }
  },

}
})
