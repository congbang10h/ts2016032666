Ext.define('VX.view.topic.Form', {
	extend: 'Ext.ux.WinForm',
	modal: true,
	iconCls: 'topic16',
	title: 'Chủ đề',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		defaults:{
			labelAlign: 'top',
			width: 400
		},
		items: [{
			xtype: 'hidden',
			name: 'topic_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số chủ đề',
			name: 'topic_code'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên chủ đề',
			name: 'topic_name'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả',
			name: 'topic_desc',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Topic').save(me);
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
		frm.loadRecord(Ext.create('VX.model.Topic'));
		me.show();
	}
});
