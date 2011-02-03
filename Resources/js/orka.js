(function (window) {

	// pick up template from DOM
	var templates = {};
	var DOMtemplates = document.querySelectorAll('[template-name]');
	for(var i = 0, len = DOMtemplates.length; i < len; ++i) {
		var name = DOMtemplates[i].getAttribute('template-name');
		
		var str = DOMtemplates[i].innerHTML(/[\r\t\n]+/g, " ").replace("{%","'+").replace("%}","+'");
		
		templates[name] = new Function("item", "var tpl = document.createElement('div'); tpl.innerHTML = '" + str + "'; return tpl.firstChild;");
		
		DOMtemplates[i].parentNode.removeChild(DOMtemplates[i]);
	}
	DOMtemplates = null;
	delete DOMtemplates;
	
})(this);