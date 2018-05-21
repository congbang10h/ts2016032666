Ext.define('VX.view.qgroup.Form', {
	extend: 'Ext.ux.WinForm',
	modal: true,
	iconCls: 'qgroup16',
	title: 'Nhóm câu hỏi',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		items: [{
			xtype: 'hidden',
			name: 'question_group_id'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả',
			labelAlign: 'top',
			name: 'question_group_desc',
			height: 200,
			width: 400
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('QGroup').save(me);
			}
		}
	},
	editRecord: function(rec){
		var me=this, frm=me.down('form');
		frm.loadRecord(rec);
		me.show();
	},
	newRecord: function(){
		var me=this, frm=me.down('form');
		frm.loadRecord(Ext.create('VX.model.Question_group'));
		me.show();
	}
});
