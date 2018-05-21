Ext.define('VX.view.course.ContentNew', {
	extend: 'Ext.ux.WinForm',
	iconCls: 'subject16',
	title: 'Nội dung',
	width: 470,
	items:[{
		xtype: 'contenform',
		btt: VX.BT_SUBMIT | VX.BT_CLOSE,
		operator: 'create'
	}]
});
