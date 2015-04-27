'use strict';

var toggleicon = GSModule.create({
	
	_propsDef : {
		'activeicon' : null,
		'icon' : null,
		'activetrigger' : null
	},
	
	render : function() {
		var isActive = false;
		if (this._props.activetrigger) {
			isActive = this._props.activetrigger();
		}
		if (isActive) {
			return '<img class="__Customer__detailsImg" src={this._props.activeicon} />';
		} else {
			return '<img class="__Customer__noInfoImg" src={this._props.icon} />';
		}
	}
});
