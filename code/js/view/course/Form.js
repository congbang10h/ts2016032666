Ext.define('VX.view.course.Form', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'Ext.ux.Form'
	],
	title: 'Chi tiết môn học',
	iconCls: 'course16',
	items: [{
		xtype: 'eform',
		width: 470,
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		layout: 'anchor',
		defaults:{
			labelAlign: 'top',
			anchor: '100%'
		},
		items: [{
			xtype: 'hidden',
			name: 'course_id'
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults:{
				labelAlign: 'top',
				flex: 1,
				margin: '0 5px 0 0'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Mã môn học',
				name: 'course_code'
			},{
				xtype: 'textfield',
				fieldLabel: 'Tên viết tắt',
				name: 'course_name_short'
			}]
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên môn học',
			name: 'course_name_vn'
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên Tiếng Anh',
			name: 'course_name_en'
		},{
			xtype: 'textarea',
			fieldLabel: 'Giáo trình',
			name: 'course_linkto_syllabus'
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults:{
				labelAlign: 'top',
				flex: 1,
				margin: '0 5px 0 0'
			},
			items: [{
				xtype: 'numberfield',
				fieldLabel: 'Số tín chỉ',
				name: 'course_credits'
			},{
				xtype: 'textfield',
				fieldLabel: 'Phiên bản',
				name: 'course_version_code'
			}]
		},{
			xtype: 'container',
			layout: 'hbox',
			defaults:{
				labelAlign: 'top',
				flex: 1,
				margin: '0 5px 0 0'
			},
			items: [{
				xtype: 'datefield',
				fieldLabel: 'Ngày giới thiệu',
				name: 'course_introduced_date'
			},{
				xtype: 'datefield',
				fieldLabel: 'Ngày áp dụng',
				name: 'course_applied_year'
			}]
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Course').saveCourse(me);
			}
		}
	}],
	newRecord: function() {
		var me = this,
			rec = Ext.create('VX.model.Course'), 
			frm = me.down('form');
		frm.loadRecord(rec);
		me.show();
	},
	editRecord: function(r){
		var me=this,frm=me.down('form');
		frm.loadRecord(r);
		me.show();
	}
});
