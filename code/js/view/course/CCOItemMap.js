Ext.define('VX.view.course.CCOItemMap', {
	extend: 'Ext.Panel',
	requires:[
		'VX.view.course.CCOItemMapList',
		'VX.view.course.CCOItemMapForm'
	],
	alias: 'widget.cco-item-map',
	iconCls: 'co16',
	width: '100%',
	height: '100%',
	layout: 'border',
	items: [{
		region: 'center',
		xtype: 'cco-item-map-list'
	},{
		region: 'south',
		hidden: true,
		xtype: 'cco-item-map-form'
	}],
	changeCourseContent: function(cc_id){
		var me=this,ls=me.down('cco-item-map-list');
		ls.setContent(cc_id);
	}
});
