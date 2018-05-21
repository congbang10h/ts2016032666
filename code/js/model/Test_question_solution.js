//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Test_question_solution', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'test_solution_id',    type: 'int', title: 'test_solution_id'},
		{name: 'test_question_id',    type: 'int', title: 'test_question_id'},
		{name: 'test_curr_item_id',   type: 'int', title: 'test_curr_item_id'},
		{name: 'test_next_item_id',   type: 'int', title: 'test_next_item_id'},
		{name: 'test_solution_order', type: 'int', title: 'test_solution_order'}
	],
	actionName: 'Test_question_solution',
	proxy:{
		type: 'direct',
		api: Test_question_solution,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});