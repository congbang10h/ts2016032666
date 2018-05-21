Ext.define('VX.storx.CourseContentTree', {
	extend: 'Ext.data.TreeStore',
	model: 'VX.modex.CourseContentTree',
	remoteFilter: true,
	autoLoad: false,
	filters:[{
		property: 'course_id',
		value: '0'
	}]
});