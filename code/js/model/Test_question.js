//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Test_question', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_question_id',    type: 'int', title: 'test_question_id'},
		{name: 'test_section_id',     type: 'int', title: 'test_section_id'},
		{name: 'user_id',             type: 'int', title: 'user_id'},
		{name: 'test_question_desc',  type: 'string', title: 'test_question_desc'},
		{name: 'test_question_type',  type: 'string', title: 'test_question_type'},
		{name: 'test_question_level', type: 'string', title: 'test_question_level'},
		{name: 'test_question_score', type: 'int', title: 'test_question_score'}
	],
	actionName: 'Test_question',
	validations: [
		{type: 'length', field: 'test_question_desc', message: 'Thông tin [test_question_desc] dài hơn 65535 ký tự', max: 65535},
		{type: 'presence', field: 'test_question_type', message: 'Chưa nhập thông tin [test_question_type]'},
		{type: 'length', field: 'test_question_type', message: 'Thông tin [test_question_type] dài hơn 15 ký tự', max: 15},
		{type: 'length', field: 'test_question_level', message: 'Thông tin [test_question_level] dài hơn 1 ký tự', max: 1}
	],
	proxy:{
		type: 'direct',
		api: Test_question,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});