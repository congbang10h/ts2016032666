//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.User_solution', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'user_solution_id',      type: 'int', title: 'user_solution_id'},
		{name: 'test_question_id',      type: 'int', title: 'test_question_id'},
		{name: 'user_id',               type: 'int', title: 'user_id'},
		{name: 'user_solution_comment', type: 'string', title: 'user_solution_comment'}
	],
	actionName: 'User_solution',
	validations: [
		{type: 'length', field: 'user_solution_comment', message: 'Thông tin [user_solution_comment] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: User_solution,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});