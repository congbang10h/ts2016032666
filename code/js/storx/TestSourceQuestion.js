Ext.define('VX.storx.TestSourceQuestion', {
	//extend: 'Ext.ux.Store',
	extend: 'Ext.data.Store',
	model: 'VX.modex.TestSourceQuestion',
	autoLoad: false,
	pageSize: 20,
	remoteFilter: true
	//filters:[{
	//	id: 'content',
	//	property: 'course_content_id',
	//	value: '0'
	//}]
});