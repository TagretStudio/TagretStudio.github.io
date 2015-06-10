define(['VisionEnum','ColorEnum', 'DoorsFactory', 'ItemsLevel'], function(VisionEnum,ColorEnum, DoorsFactory, ItemsLevel) {
	var _game = null;
	var regX = 100; // coordonnee X du MILIEU de la reglette
	var regdist = 64;
	var regY = null;// _game.world.height-64-16;
	var regdots;
//  var _groupItem = null;

	var Menu = function(tab){
		this.vision = null;
		if (tab == null){
			tab = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
		}
		this.spriteTempo = null;
  //  _groupItem = _game.add.group();
  //  _groupItem.enableBody = true;
		this.barre = _game.add.sprite(0, _game.world.height-96, 'menuB');
		var bounds = _game.add.sprite(0, 0, 'menuB');
		bounds.anchor.set(0.5, 0.5);
		bounds.height = 96;
		bounds.width = regdist*3;
		bounds.x = regX;
		bounds.y = regY;
		var regdot; //aucune idee de pourquoi il faut un -1 sur les trois suivants
		regdots = _game.add.group();
		regdots.add(_game.add.sprite(regX-1, regY, 'RegDot'));
		regdots.add(_game.add.sprite(regX-1+regdist*2/3, regY, 'RegDot'));
		regdots.add(_game.add.sprite(regX-1-regdist*2/3, regY, 'RegDot'));
		this.reglette = _game.add.sprite(regX, _game.world.height-48, 'Reg');
		this.reglette.anchor.set(0.5, 0.5);
		this.reglette.inputEnabled = true;
		this.reglette.input.enableDrag();
		this.reglette.input.boundsSprite = bounds;
		this.reglette.input.allowVerticalDrag = false;
		this.reglette.held = false;
		var rX = this.reglette.x;
		regdots.time = 0;
		regdots.forEach(
			function (p) {
				p.amplitude = 1;
				p.anchor.set(0.5, 0.5);
				var i = Math.max(0,Math.min(1,(Math.abs(p.x-rX)/(regdist*4/3))));
				p.tint = (Math.min(255,i*512)<<16) | (Math.min(255,512-i*512)<<8) | (0);
			}
		)

		this.groupVisible = _game.add.group();
		this.groupInfra = _game.add.group();
		this.groupSupra = _game.add.group();
		this.groupMiroir = _game.add.group();
		//infra

		//plomb
		plombCarre = _game.add.sprite(20+330, _game.world.centerY - 64, 'plombCarre');
		plombCarre.hitArea = new Phaser.Rectangle(0, 0, 32, 32);
		plombCarre.number = tab[0];

		this.groupInfra.add(plombCarre);
		plombVertical = _game.add.sprite(20+370, _game.world.centerY - 64, 'plombVertical');
		plombVertical.hitArea = new Phaser.Rectangle(0, 0, 32, 32);
		plombVertical.number = tab[1];
		this.groupInfra.add(plombVertical);
		plombHorizontal = _game.add.sprite(20+410, _game.world.centerY - 64, 'plombHorizontal');
		plombHorizontal.hitArea = new Phaser.Rectangle(0, 0, 32, 32);
		this.groupInfra.add(plombHorizontal);
		plombHorizontal.number = tab[2];

		//miroirs
		miroirH = _game.add.sprite(660, _game.world.centerY - 64, 'miroirH');
		miroirH.hitArea = new Phaser.Rectangle(0, 0, 32, 32);
		miroirH.number= tab[3];
		miroirV = _game.add.sprite(700, _game.world.centerY - 64, 'miroirV');
		miroirV.hitArea = new Phaser.Rectangle(0, 0, 32, 32);
		miroirV.number = tab [4];
		this.groupMiroir.add(miroirH);
		this.groupMiroir.add(miroirV);

		//antenes
		aerialRight = _game.add.sprite(310, _game.world.centerY - 64, 'antenna_right');
		aerialRight.number = tab[5];
		aerialLeft = _game.add.sprite(470, _game.world.centerY - 64, 'antenna_left');
		aerialLeft.number = tab[6];
		this.groupSupra.add(aerialLeft);
		this.groupSupra.add(aerialRight);

		//visibles

		red = _game.add.sprite(190, _game.world.centerY - 64, 'red');
		red.number = tab[7];
		green = _game.add.sprite(230, _game.world.centerY - 64, 'green');
		green.number = tab[8];
		blue = _game.add.sprite(270, _game.world.centerY - 64, 'blue');
		blue.number = tab[9];
		magenta = _game.add.sprite(510, _game.world.centerY - 64, 'magenta');
		magenta.number = tab[10];
		cyan = _game.add.sprite(550, _game.world.centerY - 64, 'cyan');
		cyan.number = tab[11];
		yellow = _game.add.sprite(590, _game.world.centerY - 64, 'yellow');
		yellow.number = tab[12];
		this.groupVisible.add(red);
		this.groupVisible.add(blue);
		this.groupVisible.add(green);
		this.groupVisible.add(cyan);
		this.groupVisible.add(magenta);
		this.groupVisible.add(yellow);

		this.groupInfra.visibl = false;
		this.groupInfra.addAll('draggable', false)
		var i =1;
		this.groupInfra.forEach(
			function(p){
				if (!p.draggable) {
					p.y = _game.world.height - 64;

					p.spriteText = _game.add.text(p.x + p.width/2, p.y+32, ""+p.number, {fill: "#ffffff", align: "center"});
					p.spriteText.anchor.set(0.5,0);
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
					//dragcopy.exists = false;
					//p.exists = false;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;

					dragcopy.rect = _game.add.sprite(p.x, p.y, 'whiteSquare');
					p.copy = dragcopy;
					if (p.number == 0) {
						p.alpha = 0.25;
						dragcopy.alpha = 0;
						dragcopy.rect.alpha = 0;
					}
				}
			}
		)

		this.groupSupra.visibl = false;
		this.groupSupra.addAll('draggable', false)
		this.groupSupra.forEach(
			function(p){
				if (!p.draggable) {
					p.y = _game.world.height - 64;

					p.spriteText = _game.add.text(p.x + p.width/2, p.y+32, ""+p.number, {fill: "#ffffff", align: "center"});
					p.spriteText.anchor.set(0.5,0);
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
					//dragcopy.exists = false;
					//p.exists = false;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;

					dragcopy.rect = _game.add.sprite(p.x, p.y, 'whiteSquare');
					p.copy = dragcopy;
					if (p.number == 0) {
						p.alpha = 0.25;
						dragcopy.alpha = 0;
						dragcopy.rect.alpha = 0;
					}
				}
			}
		)

		this.groupMiroir.visibl = true;
		this.groupMiroir.addAll('draggable', false)
		this.groupMiroir.forEach(
			function(p){
				p.y = _game.world.height - 64;
				if (!p.draggable) {

					p.spriteText = _game.add.text(p.x + p.width/2, p.y+32, ""+p.number, {fill: "#ffffff", align: "center"});
					p.spriteText.anchor.set(0.5,0);

					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
					//dragcopy.exists = true;
					//p.exists = true;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;

					dragcopy.rect = _game.add.sprite(p.x, p.y, 'whiteSquare');
					p.copy = dragcopy;
					if (p.number == 0) {
						p.alpha = 0.25;
						dragcopy.alpha = 0;
						dragcopy.rect.alpha = 0;
					}
				}
			}
		)

		this.groupVisible.visibl = true;
		this.groupVisible.addAll('draggable', false)
		this.groupVisible.forEach(
			function(p){
				p.y = _game.world.height - 64;
				if (!p.draggable) {

					p.spriteText = _game.add.text(p.x + p.width/2, p.y+32, ""+p.number, {fill: "#ffffff", align: "center"});
					p.spriteText.anchor.set(0.5,0);
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
					//dragcopy.exists = true;
					//p.exists = true;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;

					dragcopy.rect = _game.add.sprite(p.x, p.y, 'whiteSquare');
					p.copy = dragcopy;
					if (p.number == 0) {
						p.alpha = 0.25;
						dragcopy.alpha = 0;
						dragcopy.rect.alpha = 0;
					}
				}
			}
		)

		this.state = 'visible';

	}
	Menu.prototype.constructor = Menu;
	Menu.prototype = Object.create(Phaser.Sprite.prototype);

	Menu.prototype.dragStart  = function(sprite){
		/*
		//this.toVisible();
		//	aux = sprite;
		this.spriteTempo = _game.add.sprite(sprite.x, sprite.y, sprite.key);
		this.spriteTempo.inputEnabled = true;
		this.spriteTempo.input.enableDrag();
		this.spriteTempo.events.onDragStart.add(Menu.prototype.dragStart, this, this.spriteTempo);
		this.spriteTempo.events.onDragStop.add(Menu.prototype.dragStop, this, this.spriteTempo);
		// this.spriteTempo.moveDown();
		sprite.bringToTop();
		// sprite = this.spriteTempo();
		// this.spriteTempo = aux;
		//sprite.destroy();
		//	this.destroy();
		*/
	}

	Menu.prototype.dragStop  = function(sprite){
		/*
		//this.toVisible();
		aux = sprite;
		sprite = this.spriteTempo;
		sprite.moveUp();
		aux.destroy();
		// this.spriteTempo = _game.add.sprite(sprite.x, sprite.y, sprite.key);
		//sprite.destroy();
		//	this.destroy();
		*/
		if (sprite.y >= _game.world.height - 96 - sprite.height || sprite.number==0) {
			//bcall(_DoNothing)
		} else {
			//created = _game.add.sprite(sprite.x, sprite.y, sprite.key);
		//	door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, sprite.x, sprite.y);
		//	_groupItem.add(door1);
	ItemsLevel.createItem(sprite.key, sprite.x, sprite.y);
			sprite.number--;
			sprite.spriteText.text = ""+sprite.number;
		}
		sprite.x = sprite.origX;
		sprite.y = sprite.origY;
	}

	Menu.prototype.update = function(){
		this.groupVisible.forEach(moveIcon);
		this.groupSupra.forEach(moveIcon);
		this.groupInfra.forEach(moveIcon);
		this.groupMiroir.forEach(moveIcon);

		this.reglette.y += (regY-this.reglette.y)/4;
		var rX = this.reglette.x;
		var oldstate = this.state;
		if (rX < regX-regdist/3) {
			this.state = 'infra';
			if (!this.reglette.input.isDragged) rX += ((regX-regdist*2/3)-rX)/4;
		} else if (rX > regX+regdist/3) {
			this.state = 'supra';
			if (!this.reglette.input.isDragged) rX += ((regX+regdist*2/3)-rX)/4;
		} else {
			this.state = 'visible';
			if (!this.reglette.input.isDragged) rX += (regX-rX)/4;
		}
		this.reglette.x = rX;
		if (oldstate != this.state){
			if (this.state == 'infra') {
				this.toInfra();
				VisionEnum.setVisionCurrent(3);
			} else if (this.state == 'visible') {
				this.toVisible();
				VisionEnum.setVisionCurrent(2);
				//code passTo le truc à le milieu
			} else {
				this.toSupra();
				VisionEnum.setVisionCurrent(1);
				//code passTo le truc à droite
			}
		}

		regdots.time++;
		regdots.forEach(
			function dotscolors(p) {
				var i = Math.max(0,Math.min(1,(Math.abs(p.x-rX)/(regdist*4/3))));
				p.tint = (Math.min(255,i*512)<<16) | (Math.min(255,512-i*512)<<8) | (0);
				p.amplitude = (1-i)*5;
				p.y = p.amplitude*Math.sin(p.parent.time*(1-i)) + regY;
			}
		);
	}

	function moveIcon(p) {
		if (p.rect != null) p.rect.y = p.y;
		if (p.parent.visibl) {
			if (p.draggable) {
				p.y += (_game.world.height-64 - p.y)/4;
			} else {
				if (!p.input.isDragged) {
					p.y += (_game.world.height-64 - p.y)/4;
					p.spriteText.y = p.y+32;
				}
			}
		} else {
			p.y += (_game.world.height - p.y)/4;
			if (!p.draggable) p.spriteText.y = p.y+32;
		}
		if (!p.draggable) {
			if (p.number == 0) {
				p.alphaTarget = 0;
				p.copy.alphaTarget = 0.25;
				p.alpha += (p.alphaTarget-p.alpha)/8;
				p.copy.alpha += (p.copy.alphaTarget-p.copy.alpha)/8;
				p.copy.rect.alphaTarget = 0;
				p.copy.rect.alpha += (p.copy.rect.alphaTarget-p.copy.rect.alpha)/8;
			}
		}
	}

	Menu.prototype.toInfra = function(){
		this.groupVisible.visibl = false;
		this.groupSupra.visibl = false;
		this.groupInfra.visibl = true;
	}

	Menu.prototype.toSupra = function(){
		this.groupVisible.visibl = false;
		this.groupSupra.visibl = true;
		this.groupInfra.visibl = false;
	}

	Menu.prototype.toVisible = function(){
		this.groupVisible.visibl = true;
		this.groupSupra.visibl = false;
		this.groupInfra.visibl = false;
	}

	return {
		init : function(game){

			_game = game;
			regY = _game.world.height-48;
			DoorsFactory.init(_game);

			_game.load.image('menuB', 'media/img/simpleMenu.png');

			_game.load.image('Reg', 'media/img/Reglette.png');
			_game.load.image('RegDot', 'media/img/RegletteDot.png');
			//filtres aditifs
			_game.load.image('red', 'media/img/filterRedMenu.png');
			_game.load.image('green', 'media/img/filterGreenMenu.png');
			_game.load.image('blue', 'media/img/filterBlueMenu.png');

			//filtres sustractifs
			_game.load.image('magenta', 'media/img/filterMagentaMenu.png');
			_game.load.image('cyan', 'media/img/filterCyanMenu.png');
			_game.load.image('yellow', 'media/img/filterYellowMenu.png');
	
			//miroirs
			_game.load.image('miroirV', 'media/img/miroirVertical.png');
			_game.load.image('miroirH', 'media/img/miroirHorizontal.png');

			//antenes
			_game.load.image('antenna_left', 'media/img/antenna_left.png');
			_game.load.image('antenna_right', 'media/img/antenna_right.png');

			//plomb
			_game.load.image('plombCarre', 'media/img/plombCarre.png');
			_game.load.image('plombHorizontal', 'media/img/plombHorizontal.png');
			_game.load.image('plombVertical', 'media/img/plombVertical.png');

			_game.load.image('whiteSquare', 'media/img/whiteSquare.png');
		},
		create : function(tab){
			return (new Menu(tab));
		}
		/*
		getGroupItem : function(){
			return _groupItem;
		}
		*/
	}
})
