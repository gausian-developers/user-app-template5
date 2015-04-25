'use strict';

var usersearchresults = GSModule.create({
	_propsDef : {
		'users' : [],
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
		var list_str = list.join(' ');
		return (
			'<div>\
				<div class="__Customer__searchResult" hide>\
				  Search Results:\
				</div>' + 
				list_str +
			'</div>'
		);
	}
});