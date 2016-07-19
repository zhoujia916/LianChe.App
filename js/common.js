var base;
var _use='';
if(_use=='w'){
	base='http://192.168.1.92:9080';
}else if(_use=='254'){
	base='http://192.168.1.254';
}else if (_use=='z'){
	base='http://192.168.1.69:9080';
}else{
	base='http://www.one-auto.com';
}
/*http://ask.dcloud.net.cn/article/152*/
var sendCode=base+'/phone/autouser/sendCode.do';
var registerSver=base+'/phone/autouser/register.do';
var loginSver=base+'/phone/autouser/login.do';
var retrievePassword=base+'/phone/autouser/retrievePassword.do';
var updateProfile=base+'/phone/autouser/updateProfile.do';
var configidSver=base+'/phone/autouser/updateAuth.do';
var autouserIndex=base+'/phone/autouser/index.do';
var updatePassword=base+'/phone/autouser/updatePassword.do';
var listCollect=base+'/phone/autouser/listCollect.do';
var listMessage=base+'/phone/autouser/listMessage.do';
var autocarAdd=base+'/phone/autocar/add.do';
var showMessage=base+'/phone/autouser/showMessage.do'; 
var addCollect=base+'/phone/autouser/addCollect.do';
var deleteCollect=base+'/phone/autouser/deleteCollect.do';
var autouserListCar=base+'/phone/autouser/listCar.do';
var autouserFeedback=base+'/phone/autouser/feedback.do';
var updateUserAvatar=base+'/phone/autouser/updateAvatar.do';//头像
var uploadUserAuth=base+'/plugin/uploader/userauth';//auth
var carlistSver=base+'/phone/autocar/list.do';
var autocarShow=base+'/phone/autocar/show.do';
var orderSver=base+'/phone/autoorder/add.do';
var autoorderCalc = base+'/phone/autoorder/calc.do';
var wxpaySver = base + '/plugin/wxpay';
var alipaySver = base + '/plugin/alipay';
var autoorderDeposit = base+'/phone/autoorder/deposit.do';
var autoorderAccept = base+'/phone/autoorder/accept.do'
var autoorderList = base+'/phone/autoorder/list.do';
var autoorderCancel = base+'/phone/autoorder/cancel.do';
var autoorderReceive = base+ '/phone/autoorder/receive.do';
var autoorderNotify = base + '/phone/autoorder/notify.do';
var autoorderReject = base + '/phone/autoorder/reject.do';
var upPic = base+'/plugin/uploader';
var autoarticleList= base+'/phone/autoarticle/list.do'
var isDebug = true;
/*常用函数*/
(function($){
	$.qs=function(selector){
		if(arguments.length==1){
			if(typeof arguments[0]==='object'){
				return arguments[0]
			}else{
				return document.querySelector(arguments[0]);
			}
		}else{
			if(typeof arguments[0] === 'object'){
				return arguments[0].querySelector(arguments[1]);
			}else if(typeof arguments[0] === 'string'){
				return document.querySelector(arguments[0]).querySelector(arguments[1]);
			}
		}
	}
	
	$.qsa=function(selector){
		if(arguments.length==1){
			return document.querySelectorAll(arguments[0]);
		}else{
			if(typeof arguments[0] === 'object'){
				return arguments[0].querySelectorAll(arguments[1]);
			}else if(typeof arguments[0] === 'string'){
				return document.querySelector(arguments[0]).querySelectorAll(arguments[1]);
			}
		}
	}
	
	$.gn=function(selector){
		return document.getElementsByName(selector)[0];
	}
	
	$.bodyHeight=function(){
		return document.body.clientHeight||document.documentElement.clientHeight
	}
	
	$.getStyle=function(Ele, name){
		if (Ele.currentStyle) {
			return Ele.currentStyle[name];
		} else {
			return getComputedStyle(Ele, false)[name];
		}
	}
	
	$.setStyle3=function(Ele, name, value) {
		Ele.style['Webkit' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
		Ele.style[name] = value;
	}
	
	$.setStyle=function(Ele,j){
		for(attr in j){
			Ele.style[attr]=j[attr];
		}
	}

	$.createDom=function(html){
		var o=document.createElement('div');
		o.innerHTML=html;
		return o.children[0];
	}
	
	$.createCss=function(cssText) {
		var oldStyle = document.getElementsByTagName('style')[0];
		var oHead = document.getElementsByTagName('head')[0];
		var newStyle = document.createElement('style');
		newStyle.innerText = cssText;
		if (oldStyle) {
			oHead.insertBefore(newStyle, oldStyle);
		} else {
			oHead.appendChild(newStyle);
		}
	}
	
	$.addZero=function(numb){
		var result;
		return parseFloat(numb)<10?('0'+numb):numb;
	}
	
	$.setItem=function(j){
		for(keys in j){
			localStorage.setItem(keys,j[keys]+'');
		}
	}
	
	$.removeItem=function(a){
		for(var i=0; i<a.length; i++){
			localStorage.removeItem(a[i]);
		}
	}
	/*某个键对应的值不存在，该键值返回为false。全部不存在返回false*/
	$.getItem=function(a){
		var result={},flag=false,_this=this;
		if(typeof a==='string'){
			return localStorage.getItem(a)
		}else if(a instanceof Array){
			a.forEach(function(item){
				if(localStorage.getItem(item)){
					result[item]=localStorage.getItem(item);
					flag=true;
				}else{
					result[item]=false;
				}
			})
		}
		return flag?result:false;
	}
	
	$.cookie={
		get: function(name){
			var cookieName=encodeURIComponent(name)+'=',cookieStart=document.cookie.indexOf(cookieName),cookieValue=null;
			if(cookieStart>-1){//找到
				var cookieEnd=document.cookie.indexOf(';',cookieStart);
				if(cookieEnd==-1){
					cookieEnd=document.cookie.length;
				}
				cookieValue=decodeURIComponent(document.cookie.substring(cookieName.length+cookieStart,cookieEnd));
			}
			return cookieValue;
		},
		set:function(name,value,expires,path,domain,secure){
			var cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value);
			if(expires){
				cookieText+=';max-age='+expires;
			}
			if(path){
				cookieText+=';='+path;
			}
			if(domain){
				cookieText+=';domain'+domain;
			}
			if(secure){
				cookieText+=';secure';
			}
			document.cookie=cookieText;
		},
		unset:function(name,path,domain,secure){
			this.set(name,'',0,path,domain,secure);
		}
	}
	
	$.getSubmitParam=function(selector){
		var j={};
		var list=this.qsa(selector);
		[].forEach.call(list,function(item){
			if(item.tagName.toLowerCase()=='input'||item.tagName.toLowerCase()=='textarea'){
				if(item.value!=''){
					j[item.name]=item.value;
				}
			}else{
				j[item.dataset.name]=item.innerText;
			}
		})
		return j;
	}
	$.autoScroll=function(options){
		var param=options||{};
		param.height=param.height||'100%';
		param.width=param.width||'100%';
	}
	
	$.scroll=function(selector,options){
		options=options||{indicators: false,bounce:false};
		options.deceleration = mui.os.ios?0.003:0.0009;
		return mui(selector).scroll(options);
	}
	
	$.validMobile=function(value){
		return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(value) ? true : /^0?194\d{8}$/.test(value);
	};
	
	$.validId=function(value){
		return !!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
	}
	
	/*不小于今天的日期为合法，str->2016-7-11,connector->连接符‘-’*/
	$.avlidDate=function (str,connector){
		var oDate=new Date();
		var now=[oDate.getFullYear(),oDate.getMonth()+1,oDate.getDate()];
		var userTime=str.split(connector);
		for(var i=0; i< 2; i++){
			if(parseInt(userTime[i])>now[i]){
				return true;
			}else if(parseInt(userTime[i])==now[i]){
				if(i==1){
					if(userTime[2]>=now[2]){
						return true;
					}else{
						return false;
					}
				}
			}else{
				return false;
			}
		}
	};
	
	/*正整数非零开头 number input*/
	$.unsignedNumbBox=function(input){
		this.qs(input).addEventListener('input',function(){
			this.value=this.value.replace(/^0+|[^0-9]/g,'');
		},false);
		this.qs(input).addEventListener('change',function(){
			this.value=this.value.replace(/^0+|[^0-9]/g,'');
		},false);
	}
	$.unsignedNumber=function(str){
		return str.replace(/^0+|[^0-9]/g,'');
	}
	/*限制位数 number input*/
	$.limitNumbBox=function(input){
		this.qs(input).addEventListener('input',function(){
			if(/[0-9]+\.[0-9]{1,2}/g.test(this.value)){
				this.value=(/[0-9]+\.[0-9]{1,2}/g.exec(this.value))[0]
			}else{
				this.value=this.value.replace(/^0+|[^0-9]/g,'');
			}
		},false);
		this.qs(input).addEventListener('change',function(){
			if(/[1-9]+\.[0-9]{1,2}/g.test(this.value)){
				this.value=(/[0-9]+\.[0-9]{1,2}/g.exec(this.value))[0]
			}else{
				this.value=this.value.replace(/^0+|[^0-9]/g,'');
			}
		},false);
	}
	
	$.limitNumber=function(str,places){
		var reg=new RegExp('[0-9]+\\.[0-9]{1,'+(places||2)+'}','g')
		if(reg.test(this.value)){
			return true;
		}else{
			return false;
		}
	}
	
	$.init=function(){
		String.prototype.trim=function(){
			return this.replace(/^\s+|\s+$/,"")
		}
	}
	
	
})(window.web={});
web.init();



