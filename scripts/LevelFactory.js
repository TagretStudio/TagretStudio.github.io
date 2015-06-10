define(["Images","LummingFactory","VisibleLummingFactory","ColorEnum","MusicFactory","PlatformFactory","DoorsFactory","MenuFactoryTest","VisionEnum","Transition","FilterFactory","RadioLummingFactory","MicroLummingFactory","ItemsLevel","MiroirFactory","LevelStructure","XLummingFactory","IceFactory","WaterFactory","SteamFactory","PorteWithAuraFactory","GammaLummingFactory"],function(e,t,n,a,i,o,l,r,s,u,c,d,g,p,m,h,f,y,v,b,F,C){function E(e,t){t.interact(e)}function M(e,t){if(10==e.color&&0!=e.body.velocity.x&&(2==t.defaultVision||1==t.defaultVision)){var n=e.body.velocity.x;e.body.velocity.x<0,t.body.velocity.x=0,t.body.velocity.y=-100,t.body.gravity.y=-100,t.animations.play("kill"),t.color=null,e.body.velocity.x=0,D.time.events.add(.75*Phaser.Timer.SECOND,function(){t.kill(),e.body.velocity.x=n},this)}}function L(e,t){var n=(e.left+e.right)/2,a=t.left,i=t.right;if(n>a&&i>n){var o=e.collideWithDoor(t);1==o&&(I+=1,this.time.events.add(1e3,function(){text.setText(I+"/"+T)},this))}}function S(e,t){9==e.color?t.isPb&&D.physics.arcade.collide(e,t,S,null,D):D.physics.arcade.collide(e,t,S,null,D)}function w(){D.add.sprite(0,0,"transitionBackground"),D.add.sprite(D.world.centerX-216,D.world.centerY-35,"logo");null==N||N.getMusic().paused?null!=N&&N.getMusic().paused&&(N=null,X=s.getVisionEnum().VISIBLE,D.time.events.add(700,function(){D.state.start("LevelFactory")},this)):(N.getMusic().fadeOut(700),N.getMusic().onFadeComplete.dispatch(),N.getMusic().onFadeComplete.addOnce(function(){N=null,X=s.getVisionEnum().VISIBLE,D.state.start("LevelFactory")},D))}function P(){D.add.sprite(0,0,"transitionBackground"),D.add.sprite(D.world.centerX-216,D.world.centerY-35,"logo");_=1,null==N||N.getMusic().paused?null!=N&&N.getMusic().paused&&(N=null,D.time.events.add(700,function(){D.state.start("MainMenu")},this)):(N.getMusic().fadeOut(700),N.getMusic().onFadeComplete.dispatch(),N.getMusic().onFadeComplete.addOnce(function(){N=null,D.state.start("MainMenu")},D))}function V(){Y=!0,D.paused=!0,j=D.add.sprite(0,0,"aideScreen"),j.scale.set(D.world.width/786,D.world.height/588)}function x(){D.scale.isFullScreen?(D.scale.stopFullScreen(),buttonPleinEcran.setFrames(1,1,1)):(D.scale.startFullScreen(!1),buttonPleinEcran.setFrames(0,0,0))}var D=null,_=null,T=0,I=0,O=null,k=null,B=null,A=null,R=null,N=null,W=null,X=null,q=null,G=null,Y=!1,z=!0,j=null,H=!1,J=!1,K={preload:function(){N=z?i.create("level1","media/audio/Level 1.ogg"):i.create("level2","media/audio/level.ogg"),D.load.image("buttonDiamond","media/img/menuButton.png"),D.load.image("buttonRefresh","media/img/refresh.png"),D.load.image("cliquez","media/img/cliquerPourCommencer.png"),D.load.image("aide","media/img/aideColore.png"),D.load.image("aideScreen","media/img/ecranAide.png"),D.load.spritesheet("pleinecran","media/img/pleinEcran.png",480,62,6),D.load.spritesheet("pleinecranCadre","media/img/pleinEcranCadre.png",480,75,2),r.init(D),o.init(D),n.init(D),h.init(D),f.init(D),g.init(D),y.init(D),v.init(D),b.init(D),F.init(D),C.init(D)},create:function(){if(button_start=D.add.button(0,0,"",P,D),H=!1,J=!1,_alreadyChangeLevel=!1,I=0,e.boot().create(),D.physics.startSystem(Phaser.Physics.ARCADE),X=s.getVisionEnum().VISIBLE,s.setVisionCurrent(X),G=D.add.sprite(0,0,"preloaderBackground"),G.tint=0,G.alpha=.5,this.levelStruct=h.create(_),O=this.levelStruct.getPlatforms(),_groupDoors=this.levelStruct.getDoors(),k=this.levelStruct.getLummings(),B=this.levelStruct.getElements(),A=this.levelStruct.getPorteRadioAura(),R=D.add.group(),R.enableBody=!0,A.forEach(function(e){R.add(e.getDoor())}),T=this.levelStruct.getNbLummingsWin(),q=this.levelStruct.getTabAvailableObjects(),0==T)_=1,D.state.start("MainMenu");else{N.play(),text=D.add.text(D.world.width-50,0,I+"/"+T,{align:"center",fill:"#ffffff",stroke:"#000000",strokeThickness:2}),text.anchor.set(1,0),W=r.create(q),button_start=D.add.button(0,0,"",function(){0==H&&(H=!0,t.destroy()),button_start.kill()},D),button_start.scale.setTo(800,600),button_menu=D.add.button(10,0,"buttonDiamond",P,D),button_restart=D.add.button(D.world.width-150,0,"buttonRefresh",w,D),buttonPleinEcran=D.add.button(158,0,"pleinecranCadre",x,D,0,0,0),buttonPleinEcran.scale.set(64/150,64/150),D.scale.isFullScreen?buttonPleinEcran.setFrames(0,0,0):buttonPleinEcran.setFrames(1,1,1),button_help=D.add.button(90,0,"aide",function(){V()},D),button_help.scale.set(64/148,32/74),button_menu.scale.set(64/148,32/74),p.reinit(D),p.setgroup(k);var t=this.add.sprite(D.world.width/2,2*D.world.height/3,"cliquez");t.anchor.set(.5,.5),t.scale.set(.7,.7),D.input.onDown.add(function(){D.paused&&(D.paused=!1)},D,1),s.setVisionCurrent(s.MEGA)}},update:function(){0==J?(null!=N&&N.getMusic().pause(),D.physics.arcade.isPaused=!0,1==Y&&(Y=!1,j.kill()),1==H&&(J=!0,N.getMusic().resume(),D.physics.arcade.isPaused=!1,s.setVisionCurrent(X),s.setVisionCurrent(s.VISIBLE))):(s.setVisionCurrent(X),W.update(),X=s.getVisionCurrent(),D.physics.arcade.overlap(k,O,S,null,D),D.physics.arcade.overlap(k,_groupDoors,L,null,D),D.physics.arcade.overlap(k,p.getGroupItem(),p.collideItem,null,D),D.physics.arcade.overlap(k,B,E,null,D),D.physics.arcade.overlap(k,k,M,null,D),D.physics.arcade.overlap(k,A,function(e,t){t.setOverlap(e,D.time.now+100)}),D.physics.arcade.collide(k,R),k.forEach(function(e){e.update(X)}),_groupDoors.forEach(function(e){e.update()}),G.alphaTarget=.5-.5*I/T,G.alpha+=(G.alphaTarget-G.alpha)/8,O.forEach(function(e){e.colorClone.alphaTarget=I/T,e.colorClone.alpha+=(e.colorClone.alphaTarget-e.colorClone.alpha)/8}),1==Y&&(Y=!1,j.kill(),D.input.onDown.add(function(){D.paused=!1},D)),T==I?(_alreadyChangeLevel||D.time.events.add(1.8*Phaser.Timer.SECOND,function(){0==T?u.nextState("MainMenu",N):(_++,z=!z,u.nextState("LevelFactory",N,_))}),_alreadyChangeLevel=!0):0==k.countLiving()&&(D.add.sprite(D.world.centerX-170,D.world.centerY-25,"gameOver"),N.getMusic().fadeOut(1500),N.getMusic().onFadeComplete.addOnce(function(){D.time.events.add(1.8*Phaser.Timer.SECOND,function(){D.state.start("LevelFactory")},D)},D)),text.setText(I+"/"+T))}};return{init:function(e){D=e,_=1},getLevel:function(){return K},setLevel:function(e){_=e},getCurrentLevel:function(e){return _}}});