Ext.define('VX.modex.TestSourceQuestion', {
	extend: 'VX.model.Question',
	actionName: 'TestSourceQuestion',
	proxy:{
		type: 'direct',
		api: TestSourceQuestion,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});