/* H5+*/
(function($,HP){
	HP.VW=function(id){
		return plus.webview.getWebviewById(id);
	}
	
	HP.self=function(){
		return window.plus?plus.webview.currentWebview():'';
	}
	
	HP.firstSub=function() {
		return window.plus?plus.webview.currentWebview().children()[0]:'';
	}
	
	HP.parent=function() {
		return window.plus?plus.webview.currentWebview().parent():'';
	}
	
	HP.hiddenIndicator=function(){
		if (window.plus) {
			plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
		} else {
			document.addEventListener("plusready", function() {
				plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
			}, false);
		}
	}
	
	HP.openVW=function(href){
		if(this.VW(href)!=null){
			this.VW(href).close('none');
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
		});
	}
	
	HP.changeStatusBarColor=function(color) {
		if (mui.os.ios && window.plus)
			plus.navigator.setStatusBarBackground(color);
	}
	
	HP.waiting=function(fn){
		if(!window.plus) return;
		var w=plus.nativeUI.showWaiting('',{padlock:true});
		if(fn)
			w.onclose=fn;
		return w;
	}
	
	HP.setItem=function(j){
		for(keys in j){
			plus.storage.setItem(keys,j[keys]+'');
		}
	}
	
	HP.removeItem=function(a){
		for(var i=0; i<a.length; i++){
			plus.storage.removeItem(a[i]);
		}
	}
	
	HP.getItem=function(a){
		var result={},flag=false,_this=this;
		if(typeof a==='string'){
			return plus.storage.getItem(a)
		}else if(a instanceof Array){
			a.forEach(function(item){
				if(plus.storage.getItem(item)){
					result[item]=plus.storage.getItem(item);
					flag=true;
				}else{
					result[item]=false;
				}
			})
		}
		return flag?result:false;
	}
	
})(mui,window.app={});


