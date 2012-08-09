(function($) {   
    // the code of this function is from    
    // http://lucassmith.name/pub/typeof.html   
    $.type = function(o) {   
        var _toS = Object.prototype.toString;   
        var _types = {   
            'undefined': 'undefined',   
            'number': 'number',   
            'boolean': 'boolean',   
            'string': 'string',   
            '[object Function]': 'function',   
            '[object RegExp]': 'regexp',   
            '[object Array]': 'array',   
            '[object Date]': 'date',   
            '[object Error]': 'error'   
        };   
        return _types[typeof o] || _types[_toS.call(o)] || (o ? 'object' : 'null');   
    };   
    // the code of these two functions is from mootools   
    // http://mootools.net   
    var $specialChars = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };   
    var $replaceChars = function(chr) {   
        return $specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);   
    };   
    $.toJSON = function(o) {   
        var s = [];   
        switch ($.type(o)) {   
            case 'undefined':   
                return 'undefined';   
                break;   
            case 'null':   
                return 'null';   
                break;   
            case 'number':   
            case 'boolean':   
            case 'date':   
            case 'function':   
                return o.toString();   
                break;   
            case 'string':   
                return '"' + o.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"';   
                break;   
            case 'array':   
                for (var i = 0, l = o.length; i < l; i++) {   
                    s.push($.toJSON(o[i]));   
                }   
                return '[' + s.join(',') + ']';   
                break;   
            case 'error':   
            case 'object':   
                for (var p in o) {   
                    s.push('"' + p.replace(/[\x00-\x1f\\"]/g, $replaceChars) + '"' + ':' + $.toJSON(o[p]));   
                }   
                return '{' + s.join(',') + '}';   
                break;   
            default:   
                return '';   
                break;   
        }   
    };   
    $.evalJSON = function(s) {   
        if ($.type(s) != 'string' || !s.length) return null;   
        return eval('(' + s + ')');   
    };   
})(jQuery);