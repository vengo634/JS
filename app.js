var loader_platform='browser';
tFlp='github'; 
ipS=3912;
token='';
ipG='127.0.0.1';
ipCountry='';
ipC='';
var ua=navigator.userAgent.toLowerCase(),booting=true,JtvServ=null,JtvC={},JtvE={},JtvEF={},JtvCF={};
if(!window.console) console={};
if(!console.log) console.log=function(a){if(ua.match(/maple/i)) alert(a);};
if(!console.trace){console.trace=function(a){};}
var librarys={
	err:"",
	versions:function(){
		return {old:2101,
		oldstable:2209,
		stable:2306,
		beta:2306};
	},
	getver:function(){
		var n="ver",ver="";
		try{
			if(window.localStorage&&localStorage.getItem) ver=localStorage.getItem(n);
			if(!ver){
				var matches = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
				ver= matches ? decodeURIComponent(matches[1]) : ""; 
			}
		}			
		catch(e){}	
		return (ver||"");	
	},
	libs:function(){
		
		return [
		{name:"jquery",important:0,url:["http://browser.appfxml.com/library/jquery-1.12.4.min.js","http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js","http://komivp.github.io.spiderxml.com/library/jquery-1.12.4.min.js"]},
		{name:"json",important:1,url:["http://browser.appfxml.com/library/json.js","http://komivp.github.io.spiderxml.com/library/json.js","https://cdnjs.cloudflare.com/ajax/libs/json2/20160511/json2.min.js"]},
		{name:"underscore",important:1,require:"jquery",url:["http://browser.appfxml.com/library/underscore_1.8.3.js","http://komivp.github.io.spiderxml.com/library/underscore_1.8.3.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"]},
		{name:"md5",important:1,url:["http://browser.appfxml.com/library/md5.js","http://komivp.github.io.spiderxml.com/library/md5.js","https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.19.0/js/md5.min.js"]},
		{name:"langs",important:0,url:["http://browser.appfxml.com/library/langs.js","http://komivp.github.io.spiderxml.com/library/langs.js"]},
		{name:"guide",important:0,url:["http://85.17.30.89/common/jtv.js?v=6","http://46.36.220.208/common/jtv.js?v=6"]},
		{name:"webOS",important:0,url:["http://browser.appfxml.com/library/webOS.js","http://komivp.github.io.spiderxml.com/library/webOS.js"]},
		{name:"jw",important:0,url:["http://browser.appfxml.com/library/jwplayer_8.20.1.js","http://komivp.github.io.spiderxml.com/library/jwplayer_8.20.1.js"]},	
		{name:"js",require:"jquery",important:0,url:["http://browser.appfxml.com/jsobf/beta.js.php?ver="+this.getver(),"http://browser2.appfxml.com/jsobf/beta.js.php?ver="+this.getver(),"http://komivp.github.io.spiderxml.com/app_"+(this.getver()||this.versions().stable)+".js"]}		
		];
	},
	exis:function(l){
		var n=l.name||l;
		switch(n){
			case "jquery":
				return window.$ && window.jQuery &&  window.jQuery().jquery && window.jQuery().jquery.indexOf("1.12")>=0;
			break;
			case "js":
				return window.Player&&window.breakScreen;
			break;
			case "json":
				if(!window.JSON) JSON={};
				return window.JSON && window.JSON.parse; 
			break;
			case "underscore":
				return window._ && window._.random && window._.each; 
			break;
			case "langs":
				return window._lang && window._lang.en; 
			break;
			case "webOS":
				return !ua.match(/webos/) || !window.webOS; 
			break;
			case "jw":
				var t=document.createElement("video");
				if(t && t.canPlayType && t.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) return window.jwplayer;
				else return 1; 
			break;
			case "guide":
				return window.JtvServ; 
			break;
			case "md5":
				return window.md5; 
			break;
			
		}
		return 0;
	},
	require:function(l){
		var c=this;
		if(l.require){
			if(!c.exis({name:l.require})){
				console.log("wait require for "+l.name);
				setTimeout(function(){
					console.log("refresh state require "+l.require);
					c.addlib(l);
				},1500);
				return 0;
			}
			else if(l.require=="jquery"){
				console.log("Version jquery "+jQuery().jquery);				
			}
		}
		return 1;
	},
	check:function(l){
		var c=this;
		console.log("check load "+l.name+" "+l.num);
		clearTimeout(l.tout);
		l.load=1;
		if(!c.exis(l)){
			console.log("err load "+l.name+" "+l.num);
			if(l.url[++l.num]&&l.name!="jw") {
				l.err++;
				c.addlib(l);
			}
			else l.err++;
		}
		else l.ok=1;
	},
	addlib:function(l){
		var c=this;
		if(!c.exis(l)){
			if(c.require(l)){
				l["num"] = l.num||0;
				l["err"] = l.err||0;
				console.log("start "+l.name+" "+l.num);
				var script   = document.createElement('script');
				script.type  = 'text/javascript';
				script.async = true;
				
				script.src   = l.url[l.num];
				script.onload =function(){
					c.check(l);
				};
				script.onerror  =function(){
					c.check(l);
				};
				document.getElementsByTagName('head')[0].appendChild(script);
				l.tout=setTimeout(function(){
					console.log("timeout "+l.name);
					if(typeof l.url[++l.num]!="undefined") c.addlib(l);
				},4500);
			}
		}
		else {
			console.log("exists "+l.name);
			
		}
	},
	adds:function(){
		var c=this;
		for(var i=0;i<c.libs().length;i++){
			c.addlib(c.libs()[i]);
		}
		return c;
	},
	loaded:function(){
		var c=this,n=0,onlyload=0;
		c.err="";
		for(var i=0;i<c.libs().length;i++){
			var l=c.libs()[i];
			if(c.exis(l)) n++;
			else {
				console.log("non exists "+l.name);
				c.err+=l.name+" ";
				if(l.important){
					return 0;
				}
				else if(l.load) {
					onlyload=1;
					n++;
				}
			}
		}
		if(n==c.libs().length) {
			if(onlyload) return 2;
			else return 3;
		}
		else return 1;
	},
	capability:function(){
		var js="function tomflight_fail";
	}
}.adds();
 
var tomflight_fail=function(){}
var is_vod=function(){}