/*动画方式，全局变量*/
var aniShow = "pop-in";
if (mui.os.android) {
	if (parseFloat(mui.os.version) < 4.4) {
		aniShow = "slide-in-right";
	}
}


/*放回内容式遮罩层*/
function Mask() {
	var _this = this;
	var oM = document.createElement('div');
	oM.className = 'pz-mask';
	var oB = document.getElementsByTagName('body')[0];
	this.clear = function() { //清除遮罩
		oM.style.opacity = 0;
		this.el.style.opacity = 0;
		setTimeout(function() {
			oM.children[0].style.display = 'none';
			oB.appendChild(oM.children[0]);
			oB.removeChild(oM);
		}, 300);
		return _this;
	};
	this.create = function() { //创建遮罩
		oB.appendChild(oM);
		return _this;
	};
	this.append = function(el) { //向遮罩里添加元素
		this.el = el;
		if(oM.children.length>0){
			var temp=oM.children[0]
			oB.appendChild(temp);
			temp.style.display='none';
		}
		oM.appendChild(el); 
		el.style.display = 'block';
		setTimeout(function() {
			oM.style.opacity = 1;
			el.style.opacity = 1;
		}, 50);
		/*which 'stopPropagation' 阻止冒泡 , 'preventDefault' 阻止默认, '' 阻止冒泡和阻止默认*/
		this.oEventMask.init(el, 'stopPropagation');
	};
	this.callback;
	oM.addEventListener('touchstart', function() {
		_this.clear();
	}, false);
}
Mask.prototype.oEventMask = {
	init: function(obj, which) {
		which && (obj.removeEventType = which);
		obj.addEventListener('touchstart', this.removeEvent, false);
		obj.addEventListener('touchmove', this.removeEvent, false);
	},
	removeEvent: function(e) {
		if (this.removeEventType) {
			if (this.removeEventType == 'stopPropagation') {
				e.stopPropagation();
				return;
			} else {
				e.preventDefault();
			}
		} else {
			e.stopPropagation();
			e.preventDefault();
		}
	}
}

