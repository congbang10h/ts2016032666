//ID: 30379b8767327dd2b7d0227106d307fa
//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Test_question_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'test_question_map_id',    type: 'int', title: 'test_question_map_id'},
		{name: 'editmode_question_id',    type: 'int', title: 'editmode_question_id'},
		{name: 'test_section_id',         type: 'int', title: 'test_section_id'},
		{name: 'testmode_question_id',    type: 'int', title: 'testmode_question_id'},
		{name: 'test_question_map_score', type: 'int', title: 'test_question_map_score'},
		{name: 'test_question_map_desc',  type: 'string', title: 'test_question_map_desc'}
	],
	actionName: 'Test_question_map',
	validations: [
		{type: 'presence', field: 'test_question_map_score', message: 'Chưa nhập thông tin [test_question_map_score]'},
		{type: 'length', field: 'test_question_map_desc', message: 'Thông tin [test_question_map_desc] dài hơn 65535 ký tự', max: 65535}
	],
	proxy:{
		type: 'direct',
		api: Test_question_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});