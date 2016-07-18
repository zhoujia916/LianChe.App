function selectColor(officalPirce,q) { //内外饰 数量 优惠 耦合关系
	function noRepeat(r,attr){//取出不重复的内外颜色
		var temp=[],j={};
		for(var i=0; i<r.length;i++){
			var reg=new RegExp(r[i][attr],'g');
			if(!reg.test(temp.toString())){
				temp.push(r[i][attr]);
			}
		}
		temp.forEach(function(item){
			j[item]={};
		})
		return j;
	}
	
	function matchInnerColor(r,a){//内饰对应的颜色
		for(color in a){
			var temp=[],count=0;
			for(var i=0;i<r.length;i++){
				if(r[i].insideColor==color){
					var j={};
					var reg=new RegExp(r[i].outsideColor,'g');
					if(!reg.test(temp.toString())){
						temp[count]={};
						temp[count].outsideColor=r[i].outsideColor;
						temp[count].saleAmount=r[i].saleAmount;
						temp[count].carAttrId=r[i].carAttrId;
						temp[count].totalNumber=r[i].totalNumber;
						temp[count].salePriceType=r[i].salePriceType;
						temp[count].quoteType=r[i].quoteType;
						count++;
					}
				}
			}
			a[color]=temp;
		}
		return a;
	}
	function matchOuterColor(r,a){//外饰对应的颜色
		for(color in a){
			var temp=[],count=0;
			for(var i=0;i<r.length;i++){
				if(r[i].outsideColor==color){
					var j={};
					var reg=new RegExp(r[i].insideColor,'g');
					if(!reg.test(temp.toString())){
						temp[count]={};
						temp[count].insideColor=r[i].insideColor;
						temp[count].saleAmount=r[i].saleAmount;
						temp[count].carAttrId=r[i].carAttrId;
						temp[count].totalNumber=r[i].totalNumber;
						temp[count].salePriceType=r[i].salePriceType;
						temp[count].quoteType=r[i].quoteType;
						count++;
					}
				}
			}
			a[color]=temp;
		}
		return a;
	}
	
	function changeSelectedCarInfo(list,str){
		var result;
		for(var i=0; i<list.length; i++){//确定车的款式
			//console.log(list[i].outsideColor+' '+list[i].insideColor+' '+str)
			if(list[i].outsideColor==str||list[i].insideColor==str){
				result=list[i];break;
			}
		}
		if(!result) return;
		if(result.quoteType==1){//上涨
			if(result.salePriceType==2){//元
				web.qs('#price').innerText=(parseInt(officalPirce)+parseInt(result.saleAmount))/10000+'万元';
			}else{//%
				web.qs('#price').innerText=(parseInt(officalPirce)*(1+parseFloat(result.saleAmount)/100))/10000+'万元';
			}
		}else{//下降
			if(result.salePriceType==2){//元
				web.qs('#price').innerText=(parseInt(officalPirce)-parseInt(result.saleAmount))/10000+'万元';
			}else{//%
				web.qs('#price').innerText=(parseInt(officalPirce)*(1-parseFloat(result.saleAmount)/100))/10000+'万元';
			}
		}
		web.qs('#carNumb').innerText=result.totalNumber;
		orderDetails.carAttrId=result.carAttrId;//车的属性
		orderDetails.totalPrice=parseFloat(web.qs('#price').innerText)*10000*parseInt(web.qs('.pz-select .pz-numbox-input').value);//总共的价格
		orderDetails.totalNumber=parseInt(web.qs('.pz-select .pz-numbox-input').value)
	}
	
	mui('#outercolor').off();
	mui('#innercolor').off();
	web.qs('#outercolor').innerHTML = ''; 
	web.qs('#innercolor').innerHTML = '';
	var outerList=noRepeat(q,'outsideColor');
	var innerList=noRepeat(q,'insideColor');
	var matchOuterList= matchOuterColor(q,outerList);//外饰对应的颜色
	var matchInnerList= matchInnerColor(q,innerList);
	web.qs('#price').innerText = parseFloat(officalPirce)/10000+'万元';
	var outIdx=0,inIdx=0;
	for (color in outerList) {
		web.qs('#outercolor').innerHTML += '<div data-idx="'+(outIdx++)+'"><h3>' + color + '</h3></div>';
	}
	for (color in innerList) {
		web.qs('#innercolor').innerHTML += '<div data-idx="'+(inIdx++)+'"><h3>' + color + '</h3></div>';
	}
	var outer = document.getElementById('outercolor');
	var inner = document.getElementById('innercolor');
	var outerSelected=false,innerSelected=false,innerNow,outerNow;
	mui('#outercolor').on('touchend', 'div', function() {
		if(this.dataset.idx==outerNow){//外饰已经选中的，点击取消外饰
			if(!innerSelected){//内饰没有选中
				mui('#innercolor div').each(function(){
					this.className = '';
					this.style.opacity=1;
				});
				mui('#outercolor div').each(function(){
					this.className = '';
					this.style.opacity=1;
				});
			}else{//内饰已经选中
				var list=matchInnerList[web.qsa('#innercolor div')[innerNow].innerText];
				mui('#outercolor div').each(function(){//内饰对应的外饰
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].outsideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				mui('#innercolor div').each(function(){
					this.style.opacity=1;
				});
			}
			this.className = '';
			outerSelected=false;
			outerNow=-1
		}else{//外饰没有选中，点击选外饰
			if(!innerSelected){//内饰没有选中
				var list=matchOuterList[this.innerText];
				mui('#innercolor div').each(function(){
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].insideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				mui('#outercolor div').each(function(){
					this.className = '';
				});
				this.className = 'pz-select-active';
				outerSelected=true;
				outerNow=this.dataset.idx;
			}else{//内饰选中
				if(web.getStyle(this,'opacity')!=1) return;
				mui('#outercolor div').each(function(){
					this.className = '';
				});
				var list=matchOuterList[this.innerText];//外饰对应的内饰
				mui('#innercolor div').each(function(){
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].insideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				this.className = 'pz-select-active';
				outerSelected=true;
				outerNow=this.dataset.idx;
				changeSelectedCarInfo(list,mui('#innercolor div')[innerNow].innerText);
			}
		}
	});
	mui('#innercolor').on('touchend', 'div', function() {
		if(this.dataset.idx==innerNow){//内饰已经选中，再次点击取消
			if(!outerSelected){//外饰没有选中
				mui('#innercolor div').each(function(){
					this.className = '';
					this.style.opacity=1;
				});
				mui('#outercolor div').each(function(){
					this.className = '';
					this.style.opacity=1;
				});
			}else{//外饰已经选中
				var list=matchOuterList[web.qsa('#outercolor div')[outerNow].innerText];
				mui('#innercolor div').each(function(){
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].insideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				mui('#outercolor div').each(function(){
					this.style.opacity=1;
				});
			}
			this.className = '';
			innerSelected=false;
			innerNow=-1
		}else{//点击 选择内饰
			if(!outerSelected){//外饰未选中
				var list=matchInnerList[this.innerText];
				mui('#outercolor div').each(function(){
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].outsideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				mui('#innercolor div').each(function(){
					this.className = '';
					this.style.opacity=1;
				});
				this.className = 'pz-select-active';
				innerSelected=true;
				innerNow=this.dataset.idx;
			}else{//外饰已经选中
				if(web.getStyle(this,'opacity')!=1) return;
				mui('#innercolor div').each(function(){
					this.className = '';
				});
				var list=matchInnerList[this.innerText];
				mui('#outercolor div').each(function(){
					this.style.opacity='0.5';
					for(var i=0; i<list.length; i++){
						if(this.innerText==list[i].outsideColor){
							this.style.opacity=1;
							continue;
						}
					}
				});
				this.className = 'pz-select-active';
				innerSelected=true;
				innerNow=this.dataset.idx;
				changeSelectedCarInfo(list,mui('#outercolor div')[outerNow].innerText);
			}
		}
	});
	return web.qs('.pz-select'); 
}