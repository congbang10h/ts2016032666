Ext.define('VX.view.outcome.SOI_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.student-outcome-item-list',
	title: 'Các chuẩn đầu ra chi tiết',
	store: VX.getS('Student_outcome_item'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	form: Ext.create('VX.view.outcome.SOI_Form'),
	columns: [{
		dataIndex: 'soi_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'soi_code',
		width: 100,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'soi_desc_vn',
		flex: 1,
		text: 'Mô tả (Việt)',
		filter:{type:'string'}
	}, {
		dataIndex: 'soi_desc_en',
		flex: 1,
		text: 'Mô tả (Anh)',
		filter:{type:'string'}
	}],
	setVersion: function(so_id){
		var me=this,s=VX.getS('Student_outcome_item');
		s.removeFilter('version');
		s.addFilter({
			id: 'version',
			property: 'so_id',
			value: so_id
		});
		me.buttons.create.bt.setDisabled(so_id?0:1);
	}
});