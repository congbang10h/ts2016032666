<script>
var load = function(path,force){
	if (force) path += '?'+new Date().getTime();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', path, false);
	xhr.send('');
	if ((200<=xhr.status && xhr.status<=300) || xhr.status==304){
		var se = document.createElement('script');
		se.type = "text/javascript";
		se.text = xhr.responseText+"\n//@ sourceURL="+location.href+path;
		document.getElementsByTagName('head')[0].appendChild(se);
	}
}
var list = [
	'ext/ext-all-debug.js',
	'js/config.js',
	'php/js_direct.php',
	'php/js_config.php',
	'php/js_action.php',
	
	"js/ux/comtability.js",
	"js/ux/override.js",
	"js/ux/vtype.js",
	"js/ux/direct.js",
	"js/ux/msg.js",
	"js/ux/Slider.js",
	
	'js/app.js'
];
for(var i in list)
	load(list[i]);
</script>
