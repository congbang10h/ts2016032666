Ext.define('VX.view.university.Form', {
	extend: 'Ext.ux.WinForm',
	modal: true,
	iconCls: 'university16',
	title: 'Trường',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		defaults:{
			labelAlign: 'top',
			width: 400
		},
		items: [{
			xtype: 'hidden',
			name: 'univ_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'univ_code'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Việt',
			name: 'univ_name_vn'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Anh',
			name: 'univ_name_en'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên viết tắt',
			name: 'univ_name_short'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'University','univ_id');
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
		frm.loadRecord(Ext.create('VX.model.University'));
		me.show();
	}
});
