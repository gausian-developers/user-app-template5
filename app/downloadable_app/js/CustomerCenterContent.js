'use strict';

var customercentercontent = GSModule.create({
	
	_selectedCustomer : {},
	
	_onEditClick : function() {
		CustomerDataStore.set({'displayMode' : 'edit'});
	},
	
	render : function() {
		this._selectedCustomer = CustomerDataStore.get('selectedCustomer', this);
		if (!jQuery.isEmptyObject(this._selectedCustomer)) {
			var mode = CustomerDataStore.get('displayMode', this);
			if (mode === 'display') {
				return ('<UserDetails user={this._selectedCustomer} oneditclick={this._onEditClick}></UserDetails>');
			} else {
				return ('<UserDetailsEdit user={this._selectedCustomer}></UserDetailsEdit>');
			}
		}
		return ('<WelcomePage class="__Customer__welcome" path="js/WelcomePage.js"></WelcomePage>');
	}
});
