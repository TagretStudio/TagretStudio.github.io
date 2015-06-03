 define(['VisionEnum'], function(VisionEnum) {
    
    var _game = null;
    
//Argument Vision
    var Menu = function(game, vision) {

       game.add.sprite(0, 504, 'menuB');
        if (vision == 3) {
            //infra

            //plomb
            plombCarre = game.add.sprite(470, 536, 'plombCarre');
            plombVertical = game.add.sprite(510, 536, 'plombVertical');      
            plombHorizontal = game.add.sprite(550, 536, 'plombHorizontal');

            //mirroirs
            miroirH = game.add.sprite(660, 536, 'mirroirH');
            miroirV = game.add.sprite(700, 536, 'mirroirV');
        } else if(vision == 2) {
            //visibles
        
            red = game.add.sprite(230, 536, 'red');
            green = game.add.sprite(270, 536, 'green');      
            blue = game.add.sprite(310, 536, 'blue');

            magenta = game.add.sprite(470, 536, 'magenta');
            cyan = game.add.sprite(510, 536, 'cyan');      
            yellow = game.add.sprite(550, 536, 'yellow');

            miroirH = game.add.sprite(660, 536, 'mirroirH');
            miroirV = game.add.sprite(700, 536, 'mirroirV');      
        }else if(vision == 1){

            //supra

            //antenes
            aerialLeft = game.add.sprite(270, 536, 'aerialLeft');
            aerialRight = game.add.sprite(310, 536, 'aerialRight');  

            //mirroirs
            miroirH = game.add.sprite(660, 536, 'mirroirH');
            miroirV = game.add.sprite(700, 536, 'mirroirV');    
        }
       



	//game.physics.arcade.enable(this);
        //this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
     Menu.prototype.passToVisible = function() {
	 aerialLeft.exists = false;
	 aerialRight.exists = false;
	 plombCarre.exists = false;
	 plombVertical.exists = false;
	 plombHorizontal.exists = false;
	 miroirH.exists = true;
	 miroirV.exists= true;
	 red.exists = true;
	 blue.exists = true;
	 green.exists = true;
	 cyan.exists = true;
	 yellow.exists = true;
	 magenta.exists = true;
     }
     Menu.prototype.passToInfra = function() {
	 aerialLeft.exists = true;
	 aerialRight.exists = true;
	 plombCarre.exists = false;
	 plombVertical.exists = false;
	 plombHorizontal.exists = false;
	 miroirH.exists = true;
	 miroirV.exists = true;
	 red.exists = false;
	 blue.exists = false;
	 green.exists = false;
	 cyan.exists = false;
	 yellow.exists = false;
	 magenta.exists = false;
     }    
     Menu.prototype.passToSupra = function() {
	 aerialLeft.exists = false;
	 aerialRight.exists = false;
	 plombCarre.exists = true;
	 plombVertical.exists = true;
	 plombHorizontal.exists = true;
	 miroirH.exists = true;
	 miroirV.exists = true;
	 red.exists = false;
	 blue.exists = false;
	 green.exists = false;
	 cyan.exists = false;
	 yellow.exists = false;
	 magenta.exists = false;
     }

    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menuB', 'media/img/simpleMenu.png');

            //filtres aditifs
            _game.load.image('red', 'media/img/filterRedMenu.png');
            _game.load.image('green', 'media/img/filterGreenMenu.png');
            _game.load.image('blue', 'media/img/filterBlueMenu.png');

            //filtres sustractifs
            _game.load.image('magenta', 'media/img/filterMagentaMenu.png');
            _game.load.image('cyan', 'media/img/filterCyanMenu.png');
            _game.load.image('yellow', 'media/img/filterYellowMenu.png');

            //mirroirs
            _game.load.image('mirroirV', 'media/img/mirroirVertical.png');
            _game.load.image('mirroirH', 'media/img/mirroirOrizontal.png');

            //antenes
            _game.load.image('aerialLeft', 'media/img/aerialLeft.png');
            _game.load.image('aerialRight', 'media/img/aerialRight.png');
			
            //plomb
            _game.load.image('plombCarre', 'media/img/plombCarre.png');
            _game.load.image('plombHorizontal', 'media/img/plombOrizontal.png');
            _game.load.image('plombVertical', 'media/img/plombVertical.png');
        },
        
        create : function(vision) {
	        return (new Menu(_game, vision));
        },

	
    }
 })	
