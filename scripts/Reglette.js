define([], function() {

	var _game = null;
	var reglette;
	var regdist = 64;
	var regX = 64; // coordonnee X du MILIEU de la reglette
	var regY;
	var RM1; //menu reglette 1
	var RM2;
	var RM3;
	var regBounds;
	var state;

	var Reglette = function() {
		regY = _game.world.height-64-16;
		//Phaser.Sprite.call(this, _game, regX, regY, 'Reg');
		reglette = _game.add.sprite(regX, regY, 'Reg');
		reglette.inputEnabled = true;
		reglette.input.enableDrag();
		reglette.input.allowVerticalDrag = false;
		reglette.held = false;
		regY = _game.world.height-100;
		RM1 = _game.add.group();
		{
			RM1.create(200, _game.world.height, 'Reg');
		} RM1.forEach(Reglette.prototype.hiddenPos);
		RM2 = _game.add.group();
		{
			RM2.create(250, _game.world.height, 'Reg');
		} RM2.forEach(Reglette.prototype.hiddenPos);
		RM3 = _game.add.group();
		{
			RM3.create(300, _game.world.height, 'Reg');
		} RM3.forEach(Reglette.prototype.hiddenPos);
	}

	Reglette.prototype = Object.create(Phaser.Sprite.prototype);
	Reglette.prototype.constructor = Reglette;

	Reglette.prototype.update = function() {
		var rX = reglette.x;
		var oldstate = state;
		if (!reglette.input.isDragged) {
			if (rX < regX-regdist/3) {
				state = 0;
				RM1.forEach(Reglette.prototype.deployedPos);
				RM2.forEach(Reglette.prototype.hiddenPos);
				RM3.forEach(Reglette.prototype.hiddenPos);
				rX += ((regX-regdist*2/3)-rX)/4;
			} else if (rX > regX+regdist/3) {
				state = 2;
				RM1.forEach(Reglette.prototype.hiddenPos);
				RM2.forEach(Reglette.prototype.hiddenPos);
				RM3.forEach(Reglette.prototype.deployedPos);
				rX += ((regX+regdist*2/3)-rX)/4;
			} else {
				state = 1;
				RM1.forEach(Reglette.prototype.hiddenPos);
				RM2.forEach(Reglette.prototype.deployedPos);
				RM3.forEach(Reglette.prototype.hiddenPos);
				rX += (regX-rX)/4;
			}
		}
		reglette.x = rX;

		if (oldstate != state) {
			if (state == 0) {
				//code passTo le truc à gauche
			} else if (state == 1) {
				//code passTo le truc à le milieu
			} else {
				//code passTo le truc à droite
			}
		}
	
		RM1.forEach(Reglette.prototype.moveIfNeeded);
		RM2.forEach(Reglette.prototype.moveIfNeeded);
		RM3.forEach(Reglette.prototype.moveIfNeeded);
	};

	Reglette.prototype.hiddenPos = function(b) {
		b.wishedPos = _game.world.height;
	}

	Reglette.prototype.deployedPos = function(b) {
		b.wishedPos = _game.world.height-64-16;
	}

	Reglette.prototype.moveIfNeeded = function(b) {
		b.y += (b.wishedPos-b.y)/4;
	}

	return {
		init: function(game) {
			_game = game;
			_game.load.image('Reg', 'media/img/Reglette.png');
		},
	
		create: function() {
			return (new Reglette());
		}
	}
})
