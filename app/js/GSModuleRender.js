'use strict';

var GSModuleRender = {
	_nodeTypes : {
		1 : 'element',
		2 : 'attr',
		3 : 'text',
		4 : 'cdata',
		5 : 'reference',
		6 : 'entity',
		7 : 'instr',
		8 : 'comment',
		9 : 'document',
		10 : 'dec_type',
		11 : 'doc_frag',
		12 : 'notation',
	},
	
	_HTMLComponents : {
		'div' : true,
		'a' : true,
		'button' : true,
		'input' : true,
		'span' : true,
	},
	
	_installedComponents : {},
	_componentRequestList : {},
	
	getNodeType : function(node_type) {
		return this._nodeTypes[node_type];
	},

	isHTMLComponent : function(module_name) {
		return this._HTMLComponents[module_name];
	},
	
	_getTextValue : function(value, component) {
		var text = new TextWithEntities(value);
		var res = '';
		for (var i = 0; i < text.entities.length; i++) {
			if (text.entities[i].type === 'text') {
				res = res.concat(text.entities[i].value);
			} else if (text.entities[i].type === 'var') {	
				var fn_str = text.entities[i].value;
				var args = [];
				var fn_call = false;
				if (fn_str.indexOf('(') > -1) {
					fn_call = true;
					var fn_arg = fn_str.match(/\(([^)]+)\)/i)[1];
					args = fn_arg.split(',');
					fn_str = fn_str.split('(')[0];
				}
				var var_stack = fn_str.split('.');
				if (!var_stack || !var_stack.length) {
					continue;
				}
				var start = 0;
				var current = window;
				var scope = null;
				if (var_stack[0] === 'this') {
					start = 1;
					current = component;
					scope = component;
				}
				for (var j = start; j < var_stack.length; j++) {
					current = current[var_stack[j]];
					if (typeof(current) == 'undefined') {
						break;
					}
				}
				if (typeof(current) == 'undefined') {
					continue;
				}
				var fn_res;
				if (typeof(current) === 'function') {
					if (scope) {
						if (fn_call) {
							fn_res = function() {current.apply(scope, args)};
						} else {
							fn_res = current.bind(scope);
						}
					} else {
						if (fn_call) {
							fn_res = function() {current.apply(current, args)};
						} else {
							fn_res = current;
						}
					}
				} else {
					fn_res = current;
				}
				if (res) {
					res = res.concat(fn_res);
				} else {
					res = fn_res;
				}
			}
		}
		return res;
	},

	_renderDom : function(dom, exist_dom, component, isRoot) {	
		var type = this.getNodeType(dom.nodeType);
		if (type === 'text') {
			dom.nodeValue = this._getTextValue(dom.nodeValue.trim(), component);
			if (exist_dom) {
				exist_dom.parentNode.removeChild(exist_dom);
			}
		} 
		if (type !== 'element') {
			return;
		}
		
		for (var i = 0; i < dom.childNodes.length; i++) {
			this._renderDom(dom.childNodes[i], null, component, false);
		}
		
		if (this.isHTMLComponent(dom.localName)) {
			// compute attributes
			if (dom.attributes) {
				for (var i = 0; i < dom.attributes.length; i++) {
					var attribute = dom.attributes[i];
					var value = this._getTextValue(attribute.nodeValue, component);
					if (typeof(value) === 'function') {
						dom[attribute.name] = value;
					} else {
						dom.setAttribute(attribute.name, value);
					}
				}
			}
			if (isRoot) {
				for (var key in component._props) {
					if (!component._props.hasOwnProperty(key)) {
						continue;
					} 
					if (component._propsDef && component._propsDef[key]) {
						continue;
					}
					var value = component._props[key];
					if (typeof(value) === 'function') {
						dom[key] = value;
					} else {
						dom.setAttribute(key, value);
					}
				}
			}
			if (exist_dom) {
				exist_dom.parentNode.removeChild(exist_dom);
			}
		} else {
			var props = {};
			if (dom.attributes) {
				for (var i = 0; i < dom.attributes.length; i++) {
					var attribute = dom.attributes[i];
					props[attribute.name] = 
						this._getTextValue(attribute.nodeValue, component);
				}
			}
			props.DOMChildren = dom.childNodes;
			dom.innerHTML = '';
			
			if (isRoot) {
				for (var key in component._props) {
					if (!component._props.hasOwnProperty(key)) {
						continue;
					} 
					if (component._propsDef && component._propsDef[key]) {
						continue;
					}
					props[key] = component._props[key];
				}
				var parent = document.createElement("div");
				dom.parentNode.insertBefore(parent, dom);
				dom.parentNode.removeChild(dom);
				
				parent.appendChild(dom);
				component.setDOM(parent);
			}
			
			var component_status = this._installedComponents[dom.localName];
			if (component_status === 'loaded') {
				var sub_component = new window[dom.localName](dom, props, component._domLevel + 1, component._windowController);
				sub_component.renderComponent();
				if (exist_dom) {
					exist_dom.parentNode.removeChild(exist_dom);
				}
			} else {
				if (typeof(this._componentRequestList[dom.localName]) === 'undefined') {
					this._componentRequestList[dom.localName] = [];
				}
				this._componentRequestList[dom.localName].push({
					'dom' : dom, 
					'exist_dom' : exist_dom, 
					'props' : props,
					'level' : component._domLevel + 1,
					'controller' : component._windowController
				});
				if (component_status !== 'loading') {
					var path = '';
					if (props.path) {
						path = component._windowController._installPath + props.path;
						delete props.path;
					}
					this.installComponent(dom.localName, path);
				}
			}
		}
	},

	renderComponent : function(dom, component) {
		if (!dom) {
			return;
		}
		if (component.onBeforeMounting) {
			component.onBeforeMounting();
		}

		var doc = document.createElement("div");
		doc.innerHTML = component.render().trim();

		if (doc.childNodes.length === 0) {
			dom.parentNode.removeChild(dom);
			return;
		}
		if (doc.childNodes.length > 1) {
			throw dom.localName.concat(' has more than one components');
		}

		var row_dom = doc.childNodes[0];
		dom.parentNode.insertBefore(row_dom, dom);
		component.setDOM(row_dom);
		
		this._renderDom(row_dom, dom, component, true);
		
		if (component.onDidMounted) {
			component.onDidMounted();
		}
	},
	
	installComponent : function(str, path) {
		this._installedComponents[str] = 'loading';
		var callback = function() {
			this._installedComponents[str] = 'loaded';
			
			if (this._componentRequestList[str]) {
				for (var i = 0; i < this._componentRequestList[str].length; i++) {
					var component = new window[str](
						this._componentRequestList[str][i].dom, 
						this._componentRequestList[str][i].props,
						this._componentRequestList[str][i].level,
						this._componentRequestList[str][i].controller
					);
					component.renderComponent();
					if (this._componentRequestList[str][i].exist_dom) {
						this._componentRequestList[str][i].exist_dom.parentNode.removeChild(
							this._componentRequestList[str][i].exist_dom
						);
					}
				}
				this._componentRequestList[str] = [];
			}
		};
		if (path) {
			require_js(path, callback.bind(this));
		} else {
			require_module(str, callback.bind(this));
		}
	}
};