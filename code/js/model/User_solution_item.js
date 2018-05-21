//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.User_solution_item', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'user_solution_item_id',      type: 'int', title: 'user_solution_item_id'},
		{name: 'user_solution_id',           type: 'int', title: 'user_solution_id'},
		{name: 'test_question_item_id',      type: 'int', title: 'test_question_item_id'},
		{name: 'tes_test_question_item_id',  type: 'int', title: 'tes_test_question_item_id'},
		{name: 'tes_test_question_item_id2', type: 'int', title: 'tes_test_question_item_id2'},
		{name: 'user_solution_item_order',   type: 'int', title: 'user_solution_item_order'},
		{name: 'user_solution_item_comment', type: 'string', title: 'user_solution_item_comment'},
		{name: 'user_solution_item_value',   type: 'string', title: 'user_solution_item_value'}
	],
	actionName: 'User_solution_item',
	validations: [
		{type: 'length', field: 'user_solution_item_comment', message: 'Thông tin [user_solution_item_comment] dài hơn 65535 ký tự', max: 65535},
		{type: 'length', field: 'user_solution_item_value', message: 'Thông tin [user_solution_item_value] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: User_solution_item,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});