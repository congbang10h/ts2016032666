Ext.define('VX.view.test.ReviewWin', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.test.ReviewPanel',
        'VX.view.test.ReviewList',
        'VX.view.test.ReviewForm'
	],
	alias: 'widget.test-review-win',
	title: 'Duyệt đề thi',
	iconCls: 'test16',
	width: '100%',
	height: '100%',
	test: 0,
	loadTest: function(rec){
		var me=this,
			panel = me.down('test-review-panel'),
            frm = me.down('reviewform'),
            s = VX.getS('Test_review'),
            tid = rec.get('test_id');
		me.test = rec;
		me.testReadOnly = rec.isFix();
		me.down('reviewform').setReadOnly(me.testReadOnly);
		panel.load(tid);
        frm.test_id = tid;
        s.removeFilter('test', false);
        s.addFilter({
            id: 'test',
            property: 'test_id',
            value: tid
        }, false);
		s.load();
	},
	layout: 'border',
	bodyBorder: false,
	items: [{
		region: 'east',
		xtype: 'container',
		width: '35%',
        layout: 'vbox',
		items: [{
            xtype: 'reviewlist',
            width: '100%',
            flex: 1
        },{
            xtype: 'reviewform',
            width: '100%',
            flex: 1
		}]
	}, {
		region: 'center',
		overflowX: 'auto',
		overflowY: 'auto',
		items: {
			xtype: 'test-review-panel'
		}
	}]
});
