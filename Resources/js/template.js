/* Templating */
(function (window) {
	var templates = {}, resources, fn = ['var t=document.createElement("div");with(obj){t.innerHTML="', '', '"}return t.firstChild;'];
	
	function template(filename) {
		filename += filename.indexOf('.html') == -1 ? ".html" : "";
				
		if (filename in templates) {
			return templates[filename]; // return cached version
		}
		
		resources = resources || Titanium.Filesystem.getResourcesDirectory();
		var file = Titanium.Filesystem.getFile(resources, "templates", filename);
		
		
		if (!file.exists()) {
			return null; // file doesn't exist
		}
		
		var str = file.read() + "";
		fn[1] = str.replace(/[\r\t\n]+/g, " ")
			.replace(/"/g, '\\\"')
			.replace(/{%/g, '"+')
			.replace(/%}/g, '+"');
		
		templates[filename] = new Function("obj", fn.join(""));
		return templates[filename];
	}
	
	window.template = template;
})(this);