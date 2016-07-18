var readBrand={
	nowLetter: '',
	createGroup:function(letter){
		var oDiv=document.createElement('div');
		html='<li data-group="'+letter+'" class="mui-table-view-divider mui-indexed-list-group">'+letter+'</li>';
		oDiv.innerHTML=html;
		return oDiv.children[0];
	},
	createTag:function(id,logo,brandName,idx){
		var oDiv=document.createElement('div');
		html='<li data-brandId="'+id+'" class="pz-table-view-cell mui-indexed-list-item a" data-idx="'+idx+'"><span><img src="img/car/'+logo+'"/></span>'+brandName+'</li>';
		oDiv.innerHTML=html;
		return oDiv.children[0];
	},
	init:function(){
		var oF=document.createDocumentFragment();
		for(var i=0; i<allBrand.length; i++){
			if(this.nowLetter!=allBrand[i].letter){
				oF.appendChild(this.createGroup(allBrand[i].letter));
				this.nowLetter=allBrand[i].letter;
			}
			oF.appendChild(this.createTag(allBrand[i].brandId,allBrand[i].logo,allBrand[i].brandName,i));
		}
		web.qs('#brand-list').appendChild(oF);
		oF=null;
	}
}
readBrand.init();
