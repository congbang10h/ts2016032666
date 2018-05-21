//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần EDITABLE ZONE
//Những nội dung bên ngoài phần EDITABLE ZONE sẽ bị thay đổi khi chạy tool
//Không thay đổi 2 nhãn //<ZoneC và //ZoneC>
Ext.define('VX.model.Question_figure', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'question_figure_id',   type: 'int', title: 'question_figure_id'},
		{name: 'figure_id',            type: 'int', title: 'figure_id'},
		{name: 'question_id',          type: 'int', title: 'question_id'},
		{name: 'question_figure_desc', type: 'string', title: 'question_figure_desc'}
	],
	actionName: 'Question_figure',
	validations: [
		{type: 'length', field: 'question_figure_desc', message: 'Thông tin [question_figure_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Question_figure,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});