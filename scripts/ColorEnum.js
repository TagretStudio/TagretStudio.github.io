define(function(){var e=Object.freeze({RED:1,GREEN:2,BLUE:3,MAGENTA:4,YELLOW:5,CYAN:6,BLACK:7,WHITE:8,GAMMA:9,X:10,MICRO:11,RADIO:12,properties:{1:{name:"red",value:16711680},2:{name:"green",value:65280},3:{name:"blue",value:255},4:{name:"magenta",value:16711935},5:{name:"yellow",value:16776960},6:{name:"cyan",value:65535},7:{name:"black",value:0},8:{name:"white",value:16777215},9:{name:"gamma",value:0},10:{name:"X",value:0},11:{name:"micro",value:0},12:{name:"radio",value:0}}});return{getColorEnum:function(){return e},getName:function(a){return e.properties[a].name},getValue:function(a){return e.properties[a].value},getColorKnowingValue:function(a){var n=e;for(c in n.properties)if(e.properties[c].value==a)return c;return e.BLACK}}});