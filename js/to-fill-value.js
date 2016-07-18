/**
 *从另一个页面get填写值 
 */
var oGet={
	option:{
		from: '',
		to: '',
		eleId: '',
		valueType: '',
		title:'',
		unit: ''
	},
	send:function(option){//发送填写要求
		var _this=this;
		for(a in option){
			this.option[a]=option[a];
		}
		if(mui.os.ios){
			app.openVW('fill-in.html');
			app.VW('fill-in.html').addEventListener('loaded',function(){
				mui.fire(app.VW('fill-in.html'), 'inform', option);
				app.VW('fill-in.html').evalJS('open_soft_keyboard()');
			});
		}else{
			plus.webview.show('fill-in.html',aniShow,250);
			mui.fire(app.VW('fill-in.html'), 'inform', option);
			app.VW('fill-in.html').evalJS('open_soft_keyboard()');
		}
	},
	get:function(r){//填写返回结果
		web.qs('#'+this.option.eleId).innerText=r.value+(this.option.unit||'');
	}
}
/**
 * 进入填写页面
 */
function wrireValueHandler(){
	var _this=this;
	var options={
		from: app.self().id, 
		to:'fill-in.html',
		eleId: _this.children[1].id,
		title: _this.children[0].innerText,
		valueType: _this.dataset.type||'text',
		unit: _this.dataset.unit
	}
	oGet.send(options);
}
function registerWrireValueHandler(){
	var a=web.qsa('.pz-ul .write-value');
	for(var i=0; i<a.length;i++){
		if(!a[i].hadRegister){//防止重复注册
			a[i].addEventListener('tap',wrireValueHandler,false);
			a[i].hadRegister=true;
		}
	}
}
registerWrireValueHandler();

