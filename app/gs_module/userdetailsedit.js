'use strict';

var userdetailsedit = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'onsaveclick' : null,
		'ondeleteclick' : null,
	},
	
	_onSaveClick : function(event) {
		if (this._props.onsaveclick) {
			var form = $(this._dom).find('form')[0];
			this._props.onsaveclick(form);
		}
	},
	
	_onDeleteClick : function(event) {
		if (this._props.ondeleteclick) {
			this._props.ondeleteclick(this._props.user);
		}
	},
	
	render : function() {
		return ('\
	  		<div class="__Customer__detailContainer">\
				<form class="__Customer__infoForm">\
	    			<UserNameInput class="__Customer__detailName" user={this._props.user}></UserNameInput>\
					<div class="__Customer__saveCustomer" type="button" onclick={this._onSaveClick}>Save</div>\
					<div class="__Customer__deleteCustomer" type="button" onclick={this._onDeleteClick}>Delete this customer</div>\
	    			<div class="__Customer__decorationSeperator"></div>\
	    			<div class="__Customer__detailCompanyName">\
	      				{this._props.user.company_name}\
	    			</div>\
	    			<UserEmailInput class="__Customer__details" user={this._props.user} mode="edit"></UserEmailInput>\
					<UserWebsiteInput class="__Customer__details" user={this._props.user} mode="edit"></UserWebsiteInput>\
		    		<UserMobilePhoneInput class="__Customer__details" user={this._props.user} mode="edit"></UserMobilePhoneInput>\
		    		<UserTelephoneInput class="__Customer__details" user={this._props.user} mode="edit"></UserTelephoneInput>\
		    		<UserAddressInput class="__Customer__details" user={this._props.user} mode="edit"></UserAddressInput>\
		    		<UserShipmentAddressInput class="__Customer__details" user={this._props.user} mode="edit"></UserShipmentAddressInput>\
					<input type="hidden" name="id" value={this._props.user.id}></input>\
				</form>\
	  		</div>\
		');
	}
});
