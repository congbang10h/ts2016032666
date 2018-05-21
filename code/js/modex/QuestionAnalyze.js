Ext.define('VX.modex.QuestionAnalyze', {
	extend: 'VX.model.Question',
	actionName: 'QuestionAnalyze',
	proxy:{
		type: 'direct',
		api: QuestionAnalyze,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
});