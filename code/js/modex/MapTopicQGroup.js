Ext.define('VX.modex.MapTopicQGroup', {
	extend: 'VX.model.Topic',
	actionName: 'MapTopicQGroup',
	proxy:{
		type: 'direct',
		api: MapTopicQGroup,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapTopicQGroup.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);