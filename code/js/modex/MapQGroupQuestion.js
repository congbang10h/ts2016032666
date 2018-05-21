Ext.define('VX.modex.MapQGroupQuestion', {
	extend: 'VX.model.Question_group',
	actionName: 'MapQGroupQuestion',
	proxy:{
		type: 'direct',
		api: MapQGroupQuestion,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapQGroupQuestion.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);