Ext.define('VX.modex.MapQuestionTopic', {
	extend: 'VX.model.Question',
	actionName: 'MapQuestionTopic',
	proxy:{
		type: 'direct',
		api: MapQuestionTopic,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapQuestionTopic.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);