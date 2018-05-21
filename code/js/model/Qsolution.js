//ID: b68fb1bce43ec5d43574311857e57822
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Qsolution', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'qsolution_id', type: 'int', title: 'qsolution_id'},
		{name: 'question_id',  type: 'int', title: 'question_id'}
	],
	actionName: 'Qsolution',
	validations: [
		{type: 'presence', field: 'question_id', message: 'Chưa nhập thông tin [question_id]'}
	],
	proxy:{
		type: 'direct',
		api: Qsolution,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});