/* 弹出自动隐藏提示框*/
function pzToast(content, result) {
	var oBody = document.getElementsByTagName("body")[0];
	if (oBody.pzToast) return;
	var _class = result ? 'pz-toast-right' : 'pz-toast-wrong';
	var html = "<div class='" + _class + "'><h2>" + content + "</h2></div>";
	var oDiv = document.createElement("div");
	oDiv.innerHTML = html;
	var oContent = oDiv.children[0];
	oContent.style.left=(oBody.offsetWidth-230)/2+'px';
	oBody.appendChild(oContent);
	oBody.pzToast = true;
	setTimeout(function() {
		oContent.style.opacity = 1;
	}, 10)
	setTimeout(function() {
		oContent.style.opacity = 0;
		setTimeout(function() {
			oBody.removeChild(oContent);
			oBody.pzToast = false;
		}, 330);
	}, 1200)
}

/* 弹出确认框  调用返回一个确认弹出框元素带处理事件
 * @param {String} content 提示的内容
 * @param {Object} oMask 本js中的 function oMask 实例
 * @param {Function} fn 回调函数  确认返回true 取消返回false*/
function pzConfirm(content, oMask, fn ,obj) {
	var oBody = document.getElementsByTagName("body")[0];
	var oDiv = document.createElement("div");
	var html = "<div class='pz-confirm'><div id='c-content'><h2>" + content + "</h2></div><div class='clearfix'><a class='pz-btn sure'>确认</a><a class='pz-btn cancel'>取消</a></div><div id='cancel'></div></div>";
	oDiv.innerHTML = html;
	var oContent = oDiv.children[0];
	oContent.querySelector('#cancel').addEventListener('touchend', function() {
		oMask.clear();
	}, false);
	oContent.querySelector('.pz-btn.sure').addEventListener('touchend', function() {
		if(obj){
			fn && fn.call(obj,true);
		}else{
			fn && fn(true);
		}	
		oContent.able=true;
		oMask.callback&&oMask.callback();
		oMask.clear();
	}, false);
	oContent.querySelector('.pz-btn.cancel').addEventListener('touchend', function() {
		if(obj){
			fn && fn.call(obj,false);
		}else{
			fn && fn(false);
		}	
		oContent.able=false;
		oMask.clear();
	}, false);
	oContent.changeInnerText=function(txt){
		oContent.querySelector('#c-content').innerText=txt;
	}
	return oContent;
}

