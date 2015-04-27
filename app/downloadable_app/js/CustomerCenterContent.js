'use strict';

var customercentercontent = GSModule.create({
	
	_selectedCustomer : {},
	
	_onEditClick : function() {
		CustomerDataStore.set({'displayMode' : 'edit'});
	},
	
	_onCreateClick : function(form) {
		var elements = form.elements;
      	var req = {
        	url: 'http://asa.gausian.com',
        	data: $.param({
          		user_app_id:'app_id',
          		service_app_name:'Customer',
          		request_string:
          		'add first=' + elements['first_name'].value +
          		', last=' + elements['last_name'].value +
          		', company_name=' + elements['company'].value +
          		', department_name=' + elements['department'].value +
          		', email=' + elements['email'].value +
          		', website=' + elements['website'].value +
          		', mobile_phone=' + elements['mobile_phone'].value +
          		', work_phone=' + elements['work_phone'].value +
          		', mail_address=' + elements['mail_address'].value +
          		', mail_city=' + elements['mail_city'].value +
          		', mail_state=' + elements['mail_state'].value +
          		', mail_country=' + elements['mail_country'].value +
          		', mail_zip=' + elements['mail_zip'].value +
          		', shipment_address=' + elements['shipment_address'].value +
          		', shipment_city=' + elements['shipment_city'].value +
          		', shipment_state=' + elements['shipment_state'].value +
          		', shipment_country=' + elements['shipment_country'].value +
          		', shipment_zip=' + elements['shipment_zip'].value
        	})
      	};

		$.post(req.url, req.data).done(function(add_data) {
        	var load_req = {
          		url: 'http://asa.gausian.com',
          		data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
        	};
        	$.post(load_req.url, load_req.data).done(function(load_data) {
				CustomerDataStore.set({
					'customers' : JSON.parse(load_data.response),
					'selectedCustomer' : JSON.parse(add_data.response),
					'displayMode' : 'display',
				});
        	});
      	});
	},
	
	_onEditSaveClick : function(form) {
		var elements = form.elements;
      	var req = {
        	url: 'http://asa.gausian.com',
        	data: $.param({
          		user_app_id:'app_id',
          		service_app_name:'Customer',
          		request_string:
          		'update email=' + elements['email'].value +
          		', website=' + elements['website'].value +
          		', mobile_phone=' + elements['mobile_phone'].value +
          		', work_phone=' + elements['work_phone'].value +
          		', mail_address=' + elements['mail_address'].value +
          		', mail_city=' + elements['mail_city'].value +
          		', mail_state=' + elements['mail_state'].value +
          		', mail_country=' + elements['mail_country'].value +
          		', mail_zip=' + elements['mail_zip'].value +
          		', shipment_address=' + elements['shipment_address'].value +
          		', shipment_city=' + elements['shipment_city'].value +
          		', shipment_state=' + elements['shipment_state'].value +
          		', shipment_country=' + elements['shipment_country'].value +
          		', shipment_zip=' + elements['shipment_zip'].value +
		        ' on id=' + elements['id'].value
        	})
      	};

		$.post(req.url, req.data).done(function(add_data) {
        	var load_req = {
          		url: 'http://asa.gausian.com',
          		data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
        	};
        	$.post(load_req.url, load_req.data).done(function(load_data) {
				CustomerDataStore.set({
					'customers' : JSON.parse(load_data.response),
					'selectedCustomer' : JSON.parse(add_data.response)[0],
					'displayMode' : 'display',
				});
        	});
      	});
	},
	
	_onDeleteClick : function(user) {
		
	    var req = {
	      	url: 'http://asa.gausian.com',
	      	data: $.param({
				user_app_id:'app_id', 
				service_app_name:'Customer',
	      		request_string: 'delete id=' + user.id
			})
	    }
	    $.post(req.url, req.data).done(function(add_data) {
        	var load_req = {
          		url: 'http://asa.gausian.com',
          		data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
        	};
        	$.post(load_req.url, load_req.data).done(function(load_data) {
				CustomerDataStore.set({
					'customers' : JSON.parse(load_data.response),
					'selectedCustomer' : {},
					'displayMode' : 'none',
				});
        	});
	    });
	},
	
	render : function() {
		this._selectedCustomer = CustomerDataStore.get('selectedCustomer', this);
		var mode = CustomerDataStore.get('displayMode', this);
		if (mode === 'create') {
			return ('<UserDetailsCreate onSaveClick={this._onCreateClick}></UserDetailsCreate>');
		} else if (!jQuery.isEmptyObject(this._selectedCustomer)) {
			if (mode === 'display') {
				return ('<UserDetails user={this._selectedCustomer} onEditClick={this._onEditClick}></UserDetails>');
			} else {
				return ('<UserDetailsEdit user={this._selectedCustomer} onSaveClick={this._onEditSaveClick} onDeleteClick={this._onDeleteClick}></UserDetailsEdit>');
			}
		}
		return ('<WelcomePage class="__Customer__welcome" path="js/WelcomePage.js"></WelcomePage>');
	}
});
