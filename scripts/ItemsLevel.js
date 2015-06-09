define(["DoorsFactory","FilterFactory","ColorEnum","VisibleLummingFactory","MiroirFactory","AntennaFactory","RadioLummingFactory","PlombFactory"],function(e,r,a,t,i,o,l,n){var c,d=null,m=null;return{setgroup:function(e){c=e},radioCrea:function(e,r,a){d.time.events.add(Phaser.Timer.SECOND,function(){var t=l.create(e,r,85*a);c.add(t)},this)},init:function(a){d=a,e.init(a),t.init(a),r.init(a),i.init(a),l.init(a),n.init(a)},reinit:function(r){d=r,e.init(r),null!=m&&m.removeAll(!0,!0),m=d.add.group(),m.enableBody=!0},getGroupItem:function(){return m},createItem:function(e,t,l){switch(e){case"red":filtre=r.create(a.getColorEnum().RED,t,l),m.add(filtre);break;case"blue":filtre=r.create(a.getColorEnum().BLUE,t,l),m.add(filtre);break;case"yellow":filtre=r.create(a.getColorEnum().YELLOW,t,l),m.add(filtre);break;case"magenta":filtre=r.create(a.getColorEnum().MAGENTA,t,l),m.add(filtre);break;case"cyan":filtre=r.create(a.getColorEnum().CYAN,t,l),m.add(filtre);break;case"green":filtre=r.create(a.getColorEnum().GREEN,t,l),m.add(filtre);break;case"miroirV":miroirV=i.create(t,l,!0),m.add(miroirV);break;case"miroirH":miroirH=i.create(t,l,!1),m.add(miroirH);break;case"antenna_left":antenna_left=o.create(t,l,!0),m.add(antenna_left),this.radioCrea(t,l,-1);break;case"antenna_right":antenna_right=o.create(t,l,!1),m.add(antenna_right),this.radioCrea(t,l,1);break;case"plombCarre":plombCarre=n.create(t,l,0),m.add(plombCarre);break;case"plombHorizontal":plombHorizontal=n.create(t,l,1),m.add(plombHorizontal);break;case"plombVertical":plombVertical=n.create(t,l,2),m.add(plombVertical)}},collideItem:function(e,r){switch(r.key){case"filter_red":case"filter_green":case"filter_blue":case"filter_cyan":case"filter_yellow":case"filter_magenta":e.collideWithFilter(r);break;case"miroir_Vertical":e.collideWithMiroir(d,r);break;case"miroir_Horizontal":e.collideWithMiroir(d,r);break;case"plomb_Bloc":case"plomb_Vertical":case"plomb_Horizontal":e.collide(d,r)}}}});