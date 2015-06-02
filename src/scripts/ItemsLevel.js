define(['DoorsFactory','FilterFactory','ColorEnum', 'VisibleLummingFactory'], function(DoorsFactory, FilterFactory, ColorEnum, VisibleLummingFactory){
  var _game = null;
  var _groupItem = null;


  return{
    init : function(game){
      _game = game;
      DoorsFactory.init(game);
      FilterFactory.init(game);
    },
    reinit : function(game){
      _game = game;
      DoorsFactory.init(game);
      if (_groupItem != null){
       _groupItem.removeAll(true, true);
      }
      _groupItem = _game.add.group();
      _groupItem.enableBody = true;

    },
    getGroupItem : function(){
      return _groupItem;
    },
    createItem : function(key, x, y){
      var door = DoorsFactory.create(ColorEnum.getColorEnum().RED, x, y);

      switch (key) {
        case 'red' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().RED, x, y);
          _groupItem.add(filtre);
          break;
        case 'blue' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().BLUE, x, y);
          _groupItem.add(filtre);
          break;
        case 'yellow' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().YELLOW, x, y);
          _groupItem.add(filtre);
          break;
        case 'magenta' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().MAGENTA, x, y);
          _groupItem.add(filtre);
          break;
        case 'cyan' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().CYAN, x, y);
          _groupItem.add(filtre);
          break;
        case 'green' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().GREEN, x, y);
          _groupItem.add(filtre);
          break;
        default :
        var door = DoorsFactory.create(ColorEnum.getColorEnum().RED, x, y);
        _groupItem.add(door);
          break;
      }
    },

    collideItem : function(lum, objet){

      switch (objet.key){
        case 'filter_red' :
        case 'filter_magenta' :
        case 'filter_green' :
        case 'filter_cyan' :
        case 'filter_yellow' :
        case 'filter_magenta' :
         lum.collideWithFilter(objet);
          break;
/*
        case 'filter_magenta' :
          lum.collideWithFilter(objet);
          break;*/
      }
    }

  }
})
