//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Test_question_content', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_question_content_id',    type: 'int', title: 'test_question_content_id'},
		{name: 'test_question_id',            type: 'int', title: 'test_question_id'},
		{name: 'content_id',                  type: 'string', title: 'content_id'},
		{name: 'test_question_content_level', type: 'string', title: 'test_question_content_level'}
	],
	actionName: 'Test_question_content',
	validations: [
		{type: 'length', field: 'content_id', message: 'Thông tin [content_id] dài hơn 20 ký tự', max: 20},
		{type: 'length', field: 'test_question_content_level', message: 'Thông tin [test_question_content_level] dài hơn 1 ký tự', max: 1}
	],
	proxy:{
		type: 'direct',
		api: Test_question_content,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});