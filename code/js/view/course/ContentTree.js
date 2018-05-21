Ext.define('VX.view.course.ContentTree', {
	extend: 'Ext.tree.Panel',
	requires: [
		'VX.storx.CourseContentTree',
		'VX.view.course.ContentEdit'
	],
	alias: 'widget.contenttree',
	cls: 'course-content-tree',
	readOnly: false,
	store: VX.getSE('CourseContentTree'),
	rootVisible: false,
	courseId: 0,
	viewConfig: {
		plugins: {
			ptype: 'treeviewdragdrop',
			ddGroup: 'map-content-to',
			containerScroll: true
		}
	},
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
		}
	},'-', {
		tooltip: 'Thêm nội dung',
		iconCls: 'add16',
		handler: function() {
			this.up('panel').addContent();
		}
	}, {
		tooltip: 'Sửa nội dung',
		iconCls: 'edit16',
		handler: function() {
			var me=this, g=me.up('panel'), sel = g.getSelectionModel().getSelection();
			if (sel.length)
				g.editContent(me,sel[0]);
		}
	}, '-', {
		tooltip: 'Xóa nội dung',
		iconCls: 'delete16',
		handler: function() {
			this.up('panel').onRemoveContent();
		}
	},'->',{
		tooltip: 'Nhóm câu hỏi theo Nội dung',
		iconCls: 'qgroup16',
		disabled: true,
		handler: function() {
			this.up('panel').showMapQGroup();
		}
	}],
	showMapQGroup: function(){
		var me=this, frm=me.gForm, sel = me.getSelectionModel().getSelection();
		if (!frm){
			me.gForm = frm = Ext.create('VX.view.map.QGroupContent');
		}
		if (sel.length)
			frm.setSelection(sel[0]);
		frm.show();
	},
	initComponent: function(){
		var me=this;
		me.callParent(arguments);
		me.on({
			select: me.onSelectContent,
			itemmove: me.onMove,
			scope: me,
			itemdblclick: me.editContent
		});
	},
	editContent: function(me, rec){
		var dlg=me.infoForm,frm;
		if (!dlg){
			dlg=me.infoForm=Ext.create('VX.view.course.ContentEdit');
		}
		frm = dlg.down('form');
		frm.loadRecord(rec);
		dlg.show();
	},
	setReadOnly: function(){
		var me=this,tbar=me.down('toolbar'),ls=tbar.items;
		me.readOnly = true;
		while(ls.length>3)
			tbar.remove(ls.getAt(3));
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
	onMove: function(node, oldParent, newParent){
		var me=this,s = VX.getSE('CourseContentTree');
		if (me.readOnly) return;
		//s.suspendAutoSync();
		me.updateChildOrder(oldParent);
		if (oldParent!=newParent){
			node.set('course_parentcontent_id', newParent.get('course_content_id'));
			me.updateChildOrder(newParent);
		}
		s.sync();
		//s.resumeAutoSync();
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
		var me=this, frm=me.gForm, p=me.up('window');
		p.changeCourseContent(rec.get('course_content_id'));
		if (frm)
			frm.setSelection(rec);
	},
	addContent: function(){
		var me=this, sel = me.getSelectionModel().getSelection(),
			rec, dlg=me.infoForm,frm,
			root = this.getRootNode(),
			pnode = sel.length ? sel[0] : root,
			parentId = (pnode==root?null:pnode.get('course_content_id'));
		if (!dlg){
			dlg=me.infoForm=Ext.create('VX.view.course.ContentEdit');
		}
		frm = dlg.down('form');
		frm.pnode = pnode;
		rec = Ext.create('VX.modex.CourseContentTree',{
			course_id: me.courseId,
			content_name: 'Nội dung '+me.counterId,
			course_parentcontent_id: parentId,
			course_content_order: pnode.childNodes.length,
			leaf: true
		});
		frm.loadRecord(rec);
		dlg.show();
	},
	onRemoveContent: function(){
		var me=this,sel = me.getSelectionModel().getSelection(),
			node = sel.length ? sel[0] : 0,
			s = VX.getSE('CourseContentTree');
		if (node){
			node.remove(true);
			s.sync();
		}
	},
	setCourseId: function(id){
		var me=this, s=me.store;
		me.courseId = id;
		s.filters.removeAll();
		s.filters.add({
			property: 'course_id',
			value: id
		});
		s.load();
	}
});