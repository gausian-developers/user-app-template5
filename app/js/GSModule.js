'use strict'

var GSModule = {
	
	create : function(module) {
		if (!module.render) {
			throw 'render function is required';
		}
		var fn = function(dom, props, level, controller) {
			for (var key in module) {
				if (module.hasOwnProperty(key)) {
					this[key] = module[key];
				}
			}
			
			this._dom = dom;
			this._props = props;
			this._domLevel = level;
			this._windowController = controller;

			if (module._propsDef) {
				for (var key in module._propsDef) {
					if (module._propsDef.hasOwnProperty(key)) {
						if (!this._props[key]) {
							this._props[key] = module._propsDef[key];
						}
					}
				}
			} else {
				this._propsDef = {};
			}
			this._propsDef.DOMChildren = [];
			
			this.renderComponent = function() {
				GSModuleRender.renderComponent(this._dom, this);
			};
			this.setDOM = function(dom) {
				this._dom = dom;
			};
		};
		
		return fn;
	},
	
	createDataStore : function(dataStore) {
		var module = {
			_updateHandler : {},
			_data : {},
			
			get : function(name, component) {
				if (!this._updateHandler[name]) {
					this._updateHandler[name] = [];
				}
				var exist = false;
				for (var key in this._updateHandler[name]) {
					if (!this._updateHandler[name].hasOwnProperty(key)) {
						continue;
					}
					if (this._updateHandler[name][key] === component) {
						exist = true;
						break;
					}
				}
				if (!exist) {
					this._updateHandler[name].push(component);
				}
				return this._data[name];
			},
			set : function(nameValues) {
				var updates = [];
				for (var key in nameValues) {
					if (nameValues.hasOwnProperty(key)) {
						this._data[key] = nameValues[key];

						if (this._updateHandler[key]) {
							for (var hKey in this._updateHandler[key]) {
								if (!this._updateHandler[key].hasOwnProperty(hKey)) {
									continue;
								}
								this._updateHandler[key][hKey].renderStatus = 'rendering';
								updates.push({
									'handler' : this._updateHandler[key][hKey],
									'key' : key,
									'index' : hKey
								});
							}
						}
					}
				}
				updates.sort(function(a, b) {
				  return a._domLevel - b._domLevel;
				});
				for (var i = 0; i < updates.length; i++) {
					var component = updates[i].handler;
					if (component.renderStatus === 'rendered') {
						continue;
					}
					if (!component._windowController._dom.contains(component._dom)) {
						delete this._updateHandler[updates[i].key][updates[i].index];
						continue;
					}
					component.renderComponent();
					component.renderStatus = 'rendered';
				}
			}
		};
		
		for (var key in dataStore) {
			if (dataStore.hasOwnProperty(key)) {
				if (typeof(dataStore[key]) === 'function') {
					module[key] = dataStore[key];
				} else {
					module._data[key] = dataStore[key];
				}
			}
		}
		return module;
	}
};