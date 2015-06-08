define(function() {

	var ColorEnum = Object.freeze({
		RED: 1,
		GREEN: 2,
		BLUE: 3,
		MAGENTA: 4,
		YELLOW: 5,
		CYAN: 6,
		BLACK: 7,
		WHITE: 8,

		GAMMA: 9,
		X: 10,

		MICRO: 11,
		RADIO: 12,

		properties: {
			1: {
				name: "red",
				value: 0xff0000
			},
			2: {
				name: "green",
				value: 0x00ff00
			},
			3: {
				name: "blue",
				value: 0x0000ff
			},
			4: {
				name: "magenta",
				value: 0xff00ff
			},
			5: {
				name: "yellow",
				value: 0xffff00
			},
			6: {
				name: "cyan",
				value: 0x00ffff
			},
			7: {
				name: "black",
				value: 0x000000
			},
			8: {
				name: "white",
				value: 0xffffff
			},

			9: {
				name: "gamma",
				value: 0x000000
			},
			10: {
				name: "X",
				value: 0x000000
			},

			11: {
				name: "micro",
				value: 0x000000
			},
			12: {
				name: "radio",
				value: 0x000000
			}

		}
	});

	return{
		getColorEnum: function() {
			return ColorEnum;
		},
		
		getName: function(colorCode) {
			return ColorEnum.properties[colorCode].name;
		},
		
		getValue: function(colorCode) {
			return ColorEnum.properties[colorCode].value;
		},
		
		getColorKnowingValue: function(value) {
			var col = ColorEnum;
			for (c in col.properties) {
				if (ColorEnum.properties[c].value == value) {
					return c;
				}
			}
			return ColorEnum.BLACK; // N'est pas censé arriver
		}
	}

})
