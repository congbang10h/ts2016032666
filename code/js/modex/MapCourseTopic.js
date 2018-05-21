Ext.define('VX.modex.MapCourseTopic', {
	extend: 'VX.model.Course',
	actionName: 'MapCourseTopic',
	proxy:{
		type: 'direct',
		api: MapCourseTopic,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapCourseTopic.prototype.fields.add([
	{ name: '_has_link', type: 'integer'}
]);