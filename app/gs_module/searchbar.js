'use strict';

var searchbar = GSModule.create({
	
	_propsDef : {
		"onsearch" : null,
	},
	
	_onKeyUp : function(event) {
		if (this._props.onsearch) {
			this._props.onsearch(event.target.value);
		}
	},
	
	render : function() {
		return ('\
			<div>\
				<button class="__Customer__addCustomer">+</button>\
				<input class="__Customer__searchInput" placeholder="Search Customer" onkeyup={this._onKeyUp}></input>\
				<div class="__Customer__SearchBn">Search</div>\
			</div>\
		');
	}
});