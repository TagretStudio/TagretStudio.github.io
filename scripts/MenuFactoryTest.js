define(["VisionEnum","ColorEnum","DoorsFactory","ItemsLevel"],function(e,t,r,i){function a(e){e.parent.visibl?e.draggable?e.y+=(n.world.height-64-e.y)/4:e.input.isDragged||(e.y+=(n.world.height-64-e.y)/4,e.spriteText.y=e.y+32):(e.y+=(n.world.height-e.y)/4,e.draggable||(e.spriteText.y=e.y+32)),e.draggable||0==e.number&&(e.alphaTarget=0,e.copy.alphaTarget=.25,e.alpha+=(e.alphaTarget-e.alpha)/8,e.copy.alpha+=(e.copy.alphaTarget-e.copy.alpha)/8)}var o,n=null,l=100,d=64,g=null,p=function(e){this.vision=null,null==e&&(e=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),this.spriteTempo=null,this.barre=n.add.sprite(0,n.world.height-96,"menuB");var t=n.add.sprite(0,0,"menuB");t.anchor.set(.5,.5),t.height=96,t.width=3*d,t.x=l,t.y=g;o=n.add.group(),o.add(n.add.sprite(l-1,g,"RegDot")),o.add(n.add.sprite(l-1+2*d/3,g,"RegDot")),o.add(n.add.sprite(l-1-2*d/3,g,"RegDot")),this.reglette=n.add.sprite(l,n.world.height-48,"Reg"),this.reglette.anchor.set(.5,.5),this.reglette.inputEnabled=!0,this.reglette.input.enableDrag(),this.reglette.input.boundsSprite=t,this.reglette.input.allowVerticalDrag=!1,this.reglette.held=!1;var r=this.reglette.x;o.time=0,o.forEach(function(e){e.amplitude=1,e.anchor.set(.5,.5);var t=Math.max(0,Math.min(1,Math.abs(e.x-r)/(4*d/3)));e.tint=Math.min(255,512*t)<<16|Math.min(255,512-512*t)<<8|0}),this.groupVisible=n.add.group(),this.groupInfra=n.add.group(),this.groupSupra=n.add.group(),this.groupMiroir=n.add.group(),plombCarre=n.add.sprite(350,n.world.centerY-64,"plombCarre"),plombCarre.hitArea=new Phaser.Rectangle(0,0,32,32),plombCarre.number=e[0],this.groupInfra.add(plombCarre),plombVertical=n.add.sprite(390,n.world.centerY-64,"plombVertical"),plombVertical.hitArea=new Phaser.Rectangle(0,0,32,32),plombVertical.number=e[1],this.groupInfra.add(plombVertical),plombHorizontal=n.add.sprite(430,n.world.centerY-64,"plombHorizontal"),plombHorizontal.hitArea=new Phaser.Rectangle(0,0,32,32),this.groupInfra.add(plombHorizontal),plombHorizontal.number=e[2],miroirH=n.add.sprite(660,n.world.centerY-64,"miroirH"),miroirH.hitArea=new Phaser.Rectangle(0,0,32,32),miroirH.number=e[3],miroirV=n.add.sprite(700,n.world.centerY-64,"miroirV"),miroirV.hitArea=new Phaser.Rectangle(0,0,32,32),miroirV.number=e[4],this.groupMiroir.add(miroirH),this.groupMiroir.add(miroirV),aerialRight=n.add.sprite(310,n.world.centerY-64,"antenna_right"),aerialRight.number=e[5],aerialLeft=n.add.sprite(470,n.world.centerY-64,"antenna_left"),aerialLeft.number=e[6],this.groupSupra.add(aerialLeft),this.groupSupra.add(aerialRight),red=n.add.sprite(190,n.world.centerY-64,"red"),red.number=e[7],green=n.add.sprite(230,n.world.centerY-64,"green"),green.number=e[8],blue=n.add.sprite(270,n.world.centerY-64,"blue"),blue.number=e[9],magenta=n.add.sprite(510,n.world.centerY-64,"magenta"),magenta.number=e[10],cyan=n.add.sprite(550,n.world.centerY-64,"cyan"),cyan.number=e[11],yellow=n.add.sprite(590,n.world.centerY-64,"yellow"),yellow.number=e[12],this.groupVisible.add(red),this.groupVisible.add(blue),this.groupVisible.add(green),this.groupVisible.add(cyan),this.groupVisible.add(magenta),this.groupVisible.add(yellow),this.groupInfra.visibl=!1,this.groupInfra.addAll("draggable",!1);this.groupInfra.forEach(function(e){if(!e.draggable){e.y=n.world.height-64,e.spriteText=n.add.text(e.x+e.width/2,e.y+32,""+e.number,{fill:"#ffffff",align:"center"}),e.spriteText.anchor.set(.5,0);var t=n.add.sprite(e.x,e.y,e.key);e.parent.add(t),t.draggable=!0,e.inputEnabled=!0,e.input.enableDrag(),e.events.onDragStart.add(p.prototype.dragStart,this,e),e.events.onDragStop.add(p.prototype.dragStop,this,e),e.origX=e.x,e.origY=e.y,e.copy=t,0==e.number&&(e.alpha=.25,t.alpha=0)}}),this.groupSupra.visibl=!1,this.groupSupra.addAll("draggable",!1),this.groupSupra.forEach(function(e){if(!e.draggable){e.y=n.world.height-64,e.spriteText=n.add.text(e.x+e.width/2,e.y+32,""+e.number,{fill:"#ffffff",align:"center"}),e.spriteText.anchor.set(.5,0);var t=n.add.sprite(e.x,e.y,e.key);e.parent.add(t),t.draggable=!0,e.inputEnabled=!0,e.input.enableDrag(),e.events.onDragStart.add(p.prototype.dragStart,this,e),e.events.onDragStop.add(p.prototype.dragStop,this,e),e.origX=e.x,e.origY=e.y,e.copy=t,e.copy=t,0==e.number&&(e.alpha=.25,t.alpha=0)}}),this.groupMiroir.visibl=!0,this.groupMiroir.addAll("draggable",!1),this.groupMiroir.forEach(function(e){if(e.y=n.world.height-64,!e.draggable){e.spriteText=n.add.text(e.x+e.width/2,e.y+32,""+e.number,{fill:"#ffffff",align:"center"}),e.spriteText.anchor.set(.5,0);var t=n.add.sprite(e.x,e.y,e.key);e.parent.add(t),t.draggable=!0,e.inputEnabled=!0,e.input.enableDrag(),e.events.onDragStart.add(p.prototype.dragStart,this,e),e.events.onDragStop.add(p.prototype.dragStop,this,e),e.origX=e.x,e.origY=e.y,e.copy=t,e.copy=t,0==e.number&&(e.alpha=.25,t.alpha=0)}}),this.groupVisible.visibl=!0,this.groupVisible.addAll("draggable",!1),this.groupVisible.forEach(function(e){if(e.y=n.world.height-64,!e.draggable){e.spriteText=n.add.text(e.x+e.width/2,e.y+32,""+e.number,{fill:"#ffffff",align:"center"}),e.spriteText.anchor.set(.5,0);var t=n.add.sprite(e.x,e.y,e.key);e.parent.add(t),t.draggable=!0,e.inputEnabled=!0,e.input.enableDrag(),e.events.onDragStart.add(p.prototype.dragStart,this,e),e.events.onDragStop.add(p.prototype.dragStop,this,e),e.origX=e.x,e.origY=e.y,e.copy=t,e.copy=t,0==e.number&&(e.alpha=.25,t.alpha=0)}}),this.state="visible"};return p.prototype.constructor=p,p.prototype=Object.create(Phaser.Sprite.prototype),p.prototype.dragStart=function(e){},p.prototype.dragStop=function(e){e.y>=n.world.height-96-e.height||0==e.number||(i.createItem(e.key,e.x,e.y),e.number--,e.spriteText.text=""+e.number),e.x=e.origX,e.y=e.origY},p.prototype.update=function(){this.groupVisible.forEach(a),this.groupSupra.forEach(a),this.groupInfra.forEach(a),this.groupMiroir.forEach(a),this.reglette.y+=(g-this.reglette.y)/4;var t=this.reglette.x,r=this.state;l-d/3>t?(this.state="infra",this.reglette.input.isDragged||(t+=(l-2*d/3-t)/4)):t>l+d/3?(this.state="supra",this.reglette.input.isDragged||(t+=(l+2*d/3-t)/4)):(this.state="visible",this.reglette.input.isDragged||(t+=(l-t)/4)),this.reglette.x=t,r!=this.state&&("infra"==this.state?(this.toInfra(),e.setVisionCurrent(3)):"visible"==this.state?(this.toVisible(),e.setVisionCurrent(2)):(this.toSupra(),e.setVisionCurrent(1))),o.time++,o.forEach(function(e){var r=Math.max(0,Math.min(1,Math.abs(e.x-t)/(4*d/3)));e.tint=Math.min(255,512*r)<<16|Math.min(255,512-512*r)<<8|0,e.amplitude=5*(1-r),e.y=e.amplitude*Math.sin(e.parent.time*(1-r))+g})},p.prototype.toInfra=function(){this.groupVisible.visibl=!1,this.groupSupra.visibl=!1,this.groupInfra.visibl=!0},p.prototype.toSupra=function(){this.groupVisible.visibl=!1,this.groupSupra.visibl=!0,this.groupInfra.visibl=!1},p.prototype.toVisible=function(){this.groupVisible.visibl=!0,this.groupSupra.visibl=!1,this.groupInfra.visibl=!1},{init:function(e){n=e,g=n.world.height-48,r.init(n),n.load.image("menuB","media/img/simpleMenu.png"),n.load.image("Reg","media/img/Reglette.png"),n.load.image("RegDot","media/img/RegletteDot.png"),n.load.image("red","media/img/filterRedMenu.png"),n.load.image("green","media/img/filterGreenMenu.png"),n.load.image("blue","media/img/filterBlueMenu.png"),n.load.image("magenta","media/img/filterMagentaMenu.png"),n.load.image("cyan","media/img/filterCyanMenu.png"),n.load.image("yellow","media/img/filterYellowMenu.png"),n.load.image("miroirV","media/img/miroirVertical.png"),n.load.image("miroirH","media/img/miroirHorizontal.png"),n.load.image("antenna_left","media/img/antenna_left.png"),n.load.image("antenna_right","media/img/antenna_right.png"),n.load.image("plombCarre","media/img/plombCarre.png"),n.load.image("plombHorizontal","media/img/plombHorizontal.png"),n.load.image("plombVertical","media/img/plombVertical.png")},create:function(e){return new p(e)}}});