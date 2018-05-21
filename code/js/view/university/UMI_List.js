Ext.define('VX.view.university.umi_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.um-item-list',
	title: 'Các mục tiêu chi tiết',
	store: VX.getS('Univ_mission_item'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	form: Ext.create('VX.view.university.UMI_Form'),
	columns: [{
		dataIndex: 'umi_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'umi_code',
		width: 100,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'umi_desc_vn',
		flex: 1,
		text: 'Mô tả (Việt)',
		filter:{type:'string'}
	}, {
		dataIndex: 'umi_desc_en',
		flex: 1,
		text: 'Mô tả (Anh)',
		filter:{type:'string'}
	}],
	setVersion: function(um_id){
		var me=this,s=VX.getS('Univ_mission_item');
		s.removeFilter('version');
		s.addFilter({
			id: 'version',
			property: 'um_id',
			value: um_id
		});
		me.buttons.create.bt.setDisabled(um_id?0:1);
	}
});