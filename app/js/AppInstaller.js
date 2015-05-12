'use strict';

$.get(
	'downloadable_app/package_customer.json',
	function(data) {
		var obj = jQuery.parseJSON(data);
		var path = '';
		if (obj.Path) {
			path = obj.Path;
		}
		if (obj.JS) {
			obj.JS.forEach(function(js) {
				require_js(path + js);
			});
		}
		if (obj.CSS) {
			obj.CSS.forEach(function(css) {
				require_css(path + css);
			});
		}
		if (obj.Controller) {
			$('#jframe').ready(function() {
				var dom = document.createElement('div');
				$('#jframe').append(dom);

				require_js(path + obj.Controller.src, function() {
					var component = new window[obj.Controller.name](
						dom, // dom to render on
						{'id' : obj.Controller.name}, // props
						0, //level
						null // window controller
					);
					component._windowController = component;
					component._installPath = path;
				
					if (component.onLoading) {
						component.onLoading();
					}
					
					component.renderComponent();
					iframeProxy.setController(component);
					
					if (component.onLoaded) {
						component.onLoaded();
					}
				});
			});
		}
	},
	"text"
);