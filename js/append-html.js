function appendHtml(options,fnList) {//父元素，响应的的数据，注册函数列表
	var html='',temp = document.createDocumentFragment();
	var carArray=options.data||[],parent=options.parent,type=options.type;
	carArray.forEach(function(j,idx){
		var desc = j.carName + '|' + (j.attrs.length!=1?'多色':j.attrs[0].outsideColor); 
		var lose = '',price = '',config = '';
		if(j.attrs[0].salePriceType==1){
			if (j.attrs[0].quoteType == 1) {
				price = '上:' + j.attrs[0].saleAmount+'%';
			} else {
				price = '下:' + j.attrs[0].saleAmount+'%';
			}
		}else{
			if (j.attrs[0].quoteType == 1) {
				price = '上:' + (j.attrs[0].saleAmount / 10000)+'万元'
			} else {
				price = '下:' + (j.attrs[0].saleAmount / 10000)+'万元'
			}
		}
		if(j.isOffical){
			config='offical';
		}else{
			j.addUserAuth?(config = 'ided'):(config = 'id') ;
		}
		
		if (j.status == 0) {
			lose = '<span id="lose">已失效</span>';
		}
		if(type==='carList'){
			html += '<li class="car-item" data-carId="'+j.carId+'">'+
						'<div style="background-image:url(' + j.pic + ')"/></div>'+
						'<div>'+
							'<div><h2 class="b ' + config + '" >' + j.brandName+' '+j.catName + '</h2><span>' + j.addTime + '</span></div>'+
							'<div><h4 class="carName">' + desc + '</h4></div>'+
							'<div></div>'+
							'<div><h2 class="b guan" >'+(parseInt(j.officalPrice )/ 10000)+'万元</h2><h5 class="b hang">'+ price +'</h5></div>'+
						'</div>'+
					'</li>';
		}else if(type==='myCar'){
			html += '<li class="car-item" data-orderId="'+j.orderId+'" data-buryerId="'+j.buyerId+'" data-deposit="'+j.sellerDeposit+'">'+
						'<ul class="pz-ul"><li><h3>'+(j.orderSn?('订单号：'+j.orderSn):'')+'</h3><h4>'+(j.statusRemark?j.statusRemark:'')+'</h4></li></ul>'+
						'<div style="background-image:url(' + j.pic + ')"/></div>'+
						'<div>'+
							'<div><h2 class="b ' + config + '" >' + j.brandName+' '+j.catName + '</h2><span>' + j.addTime + '</span></div>'+
							'<div><h4 class="carName">' + desc + '</h4></div>'+
							'<div></div>'+
							'<div><h2 class="b guan" >'+(parseInt(j.officalPrice )/ 10000)+'万元</h2><h5 class="b hang">'+ price +'</h5></div>'+
						'</div>'
					if(j.operate!=0){
						html+='<div>';
						var flag=false,new_array=[];
						/*灰色按钮居左*/
						j.operate.forEach(function(item){
							if(item=='reject'){
								new_array.push(item);
							}else{
								new_array.unshift(item);
							}
						})
						new_array.forEach(function(item,idx){
							if(item=='contact_buyer'){
								html+='<div class="pz-btn contact-buyer" data-tel="tel:'+j.buyerPhone+'">联系买家</div>';flag=true;
							}else if(item=='notify_receive'){
								html+='<div class="pz-btn notify-receive">提醒收货</div>';flag=true;
							}else if(item=='accept'){
								html+='<div class="pz-btn accept">同意交易</div>';flag=true;
							}else if(item=='reject'){
								html+='<div class="pz-btn reject pz-btn-grey">拒绝交易</div>';flag=true;
							}
						})
						if(flag){
							html+='</div>'
						}else{
							html=html.replace(/<div>$/,'');
						}
					}
				html += '</li>';
		}else if(type==='myFavs'){
			html += '<li data-collectid="'+j.collectId+'" class="car-item" data-carId="'+j.carId+'">'+
						'<div style="background-image:url(' + j.pic + ')"/></div>'+
						'<div>'+
							'<div><h2 class="b ' + config + '">' + j.brandName+' '+j.catName + '</h2><span>' + j.addTime + '</span></div>'+
							'<div><h4 class="carName">' + desc + '</h4></div>'+
							'<div>' + lose + '</div>'+
							'<div><h2 class="b guan officalPrice" >' + (parseInt(j.officalPrice )/ 10000) + '万元</h2><h5 data-collectid="'+j.collectId+'" class="del"></h5><h5 class="b hang saleAmount">' + price +'</h5></div>' +
						'</div>'+
					'</li>';
		}else if(type==='specialList'){
			var pos='r',favs='favs';
			if(idx%2==0){
				var pos='l';
			}
			if(j.collectId>0){
				favs='favsed';
			}
			html+='<li class="'+pos+' a" data-href="car-details.html" data-type="common" data-carId="'+j.carId+'">'+
					'<div>'+
						'<div style="background-image:url('+j.pic+')"></div>'+
						'<div><h2>'+j.carName + ' ' + (j.attrs.length!=1?'多色':j.attrs[0].outsideColor) +'</h2></div>'+
						'<div><h5>'+ price +'</h5><h4 class="'+favs+'">'+j.collectCount+'</h4></div>'+
					'</div>'+
					'<div><h4>发布时间:'+j.addTime+'</h4></div>'+
				'</li>'
		}
	});
	
		var oContainer=document.createElement('div');
		oContainer.innerHTML=html;
		if(fnList){//注册事件
			for(selector in fnList){
				mui.each(oContainer.querySelectorAll(selector),function(){
					this.addEventListener('tap',fnList[selector],false);
				})
			}
		}
		mui(oContainer.children).each(function(){
			temp.appendChild(this);
		});
		if(options.upToLoad||parent.children.length==0){//上拉加载或首次刷新加载
			parent.appendChild(temp);
		}else{
			parent.insertBefore(temp,parent.children[0])			
		}
		oContainer=null;temp=null;
}