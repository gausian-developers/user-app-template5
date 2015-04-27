'use strict';

var userwebsiteinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},
	
	_website : null,
	_icon : null,
	
	onMounting : function() {
		this._website = this._props.user.website;
	},
	
	_onKeyUp : function(event) {
		var toggle = false;
		if (event.target) {
			if ((this._website && !event.target.value) ||
				(!this._website && event.target.value)) {
				toggle = true;	
			}
			this._website = event.target.value;
		}
		if (toggle && this._icon) {
			this._icon.renderComponent();
		}
	},
	
	_getIcon : function(instance) {
		this._icon = instance;
	},
	
	_isActive : function() {
		return this._website;
	},
	
	render : function() {
		var icon = '<toggleicon icon="img/home_gray.png" activeicon="img/home_blue.png" activetrigger={this._isActive} getinstance={this._getIcon}></toggleicon>';
		
		if (this._props.mode === 'display') {
			return ('\
				<div>' + 
					icon + 
					'<div class="__Customer__detailsContentText">\
						{this._website}\
					</div>\
				</div>\
			');
		}
		
		return (
			'<div>' +
				icon +
				'<input class="__Customer__itemInput" type="text" name="website" value={this._website} placeholder="Website" onkeyup={this._onKeyUp}></input>\
			</div>\
		');
	}
});
