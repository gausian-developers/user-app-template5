'use strict';

var customerleftlist = GSModule.create({
	
	_propsDef : {
		'onitemclicked' : null,
	},
	
	_states : {},
	
	render : function() {
		var listMode = CustomerDataStore.get('listMode', this);
		
		if (listMode === 'index') {
			this._states.index = CustomerDataStore.get('indexKey', this);
			this._states.customers = CustomerDataStore.getIndexResults(this);
			return ('<UserIndexResults users={this._states.customers} index={this._states.index} onItemClicked={this._props.onitemclicked}></UserIndexResults>');
		} else if (listMode === 'search') {
			this._states.customers = CustomerDataStore.getSearchedResults(this);
			if (this._states.customers.length === 0) {
				this._states.customers = CustomerDataStore.get('customers', this);
				return ('<UserList users={this._states.customers} onItemClicked={this._props.onitemclicked}></UserList>');
			}
			return ('<UserSearchResults users={this._states.customers} onItemClicked={this._props.onitemclicked}></UserSearchResults>');
		} else {
			this._states.customers = CustomerDataStore.get('customers', this);
			return ('<UserList users={this._states.customers} onItemClicked={this._props.onitemclicked}></UserList>');
		}
	}
});
