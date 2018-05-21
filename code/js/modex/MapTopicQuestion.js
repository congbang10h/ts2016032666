Ext.define('VX.modex.MapTopicQuestion', {
	extend: 'VX.model.Topic',
	actionName: 'MapTopicQuestion',
	proxy:{
		type: 'direct',
		api: MapTopicQuestion,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapTopicQuestion.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);