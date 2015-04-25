'use strict';

function TextWithEntities(str) {
	function _getEntity(value, is_var) {
		if (is_var) {
			return {'type' : 'var', 'value' : current};
		} else {
			return {'type' : 'text', 'value' : current};
		}
	}
	
	var result = [];
	var current = '';
	var is_string = false;
	var double_q = false;
	var escape = false;
	var is_var = false;
	for (var i = 0, len = str.length; i < len; i++) {
		if (escape) {
			current = current.concat(str[i]);
			escape = false;
		} else if (is_var) {
			if (str[i] === '}') {
				result.push(_getEntity(current, is_var));
				current = '';
				is_var = false;
			} else {
				current = current.concat(str[i]);
			}
		} else if (is_string) {
			if (str[i] === '\\') {
				escape = true;
			} else if (str[i] === '\'' && double_q === false) {
				is_string = false;
			} else if (str[i] === '\"' && double_q === true) {
				is_string = false;
			} else {
				current = current.concat(str[i]);
			}
		} else if (str[i] === '{') {
			if (current) {
				result.push(_getEntity(current, is_var));
				current = '';
			}
			is_var = true;
		} else if (str[i] === '\'') {
			is_string = true;
			double_q = false;
		} else if (str[i] === '\"') {
			is_string = true;
			double_q = true;
		} else {
			current = current.concat(str[i]);
		}
	}
	if (current) {
		result.push(_getEntity(current, is_var));
		current = '';
	}
	
	this.entities = result;
}