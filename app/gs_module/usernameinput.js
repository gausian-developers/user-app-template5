'use strict';

var usernameinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},
	
	render : function() {
		if (this._props.mode === 'display') {
			return ('<div>{this._props.user.first} {this._props.user.last}</div>');
		}
		
		var list = [];
		if (this._props.user.first) {
			list.push('<input class="__Customer__itemInput" type="text" name="first_name" value={this._props.user.first}></input>');
		} else {
			list.push('<input class="__Customer__itemInput" type="text" name="first_name" placeholder="First Name"></input>');
		}
		if (this._props.user.last) {
			list.push('<input class="__Customer__itemInput2" type="text" name="last_name" value={this._props.user.last}></input>');
		} else {
			list.push('<input class="__Customer__itemInput2" type="text" name="last_name" placeholder="Last Name"></input>');
		}
		if (this._props.user.company_name) {
			list.push('<input class="__Customer__itemInput2" type="text" name="company_name" value={this._props.user.company_name}></input>');
		} else {
			list.push('<input class="__Customer__itemInput2" type="text" name="company_name" placeholder="Affiliation"></input>');
		}
		if (this._props.user.department_name) {
			list.push('<input class="__Customer__itemInput2" type="text" name="department_name" value={this._props.user.department_name}></input>');
		} else {
			list.push('<input class="__Customer__itemInput2" type="text" name="department_name" placeholder="Title"></input>');
		}
		if (this._props.user.first ||
			this._props.user.last ||
			this._props.user.company_name ||
			this._props.user.department_name) {
			list.splice(0, 0, 'class="__Customer__detailsImg" src="img/mail_blue.png" />');
		} else {
			list.splice(0, 0, '<img class="__Customer__noInfoImg" src="img/mail_gray.png" />');
		}
		var list_str = list.join(' ');

		return ('\
	  		<div>' + 
				list_str +
	  		'</div>\
		');
	}
});
