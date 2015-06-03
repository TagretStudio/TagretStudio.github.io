define(function(){
  var _game = null;

  var Music = function(key, url) {
    this.key = key;
    this.baseURL = '';
    this.url = url;

    _game.load.audio(this.key, this.url);
    this.music = null;

  }
  Music.prototype= Object.create(Music.prototype);
  Music.prototype.constructor = Music;
  Music.prototype.getMusic = function(){
    return this.music;
  }

  Music.prototype.isPlaying = function(){
    return (this.music.isPlaying == true);
  }

  Music.prototype.play = function(){
    this.music = _game.add.audio(this.key);
    this.music.loop  = true;
    this.music.play();

  }

  /*Music.prototype.stop = function(){
    this.music.mute = true;
  }*/

  Music.prototype.stop = function(nextState){
    if (this.music != null && this.music.isPlaying == true) {
//      this.music.onFadeComplete.dispatch();
      //this.music.fateTo(700, 0);

      this.music.fadeOut(700);
      /*music.onFadeComplete.dispatch();*/
      while (this.music.volume >0){

      }
	this.music.onFadeComplete.dispatch();
	     this.music.onFadeComplete.addOnce(function() {
	    _game.state.start(nextState);
	}, _game);
    }
  }
  return {
    init : function(game){
      _game= game;
    },
    create : function(key, urls) {
      return (new Music(key, urls));
    }

  }
})
