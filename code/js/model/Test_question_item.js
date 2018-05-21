//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Test_question_item', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_question_item_id',    type: 'int', title: 'test_question_item_id'},
		{name: 'test_question_id',         type: 'int', title: 'test_question_id'},
		{name: 'test_question_item_face',  type: 'string', title: 'test_question_item_face'},
		{name: 'test_question_item_value', type: 'string', title: 'test_question_item_value'}
	],
	actionName: 'Test_question_item',
	validations: [
		{type: 'length', field: 'test_question_item_face', message: 'Thông tin [test_question_item_face] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'test_question_item_value', message: 'Thông tin [test_question_item_value] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_question_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});