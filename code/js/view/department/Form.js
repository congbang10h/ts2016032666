Ext.define('VX.view.department.Form', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.university.ComboBox',
		'VX.view.faculty.ComboBox',
	],
	modal: true,
	iconCls: 'department16',
	title: 'Bộ môn',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		defaults:{
			labelAlign: 'top',
			width: 400
		},
		items: [{
			xtype: 'hidden',
			name: 'dept_id'
		}, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Trường',
			layout: 'anchor',
			items: [{
				xtype: 'cbx-university',
				name: 'univ_id',
				anchor: '100%',
				onSelect: function(rec){
					var store=VX.getS('Faculty','cbx');
					store.removeFilter('univ');
					store.addFilter({
						id: 'univ',
						property: 'univ_id',
						value: rec.get('univ_id')
					});
				}
			}]
		},{
			xtype: 'fieldcontainer',
			fieldLabel: 'Khoa',
			layout: 'anchor',
			items: [{
				xtype: 'cbx-faculty',
				name: 'faculty_id',
				anchor: '100%'
			}]
		},{
			xtype: 'textfield',
			fieldLabel: 'Mã số',
			name: 'dept_code'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Việt',
			name: 'dept_name_vn'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Anh',
			name: 'dept_name_en'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'Department','dept_id');
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
			cbxu = frm.getForm().findField('univ_id'),
			cbxf = frm.getForm().findField('faculty_id');
		frm.loadRecord(Ext.create('VX.model.Department'));
		cbxu.setValue('');
		cbxf.setValue('');
		me.show();
	}
});
