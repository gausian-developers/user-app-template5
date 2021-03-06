'use strict';

var userdetailscreate = GSModule.create({
	
	_propsDef : {
		'onsaveclick' : null,
	},
	
	_onSaveClick : function(event) {
		if (this._props.onsaveclick) {
			var form = $(this._dom).find('form')[0];
			this._props.onsaveclick(form);
		}
	},
	
	render : function() {
		return ('\
	  		<div class="__Customer__newContainer">\
				<form class="__Customer__infoForm">\
					<div class="__Customer__detailName">\
			        	New Customer\
			      	</div>\
			      	<div class="__Customer__saveCustomer" type="button" onclick={this._onSaveClick}>Save</div>\
			      	<div class="__Customer__decorationSeperator"></div>\
	    			<UserNameInput class="__Customer__detailsFirst" mode="edit"></UserNameInput>\
	    			<UserEmailInput class="__Customer__details" mode="edit"></UserEmailInput>\
	    			<UserWebsiteInput class="__Customer__details" mode="edit"></UserWebsiteInput>\
		    		<UserMobilePhoneInput class="__Customer__details" mode="edit"></UserMobilePhoneInput>\
		    		<UserTelephoneInput class="__Customer__details" mode="edit"></UserTelephoneInput>\
		    		<UserAddressInput class="__Customer__details" mode="edit"></UserAddressInput>\
		    		<UserShipmentAddressInput class="__Customer__details" mode="edit"></UserShipmentAddressInput>\
				</form>\
	  		</div>\
		');
	}
});
