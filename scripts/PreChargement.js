define(["./Images","MusicFactory","Transition","MenuFactoryTest","ItemsLevel"],function(n,t,i,e,o){var r=null,a=null,u={init:function(){r.scale.pageAlignHorizontally=!0},preload:function(){n.init(r),n.boot().preload(),t.init(r),i.init(r),e.init(r),o.init(r)},create:function(){r.state.start(a)}};return{init:function(n,t){r=n,a=t},getPreChargement:function(){return u}}});