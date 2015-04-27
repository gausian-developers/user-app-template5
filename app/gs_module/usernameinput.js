'use strict';

var usernameinput = GSModule.create({
	
	_propsDef : {
		'user' : {},
		'mode' : 'display'
	},
	
	_userInfo : {},
	_icon : null,
	
	onMounting : function() {
		this._userInfo = {
			first : this._props.user.first,
			last : this._props.user.last,
			company : this._props.user.company,
			department : this._props.user.department,
		};
	},
	
	_onFirstNameChanged : function(event) {
		return this._onTextChanged('first', event);
	},
	_onLastNameChanged : function(event) {
		return this._onTextChanged('last', event);
	},
	_onCompanyChanged : function(event) {
		return this._onTextChanged('company', event);
	},
	_onDepartmentChanged : function(event) {
		return this._onTextChanged('department', event);
	},
	
	_onTextChanged : function(type, event) {
		var toggle = false;
		if (event.target) {
			if ((this._userInfo[type] && !event.target.value) ||
				(!this._userInfo[type] && event.target.value)) {
				toggle = true;	
			}
			this._userInfo[type] = event.target.value;
		}
		if (toggle && this._icon) {
			this._icon.renderComponent();
		}
	},
	
	_getIcon : function(instance) {
		this._icon = instance;
	},
	
	_isActive : function() {
		return this._userInfo.first ||
				this._userInfo.last ||
				this._userInfo.company ||
				this._userInfo.department;
	},
	
	render : function() {
		var icon = '<toggleicon icon="img/mail_gray.png" activeicon="img/mail_blue.png" activetrigger={this._isActive} getinstance={this._getIcon}></toggleicon>';
		
		if (this._props.mode === 'display') {
			var infoList = [];
			if (this._userInfo.first) {
				infoList.push(this._userInfo.first);
			}
			if (this._userInfo.last) {
				infoList.push(this._userInfo.last);
			}
			if (this._userInfo.company) {
				infoList.push(this._userInfo.company);
			}
			if (this._userInfo.department) {
				infoList.push(this._userInfo.department);
			}
			return ('\
				<div>' + 
					icon + 
					'<div class="__Customer__detailsContentText">' +
						infoList.join(', ') +
					'</div>\
				</div>\
			');
		}
		
		var infoList = [];
		infoList.push('<input class="__Customer__itemInput" type="text" name="first_name" value={this._userInfo.first} placeholder="First Name" onkeyup={this._onFirstNameChanged}></input>');
		infoList.push('<input class="__Customer__itemInput2" type="text" name="last_name" value={this._userInfo.last} placeholder="Last Name" onkeyup={this._onLastNameChanged}></input>');
		infoList.push('<input class="__Customer__itemInput2" type="text" name="company" value={this._userInfo.company} placeholder="Affiliation" onkeyup={this._onCompanyChanged}></input>');
		infoList.push('<input class="__Customer__itemInput2" type="text" name="department" value={this._userInfo.department} placeholder="Title" onkeyup={this._onDepartmentChanged}></input>');

		return (
			'<div>' +
				icon +
				infoList.join(' ') + 
			'</div>'
		);
	}
});
