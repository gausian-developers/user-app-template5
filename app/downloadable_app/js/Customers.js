'use strict';

var CustomerDataStore = GSModule.createDataStore({
	customers : [],
	listMode : 'list',
	searchedKey : '',
	indexKey : '',
	selectedCustomer : {},
	displayMode : 'display',
	apps : [],
	
	getSearchedResults : function(component) {
		var str = this.get('searchedKey', component);
		
		if (!str) {
			return [];
		}
		str = str.toLowerCase();
		
	    var matches = [];
		var customers = this.get('customers', component);
	    for(var i=0; i<customers.length; i++){
	      var customer = customers[i];
	      if(customer.first.toLowerCase().indexOf(str) > -1 || customer.last.toLowerCase().indexOf(str) > -1) {
	        matches.push(customer);
	      }
	    }
		return matches;
	},
	
	getIndexResults : function(component) {
		var str = this.get('indexKey', component).toLowerCase();
		
	    var matches = [];
		var customers = this.get('customers', component);
	    for(var i=0; i<customers.length; i++){
	      var customer = customers[i];
	      if(customer.first[0].toLowerCase() === str || customer.last[0].toLowerCase() === str) {
	        matches.push(customer);
	      }
	    }
		return matches;
	},
});

var CustomerController = GSModule.create({
	_req : {
	    url: 'http://asa.gausian.com',
	    data: {user_app_id:'app_id', service_app_name:'Customer', request_string: "get"},
	},
	
	_onSearch : function(str) {
		CustomerDataStore.set({
			'searchedKey' : str,
			'listMode' : 'search'
		});
	},
	
	_onClickIndex : function(str) {
		CustomerDataStore.set({
			'indexKey' : str,
			'listMode' : 'index'
		});
	},
	
	_onCustomerItemClicked : function(customer) {
		CustomerDataStore.set({
			'selectedCustomer' : customer,
			'displayMode' : 'display',
			'listMode' : 'list'
		});
	},
	
	_onAddClicked : function() {
		CustomerDataStore.set({'displayMode' : 'create'});
	},
	
	render : function() {
		return ('\
			<div class="__Customer__wholeContainer">\
				<SearchBar class="__Customer__topBar" onSearch={this._onSearch} onAddClicked={this._onAddClicked}></SearchBar>\
				<div class="__Customer__leftContainer">\
					<AlphabetIndexBar class="__Customer__leftBar" onClickIndex={this._onClickIndex}></AlphabetIndexBar>\
				</div>\
				<CustomerLeftList class="__Customer__listContainer" path="js/CustomerLeftList.js" onItemClicked={this._onCustomerItemClicked}></CustomerLeftList>\
				<CustomerCenterContent path="js/CustomerCenterContent.js"></CustomerCenterContent>\
				<CustomerHyperlinkList path="js/CustomerHyperlinkList.js"></CustomerHyperlinkList>\
			</div>\
		');
	},
	
	receiveMessage : function(data) {
		if (data.op === 'selectLink') {
	    	CustomerDataStore.set({
				'apps' : data.targetApp,
			});
	    }
	},
	
	onLoading : function() {
		$.post(this._req.url, this._req.data).done(function(data) {
			var customers = JSON.parse(data.response);
			$(this._dom).ready(function() {
				CustomerDataStore.set({'customers' : customers});
			}.bind(this));
		}.bind(this));
	}
});