/*input value清空控件 */
function clearInput(){
	var aInput=web.qsa('input[type=text],input[type=number],input[type=password]');
	var html='<span class="pz-input-del"></span>';
	for(var i=0; i<aInput.length ;i++){
		var o=document.createElement('div');
		o.innerHTML=html;
		var oInput=o.children[0],oParent=aInput[i].parentNode;
		if(oParent.children.length==1){
			oParent.appendChild(oInput);
			oParent.style.position='relative';
			aInput[i].addEventListener('input',showDel,false);
			oInput.addEventListener('touchend',del,false);
		}
	}
	function del(e){
		e.preventDefault();
		var o=this.parentNode.querySelector('input');
		o.value='';
		this.style.opacity=0;
	}
	function showDel(){
		var oDel=this.parentNode.querySelector('.pz-input-del');
		if(this.value!=''){
			oDel.style.opacity=1;
		}else{
			oDel.style.opacity=0;
		}
	}
}
clearInput();

/* data数据编码*/
function encodeData(j){
	/*for(keys in j){
		if(keys!='file'){
			j[keys]=encodeURIComponent(j[keys])
		}
	}*/
	return j;
}

function post(j){
	if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
		return pzToast("连接网络失败，请稍后再试");
	}
	
	if(isDebug){console.log('发送 '+/[^0-9]*$/g.exec(j.url)+' :'+JSON.stringify(j.data))}
	
	if(j.waiting===true){
		j.waiting=plus.nativeUI.showWaiting('',{padlock:true});
	}
	if(j.waitOver){
		j.waiting.onclose=j.waitOver;
	}
	mui.ajax(j.url, {
		data: encodeData(j.data),
		dataType: 'json', 
		type: 'post',
		timeout: 10000, 
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		success: function(data) {
			
			if(isDebug){console.log('接收: '+JSON.stringify(data))}
			
			j.waiting&&j.waiting.close();
			
			if(data.code==0){
				j.success(data);
			}else{
				pzToast(data.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			j.waiting&&j.waiting.close();
			j.error&&j.error();
			pzToast('warning : '+type+' , '+errorThrown+' !'); 
		}
	});
}

var upPicFromGallery={
		options:{
			/*server: upPic,//服务器地址：图片文件->服务器 
			showBox: web.qs('.per-photo'),//图片预览容器
			fileKey: 'upfile',//api 图片键名
			type: "avatar",//api 图片干啥用的
			ratio: 0.6, //比例压缩 可选
			width:'640px', //宽高压缩 可选
			height:'384px' ,//比例压缩->宽高压缩
			uploadSuccess: null //图片url->服务器 成功回调 */
		},
		selectMethod:function (){
			var _this=this;
			if(mui.os.plus){
				var a = [{
					title: "拍照"
				}, {
					title: "从手机相册选择"
				}];
				plus.nativeUI.actionSheet({
					title: "上传图片",
					cancel: "取消",
					buttons: a
				}, function(b) {
					switch (b.index) {
						case 0:
							break;
						case 1:
							_this.appendByCamera();
							break;
						case 2:
							_this.appendByGallery();
							break;
						default:
							break
					}
				})	
			}
		},
		// 从相机添加文件 
		appendByCamera:function(){
			var _this=this;
			var c = plus.camera.getCamera();
			c.captureImage(function(e) {
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					var s = entry.toLocalURL();
					_this.readSucceed(s);
					//console.log(s);
				}, function(e) {
					//console.log("读取拍照文件错误：" + e.message);
				});
			}, function(s) {
				//console.log("error" + s);
			}, {
				filename: "_doc/temp.jpg"
			})
		},
		// 从相册添加文件 
		appendByGallery:function(){
			var _this=this;
			plus.gallery.pick(function(e){
					_this.readSucceed(e);
				}, function(e) {
				mui.toast(e.message);
			},{});
		},
		readSucceed:function(e) {
			var _this=this;
			var name = e.substr(e.lastIndexOf('/') + 1);
			var img=new Image();
			var wt=plus.nativeUI.showWaiting();
			img.src=e;
			img.onload=function(){
				console.log('width:'+img.width+"  height:"+img.height);
				//console.log(JSON.stringify(_this.clip(img.width,img.height)));
				EXIF.getData(img, function(){
				  EXIF.getAllTags(this);
				  //alert(EXIF.getTag(this, 'Orientation')) 
				});
				var options={
					src: e,
					dst: '_doc/' + name,
					overwrite: true,
					quality: 80 
				}
				if(_this.options.ratio){
					options.clip=_this.clip(img.width,img.height)
				}
				plus.zip.compressImage(options, function(zip) {
					if(_this.options.width&&_this.options.height){//如果指定了宽高 再压缩
						name = zip.target.substr(zip.target.lastIndexOf('/') + 1);
						plus.zip.compressImage({
							src: zip.target,
							dst: '_doc/' + name,
							overwrite: true,
							quality: 80,
							width: _this.options.width,
							height: _this.options.height,
						},function(zip){
							_this.options.showBox.style.backgroundImage='url('+zip.target+')';
							wt.close()
							_this.upload({path:zip.target});//发送
						},function(){pzToast('压缩失败！')})
					}else{
						if (zip.size > (2*1024*1024)) {
							return pzToast('文件不超过2M,请重新选择！');
						}
						if(Math.min(zip.width,zip.height)<360){
							return pzToast('请上传尺寸大于600*360的图片！');
						}
						_this.options.showBox.style.backgroundImage='url('+zip.target+')';
						wt.close()
						_this.upload({path:zip.target});//发送
					}
				}, function(zipe) {pzToast('压缩失败！')});
				img=null;
			};
		},
		// 上传文件
		upload:function (file){
			var _this=this;
			if(!file){
				return pzToast("没有添加上传文件！");;
			}
			var wt=plus.nativeUI.showWaiting();
			var task=plus.uploader.createUpload(this.options.server,
				{method:"POST"},
				function(t,status){ //上传完成
					//console.log(JSON.stringify(t.responseText));
					if(status==200){
						wt.close();
						_this.options.uploadSuccess&&_this.options.uploadSuccess(JSON.parse(t.responseText).data)
						_this.options=null;
					}else{
						console.log("上传失败："+status);
					}
				}
			);
			task.addFile(file.path,{key:_this.options.fileKey});
			task.addData("type",_this.options.type);
			task.start();
		},
		//裁剪规格
		clip:function (w,h){
			var tw=Math.max(w,h);
			var th=Math.min(w,h);
			var ratio=this.options.ratio;
			console.log(th+'   '+this.options.ratio)
			if(th>=tw*ratio){
				return {width: tw+'px', height: parseInt(tw*ratio)+'px', left: 0+'px' , top: parseInt((th-tw*ratio)/2)+'px'}
			}else{
				return {width: parseInt(th/ratio)+'px' , height: th+'px', left: parseInt((tw-th/ratio)/2)+'px' , top: 0+'px'}
			}
		}
		
	}

