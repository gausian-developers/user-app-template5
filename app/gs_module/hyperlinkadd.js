'use strict';

var hyperlinkadd = GSModule.create({
	_propsDef : {
		'onclicked' : null
	},
	
	_onClick : function(event) {
		if (this._props.onclicked) {
			this._props.onclicked(this._props.app);
		}
	},

	render : function() {
		return ('\
			<div class="__Customer__AppHyperlinkOnelink" onclick={this._onClick}>\
	        	<div class="__Customer__AppHyperlinkAppEdge"></div>\
	        	<div class="__Customer__AppHyperlinkAppImage">+</div>\
	        	<div class="__Customer__AppHyperlinkAppName">Add Link</div>\
	    	</div>\
		');
	}
});