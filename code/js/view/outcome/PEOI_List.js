Ext.define('VX.view.outcome.PEOI_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.peo-item-list',
	title: 'Các chuẩn đầu ra chi tiết',
	store: VX.getS('Peo_item'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	form: Ext.create('VX.view.outcome.PEOI_Form'),
	columns: [{
		dataIndex: 'peoi_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'peoi_code',
		width: 100,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'peoi_desc_vn',
		flex: 1,
		text: 'Mô tả (Việt)',
		filter:{type:'string'}
	}, {
		dataIndex: 'peoi_desc_en',
		flex: 1,
		text: 'Mô tả (Anh)',
		filter:{type:'string'}
	}],
	setVersion: function(peo_id){
		var me=this,s=VX.getS('Peo_item');
		s.removeFilter('version');
		s.addFilter({
			id: 'version',
			property: 'peo_id',
			value: peo_id
		});
		me.buttons.create.bt.setDisabled(peo_id?0:1);
	}
});