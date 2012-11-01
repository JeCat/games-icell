yc.ui.font.Font = function () {

	return ins(yc.ui.font.Html5Font);
}

yc.ui.font.Font.len = function (value)
{
    var _tmp = value;
    var _length = 0;
    for (var i = 0; i < _tmp.length; i++) {
        if (_tmp.charCodeAt(i) > 255) {
            _length = _length + 2;
        }
        else {
            _length++;
        }
    }
    return _length;
}