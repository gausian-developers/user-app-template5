'use strict';

var hyperlinklist = GSModule.create({
	_propsDef : {
		'apps' : []
	},
	
	render : function() {
		var list = [];
		for (var i in this._props.apps) {
			if (!this._props.apps.hasOwnProperty(i)) {
				continue;
			}
			list.push('<Hyperlink app={this._props.apps.' + i + '}></Hyperlink>');
		}
		var list_str = list.join(' ');
		
		return (
			'<div class="__Customer__hyperlinkContainer">' +
				list_str +
	        	'<HyperlinkAdd></HyperlinkAdd>\
	    	</div>'
		);
	}
});