Ext.define('VX.view.test.ContentTree', {
	extend: 'Ext.tree.Panel',
	requires: [
		'VX.storx.TestSourceQuestion'
	],
	alias: 'widget.test-content-tree',
	cls: 'course-content-tree',
	store: VX.getSE('CourseContentTree'),
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
	}, {
		tooltip: 'Tải lại',
		iconCls: 'x-tbar-loading',
		handler: function() {
			var p = this.up('panel');
			p.store.load();
			//if (!p.readOnly)
			//	p.getTab().setDisabled(1);
		}
	}],
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		me.on({
			select: me.onSelectContent,
			scope: me
		});
	},
	updateChildOrder: function(node){
		var i,n;
		for(i in node.childNodes){
			n = node.childNodes[i];
			if (i!=n.get('course_content_order')){
				n.set('course_content_order',i);
			}
		}
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
		var s = VX.getSE('TestSourceQuestion');
		s.removeFilter('content', false);
		s.addFilter({
			id: 'content',
			property: 'course_content_id',
			value: rec.get('course_content_id')
		}, false);
		s.load();
	},
	setLimit: function(limit){
		var me=this, sc=me.store,sq=VX.getSE('TestSourceQuestion');
		sc.filters.removeAll();
		sc.filters.add({
			property: 'course_id',
			value: limit.course_id
		});
		sc.load();
		sq.removeFilter('test', false);
		sq.addFilter({
			id: 'test',
			property: 'test_id',
			value: limit.test_id
		}, false);
		sq.load();
	}
});