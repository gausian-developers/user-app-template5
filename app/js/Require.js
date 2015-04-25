'use strict';

var _cssList = {};

var componentList = {};

function require_js(path, callback) {
	if (document.getElementById(path)) {
		return;
	}

	var s = document.createElement("script");
	s.id = path;
	s.src = path;
	s.async = true;
	if (callback) {
		s.onload = callback;
	}
	
	var fjs = document.getElementsByTagName('script')[0];
	fjs.parentNode.insertBefore(s, fjs);
}

function require_css(path) {
	if (_cssList[path]) {
		return;
	}

	var s = document.createElement("link");
	s.rel = "stylesheet"
	s.href = path;
 	$("head").append(s);

  	_cssList[path] = true;
}

function require(str) {
	var js_suffix = '.js';
	var css_suffix = '.css';
	if (str.indexOf(js_suffix, str.length - js_suffix.length) !== -1) {
		require_js(str);
	} else if (str.indexOf(css_suffix, str.length - css_suffix.length) !== -1) {
		require_css(str);
	} else { // GS internal module
		var path = 'gs_module/';
		require_js(path.concat(str).concat('.js'));
	}
}

function require_module(str, callback) {
	var path = 'gs_module/';
	require_js(path.concat(str).concat('.js'), callback);
}