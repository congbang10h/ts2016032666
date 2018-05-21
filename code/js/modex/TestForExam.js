Ext.define('VX.modex.TestForExam', {
	extend: 'VX.model.Test',
	actionName: 'TestForExam',
	proxy:{
		type: 'direct',
		api: TestForExam,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});