/* 简单的swiper*/
function PzSlider(sel, j) {
	var oBox = null,
		oSlider = null,
		oSliderItem = null,
		oHammer = null,
		timer = null,
		oBox_W,
		now = 0,
		tar_X = 0,
		tempX = 0,
		len,
		moving = false,
		isFocus = true;
	oBox = web.qs(sel);
	oSlider = oBox.children[0];
	aSliderItem = oSlider.children;

	len = oSlider.children.length;

	function init() {
		oBox_W = oBox.offsetWidth;
		oSlider.style.width = len * oBox_W + 'px';
		for (var i = 0; i < len; i++) {
			aSliderItem[i].style.width = oBox_W + 'px';
		}
	}
	init();

	oHammer = new Hammer(oBox);
	oHammer.on('panmove panend', onPan);
	oHammer.on('swipeleft swiperight', onSwipe);

	function onPan(e) {
		oSlider.classList.remove('ani');
		updateTransform((tar_X + e.deltaX) + 'px');
		dragingCB(e.deltaX / oBox_W);
		tempX = e.deltaX
		if (e.type == 'panend') {
			if (tempX <= -oBox_W / 2 && now != len - 1) { //left, > middle limit update tar_X
				now++;
				tar_X += -oBox_W;
				slideOverCB(now)
			} else if (tempX > oBox_W / 2 && now != 0) { //right
				now--;
				tar_X += oBox_W;
				slideOverCB(now)
			}
			oSlider.classList.add('ani');
			updateTransform(tar_X + 'px');
		}
	}

	function onSwipe(e) {
		if (e.type == 'swipeleft' && now != len - 1) { //< middle limit update tar_X
			if (tempX > -oBox_W / 2) {
				now++;
				tar_X += -oBox_W;
				slideOverCB(now);
			}
		} else if (e.type == 'swiperight' && now != 0) {
			if (tempX <= oBox_W / 2) {
				now--;
				tar_X += oBox_W;
				slideOverCB(now);
			}
		}
		updateTransform(tar_X + 'px');
	}

	function slideOverCB(idx) {
		j.slideOverFn && j.slideOverFn(idx);
	}

	function dragingCB(per) {
		j.dragingFn && j.dragingFn(idx);
	}

	function updateTransform(value) {
		oSlider.style.left = value;
		oSlider.style.left = value;
		ticking = false;
	}
}

