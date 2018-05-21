//js/ux/vtype.js
Ext.apply(Ext.form.field.VTypes, {
    emailText: 'Địa chỉ email phải có dạng "user@example.com"',
    
    password: function(val){
		return val.length >= 6;
	},
	passwordText: 'Mật khẩu không được ngắn hơn 6 ký tự',
	
    username: function(val){
		return val.length >= 6;
	},
	usernameText: 'Tài khoản không được ngắn hơn 6 ký tự',
	
    alphaSpace: function(val, field) {
        return /^[-\sa-zA-Z]+$/.test(val);
    },
    alphaSpaceText: 'Chỉ được nhập chữ cái và khoảng trắng',
    alphaSpaceMask: /^[-\sa-zA-Z]+$/
});
