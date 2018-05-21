Ext.define('VX.view.user.LoginForm', {
	extend: 'Ext.ux.WinForm',
	requires: [
		'VX.controller.User',
		'Ext.ux.Form'
	],
	title: 'Đăng nhập',
	iconCls: 'login16',
	modal: true,
	items: [{
		xtype: 'eform',
		width: 350,
		btt: 0,
		items:[{
			xtype: 'fieldset',
			title: 'Tài khoản có sẵn',
			layout: 'anchor',
			padding: 10,
			items:[{
				xtype: 'textfield',
				emptyText: 'Tên tài khoản',
				anchor: '100%',
				name: 'account_id',
				fieldDefault: true
			},{
				xtype: 'textfield',
				inputType: 'password',
				emptyText: 'Mật khẩu',
				anchor: '100%',
				name: 'account_password'
			},{
				xtype: 'button',
				iconCls: 'login32',
				text: 'Đăng nhập',
				anchor: '100%',
				scale: 'large',
				handler: function(){
					VX.cc.User.login();
				}
			}]
		},{
			xtype: 'fieldset',
			title: 'Tài khoản mạng xã hội',
			layout: 'vbox',
			padding: 10,
			items:[{
				xtype: 'container',
				layout: 'hbox',
				width: '100%',
				items:[{
					xtype: 'button',
					iconCls: 'google32',
					text: 'Google',
					scale: 'large',
					style: 'margin-right: 10px',
					flex: 1,
					handler: function(){
						hello.clickedSocialButton = 1;
						hello.dlgLogin = this.up('window');
						hello('google').login();
					}
				},{
					xtype: 'button',
					iconCls: 'facebook32',
					text: 'Facebook',
					scale: 'large',
					flex: 1,
					handler: function(){
						hello.clickedSocialButton = 1;
						hello.dlgLogin = this.up('window');
						hello('facebook').login();
					}
				}]
			},{
				fieldLabel: 'Tạo tài khoản (nếu chưa có) với vai trò',
				xtype: 'radiogroup',
				labelAlign: 'top',
				layout: 'hbox',
				width: '100%',
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
		}],
		submit: function(){
			VX.cc.User.login();
		}
	}]
});
