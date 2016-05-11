/*
 Woobox Javascript SDK
 2013-2015 Woobox, LLC
*/
var Woo={};
(function(){function Woobox(){if(arguments.callee._singletonInstance)return arguments.callee._singletonInstance;arguments.callee._singletonInstance=this;var that=this;var consts={logging:"//{host}/plugins/log",plugin:{classes:["woobox-offer"],options:{},frames:{"offer":{src:"//{host}/plugins/offer/{pid}/{params}",width:"100%",height:"determine",defaultCSS:{border:"none",WebkitBorderRadius:"3px",MozBorderRadius:"3px",OBorderRadius:"3px",borderRadius:"3px",WebkitTransition:"height 0.2s ease-out",MozTransition:"height 0.2s ease-out",
OTransition:"height 0.2s ease-out",transition:"height 0.2s ease-out"},eventHandlers:{}}},classIDMap:{"woobox-offer":"data-offer"},classOptionMap:{"woobox-offer":[]},classFrameMap:{"woobox-offer":["offer"]},classCSSMap:{"woobox-offer":{display:"inline-block",width:"100%",maxWidth:"810px"}},defaultCSS:{position:"relative",border:"none"},defaultCSSLink:"//{host}/css/plugins/{class}.css"},errors:{}};var h,k,t;var pm=!!window.postMessage;var ev=!!window.addEventListener;var ie=function(){var v=3,div=document.createElement("div"),
a=div.all||[];while(div.innerHTML="\x3c!--[if gt IE "+ ++v+"]><br><![endif]--\x3e",a[0]);return v>4?v:!v}();var plugins={};var plugin_counts={};var logger;var myEl;var firstLoad=true;var url=document.getElementById("woobox-sdk").getAttribute("src");function fillConst(t,vals){var filled=t;if(h)filled=filled.replace("{host}",h);for(var i in vals)if(i!="host")filled=filled.replace("{"+i+"}",encodeURIComponent(vals[i]));else filled=filled.replace("{"+i+"}",vals[i]);return filled}function mergeJSON(json1,
json2){for(var i in json2)if(typeof json2[i]!="object")json1[i]=json2[i];else{if(typeof json1[i]=="undefined")json1[i]=json2[i];mergeJSON(json1[i],json2[i])}}function getMessage(e){if(pm){if(e.origin!=window.location.protocol+"//"+h)return false;var m={};try{m=JSON.parse(e.data);if(m["pid"]&&typeof plugins[m["pid"]]!="undefined"){var p=plugins[m["pid"]];return p.receiveMessage(e,m)}else return false}catch(ex){return false}}return false}function postMessage(el,pid,d,dest){if(pm){var m={"t":t,"k":k,
"pid":pid};mergeJSON(m,d);if(!dest)dest=window.location.protocol+"//"+h;el.postMessage(JSON.stringify(m),dest);return true}return false}function setCSS(o){if(typeof o.consts!="undefined"){if(typeof o.consts.defaultCSS!="undefined")for(var i in o.consts.defaultCSS)o.el.style[i]=o.consts.defaultCSS[i];if(o.type&&typeof o.consts.classCSSMap[o.type]!="undefined")for(var i in o.consts.classCSSMap[o.type])o.el.style[i]=o.consts.classCSSMap[o.type][i];if(typeof o.css!="undefined"&&typeof o.css.height=="undefined"){o.css.height=
"600";o.css.overflow="scroll";o.el.setAttribute("scrolling","yes")}else o.el.setAttribute("scrolling","no");for(var i in{"width":true,"height":true})if(typeof o.consts[i]!="undefined"&&typeof o.css[i]!="undefined")if(o.consts[i].indexOf("%")>0)o.el.style[i]=o.css[i];else o.el.style[i]=o.css[i]+"px";return true}return false}function log(data){if(logger)document.getElementsByTagName("head")[0].removeChild(logger);logger=document.createElement("script");logger.setAttribute("id","woobox-log");logger.setAttribute("src",
consts.logging+"?d="+encodeURIComponent(JSON.stringify(data)));logger.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(logger)}function parseDOM(){var divs=document.getElementsByTagName("div"),matched=false;for(var i=0;i<divs.length;i++)for(var j=0;j<consts.plugin.classes.length;j++)if(divs[i].className==consts.plugin.classes[j]){var p=new plugin(divs[i],consts.plugin.classes[j]);plugins[p.pid]=p;p.init();matched=true}if(!matched)console.log("Matching DIV not found")}
function checkTop(pid){if(firstLoad){firstLoad=false;return false}var className=pid+"_offer",topEl=document.getElementsByClassName(className)[0],elBox=topEl.getBoundingClientRect(),body=document.body,docElem=document.documentElement;var scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop;var clientTop=docElem.clientTop||body.clientTop||0;var topLoc=elBox.top+scrollTop-clientTop;var windowBottom=window.innerHeight+scrollTop;topLoc=Math.round(topLoc);if(topLoc<scrollTop||topLoc>windowBottom)smoothScroll(topLoc,
scrollTop)}function smoothScroll(destination,current){var hop_count=33;var distance=(destination-current)/hop_count;for(var i=1;i<=hop_count;i++)(function(){var nextHop=distance*i;setTimeout(function(){window.scrollTo(0,nextHop+current)},15*i)})();return false}this.box=function(token,key,host){if(!host){var a=document.createElement("a");a.setAttribute("href",url);h=a.hostname.replace("cdn.","")}else h=host;t=token;k=key;if(ev)window.addEventListener("message",getMessage,false);else window.attachEvent("onmessage",
getMessage);if(document.readyState==="complete"||document.readyState==="loaded"||document.readyState==="interactive")parseDOM();else if(ev)document.addEventListener("DOMContentLoaded",parseDOM,false);else document.attachEvent("onreadystatechange",parseDOM)};function frame(p,f){this.inited=false;this.parent=p;this.fid=f;this.el=document.createElement("iframe");this.consts=consts.plugin.frames[this.fid];this.el.setAttribute("id",this.parent.pid+"_"+this.fid);this.el.setAttribute("scrolling","no");this.el.className=
this.parent.pid+"_"+this.fid;this.css={};this.over=false;this.clicked=false}frame.prototype.init=function(){if(typeof this.parent.pid!="undefined"){var dataParams=this.parent.el.getAttribute("data-params");var hash=window.location.hash.substring(1).replace("&",",");var params="";if(dataParams)params=dataParams;if(hash)params=params+hash;var src=fillConst(this.consts.src,{"pid":this.parent.pid,"k":k,"params":params});this.el.setAttribute("src",src);this.parent.el.appendChild(this.el);for(var i in{"width":true,
"height":true})if(this.consts[i]!="determine")this.css[i]=this.consts[i];this.setCSS();var that=this;myEl=that.el;var mousemove=function(e){if(this.consts&&typeof this.consts.eventHandlers.mouseover!="undefined")that.consts.eventHandlers.mousemove(e,that)};if(ev)this.el.addEventListener("mousemove",mousemove,false);else this.el.attachEvent("onmousemove",mousemove);var mouseover=function(e){that.over=true;if(typeof that.consts.eventHandlers.mouseover!="undefined")that.consts.eventHandlers.mouseover(e,
that)};if(ev)this.el.addEventListener("mouseover",mouseover,false);else this.el.attachEvent("onmouseover",mouseover);var mouseout=function(e){that.over=false;if(typeof that.consts.eventHandlers.mouseout!="undefined")that.consts.eventHandlers.mouseout(e,that)};if(ev)this.el.addEventListener("mouseout",mouseout,false);else this.el.attachEvent("onmouseout",mouseout);this.inited=true}};frame.prototype.setCSS=function(){return setCSS(this)};frame.prototype.reload=function(){this.loaded=false;this.el.setAttribute("src",
this.el.src)};function plugin(div,c){this.inited=false;this.consts=consts.plugin;this.type=c;this.el=div;this.pid=this.el.getAttribute(this.consts.classIDMap[this.type]);if(typeof plugin_counts[this.pid]=="undefined")plugin_counts[this.pid]=0;else plugin_counts[this.pid]++;this.pid=this.pid+"_"+plugin_counts[this.pid];this.el.id=this.pid;this.opts={};this.frames={};this.loading=false;this.cssLink=null;if(this.consts.classFrameMap[this.type].length)for(var i=0;i<this.consts.classFrameMap.length;i++)this.frames[this.consts.classFrameMap[i]]=
new frame(this,this.consts.classFrameMap[i])}plugin.prototype.sendData=function(f,r,d){return postMessage(f.el.contentWindow,this.pid,{"receive":r,"data":d})};plugin.prototype.sendRequest=function(f,r,d){return postMessage(f.el.contentWindow,this.pid,{"request":r,"data":d})};plugin.prototype.returnTarget=function(e,m){var p={"receive":"target","data":null};if(m["frame"]){p["request"]="dims";p["frame"]=m["frame"]}return postMessage(e.source,this.pid,p,e.origin)};plugin.prototype.receiveMessage=function(e,
m){var secure=false;if(m["t"]&&m["k"]&&m["t"]==t&&m["k"]==k)secure=true;if(typeof m["receive"]!="undefined")switch(m["receive"]){case "dims":if(typeof m["frame"]!="undefined"&&typeof this.frames[m["frame"]]!="undefined"){for(var i in m["data"]["dims"])this.frames[m["frame"]].css[i]=m["data"]["dims"][i];return this.frames[m["frame"]].setCSS()}return false;break;case "checkTop":checkTop(m.pid);break}if(typeof m["request"]!="undefined")switch(m["request"]){case "target":return this.returnTarget(e,m);
break}};plugin.prototype.init=function(){this.setOpts();this.setCSS();var that=this;var initInterval=window.setInterval(function(){if(that.inited){that.setCSSLink();window.clearInterval(initInterval)}},100);this.setFrames()};plugin.prototype.setCSS=function(){return setCSS(this)};plugin.prototype.setCSSLink=function(){this.cssLink=document.createElement("link");if(typeof this.opts["css"]!="undefined")var href=this.opts["css"];else return false;this.cssLink.setAttribute("rel","stylesheet");this.cssLink.setAttribute("type",
"text/css");this.cssLink.setAttribute("href",href);this.cssLink.setAttribute("id","c_"+this.pid);document.getElementsByTagName("head")[0].appendChild(this.cssLink)};plugin.prototype.setOpts=function(){this.opts["css"]=fillConst(this.consts.defaultCSSLink,{"class":this.type});this.setInlineOpts();return true};plugin.prototype.setFrames=function(){for(var i=0;i<this.consts.classFrameMap[this.type].length;i++)for(var j in this.consts.frames)if(this.consts.classFrameMap[this.type][i]==j){this.frames[j]=
new frame(this,j);this.frames[j].init()}};plugin.prototype.setInlineOpts=function(){var attrs=this.el.attributes;for(var i=0;i<attrs.length;i++)for(var j=0;j<this.consts.classOptionMap[this.type].length;j++)if(this.consts.classOptionMap[this.type][j]==attrs[i].name){var idx=this.consts.options[this.consts.classOptionMap[this.type][j]];this.opts[idx]=attrs[i].value;break}};plugin.prototype.setLoading=function(){this.loading=true};plugin.prototype.clearLoading=function(){this.loading=false}}Woo=new Woobox;
Woo.box()})();
