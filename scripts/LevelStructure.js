define(['PlatformFactory', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'DoorsFactory', 'XLummingFactory', 'MicroLummingFactory', 'IceFactory',
		'PorteWithAuraFactory'],
	   function(PlatformFactory, LummingFactory, VisibleLummingFactory, ColorEnum,
				DoorsFactory, XLummingFactory, MicroLummingFactory, IceFactory,
				 PorteWithAuraFactory) {

	var _game = null;

	var LevelStructure = function(indexLevel) {
		this.indexLevel = indexLevel;

		this.groupPlatforms = _game.add.group();
		this.groupLummings = _game.add.group();
		this.groupDoors = _game.add.group();
		this.groupElements = _game.add.group();
		this.groupDoorsRadioAura = _game.add.group();

		this.groupPlatforms.enableBody = true;
		this.groupDoors.enableBody = true;
		this.groupDoorsRadioAura.enableBody = true;

		this.nbLummingsWin = 1;
		this.tabAvailableObjects = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

		switch (indexLevel) {
			case 1:
				doorRadio1 = PorteWithAuraFactory.create(380,236, 200);
				this.groupDoorsRadioAura.add(doorRadio1);

				platform1 = PlatformFactory.create(100, 300, false);
				//platform2 = PlatformFactory.create(300, 300, false);
				this.groupPlatforms.add(platform1);
				//this.groupPlatforms.add(platform2);

				platform(this.groupPlatforms, 200, 236, 600, false);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
				door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
				this.groupDoors.add(door1);
				this.groupDoors.add(door2);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				this.nbLummingsWin = 2;

				//X
				lumX = XLummingFactory.create(380, 200, 70);

				this.groupLummings.add(lumX);
				lumM = MicroLummingFactory.create(150, 100, 50);
				this.groupLummings.add(lumM);

				//this.groupElements.add(IceFactory.create(460, 290));
				icePit(this, platform1.right + 32, 300, 64);

				this.tabAvailableObjects = [1,2,3,4,5,6,7,8,9,10,11,12,13];

				_game.add.text(0, 32, "car il ne sert de rien de dire qu'il est certain que l'on hasarde, et qu'il est incertain si l'on gagnera, et que l'infinie distance qui est entre la certitude de ce qu'on s'expose et l'incertitude de ce qu'on gagnera égale le bien fini, qu'on expose à l'infini, qui est incertain.", {wordWrap: true, wordWrapWidth: _game.world.width});

				break;

			case 2: // level 0
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
				door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
				this.groupDoors.add(door1);
				this.groupDoors.add(door2);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				this.nbLummingsWin = 2;

				this.tabAvailableObjects = [1,2,3,4,5,6,7,8,9,10,11,12,13];

				_game.add.text(0, 32, "Le but du jeu est de faire passer les lummings de couleur par les portes de même couleur", {wordWrap: true, wordWrapWidth: _game.world.width});

				break;

			case 3: //level 1
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 500, 270);

				this.groupDoors.add(door1);
				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 150, 200, 50);
				this.groupLummings.add(lum1);

				this.nbLummingsWin = 1;

				//un filtre soustractif magenta
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,1,0,0];

				_game.add.text(0, 32, "Utilisez les filtres à votre disposition pour changer la couleur des lummings. Les filtres soustractifs suppriment toute composante de couleur qui n'est pas celle indiquée sur le filtre.", {wordWrap: true, wordWrapWidth: _game.world.width});

				break;

			case 4: //level 2
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 500, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 150, 200, 50);
				this.groupLummings.add(lum1);

				this.nbLummingsWin = 1;
				//on donne les 3 filtres soustractifs
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,1,1,1];

				break;

			case 5: //level 3
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 500, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				this.nbLummingsWin = 1;
				//on donne un filtre cyan
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,0,1,0];

				break;

			case 6: //level 4
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				this.nbLummingsWin = 2;
				//on donne un filtre vert et un jaune
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,1,0,0,0,1];

				break;

			case 7: //level 5
				platform(this.groupPlatforms, 100, 300, 600);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 500, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().MAGENTA, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				this.nbLummingsWin = 2;
				//on donne un filtre bleu
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,1,0,0,0];

				break;

			case 8:
				platform(this.groupPlatforms, 100, 300, 600);
				platform(this.groupPlatforms, 0, 280, 110, true, true);
				
				doorRadio1 = PorteWithAuraFactory.create(300, 240, 200);
				this.groupDoorsRadioAura.add(doorRadio1);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 150, 200, 50);
				this.groupLummings.add(lum1);

				this.nbLummingsWin = 1;
				//on donne un filtre jaune et une antenne
				this.tabAvailableObjects = [0,0,0,0,0,1,0,0,0,0,0,0,1];
				
				break;
			
			case 9:
				
				break;
			
			case 10:
				
				break;
				
			default:
				break;
		}

		this.groupPlatforms.forEach(
			function(p) {
				p.body.immovable = true;
				if (p.collisionsSet == null) {
					p.body.immovable = true;
					p.body.checkCollision.down = false;
					p.body.checkCollision.left = false;
					p.body.checkCollision.right = false;
					p.body.checkCollision.up = true;
				}
			}
		);
	}

	icePit = function(ls, x, y, w) { //ls is LevelStructure
		var ice;
		ls.groupElements.add(ice = IceFactory.create(x, y));
		ice.width = w;
		pit(ls, x, y, w);
	}

	waterPit = function(x, y) {
		var water;
		ls.groupElements.add(water = WaterFactory.create(x, y));
		water.width = w;
		pit(ls, x, y, w);
	}

	pit = function(ls, x, y, w) {
		var ice;
		ls.groupElements.add(ice = IceFactory.create(x, y));
		ice.width = w;

		var p;

		p = _game.add.sprite(ice.left, ice.y, 'platforms',3);
		p.anchor.set(1,0);
		ls.groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = true;
		p.body.checkCollision.up = true;
		p.collisionsSet = true;

		p = _game.add.sprite(ice.right, ice.y, 'platforms',5);
		p.anchor.set(0,0);
		ls.groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = true;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = true;
		p.collisionsSet = true;

		p = _game.add.sprite(ice.left, ice.y + ice.height, 'platforms',12);
		p.anchor.set(1,0);
		ls.groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = true;
		p.body.checkCollision.up = true;
		p.collisionsSet = true;

		p = _game.add.sprite(x, ice.y + ice.height * 3/2, 'platforms',12); //sprite invisible servant aux collisions
		p.height /=2;
		p.anchor.set(0,0);
		ls.groupPlatforms.add(p);
		p.width = w;

		p = _game.add.sprite(ice.right, ice.y + ice.height, 'platforms',10);
		p.anchor.set(0,0);
		ls.groupPlatforms.add(p);

		p = _game.add.sprite(x, ice.y + ice.height, 'platforms',14);
		p.anchor.set(0,0);
		ls.groupPlatforms.add(p);
		p.width = w;
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;

		ice.kill();
	}

	platform = function(groupPlatforms, x, y, w, l, r) {
		if (l==null) l=false;
		if (r==null) r=false;
		var dummy = _game.add.sprite(0,0,'platforms',1);
		var sw = dummy.width;
		dummy.kill();
		var p;
		for (var i=0; i< Math.floor(Math.floor(w/sw)/2)+1; i++) {
			p = _game.add.sprite(x + w/2 - i*sw, y,'platforms',6);
			groupPlatforms.add(p);
			p.anchor.set(0,0);
			p = _game.add.sprite(x + w/2 + i*sw, y,'platforms',6);
			groupPlatforms.add(p);
			p.anchor.set(1,0);
		}
		p = _game.add.sprite(x,y,'platforms',4);
		if (!l) p.frame+=2;
		groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = l;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;
		p = _game.add.sprite(x+w,y,'platforms',2);
		if (!r) p.frame+=4;
		groupPlatforms.add(p);
		p.anchor.set(1,0);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = r;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;
	}

	LevelStructure.prototype.getPlatforms = function() {
		return this.groupPlatforms;
	}

	LevelStructure.prototype.getElements = function() {
		return this.groupElements;
	}

	LevelStructure.prototype.getLummings = function() {
		return this.groupLummings;
	}

	LevelStructure.prototype.getDoors = function() {
		return this.groupDoors;
	}

	LevelStructure.prototype.getNbLummingsWin = function() {
		return this.nbLummingsWin;
	}

	LevelStructure.prototype.getTabAvailableObjects = function() {
		return this.tabAvailableObjects;
	}

	LevelStructure.prototype.getPorteRadioAura = function(){
		return this.groupDoorsRadioAura;
	}

	return {
		init: function(game) {
			_game = game;
			_game.load.spritesheet('platforms', 'media/img/tiles3.png',32,32);
		},

		create: function(indexLevel) {
			return (new LevelStructure(indexLevel));
		}
	}
})
