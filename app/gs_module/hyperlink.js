'use strict';

var hyperlink = GSModule.create({
	_propsDef : {
		'app' : {},
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
	        	<div \
					class="__Customer__AppHyperlinkAppImage" \
					style="background-image: url({this._props.app.icon});">\
				</div>\
	        	<div class="__Customer__AppHyperlinkAppName">\
					{this._props.app.name}\
				</div>\
	    	</div>\
		');
	}
});