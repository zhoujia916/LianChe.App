var aniShow = "pop-in";
if (mui.os.android) {
	if (parseFloat(mui.os.version) < 4.3) {
		aniShow = "slide-in-right";
	}
}
var templates = {};
var getTemplate = function(name, header, content) {
	var template = templates[name]; //for same page judge
	if (!template) {
		var isPreloadMain = plus.webview.getWebviewById(name + '-main');
		var isPreloadSub = plus.webview.getWebviewById(name + '-sub');
		if (isPreloadMain && isPreloadSub) { //for web,if plus had , out!
			templates[name] = template = {
				name: name,
				header: isPreloadMain,
				content: isPreloadSub,
			};
			return template;
		}
		var headerWebview = mui.preload({
			url: header,
			id: name + "-main",
			styles: {
				popGesture: "hide",
			},
			extras: {
				mType: 'main'
			}
		});
		var top = '44px';
		(name == 'height' || name == '-height') ? (top = '71px') : ''; //change the subWebview height
		var subWebview = mui.preload({
			url: !content ? "" : content,
			id: name + "-sub",
			styles: {
				top: top,
				bottom: '0px',
			},
			extras: {
				mType: 'sub'
			}
		});
		subWebview.addEventListener('loaded', function() {
			setTimeout(function() {
				subWebview.show();
			}, 50);
		});
		subWebview.hide();
		headerWebview.append(subWebview);
		if (mui.os.ios) {
			headerWebview.addEventListener('hide', function() {
				subWebview.hide("none");
			});
		}
		templates[name] = template = {
			name: name,
			header: headerWebview,
			content: subWebview
		};
	}
	return template;
};

function lowerClient(template, href, headerWebview, contentWebview, aniShow) {
	if (mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 4.4)) {
		var reload = true;
		if (!template.loaded) {
			/www\/(.+\.html)$/.exec(contentWebview.getURL());
			if (RegExp.$1 != href) {
				contentWebview.loadURL(href);
			} else {
				reload = false;
			}
		} else {
			reload = false;
		}
		(!reload) && contentWebview.show();
		headerWebview.show(aniShow, 250);
	}
}

function hrefHander() {
	var href = this.dataset.href;
	var type = this.dataset.type;
	var fn = this.dataset.fn;
	if (type === 'common') {
		app.VW(href).show(aniShow, 250);
		if(href=='car-special-selling.html'){
			setTimeout(function(){
				app.VW('car-special-selling-list.html').evalJS('forEvalJS.firstGet()');  
			},350);
		};
		
	} else if(type === 'open'){
		var _this=this
		if(this.dataset.able&&!web.getItem(this.dataset.able)){//未认证不能不发布车源 不是一个窗口
			return plus.nativeUI.toast('请先实名认证，再发布车辆！',{duration:"long"});;
		}
		mui.openWindow({
			url: href,
			id: href,
			show:{
				autoShow:true,
				aniShow: aniShow,
				duration:250
			},
			waiting:{
				autoShow: false
			}
		})
		if(href=='news.html'){
			app.VW(href).addEventListener('loaded',function(){
				mui.fire(app.VW(href),'newsId',{
					title: _this.dataset.title,
					newsId: _this.dataset.newsid
				});
			},false)
		}
	}else {
		var template = getTemplate(type);
		var headerWebview = template.header;
		var contentWebview = template.content;
		var title = this.dataset.title;
		var options = {
			title: title,
			target: href,
			aniShow: aniShow,
		};
		if (fn && app.self().id) {
			options.from = app.self().id;
			options.fn = fn;
		}
		mui.fire(headerWebview, 'updateHeader', options);
		lowerClient(template, href, headerWebview, contentWebview, aniShow);
	}
}
/*.a 页面跳转选择器, .write-value 为跳转这写值界面(fill-in.html)选择器*/
var aBtn = web.qsa('.a');
if (aBtn.length>0) {
	for (var i = 0; i < aBtn.length; i++) 
		aBtn[i].addEventListener('tap',hrefHander, false);
}