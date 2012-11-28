var g_architecture = 'html5' ;


(function () {
	var d = document;
	var c = {
		menuType:'canvas', //whether to use canvas mode menu or dom menu
		COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
		box2d:true,
		showFPS:true,
		frameRate:60,
		tag:'gameCanvas', //the dom element to run cocos2d on
		engineDir:'lib/cocos2d/',
		appFiles: g_AppFiles
	};

	// 加后缀
	var url = parseUrl(location.toString()) ;

	// 自动加载内置关卡
	if( 'qv' in url.anchorParams )
	{
		var qv = url.anchorParams.qv=="random"? Math.random().toString(): url.anchorParams.qv ;
		for(var i=0;i<c.appFiles.length;i++)
		{
			c.appFiles[i]+= "?qv="+qv ;
		}
	}

	window.addEventListener('DOMContentLoaded', function () {
		//first load engine file if specified
		var s = d.createElement('script');
		s.src = c.engineDir + 'platform/jsloader.js';
		d.body.appendChild(s);
		s.c = c;
		s.id = 'cocos2d-html5';
		//else if single file specified, load singlefile
        document.ccConfig = c;
	});
})();




function parseUrl(url) {
    var a =  document.createElement('a');
    a.href = url;
    var parseQuery = function(q){
            var ret = {},
                seg = q.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }

    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: parseQuery(a.search),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        anchorParams: parseQuery(a.hash.replace('#','')),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
