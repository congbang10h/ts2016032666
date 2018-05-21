Ext.define('VX.modex.MapQuestionQGroup', {
	extend: 'VX.model.Question',
	actionName: 'MapQuestionQGroup',
	proxy:{
		type: 'direct',
		api: MapQuestionQGroup,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapQuestionQGroup.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: 'question_type_code', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);