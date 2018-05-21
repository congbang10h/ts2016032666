Ext.define('VX.view.test.RandTest', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.controller.Test',
		'Ext.ux.Form'
	],
	title: 'Tạo đề thi ngẫu nhiên',
	iconCls: 'rand16',
	items: [{
		xtype: 'eform',
		width: 470,
		btt: VX.BT_SUBMIT,
		bttSubmit: {
			text: 'Xác nhận',
			iconCls: 'rand16'
		},
		layout: 'anchor',
		defaults:{
			labelAlign: 'top',
			anchor: '100%'
		},
		items: [{
			xtype: 'hidden',
			name: 'test_id'
		},{
			xtype: 'textfield',
			fieldLabel: 'Số lượng câu hỏi',
			name: 'number_question'
		},{
			xtype: 'checkbox',
			inputValue: 1,
			uncheckedValue: 0,
			fieldLabel: 'Chú ý',
			boxLabel: 'Loại bỏ tất cả câu hỏi cũ trong đề thi (nếu có)',
			name: 'overwrite'
		}],
		submit: function(){
			var me=this;
			VX.getC('Test').dtRand(me,me.up('window'));
		}
	}],
	loadData: function(test_id){
		var me=this,f=me.down('form'),frm=f.getForm();
		frm.reset();
		frm.findField('test_id').setValue(test_id);
		me.show();
	}
});
