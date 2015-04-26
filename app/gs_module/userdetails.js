'use strict';

var userdetails = GSModule.create({
	
	_propsDef : {
		'user' : {}
	},
	
	render : function() {
		var emailContent = '';
		if (this._props.user.email) {
			emailContent = ('\
				<img class="__Customer__detailsImg" src="img/id_blue.png" />\
				<div class="__Customer__detailsContentText">\
					{this._props.user.email}\
				</div>\
			');
		} else {
			emailContent = '<img class="__Customer__noInfoImg" src="img/id_gray.png" />';
		}
		
		var mPhoneContent = '';
		if (this._props.user.mobile_phone) {
			mPhoneContent = ('\
				<img class="__Customer__detailsImg" src="img/mobile_blue.png" />\
				<div class="__Customer__detailsContentText">\
					{this._props.user.mobile_phone}\
				</div>\
			');
		} else {
			mPhoneContent = '<img class="__Customer__noInfoImg" src="img/mobile_gray.png" />';
		}
		
		var wPhoneContent = '';
		if (this._props.user.work_phone) {
			wPhoneContent = ('\
				<img class="__Customer__detailsImg" src="img/tele_blue.png" />\
				<div class="__Customer__detailsContentText">\
					{this._props.user.work_phone}\
				</div>\
			');
		} else {
			wPhoneContent = '<img class="__Customer__noInfoImg" src="img/tele_gray.png" />';
		}
		
		var addressList = [];
		if (this._props.user.mail_address) {
			addressList.push(this._props.user.mail_address);
		}
		if (this._props.user.mail_city) {
			addressList.push(this._props.user.mail_city);
		}
		if (this._props.user.mail_state) {
			addressList.push(this._props.user.mail_state);
		}
		if (this._props.user.mail_country) {
			addressList.push(this._props.user.mail_country);
		}
		if (this._props.user.mail_zip) {
			addressList.push(this._props.user.mail_zip);
		}
		var addressContent = '';
		if (addressList.length === 0) {
			addressContent = '<img class="__Customer__noInfoImg" src="img/mail_gray.png" />';
		} else {
			addressContent = 
				'<img class="__Customer__detailsImg" src="img/mail_blue.png" />\
				 <div class="__Customer__detailsContentText">' + 
					addressList.join(', ') +
				'</div>';
		}
		
		var shipmentList = [];
		if (this._props.user.shipment_address) {
			shipmentList.push(this._props.user.shipment_address);
		}
		if (this._props.user.shipment_city) {
			shipmentList.push(this._props.user.shipment_city);
		}
		if (this._props.user.shipment_state) {
			shipmentList.push(this._props.user.shipment_state);
		}
		if (this._props.user.shipment_country) {
			shipmentList.push(this._props.user.shipment_country);
		}
		if (this._props.user.shipment_zip) {
			shipmentList.push(this._props.user.shipment_zip);
		}
		var shipmentContent = null;
		if (shipmentList.length === 0) {
			var shipmentContent = '<img class="__Customer__noInfoImg" src="img/ship_gray.png" />';
		} else {
			var shipmentContent = 
				'<img class="__Customer__detailsImg" src="img/ship_blue.png" />\
				 <div class="__Customer__detailsContentText">' + 
					shipmentList.join(', ') +
				'</div>';
		}
		
		return ('\
	  		<div class="__Customer__detailContainer">\
	    		<div class="__Customer__detailName">\
	      			{this._props.user.first} {this._props.user.last}\
	    		</div>\
	    		<div class="__Customer__editCustomer">Edit</div>\
	    		<div class="__Customer__decorationSeperator"></div>\
	    		<div class="__Customer__detailCompanyName">\
	      			{this._props.user.company_name}\
	    		</div>\
	    		<div class="__Customer__details">' +
					emailContent +
				'</div>\
	    		<div class="__Customer__details">' +
					mPhoneContent +
				'</div>\
	    		<div class="__Customer__details">' +
					wPhoneContent +
				'</div>\
	    		<div class="__Customer__details">' +
					addressContent +
				'</div>\
	    		<div class="__Customer__details">' +
					shipmentContent +
				'</div>\
	  		</div>\
		');
	}
});
