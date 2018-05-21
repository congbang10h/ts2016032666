Ext.define('VX.view.eduprogram.Form', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.view.university.ComboBox',
		'VX.view.faculty.ComboBox',
	],
	modal: true,
	iconCls: 'eduprogram16',
	title: 'Chương trình đào tạo',
	items:{
		xtype: 'eform',
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		defaults:{
			labelAlign: 'top',
			width: 400
		},
		items: [{
			xtype: 'hidden',
			name: 'edu_program_id'
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
			xtype: 'container',
			layout: 'hbox',
			items:[{
				flex: 1,
				margin: '0 5px 0 0',
				labelAlign: 'top',
				xtype: 'textfield',
				fieldLabel: 'Mã số',
				name: 'edu_program_code'
			},{
				flex: 1,
				labelAlign: 'top',
				xtype: 'textfield',
				fieldLabel: 'Tên viết tắt',
				name: 'edu_program_name_short'
			}]
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Việt',
			name: 'edu_program_name_vn'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Anh',
			name: 'edu_program_name_en'
		},{
			xtype: 'container',
			layout: 'hbox',
			items:[{
				flex: 1,
				margin: '0 5px 0 0',
				xtype: 'datefield',
				labelAlign: 'top',
				fieldLabel: 'Ngày bắt đầu',
				name: 'edu_program_start_year'
			},{
				flex: 1,
				xtype: 'datefield',
				labelAlign: 'top',
				fieldLabel: 'Ngày kết thúc',
				name: 'edu_program_end_year'
			}]
		},{
			xtype: 'flextext',
			fieldLabel: 'Giới thiệu',
			name: 'edu_program_desc'
		},{
			xtype: 'textfield',
			fieldLabel: 'Liên kết',
			name: 'edu_program_link'
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Simple').save(me,'Educational_program','edu_program_id');
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
		frm.loadRecord(Ext.create('VX.model.Educational_program'));
		cbxu.setValue('');
		cbxf.setValue('');
		me.show();
	}
});
