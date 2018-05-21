Ext.define('VX.modex.MapQGroupTopic', {
	extend: 'VX.model.Question_group',
	actionName: 'MapQGroupTopic',
	proxy:{
		type: 'direct',
		api: MapQGroupTopic,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapQGroupTopic.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);