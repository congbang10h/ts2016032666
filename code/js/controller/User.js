Ext.define('VX.controller.User',{
	extend: 'Ext.app.Controller',
	constructor: function(){
		this.callParent(arguments);
		VX.cc.User = this;
	},
	updateByAuthorise: function(user){
		window.location = location.href;
	},
	changeInfoResponsed: function(response){
		try{
			var res = Ext.JSON.decode(response.responseText);
			if (!res.success)
				throw res.error || res.message;
			
			VX.user = res.user;
			Ext.ux.info('Thay đổi thông tin cá nhân thành công!');
		}catch(e){
			Ext.ux.error(e,'VX.controller.User::changeInfoResponsed');
		}
		Ext.ux.hideMask();
	},
	showLogin: function(){
		var me=this,dlg=me.dlgLogin;
		if (!dlg){
			me.dlgLogin = Ext.create('VX.view.user.LoginForm');
			VX.js.add({
				//url: 'jslib/hello.min.js',
				url: 'jslib/hello.js',
				check: 'hello.init',
				success: function(){
					hello.init(VX.social.id,VX.social.uri);
					
					hello.on('auth.login', function(auth){
						if (hello.clickedSocialButton){
							var ctrl = VX.cc.User,
								frm = hello.dlgLogin.down('form').getForm(),
								r = frm.getValues();
							//console.log(auth);
							ctrl.loginOAuth2({
								network: auth.network,
								token: auth.authResponse.access_token,
								client_id: auth.authResponse.client_id,
								role_id: r.role_id
							});
							hello.clickedSocialButton = 0;
						}else{
							//console.log('OAuth2 logout');
							//hello.logout();
						}
					});
					this.dlgLogin.show();
				},
				scope: me
			});
		}else{
			dlg.down('form').getForm().reset();
			dlg.show();
		}
	},
	login: function(){
		try{
			Ext.ux.showMask();
			var me=this, rec = me.dlgLogin.down('form').getValues();
			if (rec.account_id=='')
				throw 'Chưa nhập tên tài khoản';
			if (rec.account_password=='')
				throw 'Chưa nhập mật khẩu';
			var sid = Ext.util.Cookies.get('PHPSESSID');
			rec.account_password = Ext.ux.MD5(sid+Ext.ux.MD5(rec.account_password));
			Ext.ux.rpc({
				action: 'User',
				method: 'login',
				params: rec,
				scope: me,
				callback: me.onLoginResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::login');
		}
	},
	onLoginResponsed: function(response){
		try{
			if (!response.success)
				throw response.message;
			
			this.updateByAuthorise(response.user);
			if (VX.waitanswer){
    			VX.cc.Action.fire('waitanswer');
    		}
			
			this.dlgLogin.hide();
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::onLoginResponsed');
		}
	},
	onLoginFailed: function(e){
		VX.loginfailed = VX.loginfailed?VX.loginfailed+1:1;
		//if (VX.loginfailed<3) return false;
		//this.lostpass();
		Ext.ux.error(e.message);
		return true;
	},
	loginOAuth2: function(auth){
		if (VX.user.user_id) return;
		
		Ext.ux.showMask();
		try{
			Ext.ux.rpc({
				action: 'User',
				method: 'loginOAuth2',
				params: auth,
				callback: this.onLoginOAuth2Responsed,
				scope: this
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::loginOAuth2');
		}
	},
	onLoginOAuth2Responsed: function(response){
		try{
			if (!response.success)
				throw response.message;

			var me=this, u = response.user;
			if (hello.dlgLogin)
				hello.dlgLogin.hide();
			me.updateByAuthorise(u);
			if (VX.waitanswer){
    			VX.cc.Action.fire('waitanswer');
    		}
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::onLoginOAuth2Responsed');
		}
	},
	logout: function(){
		Ext.ux.showMask();
		try{
			VX.js.add({
				url: 'jslib/hello.min.js',
				check: 'hello.init',
				success: function(){
					hello.logout();
				}
			});
			Ext.ux.rpc({
				action: 'User',
				method: 'logout',
				scope: this,
				callback: this.onLogoutResponsed
			});
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::logout');
		}
	},
	onLogoutResponsed: function(response){
		try{
			if (!response.success)
				throw response.message;
			window.location = location.origin;
		}catch(e){
			Ext.ux.hideMask();
			Ext.ux.error(e,'VX.controller.User::onLogoutResponsed');
		}
	},
	showInfo : function(){
		var me = this,
			dlg = me.dlgInfo ? me.dlgInfo : Ext.create('VX.view.user.InfoForm'),
			frm = dlg.down('form').getForm();
		me.dlgInfo = dlg;
		frm.loadRecord(Ext.create('VX.model.User',VX.user));
		dlg.show();
	},	
	changeInfo: function(){
		var me = this,
			frm = me.dlgInfo.down('form').getForm(),
			rec = frm.getValues();
		Ext.ux.showMask();
		Ext.ux.rpc({
			action: 'User',
			method: 'changeInfo',
			params: rec,
			scope: me,
			callback: me.changeInfoFinished
		});
	},
	changeInfoFinished: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
			if (VX.user.user_first_name+VX.user.user_last_name
				!= res.user.user_first_name+res.user.user_last_name){
				Ext.getCmp('userhi').setValue(res.user.user_first_name+' '
					+res.user.user_last_name);
			}
			VX.user = res.user;
			this.dlgInfo.close();
			if (VX.config.successMessage)
				Ext.ux.info('Lưu thông tin thành công');
		}catch(e){
			Ext.ux.error(e,'VX.controller.User::changeInfoFinished');
		}
		Ext.ux.hideMask();
	},
	showRegister: function(){
		var me = this,
			dlg = me.dlgRegister ? me.dlgRegister : 
				Ext.create('VX.view.user.RegisterForm');
		me.dlgRegister = dlg;
		dlg.show();
	},
	submitRegister: function(){
		try{
			var me=this, frm = me.dlgRegister.down('form').getForm(),
				r = frm.getValues();
			Ext.ux.showMask();
			r.password = Ext.ux.MD5(r.password);
			delete r.password2;
			Ext.ux.rpc({
				action: 'User',
				method: 'register',
				params: r,
				scope: me,
				callback: me.registerFinished
			});
		}catch(e){
			console.log(e);
		}
	},
	registerFinished: function(res){
		try{
			if (!res.success)
				throw res.error || res.message;
			this.dlgRegister.close();
			this.updateByAuthorise(res.user);
		}catch(e){
			Ext.ux.error(e,'VX.controller.User::registerFinished');
		}
		Ext.ux.hideMask();
	}
});