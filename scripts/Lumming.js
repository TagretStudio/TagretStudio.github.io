BasicGame.Lumming = function(name) {
	this.sprite = null;
	this.direction = null;
};

BasicGame.Lumming.prototype = {
	
	preload: function(sprite) {
		this.load.spritesheet('lumming', sprite, 32, 32);
	},
	
	create: function(x, y) {
		lum = this.add.sprite(x, y, 'lumming');
		this.physics.arcade.enable(lum);
		lum.body.collideWorldBounds = true;
		lum.body.gravity.y = 500;
	},
	
	update: function() {
		lum.animations.play(direction);
		if (direction == 'right') {
			lum.body.velocity.x = 100;
		} else {
			lum.body.velocity.x = -100;	
		}
	}
}

BasicGame.VisibleLumming = function(color) {
	this.color = color;
	Lumming.call(this);
};
BasicGame.VisibleLumming.prototype = Object.create(Lumming.prototype);
BasicGame.VisibleLumming.constructor = VisibleLumming;
BasicGame.VisibleLumming.prototype.preload = function() {
	Lumming.preload('media/img/lumming_' + color.name + '.png');
};




function LowFreqLumming() {
};
LowFreqLumming.prototype = new Lumming;

function RadioLumming() {
};
RadioLumming.prototype = new LowFreqLumming;

function MicroLumming() {
};
MicroLumming.prototype = new LowFreqLumming;

function HighFreqLumming() {
};
HighFreqLumming.prototype = new Lumming;

function XRayLumming() {
};
XRayLumming.prototype = new HighFreqLumming;

function GammaLumming() {
};
GammaLumming.prototype = new HighFreqLumming;
