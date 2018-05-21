Ext.define('VX.view.outcome.PEO_Win', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.outcome.PEO_List',
		'VX.view.outcome.PEOI_List'
	],
	iconCls: 'peo16',
	modal: false,
	width: '100%',
	height: '100%',
	loadEduPro: function(rec){
		var me=this, g = me.down('peo-item-list'),
			s1=VX.getS('VX.store.Peo');
		s1.removeFilter('edupro');
		s1.addFilter({
			id: 'edupro',
			property: 'edu_program_id',
			value: rec.get('edu_program_id')
		});
		g.setVersion(0);
		me.setTitle('Chuẩn đầu ra Chương trình của ['+rec.get('edu_program_name_vn')+']');
		me.show();
	},
	layout: 'border',
	bodyBorder: false,
	items: [{
		region: 'west',
		xtype: 'peo-list',
		width: '30%',
		split: true
	}, {
		region: 'center',
		xtype: 'peo-item-list'
	}]
});
