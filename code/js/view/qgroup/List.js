Ext.define('VX.view.qgroup.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Nhóm câu hỏi',
	closable: true,
	iconCls: 'qgroup16',
	store: VX.getS('Question_group'),
	form: Ext.create('VX.view.qgroup.Form'),
	lsForm: {},
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-qgroup-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'question_group_id',
		flex: 0.5,
		text: '#',
		filter:{type:'numeric'}
	}, {
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
		dataIndex: 'question_group_desc',
		text: 'Mô tả',
		flex: 3,
		filter:{type:'string'}
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
		tbar.add('-',{
			iconCls: 'content16',
			text: 'Nội dung',
			tooltip: 'Danh sách Nội dung theo Nhóm câu hỏi',
			handler: function () {
				var g = this.up('grid');
				g.showGroup('ContentQGroup');
			}
		},{
			iconCls: 'topic16',
			text: 'Chủ đề',
			tooltip: 'Danh sách Chủ đề theo Nhóm câu hỏi',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('TopicQGroup');
			}
		},{
			iconCls: 'question16',
			text: 'Câu hỏi',
			tooltip: 'Danh sách Câu hỏi theo Nhóm câu hỏi',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('QuestionQGroup');
			}
		});
	},
	showGroup: function(name){
		var me=this, frm=me.lsForm[name], i,
			recs = me.getSelectionModel().getSelection();
		if (!frm){
			me.lsForm[name] = frm = Ext.create('VX.view.map.'+name);
		}
		for(i in me.lsForm){
			if (me.lsForm[i]!=frm)
				me.lsForm[i].hide();
		}
		if (recs.length)
			frm.setSelection(recs[0]);
		frm.show();
	},
	onSelectionChange: function(g,selected){
		var me=this,ls=me.lsForm, i;
		me.callParent(arguments);
		for(i in ls){
			if (ls[i].isVisible())
				ls[i].setSelection(selected);
		}
	},
	hide: function(){
		var me=this,ls=me.lsForm,i;
		for(i in ls)
			ls[i].hide();
		me.callParent();
	}
}); 