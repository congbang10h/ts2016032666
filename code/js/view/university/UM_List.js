Ext.define('VX.view.university.UM_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.um-list',
	requires: [
	],
	store: VX.getS('Univ_mission'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	title: 'Sứ mệnh',
	form: Ext.create('VX.view.university.UM_Form'),
	columns: [{
		dataIndex: 'um_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'um_code',
		flex: 1,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'um_date',
		flex: 1,
		//width: 85,
		text: 'Ngày tạo',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'um_isused',
		renderer: VX.checkRender,
		flex: 1,
		text: 'Sử dụng',
		filter:{type:'boolean'}
	}],
	onSelectionChange: function(g,selected){
		var me=this, c=me.up().down('um-item-list');
		me.callParent(arguments);
		c.setVersion(selected.length?selected[0].get('um_id'):0);
	}
});