Ext.define('VX.view.question.ShareList', {
	//extend: 'Ext.ux.grid.Grid',
	extend: 'Ext.grid.Panel',
	alias: 'widget.sharelist',
	//title: 'Danh sách người dùng được chia sẻ',
	store: VX.getS('UserShareList'),
	columns: [{
		dataIndex: 'fullname',
		flex: 1,
		text: 'Họ tên'
	}, {
		dataIndex: 'roles',
		flex: 1,
		text: 'Vai trò'
	},{
    	xtype:'actioncolumn',
    	menuDisabled: true,
    	sortable: false,
    	width: 20,
		items:[{
			tooltip: 'Xóa ra khỏi danh sách được chia sẻ',
            iconCls: 'delete16',
            handler: function(g, ri, ci, me, e, record) {
            	g.up().store.remove(record);
            }
		}]
	}]
}); 