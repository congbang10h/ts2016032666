Ext.define('VX.modex.ExamTree', {
	extend: 'Ext.data.TreeModel',
	fields: [
		{name: 'text', type: 'string'},
		{name: 'test_section_id', type: 'int'},
		{name: 'question_id', type: 'int'},
		{name: 'answer', type: 'int'}
	],
	proxy: {
		type: 'localstorage',
		id  : 'ProxyExamTree'
	}
});