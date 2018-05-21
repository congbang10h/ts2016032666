Ext.define('VX.view.course.ContentEdit', {
	extend: 'Ext.ux.WinForm',
	iconCls: 'subject16',
	title: 'Nội dung',
	width: 470,
	items:[{
		xtype: 'eform',
		btt: VX.BT_SUBMIT | VX.BT_CLOSE,
		layout: 'anchor',
		defaults:{
			labelAlign: 'top',
			anchor: '100%'
		},
		items: [{
			xtype: 'textfield',
			readOnly: true,
			fieldLabel: 'ID',
			name: 'course_content_id'
		},{
			xtype: 'hidden',
			name: 'course_id'
		},{
			xtype: 'hidden',
			name: 'course_parentcontent_id'
		},{
			xtype: 'hidden',
			name: 'course_content_order'
		},{
			xtype: 'hidden',
			name: 'text'	//Title for TreeNote
		},{
			xtype: 'container',
			layout: 'hbox',
			items:[{
				flex: 2,
				labelAlign: 'top',
				xtype: 'textfield',
				fieldLabel: 'Mã nội dung',
				name: 'course_content_code',
				margin: '0 10 0 0'
			},{
				flex: 1,
				labelAlign: 'top',
				xtype: 'numberfield',
				fieldLabel: 'Hệ số',
				name: 'course_content_percentage'
			}]
		},{
			xtype: 'textfield',
			fieldLabel: 'Tên nội dung',
			name: 'course_content_name'
		},{
			xtype: 'flextext',
			fieldLabel: 'Mô tả',
			name: 'course_content_desc',
			height: 200
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				var frm=me.getForm(),f1,f2, ctrl=VX.getC('Course');
				f1=frm.findField('course_content_name');
				f2=frm.findField('text');
				f2.setValue(f1.getValue());
				ctrl.saveContent(me);
			}
		}
	}]
});
