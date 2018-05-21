//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Question_solution', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'solution_id',    type: 'int', title: 'solution_id'},
		{name: 'curr_item_id',   type: 'int', title: 'curr_item_id'},
		{name: 'next_item_id',   type: 'int', title: 'next_item_id'},
		{name: 'question_id',    type: 'int', title: 'question_id'},
		{name: 'solution_order', type: 'int', title: 'solution_order'}
	],
	actionName: 'Question_solution',
	proxy:{
		type: 'direct',
		api: Question_solution,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});