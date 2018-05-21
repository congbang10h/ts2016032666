//ID: 0d49e5fda88d0e278ae57eb3e9df227c
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_type_dict', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_type_id',   type: 'int', title: 'question_type_id'},
		{name: 'question_type_code', type: 'string', title: 'question_type_code'},
		{name: 'question_type_desc', type: 'string', title: 'question_type_desc'}
	],
	actionName: 'Question_type_dict',
	validations: [
		{type: 'presence', field: 'question_type_code', message: 'Chưa nhập thông tin [question_type_code]'},
		{type: 'length', field: 'question_type_code', message: 'Thông tin [question_type_code] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'question_type_desc', message: 'Chưa nhập thông tin [question_type_desc]'},
		{type: 'length', field: 'question_type_desc', message: 'Thông tin [question_type_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_type_dict,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});