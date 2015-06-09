define(["Images","LummingFactory","VisibleLummingFactory","ColorEnum","MusicFactory","PlatformFactory","DoorsFactory","MenuFactoryTest","VisionEnum","Transition","FilterFactory","RadioLummingFactory","ItemsLevel","MiroirFactory"],function(t,e,o,a,r,n,i,u,d,l,c,s,m,p){function g(t,e){if(2==t.getDefautVision()){var o=t.collideWithDoor(e);1==o&&(b+=1,text.setText(b+"/"+h))}}function f(){D.add.sprite(0,0,"transitionBackground"),D.add.sprite(184,265,"logo");D.state.start("Level2Demo")}function y(){D.add.sprite(0,0,"transitionBackground"),D.add.sprite(184,265,"logo");D.state.start("MainMenu")}var D,h=0,b=0,v=null,E=null,F=null,L=null,_=null,I=null,B={preload:function(){L=r.create("level1","media/audio/Level 1.ogg"),D.load.image("buttonDiamond","media/img/menuButton.png"),D.load.image("buttonRefresh","media/img/refresh.png"),D.load.image("cliquez","media/img/cliquezPourCommencer.png"),u.init(D),n.init(D),o.init(D)},create:function(){b=0,L.play(),t.boot().create(),D.physics.startSystem(Phaser.Physics.ARCADE),I=d.getVisionEnum().VISIBLE,E=D.add.group(),E.enableBody=!0,platform1=n.create(100,300,!1),platform2=n.create(50,500,!1),platform3=n.create(300,500,!1),platform4=n.create(600,500,!1),E.add(platform1),E.add(platform2),E.add(platform3),E.add(platform4),_groupDoors=D.add.group(),_groupDoors.enableBody=!0,door1=i.create(a.getColorEnum().MAGENTA,50,470),_groupDoors.add(door1),_groupDoors.add(door2),F=D.add.group(),lum1=o.create(a.getColorEnum().WHITE,150,200,150),F.add(lum1),h=1,text=D.add.text(750,0,b+"/"+h,{align:"center"}),button_menu=D.add.button(32,0,"buttonDiamond",y,D),button_restart=D.add.button(650,0,"buttonRefresh",f,D),_=u.create(),m.reinit(D);var e=this.add.sprite(100,300,"cliquez");e.scale.set(.7,.7),D.input.onDown.add(function(){D.paused&&(D.paused=!1,e.destroy())},D),D.paused=!0,m.setgroup(F)},update:function(){_.update(),D.physics.arcade.collide(F,E),D.physics.arcade.overlap(F,_groupDoors,g,null,D),D.physics.arcade.overlap(F,m.getGroupItem(),m.collideItem,null,D),F.forEach(function(t){t.update(I)}),_groupDoors.forEach(function(t){t.update()}),h==b&&l.nextState("Level3Demo",L)}};return{init:function(t,e){D=t,v=e},getLevel2Demo:function(){return B}}});