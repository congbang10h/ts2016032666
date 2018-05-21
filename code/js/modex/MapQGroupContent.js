Ext.define('VX.modex.MapQGroupContent', {
	extend: 'VX.model.Question_group',
	actionName: 'MapQGroupContent',
	proxy:{
		type: 'direct',
		api: MapQGroupContent,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});
VX.modex.MapQGroupContent.prototype.fields.add([
	{ name: 'user_first_name', type: 'string'},
	{ name: 'user_last_name', type: 'string'},
	{ name: '_has_link', type: 'integer'}
]);