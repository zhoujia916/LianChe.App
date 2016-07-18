var oSortBoard = {	
	brandOpen: function() {
		this.sortClose();
		web.qs('#brand').style.zIndex = 50;
		web.qs('#brand').style.opacity=1;
	},
	sortOpen: function() {
		this.brandClose();
		web.qs("#sort").style.zIndex = 50;
		web.qs("#sort").style.opacity=1;
	},
	brandClose: function() {
		web.qs('#brand').style.zIndex = 1;
		web.qs('#brand').style.opacity=0;
	},
	sortClose: function() {
		web.qs("#sort").style.zIndex = 1;
		web.qs("#sort").style.opacity=0;
	}
};
 


