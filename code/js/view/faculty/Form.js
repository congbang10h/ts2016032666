Ext.define('VX.view.faculty.Form', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.university.ComboBox'
	],
	modal: true,
	iconCls: 'faculty16',
	title: 'Khoa',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		defaults:{
			labelAlign: 'top',
			width: 400
		},
		items: [{
			xtype: 'hidden',
			name: 'faculty_id'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Trường',
			layout: 'anchor',
			items: [{
				xtype: 'cbx-university',
				name: 'univ_id',
				anchor: '100%'
			}]
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'faculty_code'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Việt',
			name: 'faculty_name_vn'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Anh',
			name: 'faculty_name_en'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'Faculty','faculty_id');
			}
		}
	},
	editRecord: function(rec){
		var me=this, frm=me.down('form');
		frm.loadRecord(rec);
		me.show();
	},
	newRecord: function(){
		var me=this, frm=me.down('form'),
			cbx = frm.getForm().findField('univ_id');
		frm.loadRecord(Ext.create('VX.model.Faculty'));
		cbx.setValue('');
		me.show();
	}
});
