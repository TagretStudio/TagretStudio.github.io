function collision(i,t){var o=t.frame;i.collision&&(Math.floor(o/2)%2!=0&&i.body.velocity.x>0&&(i.body.velocity.x*=-1),Math.floor(o/4)%2!=0&&i.body.velocity.x<0&&(i.body.velocity.x*=-1)),Math.floor(o/8)%2!=0&&i.body.velocity.y>0&&i.body.position.y<t.body.position.y&&(i.body.velocity.y=0,i.body.position.y=t.body.position.y-t.height/2)}BasicGame.Level3=function(i){this.nextState="Boot",this.platforms=null,this.lums=null,this.doors=null,this.tilemapHeight=5,this.tilemapWidth=7,this.tilemapMap=[0,0,0,0,1,0,0,12,0,0,8,1,0,0,1,8,8,8,1,0,10,12,1,1,8,8,8,1,1,8,8,8,8,8,8]},BasicGame.Level3.prototype={preload:function(){this.load.image("sky","media/img/sky.png"),this.load.image("platform","media/img/platform.png"),this.load.spritesheet("door","media/img/door_red.png",32,32),this.load.spritesheet("lumming","media/img/gamma.png",32,32),this.load.spritesheet("tiles","media/img/tiles4.png",32,32),null!=music&&1==music.isPlaying&&music.fadeOut(700),music=this.add.audio("game_over_music"),music.loop=!0,music.play()},create:function(){this.physics.startSystem(Phaser.Physics.ARCADE);var i=this.add.sprite(0,0,"sky");i.scale.set(1.28,1.28),platforms=this.add.group(),platforms.enableBody=!0;for(var t=0,o=0;o<this.tilemapHeight;o++)for(var a=0;a<this.tilemapWidth;a++){var s=this.tilemapMap[t];if(0!=s&&15>=s){s-=s%2;var e,l,m;e=this.tilemapMap[t+(Math.min(o+1,this.tilemapHeight-1)-o)*this.tilemapWidth],m=this.tilemapMap[t+(Math.min(a+1,this.tilemapWidth-1)-a)],l=this.tilemapMap[t+(Math.max(a-1,0)-a)];var d=platforms.create(64*a,64*o,"tiles");d.scale.set(2,2),d.frame=s,d.body.checkCollision.down=!1,d.body.checkCollision.left=!1,d.body.checkCollision.right=!1,d.body.checkCollision.up=!1,Math.floor(s/8)%2!=0&&(d.body.checkCollision.up=!0)}t++}platforms.forEach(function(i){i.body.immovable=!0}),doors=this.add.group(),doors.enableBody=!0;var h;h=doors.create(336,220,"door"),doors.forEach(function(i){i.animations.add("anim",[],10,!0),i.animations.play("anim")}),lums=this.add.group();var n;n=lums.create(0,0,"lumming"),this.physics.arcade.enable(n),n.body.velocity.x=100,n.collision=!1,n=lums.create(10,0,"lumming"),this.physics.arcade.enable(n),n.body.velocity.x=100,n.collision=!0,lums.forEach(function(i){i.animations.add("left",[4,5,6,7],10,!0),i.animations.add("right",[8,9,10,11],10,!0),i.body.gravity.y=1200}),this.startText=this.add.text(0,0,"cliquez pour commencer",{fontSize:"32px",fill:"#000"}),this.game.input.onDown.add(function(){this.game.paused&&(this.game.paused=!1,this.startText.text="")},this),this.game.paused=!0},update:function(){this.physics.arcade.collide(lums,doors,mayExit,null,this),this.physics.arcade.overlap(lums,platforms,collision,null,this),lums.forEach(function(i){i.body.velocity.x>0?i.animations.play("right"):i.body.velocity.x<0?i.animations.play("left"):i.animations.stop()})}};