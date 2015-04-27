'use strict';

var useremailinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},
	
	_email : null,
	_icon : null,
	
	onMounting : function() {
		this._email = this._props.user.email;
	},
	
	_onKeyUp : function(event) {
		var toggle = false;
		if (event.target) {
			if ((this._email && !event.target.value) ||
				(!this._email && event.target.value)) {
				toggle = true;	
			}
			this._email = event.target.value;
		}
		if (toggle && this._icon) {
			this._icon.renderComponent();
		}
	},
	
	_getIcon : function(instance) {
		this._icon = instance;
	},
	
	_isActive : function() {
		return this._email;
	},
	
	render : function() {
		var icon = '<toggleicon icon="img/id_gray.png" activeicon="img/id_blue.png" activetrigger={this._isActive} getinstance={this._getIcon}></toggleicon>';
		
		if (this._props.mode === 'display') {
			return ('\
				<div>' + 
					icon + 
					'<div class="__Customer__detailsContentText">\
						{this._email}\
					</div>\
				</div>\
			');
		}
		
		return (
			'<div>' +
				icon +
				'<input class="__Customer__itemInput" type="text" name="email" value={this._email} placeholder="Email" onkeyup={this._onKeyUp}></input>\
			</div>\
		');
	}
});
