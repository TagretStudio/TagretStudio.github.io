define(['PlatformFactory', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'DoorsFactory', 'XLummingFactory', 'MicroLummingFactory', 'IceFactory',
		'PorteWithAuraFactory', 'WaterFactory', 'GammaLummingFactory'],
		function(PlatformFactory, LummingFactory, VisibleLummingFactory, ColorEnum,
				DoorsFactory, XLummingFactory, MicroLummingFactory, IceFactory,
				PorteWithAuraFactory, WaterFactory, GammaLummingFactory) {

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

		this.nbLummingsWin = 0;
		this.tabAvailableObjects = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

		switch (indexLevel ) {
			case 0:
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

				levelText("car il ne sert de rien de dire qu'il est certain que l'on hasarde, et qu'il est incertain si l'on gagnera, et que l'infinie distance qui est entre la certitude de ce qu'on s'expose et l'incertitude de ce qu'on gagnera égale le bien fini, qu'on expose à l'infini, qui est incertain.");

				break;

			case 1: // level 0
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 250, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 200, 200, 50));

				this.nbLummingsWin = 2;

				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,0,0,0];

				levelText("Le but du jeu est de faire passer les lummings de couleur par les portes de même couleur");

				break;

			case 5: //level 1
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 150, 200, 50));

				this.nbLummingsWin = 1;

				//un filtre soustractif magenta
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,1,0,0];

				levelText("Les filtres soustractifs suppriment toute composante de couleur autre que celle indiquée sur le filtre.");

				break;

			case 6: //level 2
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 150, 200, 50));

				this.nbLummingsWin = 1;
				//on donne les 3 filtres soustractifs
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,1,1,1];

				levelText("La soustraction n'est pas toujours aussi simple...");

				break;

			case 7: //level 3
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 100, 200, 50));

				this.nbLummingsWin = 1;
				//on donne un filtre cyan
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,0,0,1,0];

				levelText("Si vous supprimez toutes ses couleurs à un lumming, il meurt. Mais regardez en haut à droite, vous n'avez pas forcément à tous les sauver...");

				break;

			case 2: //level 4
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50));
				this.nbLummingsWin = 1;

				//on donne un filtre bleu
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,0,1,0,0,0];
				levelText("Utilisez les filtres à votre disposition pour changer la couleur des lummings. Les filtres additifs ajoutent la couleur du filtre au lumming");

				break;

			case 3:
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 150, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().CYAN, 110, 200, 50));

				this.nbLummingsWin = 2;
				levelText("Si un lumming a une couleur comportant celle du filtre, il ne change pas");

				//on donne un filtre vert
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,1,0,0,0,0];

			 	break;


			case 4 :
				platform(this.groupPlatforms, 100, 300, 600);
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 270));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 110, 200, 50));
				this.nbLummingsWin = 2;
				levelText("Si vous avez un doute sur le filtre à placer, n'hésitez pas à consulter l'aide");
				this.tabAvailableObjects = [0,0,0,0,0,0,0,1,1,1,0,0,0];
				break;

				//on donne les filtres additifs


			case 8: //level 5
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 100, 200, 50));

				this.nbLummingsWin = 2;
				//on donne un filtre vert et un jaune
				this.tabAvailableObjects = [0,0,0,0,0,0,0,0,1,0,0,0,1];
				levelText("Dans ce jeu, on vous demandera donc d'utiliser les filtres additifs et soustractifs habilement afin de sauver les lummings de couleur");

				break;

			case 9: //level 6
				platform(this.groupPlatforms, 100, 300, 460);
				platform(this.groupPlatforms, 0, 280, 110, true, true);
				platform(this.groupPlatforms, 550, 280, 110, true, true);

				this.groupDoorsRadioAura.add(PorteWithAuraFactory.create(300, 236, 150));

				this.groupDoors.add(door1 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 450, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 150, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 130, 200, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 110, 200, 50));

				this.nbLummingsWin = 3;
				//on donne une antenne
				this.tabAvailableObjects = [0,0,0,0,0,1,0,0,0,0,0,0,0];

				levelText("En vous servant de la reglette en bas à gauche, vous changez de niveau de vision. Essayez l'antenne radio: elle génère un lumming \"radio\" qui est capable d'ouvrir les portes antennes");

				break;

			case 10:
				platform(this.groupPlatforms, 100, 300, 600);

				this.groupDoorsRadioAura.add(PorteWithAuraFactory.create(300, 236, 150));
				this.groupDoorsRadioAura.add(PorteWithAuraFactory.create(500, 236, 150));

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 120, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().GREEN, 400, 200, 50));

				this.nbLummingsWin = 1;

				// on donne les 3 filtres additifs et une antenne de chaque sens
				this.tabAvailableObjects = [0,0,0,0,0,1,1,1,1,1,0,0,0];

				break;

			case 11:
				platform(this.groupPlatforms, 80, 150, 100);
				platform(this.groupPlatforms, 0, 300, 300);
				waterPit(this, 300, 300, 64);
				platform(this.groupPlatforms, 330, 200, 150);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 450, 170));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 60, 250, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().MAGENTA, 90, 250, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 120, 250, 50));

				this.groupLummings.add(MicroLummingFactory.create(100, 100, 60));

				this.nbLummingsWin = 3;

				// on donne les filtres additifs
				this.tabAvailableObjects = [0,0,0,0,0,0,0,1,1,1,0,0,0];
				levelText("Les lummings \"micro-onde\" génèrent de la vapeur au dessus de l'eau. Cela peut etre utile...");

				break;

			case 12:
				platform(this.groupPlatforms, 100, 300, 400);
				platform(this.groupPlatforms, 540, 210, 100, false);
				icePit(this, 500, 300, 64);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 620, 180);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 120, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);

				lumX = XLummingFactory.create(250, 200, 70);
				this.groupLummings.add(lumX);
				lumM = MicroLummingFactory.create(200, 200, 50);
				this.groupLummings.add(lumM);

				this.nbLummingsWin = 2;

				this.tabAvailableObjects = [0,0,0,0,0,0,0,1,1,1,1,1,1];
				levelText("Les lummings \"X\" font fondre la glace, révélant de l'eau. Vous savez ce qu'il vous reste à faire...");
				break;

			case 13:
				platform(this.groupPlatforms, 100, 300, 600, true, true);
				platform(this.groupPlatforms, 50, 150, 200, true, true);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().MAGENTA, 620, 270);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 120, 100, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 140, 100, 50);
				lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 160, 100, 50);
				lum4 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 150, 250, 50);
				lum5 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 170, 250, 50);
				lum6 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 190, 250, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				this.groupLummings.add(lum3);
				this.groupLummings.add(lum4);
				this.groupLummings.add(lum5);
				this.groupLummings.add(lum6);

				lumX = XLummingFactory.create(80, 100, 60);
				this.groupLummings.add(lumX);

				this.nbLummingsWin = 4;

				// tous les filtres
				this.tabAvailableObjects = [0,0,0,0,0,0,0,1,1,1,1,1,1];
				levelText("Mais les lummings \"X\" sont nocifs pour les autres lummings. Protégez les !");

				break;

			case 14:
				platform(this.groupPlatforms, 300, 100, 250, true, true);
				platform(this.groupPlatforms, 100, 200, 170, true, true);
				platform(this.groupPlatforms, 350, 200, 260, true, true);
				platform(this.groupPlatforms, 100, 300, 150, true, false);
				icePit(this, 250, 300, 64);
				platform(this.groupPlatforms, 314, 300, 400, false, true);
				platform(this.groupPlatforms, 700, 270, 64, true, true);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 130, 170);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().GREEN, 450, 150, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().GREEN, 470, 150, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				lumM = MicroLummingFactory.create(450, 250, 60);
				this.groupLummings.add(lumM);
				lumX = XLummingFactory.create(350, 50, 60);
				this.groupLummings.add(lumX);

				this.nbLummingsWin = 2;
				levelText("Les miroirs change la direction de (presque) tous les Lummings..");

				// tous les filtres et un miroir
				this.tabAvailableObjects = [0,0,0,0,1,0,0,1,1,1,1,1,1];

				break;

			case 15:
				platform(this.groupPlatforms, 100, 200, 250, true, true);
				platform(this.groupPlatforms, 450, 200, 300, true, true);

				door1 = DoorsFactory.create(ColorEnum.getColorEnum().CYAN, 150, 170);
				this.groupDoors.add(door1);

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 460, 150, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 485, 150, 50);
				lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 510, 150, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				this.groupLummings.add(lum3);

				this.nbLummingsWin = 3;

				// tous les filtres et des miroirs
				this.tabAvailableObjects = [0,0,0,1,1,0,0,1,1,1,1,1,1];
				levelText("Les miroirs reflètent très bien la lumière, pratique pour traverser du vide");

				break;

			case 16:
				// a changer en plomb
				platformPlomb(this.groupPlatforms, 690, 170, 60, true, true);
				platformPlomb(this.groupPlatforms, 200, 200, 500, true, true);
				platformPlomb(this.groupPlatforms, 100, 300, 600, true, true);
				platformPlomb(this.groupPlatforms, 50, 270, 60, true, true);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 590, 170));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().GREEN, 620, 170));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 650, 170));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 650, 270));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 220, 150, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().GREEN, 240, 150, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 260, 150, 50));

				this.groupLummings.add(GammaLummingFactory.create(300, 150, 60));

				this.nbLummingsWin = 3;

				// tous les filtres et des platformes en plomb
				this.tabAvailableObjects = [0,0,0,0,1,0,0,1,1,1,1,1,1];
				levelText("Les rayons gamma passent à travers tout sauf le plomb. Faites attention, ils détruisent les portails de sortie");

				break;

			case 31:
				var p;
				p = _game.add.sprite(0, 32, 'plomb');
				this.groupPlatforms.add(p);
				p.body.checkCollision.down = true;
				p.collisionsSet = true;
				p.width = _game.world.width;

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 220, 150, 50));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 650, 170));
				this.nbLummingsWin = 1;

				this.tabAvailableObjects = [9,9,9,9,9,9,9,9,9,9,9,9,9];
				break;

			case 17: //niveau gamma

				platformPlomb(this.groupPlatforms, 300, 100, 500, true, true);
				platformPlomb(this.groupPlatforms, 150, 300, 450, true, true);

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 70));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270));

				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 330, 60, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 350, 60, 50);
				lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 370, 60, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				this.groupLummings.add(lum3);

				gamma = GammaLummingFactory.create(330, 50, 60);
				this.groupLummings.add(gamma);

				this.nbLummingsWin = 3;

				this.tabAvailableObjects = [1,0,0,0,1,0,0,1,1,1,1,1,1];

				break;

			case 18:

				platform(this.groupPlatforms, 200, 120, 100, true, true);
				platform(this.groupPlatforms, 300, 150, 100, true, true);

				platform(this.groupPlatforms, 200, 270, 100, true, true);
				platform(this.groupPlatforms, 300, 300, 100, true, true);

				platform(this.groupPlatforms, 0, 400, 600, true, false);
				platform(this.groupPlatforms, 700, 400, 100, false, true);
				icePit(this, 600, 400, 100);
				platform(this.groupPlatforms, 600, 300, 200, false, true);

				this.groupDoorsRadioAura.add(PorteWithAuraFactory.create(400, 85, 150));
				this.groupDoorsRadioAura.add(PorteWithAuraFactory.create(400, 235, 150));

				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().GREEN, 700, 365));
				this.groupDoors.add(DoorsFactory.create(ColorEnum.getColorEnum().RED, 700, 265));

				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().GREEN, 250, 80, 50));
				this.groupLummings.add(VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 200, 230, 50));
				this.groupLummings.add(XLummingFactory.create(0, 350, 50));
				this.groupLummings.add(MicroLummingFactory.create(50, 350, 50));

				this.tabAvailableObjects = [0,0,0,0,0,2,0,0,0,0,0,0,0];
				this.nbLummingsWin = 2;

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
				var c = _game.add.sprite(p.x, p.y, p.key, p.frame+16);
				c.width = p.width;
				c.height = p.height;
				c.alpha = 0;
				c.anchor = p.anchor;
				p.colorClone = c;
			}
		);
	}

	function levelText(text, x, y) {
		if (x == null) x=0;
		if (y == null) y=32;
		_game.add.text(x, y, text, {wordWrap: true, wordWrapWidth: _game.world.width, fill: '#ffffff', stroke: '#000000', strokeThickness: 2});
	}

	icePit = function(ls, x, y, w) { //ls is LevelStructure
		var ice;
		ls.groupElements.add(ice = IceFactory.create(x, y));
		ice.width = w;
		pit(ls, x, y, w);
	}

	waterPit = function(ls, x, y, w) {
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
		p.isPb = false;
		p.anchor.set(1,0);
		ls.groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = true;
		p.body.checkCollision.up = true;
		p.collisionsSet = true;

		p = _game.add.sprite(ice.right, ice.y, 'platforms',5);
		p.isPb = false;
		p.anchor.set(0,0);
		ls.groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = true;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = true;
		p.collisionsSet = true;

		p = _game.add.sprite(ice.left, ice.y + ice.height, 'platforms',12);
		p.isPb = false;
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
		p.isPb = false;
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

	platformPlomb = function(groupPlatforms, x, y, w, l, r) {
		if (l==null) l=true;
		if (r==null) r=true;

		var dummy = _game.add.sprite(0,0,'plomb');
		var sw = dummy.width;
		dummy.kill();
		var p;

		for (var i=0; i< Math.floor(Math.floor(w/sw)/2)+1; i++) {
			p = _game.add.sprite(x + w/2 - i*sw, y,'plomb');
			p.isPb = true;
			groupPlatforms.add(p);
			p.anchor.set(0,0);
			p = _game.add.sprite(x + w/2 + i*sw, y,'plomb');
			p.isPb = true;
			groupPlatforms.add(p);
			p.anchor.set(1,0);
		}
		p = _game.add.sprite(x,y,'plomb');
		p.isPb = true;
		if (!l) p.frame+=2;
		groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = l;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;
		p = _game.add.sprite(x+w,y,'plomb');
		p.isPb = true;
		if (!r) p.frame+=4;
		groupPlatforms.add(p);
		p.anchor.set(1,0);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = false;
		p.body.checkCollision.right = r;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;

		/*
		p = _game.add.sprite(x,y,'plomb');
		p.isPb = true;
		groupPlatforms.add(p);
		p.width = w;
		*/
	}

	platform = function(groupPlatforms, x, y, w, l, r) {
		if (l==null) l=false;
		if (r==null) r=false;
		var dummy = _game.add.sprite(0,0,'platforms',1);
		var sw = dummy.width;
		dummy.kill();
		var p;

		/*
		p = _game.add.sprite(x, y,'platforms',6);
		p.isPb = false;
		p.width = w;
		groupPlatforms.add(p);
		p.anchor.set(0,0);
		*/
		for (var i=0; i< Math.floor(Math.floor(w/sw)/2)+1; i++) {
			p = _game.add.sprite(x + w/2 - i*sw, y,'platforms',6);
			p.isPb = false;
			groupPlatforms.add(p);
			p.anchor.set(0,0);
			p = _game.add.sprite(x + w/2 + i*sw, y,'platforms',6);
			p.isPb = false;
			groupPlatforms.add(p);
			p.anchor.set(1,0);
		}
		p = _game.add.sprite(x,y,'platforms',4);
		p.isPb = false;
		if (!l) p.frame+=2;
		groupPlatforms.add(p);
		p.body.checkCollision.down = false;
		p.body.checkCollision.left = l;
		p.body.checkCollision.right = false;
		p.body.checkCollision.up = false;
		p.collisionsSet = true;
		p = _game.add.sprite(x+w,y,'platforms',2);
		p.isPb = false;
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
			_game.load.image('plomb', 'media/img/plombVertical.png');
		},

		create: function(indexLevel) {
			return (new LevelStructure(indexLevel));
		}
	}
})
