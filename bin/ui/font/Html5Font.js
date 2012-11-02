
/**
	var font = new yc.ui.font.Html5Font;
	
	font.setWidth(250);
	font.setHeight(150);
	font.setTextIndent(20);
	font.setTextAlign('center');
	font.setLetterSpacing(8);
	font.setLineHeight(25);
	font.setText('作为公司[color=#F00;weight=bold;size=16;font=隶书]老板[/]，努力发展自己的公司吧！给公司起个好[color=red]名字[/]，建造属于自己的[size=18]超级公司[/]。');
	font.draw(ctx);
 * @returns {yc.ui.font.Html5Font}
 */
yc.ui.font.Html5Font = function () {
	this.text = '';
	this.textIndent = 0;
	this.textAlign = 'left';
	this.lineHeight = 20;
	this.letterSpacing = 5;
	this.left = 0;
	this.top = 0;
	this.width = 0;
	this.height = 0;
	this.color = '#000';
	this.fontWeight = 'normal';
	this.fontSize = 12;
	this.fontFamily = 'sans-serif';
	this.chars = []; // 存放每个字符
	this.loaded = false;
	this.data = null; // toImage后存为data
}

yc.ui.font.Html5Font.prototype = {
	constructor : yc.ui.font.Html5Font,
	setText : function(text) {
		this.text = text;
		this.loaded = false;
	},
	setTextIndent : function(value) {
		this.textIndent = parseInt(value, 10);
		this.loaded = false;
	},
	setTextAlign : function(value) {
		this.textAlign = value;
		this.loaded = false;
	},
	setLineHeight : function(value) {
		this.lineHeight = parseInt(value, 10);
		this.loaded = false;
	},
	setLetterSpacing : function(value) {
		this.letterSpacing = parseInt(value, 10);
		this.loaded = false;
	},
	setLeft : function(value) {
		this.left = parseInt(value, 10);
	},
	setTop : function(value) {
		this.top = parseInt(value, 10);
	},
	setWidth : function(value) {
		this.width = parseInt(value, 10);
		this.loaded = false;
	},
	setHeight : function(value) {
		this.height = parseInt(value, 10);
		this.loaded = false;
	},
	setColor : function(value) {
		this.color = value;
		this.loaded = false;
	},
	setFontWeight : function(value) {
		this.fontWeight = value;
		this.loaded = false;
	},
	setFontSize : function(value) {
		this.fontSize = parseInt(value, 10);
		this.loaded = false;
	},
	setFontFamily : function(value) {
		this.fontFamily = value;
		this.loaded = false;
	},
	_loadMetrics : function() {
		var canvas, ctx;
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		ctx.save();
		this.chars.length = 0;
		
		this._format(this.text).forEach(function(n) { // 解析字符串, 所有的字符画在canvas上, 保存进this.chars数组
			var width, height;
			n.color = n.color || this.color;
			n.weight = n.weight || this.fontWeight;
			n.size = parseInt((n.size || this.fontSize), 10);
			n.font = n.font || this.fontFamily;
			
			ctx.font = n.weight + ' ' + n.size + 'px ' + n.font;
			width = ctx.measureText(n.char).width;
			height = n.size;
			canvas.width = width;
			canvas.height = height;
			
			ctx.fillStyle = n.color;
			ctx.font = n.weight + ' ' + n.size + 'px ' + n.font;
			ctx.textBaseline = 'top';
			ctx.fillText(n.char, 0, 0);
			
			this.chars.push({
				w: width,
				h: height,
				char: ctx.getImageData(0, 0, width, height)
			});
		}, this);
		
		ctx.restore();
		this._toImage();
	},
	_toImage : function() { // 转化成包含整句话的canvas
		var canvas, ctx, currentWidth, currentLine = 1;
		canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		ctx = canvas.getContext('2d');
		currentWidth = this._getStartX(this.chars, true);

		this.chars.forEach(function(n, i) {
			if (currentWidth + n.w > this.width) { // 换行时候验证是否末行, 实现textAlign
				currentWidth = this._getStartX(this.chars.slice(i), false);
				currentLine++;
			}
			ctx.putImageData(n.char, currentWidth, currentLine * this.lineHeight - n.h);
			currentWidth += n.w + this.letterSpacing;
		}, this);
		this.data = canvas;
		this.loaded = true;
	},
	_getStartX : function(chars, isFirstLine) { // 获得chars所占的总宽度
		var w, currentWidth, i, n;
		w = isFirstLine ? this.textIndent : 0;
		for (i = 0, n = chars.length; i < n; i++) {
		    	if (w + chars[i].w > this.width) {
				w -= this.letterSpacing;
				break;
		    	}
			w += chars[i].w + this.letterSpacing;
		}
		if (this.textAlign === 'center') {
		    	currentWidth = (this.width - w) / 2;
		} else if (this.textAlign === 'right') {
		    	currentWidth = this.width - w;
		} else {
		    	currentWidth = 0;
		}
		isFirstLine && (currentWidth += this.textIndent);
		return currentWidth;
	},
	_format : function(str) {
		var arr = str.match(/([^\[]+|\[.*?\[\/\])/g), ret = [];
		arr.forEach(function(n) {
			ret = ret.concat(this._proc(n));
		}, this);
		return ret;
	},
	_proc : function(str) {
		var obj = {}, ret = [], att, arr, i, n;
		att = str.match(/(\[([^\]]*)\])?([^\[]*)/);
		obj.text = att[3];
		if (att[2]) {
			att = att[2].split(';');
			for ( var n = 0, m = att.length; n < m; n++) {
				arr = att[n].split('=');
				obj[arr[0]] = arr[1];
			}
		}
		for (i = 0, n = obj.text.length; i < n; i++) {
			ret.push({
				char : obj.text.charAt(i),
				color : obj.color,
				weight : obj.weight,
				size : obj.size,
				font : obj.font
			});
		}
		return ret;
	},
	draw : function(ctx) {
		!this.loaded && this._loadMetrics();
		ctx.drawImage(this.data, this.left, this.top);
	},
	
	// 以下对接口做了简单的封装, jQuery fans应该喜欢
	_camelCase: function(string) {
		return string.replace(/-([a-z])/ig, function(all, letter) {
			return letter.toUpperCase();
		});
	},
	css: function(props) {
		var prop, setF;
		for (prop in props) {
			setF = this._camelCase('set-' + prop);
			if (typeof this[setF] === 'function') {
				this[setF].call(this, props[prop]);
			}
		}
		return this;
	}
}
