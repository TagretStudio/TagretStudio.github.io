define(function(){var t=null,e=function(t,e,i,r){this.isPb=r,this.spriteName=r?"platformPb":"platform",Phaser.Sprite.call(this,t,e,i,this.spriteName),t.physics.arcade.enable(this),this.body.immovable=!0};return e.prototype=Object.create(Phaser.Sprite.prototype),e.prototype.constructor=e,{init:function(e){t=e,t.load.image("platform","media/img/platform.png"),t.load.image("platformPb","media/img/platformPb.png")},create:function(i,r,a){return new e(t,i,r,a)}}});