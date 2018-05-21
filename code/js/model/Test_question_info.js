//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Test_question_info', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_question_info_id',    type: 'int', title: 'test_question_info_id'},
		{name: 'test_question_id',         type: 'int', title: 'test_question_id'},
		{name: 'test_question_info_prop',  type: 'string', title: 'test_question_info_prop'},
		{name: 'test_question_info_value', type: 'string', title: 'test_question_info_value'}
	],
	actionName: 'Test_question_info',
	validations: [
		{type: 'presence', field: 'test_question_info_prop', message: 'Chưa nhập thông tin [test_question_info_prop]'},
		{type: 'length', field: 'test_question_info_prop', message: 'Thông tin [test_question_info_prop] dài hơn 50 ký tự', max: 50},
		{type: 'presence', field: 'test_question_info_value', message: 'Chưa nhập thông tin [test_question_info_value]'},
		{type: 'length', field: 'test_question_info_value', message: 'Thông tin [test_question_info_value] dài hơn 200 ký tự', max: 200}
	],
	proxy:{
		type: 'direct',
		api: Test_question_info,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});