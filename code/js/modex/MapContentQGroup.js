Ext.define('VX.modex.MapContentQGroup', {
	extend: 'VX.model.Course_content',
	actionName: 'MapContentQGroup',
	proxy:{
		type: 'direct',
		api: MapContentQGroup,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapContentQGroup.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);