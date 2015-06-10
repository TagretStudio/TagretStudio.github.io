define(["VisionEnum"],function(i){var t=function(t,e,o,n,s,a){this.defaultVision=a,Phaser.Sprite.call(this,t,o,n,e,[1]),this.spriteName=e,t.physics.arcade.enable(this),this.body.setSize(32,32),this.body.collideWorldBounds=!0,this.body.gravity.y=300,this.body.velocity.x=s,this.animSpeed=a==i.getVisionEnum().INFRA?6:a==i.getVisionEnum().VISIBLE?10:14,this.animations.add("leftPresentation",[0,1,2,3,4,5,6,7],this.animSpeed/2,!0),this.animations.add("rightPresentation",[0,1,2,3,8,9,10,11],this.animSpeed/2,!0),this.animations.add("left",[4,5,6,7],this.animSpeed,!0),this.animations.add("right",[8,9,10,11],this.animSpeed,!0),this.animations.add("left_invisible",[20,21,22,23],this.animSpeed,!0),this.animations.add("right_invisible",[24,25,26,27],this.animSpeed,!0),this.body.bounce.x=1,this.frame=0};return t.prototype=Object.create(Phaser.Sprite.prototype),t.prototype.constructor=t,t.prototype.getDefautVision=function(){return this.defaultVision},t.prototype.update=function(){null==this.color?(this.alpha-=.01,this.alpha<=0&&this.kill()):(i.getVisionCurrent()==i.MEGA?this.body.velocity.x>0?this.animations.play("rightPresentation"):this.body.velocity.x<0&&this.animations.play("leftPresentation"):i.getVisionCurrent()==this.defaultVision||i.getVisionCurrent()==i.MEGA?this.body.velocity.x>0?this.animations.play("right"):this.body.velocity.x<0&&this.animations.play("left"):this.body.velocity.x>0?this.animations.play("right_invisible"):this.body.velocity.x<0&&this.animations.play("left_invisible"),this.position.y>_game.world.height-96&&(this.body.velocity.x=0,this.body.velocity.y=-100,this.body.gravity.y=-100,this.animations.play("kill"),this.color=null))},t.prototype.collideWithDoor=function(i){return 0},t.prototype.collideWithFilter=function(i){},t.prototype.updateColor=function(i){this.loadTexture(i)},t.prototype.collide=function(i,t){i.physics.arcade.collide(this,t)},t.prototype.collideWithMiroir=function(i,t){"lumming_gamma"!=this.key&&(this.body.bounce.y=1.5,i.physics.arcade.collide(this,t),this.body.bounce.y=0)},{init:function(i){_game=i},create:function(i,e,o,n,s){return new t(_game,i,e,o,n,s)},Lumming:t}});