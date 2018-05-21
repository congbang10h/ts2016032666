Ext.define('VX.view.eduprogram.CourseForm', {
	extend: 'Ext.ux.WinForm',
	title: 'Môn học trong Chương trình đào tạo',
	iconCls: 'course16',
	modal: true,
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
				readOnly: true,
				flex: 1,
				xtype: 'textfield',
				margin: '0 5px 0 0'
			},
			items: [{
				fieldLabel: 'Mã môn học',
				name: 'course_code'
			},{
				fieldLabel: 'Tên viết tắt',
				name: 'course_name_short'
			}]
		},{
			xtype: 'textfield',
			readOnly: true,
			fieldLabel: 'Tên môn học',
			name: 'course_name_vn'
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
				readOnly: true,
				fieldLabel: 'Số tín chỉ',
				name: 'course_credits'
			},{
				xtype: 'textfield',
				readOnly: true,
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
				xtype: 'combobox',
				fieldLabel: 'Loại môn học',
				name: 'course_required_level_id',
				displayField: 'course_required_level_code',
				valueField: 'course_required_level_id',
				store: VX.getS('Course_required_level'),
				editable: false
			},{
				xtype: 'combobox',
				fieldLabel: 'Học kỳ',
				name: 'pcm_time_index',
				displayField: 'name',
				valueField: 'id',
				store: VX.getSE('Semester'),
				editable: false
			}]
		}],
		submit: function(){
			var me=this;
			VX.getC('Course').saveCourseInEduPro(me);
		}
	}],
	editRecord: function(r){
		var me=this,frm=me.down('form');
		frm.loadRecord(r);
		me.show();
	},
	setEduPro: function(epid){
		this.down('form').edu_program_id = epid;
	}
});