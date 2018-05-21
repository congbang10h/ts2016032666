Ext.define('VX.view.test.EditWin', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.test.EditPanel',
		'VX.view.test.ContentTree',
		'VX.view.test.SourceQuestion',
		'Ext.dd.DropTarget'
	],
	alias: 'widget.test-edit-win',
	title: 'Nội dung đề thi',
	iconCls: 'test16',
	width: '100%',
	height: '100%',
	testReadOnly: 0,
	loadTest: function(rec){
		var me=this, p = me.down('test-edit-panel'),
			tree=me.down('test-content-tree');
		p.load(rec.get('test_id'), rec.isFix());
		tree.setLimit({
			course_id: rec.get('course_id'),
			test_id: rec.get('test_id')
		});
	},
	layout: 'border',
	bodyBorder: false,
	items: [{
		region: 'east',
		xtype: 'container',
		width: '35%',
		layout: 'vbox',
		title: 'Câu hỏi',
		items: [{
			flex: 1,
			width: '100%',
			xtype: 'test-content-tree'
		},{
			flex: 1,
			width: '100%',
			xtype: 'test-src-question'
		}]
	}, {
		region: 'center',
		overflowX: 'auto',
		overflowY: 'auto',
		items: {
			xtype: 'test-edit-panel'
		}
	}]
});
