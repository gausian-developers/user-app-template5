'use strict';

var userdetailsedit = GSModule.create({
	
	_propsDef : {
		'user' : {}
	},
	
	render : function() {
		return ('\
	  		<div class="__Customer__detailContainer">\
				<form class="__Customer__infoForm">\
	    			<UserNameInput class="__Customer__detailName" user={this._props.user}></UserNameInput>\
					<div class="__Customer__saveCustomer" type="button">Save</div>\
					<div class="__Customer__deleteCustomer" type="button">Delete this customer</div>\
	    			<div class="__Customer__decorationSeperator"></div>\
	    			<div class="__Customer__detailCompanyName">\
	      				{this._props.user.company_name}\
	    			</div>\
	    			<UserEmailInput class="__Customer__details" user={this._props.user} mode="edit"></UserEmailInput>\
		    		<UserMobilePhoneInput class="__Customer__details" user={this._props.user} mode="edit"></UserMobilePhoneInput>\
		    		<UserTelephoneInput class="__Customer__details" user={this._props.user} mode="edit"></UserTelephoneInput>\
		    		<UserAddressInput class="__Customer__details" user={this._props.user} mode="edit"></UserAddressInput>\
		    		<UserShipmentAddressInput class="__Customer__details" user={this._props.user} mode="edit"></UserShipmentAddressInput>\
				</form>\
	  		</div>\
		');
	}
});
