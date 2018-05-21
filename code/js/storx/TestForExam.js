Ext.define('VX.storx.TestForExam', {
	extend: 'Ext.data.Store',
	model: 'VX.modex.TestForExam',
	autoLoad: false,
	pageSize: 20,
	remoteFilter: true
});