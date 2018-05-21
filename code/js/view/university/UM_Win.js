Ext.define('VX.view.university.UM_Win', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.university.UM_List',
		'VX.view.university.UMI_List'
	],
	iconCls: 'mission16',
	modal: false,
	width: '100%',
	height: '100%',
	setUniversity: function(rec){
		var me=this, g = me.down('um-item-list'),
			s=VX.getS('Univ_mission');
		s.removeFilter('univ');
		s.addFilter({
			id: 'univ',
			property: 'univ_id',
			value: rec.get('univ_id')
		});
		g.setVersion(0);
		me.setTitle('Sứ mệnh trường ['+rec.get('univ_name_vn')+']');
		me.show();
	},
	layout: 'border',
	bodyBorder: false,
	items: [{
		region: 'west',
		xtype: 'um-list',
		width: '30%',
		split: true
	}, {
		region: 'center',
		xtype: 'um-item-list'
	}]
});
