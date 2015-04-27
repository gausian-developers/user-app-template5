'use strict';

var userindexresults = GSModule.create({
	_propsDef : {
		'users' : [],
		'index' : '',
		'onitemclicked' : null
	},
	
	render : function() {
		var list = [];
		for (var i in this._props.users) {
			if (!this._props.users.hasOwnProperty(i)) {
				continue;
			}
			list.push('<UserListItem user={this._props.users.' + i + '} onClicked={this._props.onitemclicked}></UserListItem>');
		}
		
		if (list.length === 0) {
			return ('\
				<div>\
					<div class="__Customer__searchResult">\
					  No result of {this._props.index}\
					</div>\
				</div>\
			');
		}
		
		var list_str = list.join(' ');
		return (
			'<div>\
				<div class="__Customer__searchResult">\
				  Initials including {this._props.index}:\
				</div>' +
				list_str +
			'</div>'
		);
	}
});