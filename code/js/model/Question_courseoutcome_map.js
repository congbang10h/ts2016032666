//File này được tạo tự động bằng tool
//Nếu cần chỉnh sửa chỉ sửa bên trong phần ZoneX
//Những nội dung bên ngoài phần ZoneX sẽ bị thay đổi khi chạy tool
//Không thay đổi các nhãn ZoneX, X có thể là C hoặc F
Ext.define('VX.model.Question_courseoutcome_map', {
	extend: 'Ext.data.Model',
	fields: [
//<ZoneF
//ZoneF>
		{name: 'question_courseoutcome_map_id',     type: 'int', title: 'question_courseoutcome_map_id'},
		{name: 'co_id',                             type: 'int', title: 'co_id'},
		{name: 'question_id',                       type: 'int', title: 'question_id'},
		{name: 'question_courseoutcome_map_factor', type: 'int', title: 'question_courseoutcome_map_factor'}
	],
	actionName: 'Question_courseoutcome_map',
	validations: [
		{type: 'presence', field: 'question_courseoutcome_map_factor', message: 'Chưa nhập thông tin [question_courseoutcome_map_factor]'}
	],
	proxy:{
		type: 'direct',
		api: Question_courseoutcome_map,
		reader:{
			type: 'json',
			root: 'rows',
			totalProperty: 'total'
		}
	}
//<ZoneC

//ZoneC>
});