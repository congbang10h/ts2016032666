Ext.define('VX.view.test.Form', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.model.Test',
		'VX.controller.Test',
		'VX.view.course.ComboBox',
		'Ext.ux.Form'
	],
	title: 'Đề thi',
	iconCls: 'test16',
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
			xtype: 'textfield',
			fieldLabel: 'Mã đề',
			name: 'test_code'
		},{
			xtype: 'fieldcontainer',
			fieldLabel: 'Môn học',
			layout: 'anchor',
			items: [{
				xtype: 'cbx-course',
				name: 'course_id',
				anchor: '100%'
			}]
		},{
			xtype: 'flextext',
			fieldLabel: 'Lời mở đầu',
			name: 'test_header'
		},{
			xtype: 'flextext',
			fieldLabel: 'Lời kết',
			name: 'test_footer'
		},{
			xtype: 'flextext',
			fieldLabel: 'Diễn giải',
			name: 'test_desc'
		},{
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'datefield',
				format: 'H:i d/m/Y',
				fieldLabel: 'Bắt đầu',
				name: 'test_start_time',
				labelAlign: 'top',
				margin: '0 5 0 0',
				flex: 1
			},{
				xtype: 'numberfield',
				fieldLabel: 'Thời gian',
				name: 'test_duration',
				labelAlign: 'top',
				flex: 1
			}]
		}],
		submit: function(){
			var me=this;
			if (me.isValid()){
				VX.getC('Test').save(me);
			}
		}
	}],
	newRecord: function() {
		var me = this,
			rec = Ext.create('VX.model.Test'),
			frm = me.down('form'),
			f = frm.getForm().findField('course_id');
		frm.loadRecord(rec);
		f.setValue('');
		me.show();
	},
	editRecord: function(r){
		var me=this,frm=me.down('form');
		frm.loadRecord(r);
		me.show();
	}
});
