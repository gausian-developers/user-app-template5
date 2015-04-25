'use strict';

var customerhyperlinklist = GSModule.create({
	
	_apps : [],
	
	render : function() {
		this._apps = CustomerDataStore.get('apps', this);
		return ('<HyperlinkList apps={this._apps}></HyperlinkList>');
	}
});
