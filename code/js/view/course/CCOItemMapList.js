Ext.define('VX.view.course.CCOItemMapList', {
	extend: 'Ext.ux.grid.Grid',
	alias: 'widget.cco-item-map-list',
	store: VX.getSE('CCOItemMap'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	toolbar: false,
	columns: [{
		dataIndex: 'coi_id',
		width: 50,
		text: '#',
		hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'coi_code',
		align: 'center',
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
		hidden: true,
		text: 'Mô tả (Anh)',
		filter:{type:'string'}
	}, {
		dataIndex: 'link',
		width: 100,
		renderer: VX.checkRender,
		align: 'center',
		text: 'Sử dụng',
		filter:{type:'boolean'}
	}, {
		dataIndex: 'cco_desc',
		flex: 1,
		text: 'Ghi chú',
		filter:{type:'string'}
	}],
	setContent: function(cc_id){
		var s=VX.getSE('CCOItemMap');
		s.removeFilter('coursecontent');
		s.addFilter({
			id: 'coursecontent',
			property: 'cc_id',
			value: cc_id
		});
	},
	onSelectionChange: function(g,selected){
		var me=this,f=me.up().down('cco-item-map-form');
		me.callParent(arguments);
		if (selected.length){
			f.setVisible(1);
			f.loadRecord(selected[0]);
		}else{
			f.setVisible(0);
		}
	}
});
