Ext.define('VX.view.user.InfoForm', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.controller.User',
		'Ext.ux.Form'
	],
	title: 'Thông tin cá nhân',
	iconCls: 'changeinfo16',
	modal: true,
	items: [{
		xtype: 'eform',
		width: 400,
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		bttSubmit: {
			text: 'Thay đổi',
			iconCls: 'send16'
		},
		fieldDefaults: {
			labelStyle: 'font-weight:bold',
			labelAlign: 'top',
			allowBlank: false,
			anchor: '100%'
		},
		items: [{
			name: 'user_id',
			xtype: 'hidden'
		},{
			fieldLabel: 'Mã người dùng',
			name: 'user_code',
			xtype: 'textfield'
		},{
			xtype: 'container',
			layout: 'hbox',
			items:[{
				margin: '0 5 0 0',
				flex: 2,
				fieldLabel: 'Họ và tên lót',
				name: 'user_first_name',
				xtype: 'textfield'
			},{
				flex: 1,
				fieldLabel: 'Tên',
				name: 'user_last_name',
				xtype: 'textfield'
			}]
		}, {
			xtype: 'container',
			layout: 'hbox',
			items:[{
				margin: '0 5 0 0',
				flex: 2,
				fieldLabel: 'Điện thoại',
				name: 'user_mobile',
				xtype: 'textfield'
			},{
				flex: 1,
				fieldLabel: 'Ngày sinh',
				name: 'user_birthdate',
				format: 'd/m/Y',
				submitFormat: 'Y-m-d',
				xtype: 'datefield'
			}]
		},{
			fieldLabel: 'Email',
			vtype: 'email',
			name: 'user_email',
			xtype: 'textfield'
		},{
			fieldLabel: 'Địa chỉ liên lạc',
			name: 'user_address'
		}],
		submit: function() {
			if (this.isValid()) {
				VX.cc.User.changeInfo();
			}
		}
	}]
});
