'use strict';

var iframeProxy = {
	
	_loaded : false,
	_messages : [],
	
	_flushMessages : function() {
		if (this._controller) {
			this._messages.forEach(function(message) {
				this._controller.receiveMessage(message.data);
			}.bind(this));
			this._messages = [];
		}
	},
	
	receiveMessage : function(event) {
		this._messages.push(event);
		this._flushMessages();
	},
	
	setController : function(controller) {
		this._controller = controller;
		this._flushMessages();
	}
};

window.addEventListener("message", iframeProxy.receiveMessage.bind(iframeProxy), false);