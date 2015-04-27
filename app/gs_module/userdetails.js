'use strict';

var userdetails = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'oneditclick' : null,
	},
	
	_onEditClick : function(event) {
		if (this._props.oneditclick) {
			this._props.oneditclick();
		}
	},
	
	render : function() {
		return ('\
	  		<div class="__Customer__detailContainer">\
				<UserNameInput class="__Customer__detailName" user={this._props.user}></UserNameInput>\
	    		<div class="__Customer__editCustomer" onclick={this._onEditClick}>Edit</div>\
	    		<div class="__Customer__decorationSeperator"></div>\
	    		<div class="__Customer__detailCompanyName">\
	      			{this._props.user.company_name}\
	    		</div>\
				<UserEmailInput class="__Customer__details" user={this._props.user}></UserEmailInput>\
	    		<UserMobilePhoneInput class="__Customer__details" user={this._props.user}></UserMobilePhoneInput>\
	    		<UserTelephoneInput class="__Customer__details" user={this._props.user}></UserTelephoneInput>\
	    		<UserAddressInput class="__Customer__details" user={this._props.user}></UserAddressInput>\
	    		<UserShipmentAddressInput class="__Customer__details" user={this._props.user}></UserShipmentAddressInput>\
	  		</div>\
		');
	}
});
