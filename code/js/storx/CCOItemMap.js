Ext.define('VX.storx.CCOItemMap', {
	extend: 'Ext.ux.Store',
	model: 'VX.modex.CCOItemMap',
	autoLoad: false,
	pageSize: 20,
	remoteFilter: true,
	filters:[{
		id: 'coursecontent',
		property: 'cc_id',
		value: 0
	},{
		id: 'course',
		property: 'course_id',
		value: 0
	}]
});