/*上传进度提示*/
function ProgressMask(json,parentEle){
	this.ele=document.createElement('p');
	this.json=json;
	this._css={
		position: 'absolute',
		left: '2px',
		top: '3px',
		background: 'rgba(0,0,0,.2)',
		textAlign: 'center',
		zIndex: 10,
		height: this.json.height+'px',
		width: this.json.width+'px',
		lineHeight: this.json.height+'px',
	};
	this.init=function(){
		for(var i in this._css){
			this.ele.style[i]=this._css[i];
		}
		parentEle.appendChild(this.ele);
	};
	this.progress=function(progress){
		this.ele.style.height=this.json.height*(1-progress)+'px';
		this.ele.innerHTML=100*progress+'%';
	}
	this.remove=function(){
		parentEle.removeChild(this.ele);
	}
}

var shareModule={
	options: null,//{href:,title:,content:,pictures:,thumbs:}
	shares:null,
	updateSerivces:function (){
		var _this=this;
		plus.share.getServices( function(s){
			_this.shares={};
			for(var i in s){
				var t=s[i];
				_this.shares[t.id]=t;
			}
		}, function(e){
			plus.nativeUI.toast( "获取分享服务列表失败！");
		} );
	},
	shareShow:function (mask){
		var shareBts=[],ss=this.shares['weixin'],_this=this;
		ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
		shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
		/*ss=this.shares['sinaweibo'];
		ss&&shareBts.push({title:'新浪微博',s:ss});
		ss=this.shares['qq'];
		ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});*/
		mask&&mask.clear();
		shareBts.length>0?plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts},function(e){
			(e.index>0)&&_this.shareAction(shareBts[e.index-1],false);
		}):plus.nativeUI.toast('不支持分享操作！');
	},
	shareAction: function(sb) {
		var _this=this;
		if(!sb||!sb.s){
			plus.nativeUI.toast( "无效的分享服务！" );return;
		}
		var msg=this.options||{}
			msg.extra={scene:sb.x}
		// 发送分享
		if ( sb.s.authenticated ) {
			this.shareMessage(msg,sb.s);
		} else {
			sb.s.authorize( function(){
					_this.shareMessage(msg,sb.s);
				},function(e){
				plus.nativeUI.toast( "认证授权失败！");
			});
		}
	},
	shareMessage:function(msg,s){
		s.send( msg, function(){
			plus.nativeUI.toast( "分享到\""+s.description+"\"成功！ " );
		}, function(e){
			plus.nativeUI.toast( "分享到\""+s.description+"\"失败！" );
		} );
	}
}

/*调试*/
function LogMsg(data){
	var str = "";
	if(typeof data === "object"){
		for(var prop in data){
			str += (str.length > 0 ? "," : "") + '"' + prop + '":"' + data[prop] + '"'; 
		}
		str = "{" + str + "}";
	}else{
		str = data.toString();
	}
	console.log(str);
}

