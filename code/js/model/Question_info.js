//ID: 98ce7b88e50d89d0ed0618b0b6fc5bb7
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_info', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_info_id',    type: 'int', title: 'question_info_id'},
		{name: 'question_id',         type: 'int', title: 'question_id'},
		{name: 'question_info_prop',  type: 'string', title: 'question_info_prop'},
		{name: 'question_info_value', type: 'string', title: 'question_info_value'},
		{name: 'question_info_desc',  type: 'string', title: 'question_info_desc'}
	],
	actionName: 'Question_info',
	validations: [
		{type: 'presence', field: 'question_info_prop', message: 'Chưa nhập thông tin [question_info_prop]'},
		{type: 'length', field: 'question_info_prop', message: 'Thông tin [question_info_prop] dài hơn 20 ký tự', max: 20},
		{type: 'presence', field: 'question_info_value', message: 'Chưa nhập thông tin [question_info_value]'},
		{type: 'length', field: 'question_info_value', message: 'Thông tin [question_info_value] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'question_info_desc', message: 'Thông tin [question_info_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_info,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});