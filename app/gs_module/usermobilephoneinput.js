'use strict';

var usermobilephoneinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},

	_phone : null,
	_icon : null,
	
	onMounting : function() {
		this._phone = this._props.user.mobile_phone;
	},
	
	_onKeyUp : function(event) {
		var toggle = false;
		if (event.target) {
			if ((this._phone && !event.target.value) ||
				(!this._phone && event.target.value)) {
				toggle = true;	
			}
			this._phone = event.target.value;
		}
		if (toggle && this._icon) {
			this._icon.renderComponent();
		}
	},
	
	_getIcon : function(instance) {
		this._icon = instance;
	},
	
	_isActive : function() {
		return this._phone;
	},
	
	render : function() {
		var icon = '<toggleicon icon="img/mobile_gray.png" activeicon="img/mobile_blue.png" activetrigger={this._isActive} getinstance={this._getIcon}></toggleicon>';
		
		if (this._props.mode === 'display') {
			return ('\
				<div>' + 
					icon + 
					'<div class="__Customer__detailsContentText">\
						{this._phone}\
					</div>\
				</div>\
			');
		}
		
		return (
			'<div>' +
				icon +
				'<input class="__Customer__itemInput" type="text" name="mobile_phone" value={this._phone} placeholder="Mobile Phone" onkeyup={this._onKeyUp}></input>\
			</div>\
		');
	}
});
