Ext.define('VX.view.outcome.CO_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.course-outcome-list',
	requires: [
	],
	store: VX.getS('Course_outcome'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	title: 'Phiên bản chuẩn đầu ra',
	form: Ext.create('VX.view.outcome.CO_Form'),
	columns: [{
		dataIndex: 'co_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'co_code',
		flex: 1,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'co_date',
		flex: 1,
		//width: 85,
		text: 'Ngày tạo',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'co_isused',
		renderer: VX.checkRender,
		flex: 1,
		text: 'Sử dụng',
		filter:{type:'boolean'}
	}],
	onSelectionChange: function(g,selected){
		var me=this, c=me.up().down('course-outcome-item-list');
		me.callParent(arguments);
		c.setVersion(selected.length?selected[0].get('co_id'):0);
	}
});