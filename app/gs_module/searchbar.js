'use strict';

var searchbar = GSModule.create({
	
	_propsDef : {
		"onsearch" : null,
		'onaddclicked' : null
	},
	
	_onKeyUp : function(event) {
		if (this._props.onsearch) {
			this._props.onsearch(event.target.value);
		}
	},
	
	_onClick : function(event) {
		if (this._props.onaddclicked) {
			this._props.onaddclicked(event);
		}
	},
	
	render : function() {
		return ('\
			<div>\
				<button class="__Customer__addCustomer" onclick={this._onClick}>+</button>\
				<input class="__Customer__searchInput" placeholder="Search Customer" onkeyup={this._onKeyUp}></input>\
				<div class="__Customer__SearchBn">Search</div>\
			</div>\
		');
	}
});