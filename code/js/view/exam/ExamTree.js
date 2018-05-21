Ext.define('VX.view.exam.ExamTree', {
	extend: 'Ext.tree.Panel',
	requires: [
		'VX.storx.ExamTree'
	],
	alias: 'widget.test-exam-tree',
	cls: 'course-content-tree',
	store: VX.getSE('ExamTree'),
	rootVisible: false,
	tbar: [{
		tooltip: 'Mở rộng',
		iconCls: 'expand16',
		handler: function() {
			this.up('panel').onExpandAllClick();
		}
	}, {
		tooltip: 'Thu hẹp',
		iconCls: 'collapse16',
		handler: function() {
			this.up('panel').onCollapseAllClick();
		}
	}],
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		me.on({
			select: me.onSelectContent,
			cellclick: me.onCellClick,
			scope: me
		});
	},
	onCellClick: function(tb, td, cellIndex, rec, tr, rowIndex, e, eOpts ){
		var w = tb.up('window');
		w.onSelectInTree(rec);
	},
	onExpandAllClick: function(){
		var me = this,
			toolbar = me.down('toolbar');
				
		me.getEl().mask('Đang mở rộng...');
		toolbar.disable();
								
		this.expandAll(function() {
			me.getEl().unmask();
			toolbar.enable();
		});
	},
	onCollapseAllClick: function(){
		var toolbar = this.down('toolbar');
		
		toolbar.disable();
		this.collapseAll(function() {
			toolbar.enable();
		});
	},
	onSelectContent: function(row,rec){
		//console.log(row.$className);
	}
});