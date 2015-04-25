'use strict';

var alphabetindexbar = GSModule.create({
	
	_propsDef : {
		"onclickindex" : null,
	},
	
	_onClickIndex : function(letter) {
		if (this._props.onclickindex) {
			this._props.onclickindex(letter);
		}
	},
	
	render : function() {
		var list = [];
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
		for (var i = 0; i < alphabet.length; i++) {
			list.push('<div class="__Customer__navigationLetter" onclick={this._onClickIndex(' + alphabet[i] + ')}>' + alphabet[i] + '</div>');
		}
		var list_str = list.join(' ');
		return (
			'<div>' + 
				list_str +
			'</div>'
		);
	}
});