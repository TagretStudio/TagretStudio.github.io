define(['./Images', './MusicFactory' ,'./MainMenu', 'Transition', 'LevelFactory'], function(Images, MusicFactory, MainMenu, Transition, LevelFactory){
	var _game = null;
	var _etapesuivante = null;
  var _unite = 1;
  var _dizaine = 0;
	var _space = null;
	var _music = null;
  var _buttons = null;
  var _button = null;
  var _pointLogo =null;
	var dizainesSprite;
	var uniteSprite;
	var transpaSprite;

  function actionPlay(){
    LevelFactory.setLevel(_unite + 10*_dizaine);
    Transition.nextState('LevelFactory', _music);
  }


  function actionButton(d, u){
  //  LevelFactory.setLevel(niveau);
	var diz = _dizaine;
	var uni = _unite;
    _dizaine = (_dizaine+d+10)%10;
    _unite = (_unite+u+10)%10;
	dizaineSprite.frame = _dizaine;
	uniteSprite.frame = _unite;
	if (uni != _unite) {
		var sp;
		transpaSprite.add(sp = _game.add.sprite(uniteSprite.x, uniteSprite.y, uniteSprite.key, uniteSprite.frame));
		sp.anchor.set(0.5, 0.5);
		sp.angle = Math.random()*Math.PI-Math.PI/2;
	}
	if (diz != _dizaine) {
		var sp;
		transpaSprite.add(sp = _game.add.sprite(dizaineSprite.x, dizaineSprite.y, dizaineSprite.key, dizaineSprite.frame));
		sp.anchor.set(0.5, 0.5);
		sp.angle = Math.random()*Math.PI+Math.PI/2;
	}
    //Transition.nextState('LevelFactory', _music);
  }

   	var _levelSelection = {
  		preload : function(){
            _pointLogo = new Phaser.Point(_game.world.centerX - 216, _game.world.centerY - 66);
            _pointButtons = new Phaser.Point(_game.world.centerX , _game.world.centerY - 20);
            _game.load.spritesheet('buttonplusmoins', 'media/img/buttonplusmoins.png', 38, 38);
            _game.load.spritesheet('button', 'media/img/MenuButtons.png', 274, 71);
            _game.load.spritesheet('chiffres', 'media/img/chiffres.png', 47, 65);
  		},

  		create : function(){
            Images.boot().create();
            _buttons = _game.add.group();
  	    	_buttons.scale.set(_game.world.width/1024, _game.world.height/768);
  	    	_buttons.add(_buttonPlus = _game.make.button(_game.world.centerX*1024/800 + 40, _game.world.centerY, 'buttonplusmoins', function(){actionButton(0,1);}, _game, 0, 1, 2));
            _buttons.add(_buttonMoins = _game.make.button(_game.world.centerX*1024/800 + 40,_game.world.centerY + 150, 'buttonplusmoins', function(){actionButton(0,-1);}, _game, 3, 4, 5));
            _buttons.add(_buttonPlus = _game.make.button(_game.world.centerX*1024/800 - 40, _game.world.centerY, 'buttonplusmoins', function(){actionButton(1,0);}, _game, 0, 1, 2));
            _buttons.add(_buttonMoins = _game.make.button(_game.world.centerX*1024/800 - 40,_game.world.centerY + 150, 'buttonplusmoins', function(){actionButton(-1,0);}, _game, 3, 4, 5));
            _buttons.add(_buttonPlay = _game.make.button(_game.world.centerX*1024/800, _game.world.centerY + 300, 'button', actionPlay, _game, 0, 1, 2));
            _buttons.forEach(function (p){
                p.anchor.set(0.5, 0.5);
                p.scale.set(2,2);
            })

    //    _buttonPlus.anchor.set(0.5, 0.5);
    //    _buttonPlus.scale.set(2,2);
    //    _buttonMoins.anchor.set(0.5, 0.5);
    //    _buttonMoins.scale.set(2,2);

			dizaineSprite = _game.add.sprite(_game.world.centerX - 40, _game.world.centerY, 'chiffres', _dizaine);
			uniteSprite = _game.add.sprite(_game.world.centerX + 40, _game.world.centerY, 'chiffres', _unite);
			dizaineSprite.anchor.set(0.5, 0.5);
			uniteSprite.anchor.set(0.5, 0.5);

			transpaSprite = _game.add.group();

			/*
            //text = _game.add.text(_game.world.centerX + 20, _game.world.centerY, _unite , {align: "center"});
            //text2 = _game.add.text(_game.world.centerX - 20, _game.world.centerY, _dizaine, {align: "center"});

        	text.anchor.set(0.5,0.5);
            text.scale.set(2,2);
            text2.anchor.set(0.5,0.5);
            text2.scale.set(2,2);
            */
  		},

  		update :function(){
			transpaSprite.forEach(
				function(p) {
					p.alpha = Math.max(p.alpha-0.1,0);
					p.x += Math.cos(p.angle)*2;
					p.y += Math.sin(p.angle)*2;
					if (p.alpha == 0) p.kill();
				}
			);
            //text.setText(_unite);
            //text2.setText(_dizaine);
  		}
  	}


  	return{
  		init : function(game, etapesuivante){
  			_game = game;
  			_etapesuivante = etapesuivante;
  		},
      setMusic : function(music){
        _music = music;
      },

      getLevelSelection : function(){
        return _levelSelection;
      }

  	}

  })
