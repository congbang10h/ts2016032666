Ext.define('VX.view.outcome.COItemList', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.course-outcome-item-list',
	title: 'Các chuẩn đầu ra chi tiết',
	store: VX.getS('Course_outcome_item'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	form: Ext.create('VX.view.outcome.COItemForm'),
	columns: [{
		dataIndex: 'coi_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'coi_code',
		width: 100,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'coi_desc_vn',
		flex: 1,
		text: 'Mô tả (Việt)',
		filter:{type:'string'}
	}, {
		dataIndex: 'coi_desc_en',
		flex: 1,
		text: 'Mô tả (Anh)',
		filter:{type:'string'}
	}],
	setVersion: function(co_id){
		var me=this,s=VX.getS('Course_outcome_item');
		s.removeFilter('version');
		s.addFilter({
			id: 'version',
			property: 'co_id',
			value: co_id
		});
		me.buttons.create.bt.setDisabled(co_id?0:1);
	}
});