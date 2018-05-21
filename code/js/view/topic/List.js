Ext.define('VX.view.topic.List', {
	extend: 'Ext.ux.grid.Grid',
	requires: [],
	title: 'Chủ đề',
	closable: true,
	iconCls: 'topic16',
	store: VX.getS('Topic'),
	form: Ext.create('VX.view.topic.Form'),
	lsForm: {},
	features: [{
		ftype: 'filters',
		encode: true
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'map-topic-to',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	columns: [{
		dataIndex: 'topic_id',
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
		dataIndex: 'topic_code',
		flex: 1,
		text: 'Mã số',
		filter:{type:'string'}
	}, {
		dataIndex: 'topic_name',
		flex: 1,
		text: 'Tên',
		filter:{type:'string'}
	}, {
		dataIndex: 'topic_desc',
		text: 'Mô tả',
		flex: 3,
		filter:{type:'string'}
	}],
	initComponent: function(){
		this.callParent(arguments);
		
		var tbar = this.getDockedItems('toolbar[dock="top"]')[0];
		tbar.add('-',{
			iconCls: 'question16',
			text: 'Câu hỏi',
			tooltip: 'Danh sách Câu hỏi theo Chủ đề',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('QuestionTopic');
			}
		},{
			iconCls: 'qgroup16',
			text: 'Nhóm câu hỏi',
			tooltip: 'Danh sách Nhóm câu hỏi theo Chủ đề',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('QGroupTopic');
			}
		},{
			iconCls: 'course16',
			text: 'Môn học',
			tooltip: 'Danh sách Môn học theo Chủ đề',
			handler: function() {
				var g = this.up('grid');
				g.showGroup('CourseTopic');
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