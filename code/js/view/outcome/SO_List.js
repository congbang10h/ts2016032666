Ext.define('VX.view.outcome.SO_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.student-outcome-list',
	requires: [
	],
	store: VX.getS('Student_outcome'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	title: 'Phiên bản chuẩn đầu ra',
	form: Ext.create('VX.view.outcome.SO_Form'),
	columns: [{
		dataIndex: 'so_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'so_code',
		flex: 1,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'so_date',
		flex: 1,
		//width: 85,
		text: 'Ngày tạo',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'so_isused',
		renderer: VX.checkRender,
		flex: 1,
		text: 'Sử dụng',
		filter:{type:'boolean'}
	}],
	onSelectionChange: function(g,selected){
		var me=this, c=me.up().down('student-outcome-item-list');
		me.callParent(arguments);
		c.setVersion(selected.length?selected[0].get('so_id'):0);
	}
});