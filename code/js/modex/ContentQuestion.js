Ext.define('VX.modex.ContentQuestion', {
	extend: 'VX.model.Question',
	actionName: 'ContentQuestion',
	proxy:{
		type: 'direct',
		api: ContentQuestion,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});