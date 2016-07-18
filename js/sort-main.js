var oSortBoard = {
	oBrand: web.qs('.brand'),
	oSort: web.qs('.sort'),
	init: function() {
		var _this = this;
		this.oBrand.addEventListener('tap', function() { //the triangle animation
			if (this.dataset.flag == 1) {
				_this.brandClose();
			} else {
				if (/car-selling\.html/.test(app.self().getURL())){//send current page url
					app.VW('sort-page.html').evalJS('openerHref="car-selling.html";oSortBoard.sortClose();');
				}
				else{
					app.VW('sort-page.html').evalJS('openerHref="car-special-selling.html";oSortBoard.sortClose();');
				}
				
				app.VW('sort-page.html').evalJS('oSortBoard.brandOpen();');
				setTimeout(function(){
					_this.brandOpen();
					_this.sortClose();
				},50);
			}
		}, false);
		this.oSort.addEventListener('tap', function() {
			if (this.dataset.flag == 1) {
				_this.sortClose();
			} else {
				if (/car-selling\.html/.test(app.self().getURL())){
					app.VW('sort-page.html').evalJS('openerHref="car-selling.html";oSortBoard.brandClose();');
				}
				else{
					app.VW('sort-page.html').evalJS('openerHref="car-special-selling.html";oSortBoard.brandClose();');
				}
				
				app.VW('sort-page.html').evalJS('oSortBoard.sortOpen();');
				setTimeout(function(){
					_this.sortOpen();
					_this.brandClose();
				},50);
			}
		}, false);
	},
	turn: function(obj, v) {
		web.setStyle3(obj.children[1].children[0], 'transform', v);
	},
	brandOpen: function() {
		if (this.oSort.dataset.flag == 0) {//config the other one status
			app.VW('sort-page.html').show('slide-in-bottom', 250);
		}
		this.turn(this.oBrand, 'rotate(180deg)');
		this.oBrand.dataset.flag = 1;
	},
	sortOpen: function() {
		if (this.oBrand.dataset.flag == 0) {
			app.VW('sort-page.html').show('slide-in-bottom', 250);
		}
		this.turn(this.oSort, 'rotate(180deg)');
		this.oSort.dataset.flag = 1;
	},
	brandClose: function() {
		if (this.oSort.dataset.flag == 0) {
			app.VW('sort-page.html').hide('slide-out-bottom', 250);
		}
		this.turn(this.oBrand, '');
		this.oBrand.dataset.flag = 0;
	},
	sortClose: function() {
		if (this.oBrand.dataset.flag == 0) {
			app.VW('sort-page.html').hide('slide-out-bottom', 250);
		}
		this.turn(this.oSort, '');
		this.oSort.dataset.flag = 0;
	},
	clear: function() { //close all
		app.VW('sort-page.html').hide('slide-out-bottom', 250);
		this.turn(this.oBrand, '');
		this.oBrand.dataset.flag = 0;
		this.turn(this.oSort, '');
		this.oSort.dataset.flag = 0;
	}
}
oSortBoard.init();