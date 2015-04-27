'use strict';

var usershipmentaddressinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},
	
	_address : {},
	_icon : null,
	
	onMounting : function() {
		this._address = {
			street : this._props.user.shipment_address,
			city : this._props.user.shipment_city,
			state : this._props.user.shipment_state,
			country : this._props.user.shipment_country,
			zip : this._props.user.shipment_zip,
		};
	},
	
	_onStreetChanged : function(event) {
		return this._onTextChanged('street', event);
	},
	_onCityChanged : function(event) {
		return this._onTextChanged('city', event);
	},
	_onStateChanged : function(event) {
		return this._onTextChanged('state', event);
	},
	_onCountryChanged : function(event) {
		return this._onTextChanged('country', event);
	},
	_onZipChanged : function(event) {
		return this._onTextChanged('zip', event);
	},
	
	_onTextChanged : function(type, event) {
		var toggle = false;
		if (event.target) {
			if ((this._address[type] && !event.target.value) ||
				(!this._address[type] && event.target.value)) {
				toggle = true;	
			}
			this._address[type] = event.target.value;
		}
		if (toggle && this._icon) {
			this._icon.renderComponent();
		}
	},
	
	_getIcon : function(instance) {
		this._icon = instance;
	},
	
	_isActive : function() {
		return this._address.street ||
				this._address.city ||
				this._address.state ||
				this._address.country ||
				this._address.zip;
	},
	
	render : function() {
		var icon = '<toggleicon icon="img/ship_gray.png" activeicon="img/ship_blue.png" activetrigger={this._isActive} getinstance={this._getIcon}></toggleicon>';
		
		if (this._props.mode === 'display') {
			var addressList = [];
			if (this._address.street) {
				addressList.push(this._address.street);
			}
			if (this._address.city) {
				addressList.push(this._address.city);
			}
			if (this._address.state) {
				addressList.push(this._address.state);
			}
			if (this._address.country) {
				addressList.push(this._address.country);
			}
			if (this._address.zip) {
				addressList.push(this._address.zip);
			}
			return ('\
				<div>' + 
					icon + 
					'<div class="__Customer__detailsContentText">' +
						addressList.join(', ') +
					'</div>\
				</div>\
			');
		}
		
		var addressList = [];
		addressList.push('<input class="__Customer__itemInput" type="text" name="shipment_address" value={this._address.street} placeholder="Shipment Street Address" onkeyup={this._onStreetChanged}></input>');
		addressList.push('<input class="__Customer__itemInput2" type="text" name="shipment_city" value={this._address.city} placeholder="City" onkeyup={this._onCityChanged}></input>');
		addressList.push('<input class="__Customer__itemInput2" type="text" name="shipment_state" value={this._address.state} placeholder="State" onkeyup={this._onStateChanged}></input>');
		addressList.push('<input class="__Customer__itemInput2" type="text" name="shipment_country" value={this._address.country} placeholder="Country" onkeyup={this._onCountryChanged}></input>');
		addressList.push('<input class="__Customer__itemInput2" type="text" name="shipment_zip" value={this._address.zip} placeholder="Zip" onkeyup={this._onZipChanged}></input>');

		return (
			'<div>' +
				icon +
				addressList.join(' ') + 
			'</div>'
		);
	}
});
