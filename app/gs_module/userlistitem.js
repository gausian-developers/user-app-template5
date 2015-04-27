'use strict';

var userlistitem = GSModule.create({
	_propsDef : {
		'user' : {},
		'onclicked' : null
	},
	
	_onClick : function(event) {
		if (this._props.onclicked) {
			this._props.onclicked(this._props.user);
		}
	},

	render : function() {
		return ('\
		  <div class="__Customer__listCustomers" onclick={this._onClick}>\
		  	<div class="__Customer__listCustomersName">\
				{this._props.user.first} {this._props.user.last}\
			</div>\
		    <div class="__Customer__listCustomersCompany">\
				{this._props.user.company_name}\
			</div>\
		  </div>\
		');
	}
});