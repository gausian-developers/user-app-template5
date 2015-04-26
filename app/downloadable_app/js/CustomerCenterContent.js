'use strict';

var customercentercontent = GSModule.create({
	
	_selectedCustomer : {},
	
	render : function() {
		this._selectedCustomer = CustomerDataStore.get('selectedCustomer', this);
		if (!jQuery.isEmptyObject(this._selectedCustomer)) {
			return ('<UserDetails user={this._selectedCustomer}></UserDetails>');
		}
		return ('<WelcomePage class="__Customer__welcome" path="js/WelcomePage.js"></WelcomePage>');
	}
});
