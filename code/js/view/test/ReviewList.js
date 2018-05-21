Ext.define('VX.view.test.ReviewList', {
	extend: 'Ext.ux.grid.Grid',
    alias: 'widget.reviewlist',
	requires: [
	],
	store: VX.getS('Test_review'),
	features: [{
		ftype: 'filters',
		encode: true
	}],
    selModel: {
        mode: 'SINGLE'
    },
	columns: [{
		dataIndex: ':user_first_name',
		flex: 1,
		text: 'Họ',
		filter:{type:'string'}
	}, {
		dataIndex: ':user_last_name',
		flex: 1,
		text: 'Tên',
		filter:{type:'string'}
	}, {
		dataIndex: 'test_review_desc',
		flex: 3,
		text: 'Lời bình',
        hidden: true,
		filter:{type:'string'}
	}, {
		dataIndex: 'test_review_time',
		flex: 1,
		text: 'Ngày duyệt',
		filter:{type:'datetime'}
	}, {
		dataIndex: 'test_review_code',
		renderer: function(val){
			return VX.vars.ReviewType.find(val);
		},
		flex: 1,
		text: 'Kiểu',
		filter:{type:'numeric'}
	}],
    initComponent: function() {
        this.callParent(arguments);

        var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
        tbar.setVisible(false);
    },
    onSelectionChange: function(g,selected,e){
        var me=this,frm=me.up('test-review-win').down('reviewform');
        if (selected.length)
            frm.loadReview(selected[0]);
    }
});