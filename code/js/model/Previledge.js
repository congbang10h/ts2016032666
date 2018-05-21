//ID: 7dfe60c19c1b325412054302e0949208
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Previledge', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'previledge_id',   type: 'int', title: 'previledge_id'},
		{name: 'previledge_code', type: 'string', title: 'previledge_code'},
		{name: 'previledge_desc', type: 'string', title: 'previledge_desc'}
	],
	actionName: 'Previledge',
	validations: [
		{type: 'presence', field: 'previledge_code', message: 'Chưa nhập thông tin [previledge_code]'},
		{type: 'length', field: 'previledge_code', message: 'Thông tin [previledge_code] dài hơn 100 ký tự', max: 100},
		{type: 'presence', field: 'previledge_desc', message: 'Chưa nhập thông tin [previledge_desc]'},
		{type: 'length', field: 'previledge_desc', message: 'Thông tin [previledge_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Previledge,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});