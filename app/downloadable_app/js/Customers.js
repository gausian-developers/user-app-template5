'use strict';

var CustomerDataStore = GSModule.createDataStore({
	customers : [],
	listMode : 'list',
	searchedKey : '',
	indexKey : '',
	selectedCustomer : {},
	apps : [],
	
	getSearchedResults : function(component) {
		var str = this.get('searchedKey', component);
		
		if (!str) {
			return [];
		}
		
	    var matches = [];
		var customers = this.get('customers', component);
	    for(var i=0; i<customers.length; i++){
	      var customer = customers[i];
	      if(customer.first.indexOf(str) > -1 || customer.last.indexOf(str) > -1) {
	        matches.push(customer);
	      }
	    }
		return matches;
	},
	
	getIndexResults : function(component) {
		var str = this.get('indexKey', component);
		
	    var matches = [];
		var customers = this.get('customers', component);
	    for(var i=0; i<customers.length; i++){
	      var customer = customers[i];
	      if(customer.first[0] === str || customer.last[0] === str) {
	        matches.push(customer);
	      }
	    }
		return matches;
	},
});

var CustomerController = GSModule.create({
	_req : {
	    method: 'POST',
	    url: 'http://asa.gausian.com',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    data: {user_app_id:'app_id', service_app_name:'Customer', request_string: "get"}
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
		});
	},
	
	render : function() {
		return ('\
			<div class="__Customer__wholeContainer">\
				<SearchBar class="__Customer__topBar" onSearch={this._onSearch}></SearchBar>\
				<div class="__Customer__leftContainer">\
					<AlphabetIndexBar class="__Customer__leftBar" onClickIndex={this._onClickIndex}></AlphabetIndexBar>\
				</div>\
				<CustomerLeftList class="__Customer__listContainer" path="js/CustomerLeftList.js" onItemClicked={this._onCustomerItemClicked}></CustomerLeftList>\
				<WelcomePage class="__Customer__welcome" path="js/WelcomePage.js"></WelcomePage>\
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
