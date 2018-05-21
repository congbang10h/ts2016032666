//ID: 7fcac53f4669f2df009d94fb7ac9b107
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Program_comment', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'program_comment_id',     type: 'int', title: 'program_comment_id'},
		{name: 'program_access_mode_id', type: 'int', title: 'program_access_mode_id'},
		{name: 'program_decision_id',    type: 'int', title: 'program_decision_id'},
		{name: 'program_comment_date',   type: 'date', title: 'program_comment_date'},
		{name: 'program_comment_time',   type: 'datetime', title: 'program_comment_time'},
		{name: 'program_comment_desc',   type: 'string', title: 'program_comment_desc'}
	],
	actionName: 'Program_comment',
	validations: [
		{type: 'presence', field: 'program_comment_date', message: 'Chưa nhập thông tin [program_comment_date]'},
		{type: 'presence', field: 'program_comment_time', message: 'Chưa nhập thông tin [program_comment_time]'},
		{type: 'presence', field: 'program_comment_desc', message: 'Chưa nhập thông tin [program_comment_desc]'},
		{type: 'length', field: 'program_comment_desc', message: 'Thông tin [program_comment_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Program_comment,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});