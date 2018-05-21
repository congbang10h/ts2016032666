Ext.define('VX.view.outcome.PEO_List', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.peo-list',
	requires: [
	],
	store: VX.getS('Peo'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
	title: 'Phiên bản chuẩn đầu ra',
	form: Ext.create('VX.view.outcome.PEO_Form'),
	columns: [{
		dataIndex: 'peo_id',
		width: 50,
		text: '#',
        hidden: true,
		filter:{type:'numeric'}
	}, {
		dataIndex: 'peo_code',
		flex: 1,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'peo_date',
		flex: 1,
		//width: 85,
		text: 'Ngày tạo',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'peo_isused',
		renderer: VX.checkRender,
		flex: 1,
		text: 'Sử dụng',
		filter:{type:'boolean'}
	}],
	onSelectionChange: function(g,selected){
		var me=this, c=me.up().down('peo-item-list');
		me.callParent(arguments);
		c.setVersion(selected.length?selected[0].get('peo_id'):0);
	}
});