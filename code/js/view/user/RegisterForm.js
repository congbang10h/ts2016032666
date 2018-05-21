Ext.define('VX.view.user.RegisterForm', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.controller.User',
		'Ext.ux.Form'
	],
	title: 'Đăng ký',
	iconCls: 'register16',
	items: [{
		xtype: 'eform',
		width: 400,
		btt: VX.BT_CLOSE | VX.BT_SUBMIT,
		bttSubmit: {
			text: 'Gửi',
			iconCls: 'send16'
		},
		fieldDefaults: {
			labelStyle: 'font-weight:bold',
			labelAlign: 'top',
			allowBlank: false,
			anchor: '100%'
		},
		items: [{
			xtype: 'container',
			layout: 'hbox',
			items:[{
				margin: '0 10 0 0',
				flex: 1,
				fieldLabel: 'Tài khoản',
				fieldDefault: true,
				name: 'account_id',
				xtype: 'textfield'
			},{
				flex: 1,
				layout: 'hbox',
				fieldLabel: 'Vai trò',
				xtype: 'radiogroup',
				items:[{
					flex: 1,
					xtype: 'radio',
					inputValue: 6,
					boxLabel: 'Sinh viên',
					name: 'role_id',
					checked: true
				},{
					flex: 1,
					xtype: 'radio',
					inputValue: 3,
					boxLabel: 'Giảng viên',
					name: 'role_id'
				}]
			}]
		}, {
			fieldLabel: 'Mật khẩu',
			name: 'password',
			inputType: 'password'
		}, {
			fieldLabel: 'Nhập lại mật khẩu',
			name: 'password2',
			inputType: 'password',
			validator: function(val) {
				var frm = this.up('form').getForm();
				var pass1 = frm.findField('password').getValue();
				if (pass1 == val)
					return true;
				else
					return 'Nhập lại mật khẩu không khớp với mật khẩu mới';
			}
		}, {
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
			if (this.isValid()){
				VX.cc.User.submitRegister();
			}
		}
	}]
});
