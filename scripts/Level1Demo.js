define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest',
'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory',
 'ItemsLevel', 'MiroirFactory', 'GammaLummingFactory', 'PorteRadioFactory', 'PorteWithAuraFactory'], function(Images, LummingFactory,
   VisibleLummingFactory, ColorEnum,
       MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest, VisionEnum,
        Transition, FilterFactory, RadioLummingFactory, ItemsLevel,
        MiroirFactory, GammaLummingFactory, PorteRadioFactory, PorteWithAuraFactory) {

var _game;
var _nbLummingsV = 0;
var _nbLummingsSaved = 0;
var _etapesuivante = null;
var _groupPlatforms = null;
var _groupLum = null;
var _music = null;
var _menu = null;
var _text = null;
var _currentVision = null;
var _button_restart = null;
var _button_menu = null;
var _groupDoorsRadioA = null;
var _groupDoorsRadioB = null;

var _level1Demo = {
  preload : function(){
    _music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
    _game.load.image('buttonDiamond', 'media/img/menuButton.png');
    _game.load.image('buttonRefresh', 'media/img/refresh.png')
    _game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
    MenuFactoryTest.init(_game);
    PlatformFactory.init(_game);
    VisibleLummingFactory.init(_game);
    GammaLummingFactory.init(_game);
    PorteRadioFactory.init(_game);
    PorteWithAuraFactory.init(_game);
  },

  create : function(){
    _nbLummingsSaved = 0;
    _music.play();
    Images.boot().create();
    _game.physics.startSystem(Phaser.Physics.ARCADE);
    _currentVision = VisionEnum.getVisionEnum().VISIBLE;
    _groupPlatforms = _game.add.group();
    _groupPlatforms.enableBody = true;
    platform1 = PlatformFactory.create(100, 300, false);
    platform2 = PlatformFactory.create(300, 300, false);

    _groupPlatforms.add(platform1);
    _groupPlatforms.add(platform2);

    _groupDoorsRadioA = _game.add.group();
    _groupDoorsRadioA.enableBody = true;
    portetest = PorteWithAuraFactory.create(220,236, 200);
    _groupDoorsRadioA.add(portetest);
    _groupDoorsRadioB = _game.add.group();
    _groupDoorsRadioB.enableBody = true;
    _groupDoorsRadioA.forEach(
      function(p){
        _groupDoorsRadioB.add(p.getDoor());
      }
    )

//    _groupDoorsRadio.add(porteAntenne1);


    _groupDoors = _game.add.group();
    _groupDoors.enableBody = true;
    door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
    door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
    _groupDoors.add(door1);
    _groupDoors.add(door2);


    _groupLum = _game.add.group();
    lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
    lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
    _groupLum.add(lum1);
    _groupLum.add(lum2);

    _nbLummingsV = 2;
    text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});
    button_menu = _game.add.button(32,0, 'buttonDiamond', actionOnMenu, _game);
    button_restart = _game.add.button(650,0,'buttonRefresh', actionOnRestart, _game);

    _menu = MenuFactoryTest.create([1,2,3,4,5,6,7,8,9,10,11,12,13]);
  //  _menu = MenuFactoryTest.create();

    ItemsLevel.reinit(_game);

    var cliquez = this.add.sprite(100, 300, 'cliquez');
    cliquez.scale.set(0.7, 0.7);
    _game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
    _game.paused = true;

    ItemsLevel.setgroup(_groupLum);
  },

  update : function(){
    _menu.update();
    _game.physics.arcade.overlap(_groupLum, _groupPlatforms, collidePf, null, _game);
    _game.physics.arcade.overlap(_groupLum, _groupPlatforms, collidePf, null, _game);
    _game.physics.arcade.overlap(_groupLum, _groupDoorsRadioA, function(lum, door) {door.setOverlap(lum, _game.time.now +100)});
    _game.physics.arcade.collide(_groupLum, _groupDoorsRadioB);
    _game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);

    _groupLum.forEach(
      function(p){
        p.update(_currentVision);
      })
    _groupDoors.forEach(
			function(p){
				p.update();
			})

    _groupDoorsRadioA.forEach(
      function(p){
        p.update();
      }
    )

    if (_nbLummingsV == _nbLummingsSaved) {
      Transition.nextState('Level2Demo', _music);
    }
  }

}


function mayExit(lum, door){
    var exit = lum.collideWithDoor(door);
      if (exit == 1){
        _nbLummingsSaved = _nbLummingsSaved +1;
        text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
      }
}

function collidePf(lum, platform){
  if(lum.color == 9){
    if(platform.isPb){
      _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
    }
  } else {
     _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
    }

}

function actionOnRestart() {
var background = _game.add.sprite(0, 0, 'transitionBackground');
var logo = _game.add.sprite(184, 265, 'logo');
if (_music != null) {
    _music.getMusic().fadeOut(700);
    _music.getMusic().onFadeComplete.dispatch();
    _music.getMusic().onFadeComplete.addOnce(function() {
	_music = null;
	_currentVision = VisionEnum.getVisionEnum().VISIBLE;
	_game.state.start('Level1Demo');
    }, _game);
}
}

function actionOnMenu() {
   var background = _game.add.sprite(0, 0, 'transitionBackground');
   var logo = _game.add.sprite(184, 265, 'logo');
   if (_music != null) {
     _music.getMusic().fadeOut(700);
     _music.getMusic().onFadeComplete.dispatch();
     _music.getMusic().onFadeComplete.addOnce(function() {
     _music = null;
     _game.state.start('MainMenu');
     }, _game);
 }
}



  return{
    init : function(game, etapesuivante){
      _game = game;
      _etapesuivante = etapesuivante;
    },
    getLevel1Demo : function(){
      return _level1Demo;
    }
  }

})
